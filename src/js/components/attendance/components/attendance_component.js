import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAttendance } from '../actions';
import { DoughnutChart } from 'react-echart';

let simpleFormatter = function(name) {
  switch (name) {
    case 'A':
      return 'Asistencia por sistema';
    case 'AO':
      return 'Asistencia por Comisión Oficial';
    case 'PM':
      return 'Permiso de Mesa Directiva';
    case 'IV':
      return 'Inasistencia por Votaciones';
    case 'AC':
      return 'Asistencia por cédula';
    case 'IJ':
      return 'Inasistencia justificada';
    case 'I':
      return 'Inasistencia';
    case 'NA':
      return 'No hay registro';
    default:
      return '';
  }
}

let complexFormatter = function(params){
  return `${params.data.description} \n ${params.value}`;
}

class AttendanceGraph extends Component {
  componentDidMount() {
    // Read API
    this.props.fetchAttendance(this.props.deputyId);
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
    if(this.props.attendanceDetails.length === 0)
      return this.renderPlaceholder();

    let seriesArray = [{ name: 'Asistencias', data: [], total: 0 }, {name: 'Faltas', data: [], total: 0}];
    let maxLength = 0;

    // Clasify attendance
    this.props.attendanceDetails.forEach(item => {
      switch(item.name) {
        case 'A':
        case 'AO':
        case 'PM':
        case 'IV':
          seriesArray[0].data.push(item);
          seriesArray[0].total += item.value;
          break;
        default:
          seriesArray[1].data.push(item);
          seriesArray[1].total += item.value;
      }
    });

    // Define max length of every classification
    maxLength = this.props.attendanceAvg.max;
    return (
      <div className="chart">
        <h3 className="text-center">Asistencia</h3>
        <h5 className="text-center mt-2">¿Como ha atendido sus deberes tu diputado?</h5>
        <DoughnutChart
           seriesArray={ seriesArray }
           limit={maxLength}
           labels={['A','AO','PM','IV','AC','IJ','I','NA']}
           simpleFormatter={simpleFormatter}
           complexFormatter={complexFormatter}
           width={this.props.width}
           title={`${this.props.deputyName} \n ha tenido ${this.props.attendance} asistencias`}
           subtitle={'Fuente diputados.gob.mx'}
           sublink={`http://sitl.diputados.gob.mx/LXIII_leg/asistencias_diputados_xperiodonplxiii.php?dipt=${this.props.deputyId}`}/>
      </div>
    );
  }
}

export default connect((state) => {
  return {
    attendance: state.attendance,
    attendanceAvg: state.attendanceAvg,
    attendanceDetails: state.attendanceDetails
  };
}, { fetchAttendance })(AttendanceGraph);
