import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAttendance } from '../actions';
import { DoughnutChart, Loader } from 'react-echart';

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

export default function(props) {
  if(props.attendanceDetails.length === 0 ||  !props.attendance)
    return <Loader width={props.width}/>;

  let seriesArray = [{ name: 'Asistencias', data: [], total: 0 }, {name: 'Faltas', data: [], total: 0}];

  // Clasify attendance
  props.attendanceDetails.forEach(item => {
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

  return (
    <div className="chart">
      <h3 className="text-center">Asistencia</h3>
      <h5 className="text-center mt-2">¿Como ha atendido sus deberes tu diputado?</h5>
      <DoughnutChart
         seriesArray={ seriesArray }
         limit={props.max}
         labels={['A','AO','PM','IV','AC','IJ','I','NA']}
         simpleFormatter={simpleFormatter}
         complexFormatter={complexFormatter}
         width={props.width}
         title={`${props.deputyName} \n ha tenido ${props.attendance} asistencias`}
         subtitle={'Fuente diputados.gob.mx'}
         sublink={`http://sitl.diputados.gob.mx/LXIII_leg/asistencias_diputados_xperiodonplxiii.php?dipt=${props.deputyId}`}/>
    </div>
  );
}
