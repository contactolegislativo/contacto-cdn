import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DoublePieChart, Loader } from 'react-echart';

var prepareTitle = function(inner, deputyName) {
  let title = '';
  if(inner[0].value > inner[2].value) {
    let percentage = inner[0].value / (inner[0].value + inner[1].value + inner[2].value);
    title = `${deputyName} \n tiene mejor asistencia que ${inner[0].value} diputados.`;
  } else {
    let percentage = inner[2].value / (inner[0].value + inner[1].value + inner[2].value);
    title = `${inner[2].value} diputados tienen mejor asistencia que \n ${deputyName}`;
  }
  return title;
}

export default function(props) {
  // We need to have attedance and attendance frequency to display thisdeputyAttendance chart
  if( !props.inner || !props.outer )
    return <Loader width={props.frame.width}/>;

  let title = prepareTitle(props.inner, props.deputyName);

  return (
    <div className="chart">
      <h5 className="text-center mt-2">¿Como es su desempeño con respecto a otros diputados?</h5>
      <DoublePieChart
        frame={props.frame}
        inner={props.inner}
        outer={props.outer}
        title={title}
        subtitle={'Fuente Estadistica'}
        sublink={`/camara-de-diputados/LXIII/asistencias`}/>
    </div>
  );
}
