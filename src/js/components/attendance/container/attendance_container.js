import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAttendance, fetchAttendanceFrequency, fetchAttendanceAvg, fetchAttendanceByParty } from '../actions';
import { AttendanceGraph, AttendanceFrequencyGraph, AttendanceComparisonGraph } from 'attendance';

class AttendanceContainer extends Component {
  componentWillMount() {
    this.props.fetchAttendance(this.props.deputyId);
    this.props.fetchAttendanceFrequency();
    this.props.fetchAttendanceAvg();
    this.props.fetchAttendanceByParty();
  }

  render() {
    return (
      <div>
        <AttendanceGraph
          max={this.props.attendanceAvg.max}
          attendance={this.props.attendance}
          attendanceDetails={this.props.attendanceDetails}
          deputyId={this.props.deputyId}
          deputyName={this.props.deputyName}
          width={this.props.width}/>
        <AttendanceFrequencyGraph
          attendance={this.props.attendance}
          attendanceFrequency={this.props.attendanceFrequency}
          deputyName={this.props.deputyName}
          width={this.props.width}/>
        <AttendanceComparisonGraph
          attendance={this.props.attendance}
          attendanceAvg={this.props.attendanceAvg}
          attendanceByParty={this.props.attendanceByParty}
          deputyId={this.props.deputyId}
          deputyName={this.props.deputyName}
          deputyParty={this.props.deputyParty}
          width={this.props.width}/>
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
