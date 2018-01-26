import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAttendanceFrequency } from '../actions';
import { GaugeChart } from 'react-echart';

class AttendanceComparisonGraph extends Component {
  componentDidMount() {
    // Read API
    this.props.fetchAttendanceFrequency();
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
    if(this.props.attendance.length === 0)
      return this.renderPlaceholder();

    let left = { value: 10, name: 'left' };
    let center = { value: 10, name: 'center' };
    let right = { value: 10, name: 'right' };

    return (
      <div className="chart">
        <h5 className="text-center mt-2">¿Como es su desempeno con respecto a otros diputados?</h5>
        <GaugeChart
          left={left}
          right={right}
          center={center}
          width={this.props.width}
          title={this.title}
          subtitle={'Fuente Estadistica'}
          sublink={`https://contactolegislativo.com/metodologia/asistencias`}/>
      </div>
    );
  }
}

export default connect((state) => {
  return {
    attendance: state.attendance,
  };
}, { fetchAttendanceFrequency })(AttendanceComparisonGraph);
