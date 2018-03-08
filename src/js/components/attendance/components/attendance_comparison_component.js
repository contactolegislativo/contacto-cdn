import React, { Component } from 'react';
import { GaugeChart, Loader } from 'react-echart';

var generateTitle = function(deputyName, gauges) {
  let title = `${deputyName} tiene `;
  if(gauges.deputy.value > gauges.camara.value)
    title += '\n MEJOR asistencia que el promedio de la CAMARA';
  else
    title += '\n PEOR asistencia que el promedio de la CAMARA';
  if(gauges.deputy.value > gauges.party.value)
    title += '\n y MEJOR asistencia que el promedio de su PARTIDO';
  else
    title += '\n y PEOR asistencia que el promedio de su PARTIDO';
  return title;
}

export default function(props) {
  // We need to have attedance and attendance frequency to display this chart
  if(props.attendanceByParty.length === 0 || props.attendanceAvg.average === undefined ||  typeof props.attendance !== 'number')
    return <Loader width={props.frame.width}/>;

  let party = props.attendanceByParty.find(item => item.party === props.deputyParty );
  let gauges = {
    camara: { value: props.attendanceAvg.average, name: 'Camara' },
    deputy: { value: props.attendance, name: 'Diputado' },
    party: { value: party.average, name: props.deputyParty.toUpperCase() }
  };

  let title = generateTitle(props.deputyName, gauges);

  return (
    <div className="chart">
      <h5 className="text-center mt-2">¿Como es su desempeño con respecto a otros grupos?</h5>
      <GaugeChart
        left={gauges.camara}
        center={gauges.deputy}
        right={gauges.party}
        boundaries={props.attendanceAvg}
        frame={props.frame}
        title={title}
        subtitle={'Fuente Estadistica'}
        subtitlelink={`/camara-de-diputados/LXIII/asistencias`}/>
    </div>
  );
}
