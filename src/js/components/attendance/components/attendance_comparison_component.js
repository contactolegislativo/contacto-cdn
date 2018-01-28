import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAttendanceAvg, fetchAttendanceByParty } from '../actions';
import { GaugeChart } from 'react-echart';

class AttendanceComparisonGraph extends Component {
  componentDidMount() {
    this.props.fetchAttendanceAvg();
    this.props.fetchAttendanceByParty();
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

  generateGauge() {
    let party = this.props.attendanceByParty.find(item => item.party === this.props.deputyParty );
    this.camara = { value: this.props.attendanceAvg.average, name: 'Camara' };
    this.deputy = { value: this.props.attendance, name: 'Diputado' };
    this.party = { value: party.average, name: this.props.deputyParty.toUpperCase() };
  }

  generateTitle() {
    this.title = `${this.props.deputyName} tiene `;
    if(this.deputy.value > this.camara.value)
      this.title += '\n MEJOR asistencia que el promedio de la CAMARA';
    else
      this.title += '\n PEOR asistencia que el promedio de la CAMARA';
    if(this.deputy.value > this.party.value)
      this.title += '\n y MEJOR asistencia que el promedio de su PARTIDO';
    else
      this.title += '\n y PEOR asistencia que el promedio de su PARTIDO';
  }

  render() {
    // We need to have attedance and attendance frequency to display this chart
    if(this.props.attendanceByParty.length === 0 || this.props.attendanceAvg.average === undefined)
      return this.renderPlaceholder();

    this.generateGauge();
    this.generateTitle();

    return (
      <div className="chart">
        <h5 className="text-center mt-2">¿Como es su desempeno con respecto a otros diputados?</h5>
        <GaugeChart
          left={this.camara}
          center={this.deputy}
          right={this.party}
          boundaries={this.props.attendanceAvg}
          width={this.props.width}
          title={this.title}
          subtitle={'Fuente Estadistica'}
          subtitlelink={`https://contactolegislativo.com/metodologia/asistencias`}/>
      </div>
    );
  }
}

export default connect((state) => {
  return {
    attendance: state.attendance,
    attendanceAvg: state.attendanceAvg,
    attendanceByParty: state.attendanceByParty
  };
}, { fetchAttendanceAvg, fetchAttendanceByParty })(AttendanceComparisonGraph);
