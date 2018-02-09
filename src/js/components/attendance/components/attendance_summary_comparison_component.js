import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAttendanceAvg, fetchAttendanceByParty } from '../actions';
import { CandleStickChart, Loader } from 'react-echart';

class AttendanceSummaryComparisonGraph extends Component {
  componentDidMount() {
    this.props.fetchAttendanceAvg();
    this.props.fetchAttendanceByParty();
  }

  render() {
    // We need to have attedance and attendance frequency to display this chart
    if(this.props.attendanceByParty.length === 0 || this.props.attendanceAvg.average === undefined)
      return <Loader width={this.props.frame.width}/>;

    let labels = [], avg = [];

    let data = this.props.attendanceByParty.map(item => {
      // Labels
      labels.push(item.party.toUpperCase());
      // Avg  Line
      avg.push(item.average);
      // Candlestick
      return [
        item.max_std, item.min_std,
        item.min, item.max,
        item.average, item.deputies
      ];
    });

    return (
      <div className="chart">
        <CandleStickChart
          data={data}
          line={avg}
          labels={labels}
          boundaries={this.props.attendanceAvg}
          frame={this.props.frame}
          title={'¿Cual es el desempeño \nde cada partido en la camara?'}
          subtitle={'Fuente Estadistica'}
          subtitlelink={`/legislatura/LXIII/asistencias`}/>
      </div>
    );
  }
}


export default connect((state) => {
  return {
    attendanceAvg: state.attendanceAvg,
    attendanceByParty: state.attendanceByParty
  };
}, { fetchAttendanceAvg, fetchAttendanceByParty })(AttendanceSummaryComparisonGraph);
