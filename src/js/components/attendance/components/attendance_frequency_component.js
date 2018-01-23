import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAttendanceFrequency } from '../actions';
import { BarChart } from 'react-echart';

class AttendanceFrequencyGraph extends Component {
  componentDidMount() {
    // Read API
    this.props.fetchAttendanceFrequency();
  }

  renderPlaceholder() {
    return (
      <div>
        <h3 className="text-center"></h3>
        <h5 className="text-center mt-2"></h5>
        <div style={{"height": this.elementWidth + 'px'}}>
          <h4>Loading ...</h4>
        </div>
      </div>
    );
  }

  render() {
    // We need to have attedance and attendance frecuency to display this chart
    if(this.props.attendanceFrequency.length === 0
      || this.props.attendance.length === 0)
      return this.renderPlaceholder();

    let labels = [], data = [], yMax = 0;

    let deputyAttendance = this.props.attendance.find(item => {
      return item.name === 'A';
    });

    this.props.attendanceFrequency.forEach((item, index) => {
      labels.push(item.quantity);
      data.push(item.frequency);

      if(yMax < item.frequency)
        yMax = item.frequency;

      if(item.quantity === deputyAttendance.value) {
        deputyAttendance.yAxis = item.frequency;
        deputyAttendance.xAxis = index;
      }
    });

    let marker = {
      ...deputyAttendance,
      name : this.props.deputyName,
      value : deputyAttendance.value
    };

    return (
      <div>
        <h5 className="text-center mt-2">¿Como es su desempeno con respecto a otros diputados?</h5>
        <BarChart
            labels={labels}
            data={data}
            yMax={yMax}
            width={this.props.width}
            marker={marker}
           />
      </div>
    );

    // seriesArray={ seriesArray }
    // limit={maxLength}
    // labels={['A','AO','PM','IV','AC','IJ','I']}
    // simpleFormatter={simpleFormatter}
    // complexFormatter={complexFormatter}
    // width={this.elementWidth}
    // title={`${this.deputyName} \n ha tenido ${attendances} asistencias`}
    // subtitle={'Fuente diputados.gob.mx'}
    // sublink={`http://sitl.diputados.gob.mx/LXIII_leg/asistencias_diputados_xperiodonplxiii.php?dipt=${this.deputyId}`}
  }
}

export default connect((state) => {
  return {
    attendance: state.attendance,
    attendanceFrequency: state.attendanceFrequency
  };
}, { fetchAttendanceFrequency })(AttendanceFrequencyGraph);
