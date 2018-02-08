import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAttendance, fetchAttendanceFrequency, fetchAttendanceAvg, fetchAttendanceByParty } from '../actions';
import { AttendanceGraph, AttendanceFrequencyGraph, AttendanceComparisonGraph,
  AttendanceDeputySummary, AttendanceDeputyPayment, AttendanceDeputyPartyBudget,
  AttendanceClosure } from 'attendance';

function createSlices(list, sliceSize) {
  let top = { value: 0, items: [] };
  let slices = [];
  list.forEach(item => {
    if(top.value + item.frequency > sliceSize) {
      // new item does not fit in top slice
      top.name = top.items.length > 1 ? `${top.items[0].quantity} - ${top.items[top.items.length - 1].quantity}` : `${top.items[0].quantity}`;
      slices.push({ name: top.name, value: top.value });
      top = { name: item.quantity, value: item.frequency, items: [ item ]};
    } else {
      // Accoumulate at top
      top.value += item.frequency;
      top.items.push(item);
    }
  });

  if(top.value > 0) {
    top.name = top.items.length > 1 ? `${top.items[0].quantity} - ${top.items[top.items.length - 1].quantity}` : `${top.items[0].quantity}`;
    slices.push({ name: top.name, value: top.value });
  }

  return slices;
}


var clasifyAttendanceFrecuency = function(attendance, groupRatio, attendanceFrequency) {
  let inner = [{ value: 0, name: `< ${attendance}`, group: []}, { value: 0, name: `${attendance}`, selected: true, group: [] }, { value: 0, name: `> ${attendance}`, group: []}];

  attendanceFrequency.forEach(item => {
    if(item.quantity < attendance) {
      inner[0].value += item.frequency;
      inner[0].group.push(item);
    } else if(item.quantity === attendance) {
      inner[1].value += item.frequency;
      item.selected = true;
      inner[1].group.push(item);
    } else {
      inner[2].value += item.frequency;
      inner[2].group.push(item);
    }
  });

  let outer = createSlices(inner[0].group, groupRatio).concat(createSlices(inner[1].group, groupRatio)).concat(createSlices(inner[2].group, groupRatio));

  return {
    inner,
    outer,
    above: inner[2].value,
    below: inner[0].value + inner[1].value
  };
}

class AttendanceContainer extends Component {
  componentWillMount() {
    this.props.fetchAttendance(this.props.deputy.id);
    this.props.fetchAttendanceFrequency();
    this.props.fetchAttendanceAvg();
    this.props.fetchAttendanceByParty();
  }

  render() {
    let frequency = {}, percentage = 0;
    if(this.props.attendance && this.props.attendanceFrequency.length !== 0 && this.props.attendanceAvg ) {
      frequency = clasifyAttendanceFrecuency(this.props.attendance, 55, this.props.attendanceFrequency)
      percentage = (frequency.below * 100) / this.props.attendanceFrequency[this.props.attendanceFrequency.length - 1].cumulative_frequency;
    }

    return (
      <div>
        <AttendanceGraph
          max={this.props.attendanceAvg.max}
          attendance={this.props.attendance}
          attendanceDetails={this.props.attendanceDetails}
          deputyId={this.props.deputy.id}
          deputyName={this.props.deputy.name}
          frame={this.props.frame}/>
        <AttendanceFrequencyGraph
          inner={frequency.inner}
          outer={frequency.outer}
          deputyName={this.props.deputy.name}
          frame={this.props.frame}/>
        <AttendanceComparisonGraph
          attendance={this.props.attendance}
          attendanceAvg={this.props.attendanceAvg}
          attendanceByParty={this.props.attendanceByParty}
          deputyId={this.props.deputy.id}
          deputyName={this.props.deputy.name}
          deputyParty={this.props.deputy.party}
          frame={this.props.frame}/>
        <AttendanceDeputySummary
          deputy={this.props.deputy}
          percentage={percentage}/>
        <AttendanceDeputyPayment/>
        <AttendanceDeputyPartyBudget
          deputyName={this.props.deputy.name}
          email={this.props.deputy.email}
          twitter={this.props.deputy.twitter}
          party={this.props.deputy.party}/>
        <AttendanceClosure/>
      </div>
    )
  }
}

export default connect((state) => {
  return {
    attendance: state.attendance,
    attendanceDetails: state.attendanceDetails,
    attendanceAvg: state.attendanceAvg,
    attendanceFrequency: state.attendanceFrequency,
    attendanceByParty: state.attendanceByParty
  };
}, {
  fetchAttendance,
  fetchAttendanceFrequency,
  fetchAttendanceAvg,
  fetchAttendanceByParty
})(AttendanceContainer);
