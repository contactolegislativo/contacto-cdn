import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAttendanceAvg, fetchAttendanceByParty } from '../actions';
import { CandleStickChart } from 'react-echart';

class AttendanceSummaryComparisonGraph extends Component {
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
        <h5 className="text-center mt-2">¿Cual es el desempeño de cada partido en la camara?</h5>
        <CandleStickChart
          data={data}
          line={avg}
          labels={labels}
          boundaries={this.props.attendanceAvg}
          width={this.props.width}
          height={this.props.height}
          title={'¿Cual es el desempeño de cada partido en la camara?'}
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
