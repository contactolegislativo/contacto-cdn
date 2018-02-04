import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAttendanceAvg, fetchAttendanceByState } from '../actions';
import { CandleStickChart } from 'react-echart';

class AttendanceSummaryComparisonByStateGraph extends Component {
  componentDidMount() {
    this.props.fetchAttendanceAvg();
    this.props.fetchAttendanceByState();
  }

  renderPlaceholder() {
    return (
      <div>
        <h3 className="text-center"></h3>
        <h5 className="text-center mt-2"></h5>
        <div style={{"height": this.props.width + 'px'}}>
          <h4>Loading ...</h4>
        </div>
      </div>
    );
  }

  render() {
    // We need to have attedance and attendance frequency to display this chart
    if(this.props.attendanceByState.length === 0 || this.props.attendanceAvg.average === undefined)
      return this.renderPlaceholder();

    let labels = [], avg = [];

    let data = this.props.attendanceByState.map(item => {
      // Labels
      labels.push(item.state.toUpperCase());
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
          width={this.props.width}
          height={this.props.height}
          title={'¿Cual es el desempeño por estado de la republica?'}
          subtitle={'Fuente Estadistica'}
          subtitlelink={`/legislatura/LXIII/asistencias`}/>
      </div>
    );
  }
}


export default connect((state) => {
  return {
    attendanceAvg: state.attendanceAvg,
    attendanceByState: state.attendanceByState
  };
}, { fetchAttendanceAvg, fetchAttendanceByState })(AttendanceSummaryComparisonByStateGraph);
