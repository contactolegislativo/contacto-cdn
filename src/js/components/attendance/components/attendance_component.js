import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAttendance, fetchAttendanceFrequency } from '../actions';
import { DoughnutChart } from 'react-echart';

// TODO: API should provide this information

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
    default:
      return '';
  }
}

let complexFormatter = function(params){
  let text = simpleFormatter(params.name);
  return `${text} \n ${params.value}`;
}

class AttendanceGraph extends Component {
  componentDidMount() {
    // Gather DOM information
    this.elementWidth = document.querySelector('.attendance').offsetWidth;
    this.deputyId = parseInt(document.querySelector('meta[name="deputy-id"]').attributes.value.value);
    this.deputyName = document.querySelector('meta[name="deputy-name"]').attributes.value.value;
    // Read API
    this.props.fetchAttendance(this.deputyId);
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
    if(this.props.attendance.length === 0)
      return this.renderPlaceholder();

    let seriesArray = [{ name: 'Asistencias', data: [], total: 0 }, {name: 'Faltas', data: [], total: 0}];
    let attendances = 0;
    let maxLength = 0;

    // Clasify attendance
    this.props.attendance.forEach(item => {
      switch(item.name) {
        case 'A':
          attendances += item.value;
          item.label = { show: true, formatter: complexFormatter };
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
    maxLength = seriesArray[0].total > seriesArray[1].total ? seriesArray[0].total : seriesArray[1].total

    return (
      <div className="chart">
        <h3 className="text-center">Asistencia</h3>
        <h5 className="text-center mt-2">¿Como ha atendido sus deberes tu diputado?</h5>
        <DoughnutChart
           seriesArray={ seriesArray }
           limit={maxLength}
           labels={['A','AO','PM','IV','AC','IJ','I']}
           simpleFormatter={simpleFormatter}
           complexFormatter={complexFormatter}
           width={this.elementWidth}
           title={`${this.deputyName} \n ha tenido ${attendances} asistencias`}
           subtitle={'Fuente diputados.gob.mx'}
           sublink={`http://sitl.diputados.gob.mx/LXIII_leg/asistencias_diputados_xperiodonplxiii.php?dipt=${this.deputyId}`}/>
      </div>
    );
  }
}

export default connect((state) => {
  return {
    attendance: state.attendance
  };
}, { fetchAttendance, fetchAttendanceFrequency })(AttendanceGraph);
