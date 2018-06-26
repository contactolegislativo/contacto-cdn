import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Loader } from 'react-echart';
import { fetchAttendance, fetchAttendanceFrequency, fetchAttendanceAvg, fetchAttendanceByParty } from '../actions';
import { AttendanceGraph, AttendanceFrequencyGraph, AttendanceComparisonGraph,
  AttendanceDeputySummary, AttendanceDeputyPayment, AttendanceDeputyPartyBudget,
  AttendanceClosure, AttendanceDynamicComparison } from 'attendance';

function clasifyAttendance(baseline, frequency) {
  var above = 0, equals = 0, below = 0;
  frequency.forEach(item => {
    if(item.quantity < baseline) {
      below += item.frequency;
    } else if(item.quantity == baseline) {
      equals += item.frequency;
    } else {
      above += item.frequency;
    }
  });

  return { above, equals, below };
}

function createScenes(attendance, chamber, parties) {
  var scenes = parties.map(party => {
    return {
      main: {
        name: party.party,
        resource: `/assets/img/${party.party}.png`
      },
      title: `${party.average} Asistencias`,
      header: {
        upper: `Tu diputado tiene ${ attendance > party.average ? 'MEJOR' : 'PEOR' } asistencia`,
        lower: `Que el promedio de diputados del partido ${party.party.toUpperCase()}`
      },
      isFixed: false
    };
  });

  scenes.unshift({
    main: {
      name: 'Camara de diputados',
      resource: `/assets/img/camara_sqr.png`
    },
    title: '',
    header: {
      upper: 'Tu diputado tiene MEJOR asistencia que',
      lower: `${chamber.below} diputados de la camara`
    },
    isFixed: false
  });

  scenes.push({
    main: {
      name: 'Camara de diputados',
      resource: `/assets/img/camara_sqr.png`
    },
    title: '',
    header: {
      upper: `Existen ${chamber.above} diputados con`,
      lower: `MEJOR asistencia que tu diputado`
    },
    isFixed: false
  });

  return scenes;
}

class AttendanceContainer extends Component {
  componentWillMount() {
    this.props.fetchAttendance(this.props.deputy.id);
    this.props.fetchAttendanceFrequency();
    this.props.fetchAttendanceAvg();
    this.props.fetchAttendanceByParty();
  }

  render() {
    let chamber = {}, scenes = [], percentage = 0;
    let mainParties = ['pri', 'pan', 'prd', 'movimiento ciudadano', 'morena'];

    if((this.props.attendance.length !== undefined && this.props.attendance.length === 0) || this.props.attendanceFrequency.length === 0 || this.props.attendanceByParty.length === 0) {
      return <Loader width={this.props.frame.width}/>;
    }

    mainParties.push(this.props.deputy.party);
    chamber = clasifyAttendance(this.props.attendance, this.props.attendanceFrequency);
    percentage = (chamber.below * 100) / (chamber.above + chamber.equals + chamber.below);
    scenes = createScenes(this.props.attendance, chamber, this.props.attendanceByParty.filter(item => mainParties.includes(item.party)));

    return (
      <div>
        <AttendanceGraph
          max={this.props.attendanceAvg.max}
          attendance={this.props.attendance}
          attendanceDetails={this.props.attendanceDetails}
          deputyId={this.props.deputy.id}
          deputyName={this.props.deputy.name}
          frame={this.props.frame}/>
        <AttendanceDynamicComparison
          baseline={this.props.attendance}
          deputy={this.props.deputy}
          scenes={scenes}
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
