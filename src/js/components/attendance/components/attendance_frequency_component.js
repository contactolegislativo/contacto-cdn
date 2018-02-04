import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DoublePieChart, Loader } from 'react-echart';

function createSlice(group) {
  let label = group.items.length > 1 ?
    `${group.items[0].quantity} - ${group.items[group.items.length - 1].quantity}` :
    group.items[0].quantity;

  return {
    name: label,
    value: group.value
  }
}

var calculatePie = function(attendance, attendanceFrequency) {
  let groups = [], group = { value: 0, items: [] }, groupSize = 50;
  let inner = [{ value: 0, name: `< ${attendance}`}, { value: 0, name: `${attendance}`, selected: true }, { value: 0, name: `> ${attendance}`}];
  let outer = [];

  attendanceFrequency.forEach(item => {
    if(item.quantity < attendance) {
      inner[0].value += item.frequency;
    } else if(item.quantity === attendance) {
      inner[1].value += item.frequency;
      item.selected = true;
    } else {
      inner[2].value += item.frequency;
    }

    if(item.frequency > groupSize || item.selected) {
      //Create slice for whatever is in group
      if(group.items.length > 0)
        outer.push(createSlice(group));
      // Create single slice for selected item
      outer.push({
        name: item.quantity,
        value: item.frequency
      });

      group = { value: 0, items: [] };
    } else if(group.value + item.frequency > groupSize ) {
      // Create slice
      outer.push(createSlice(group));

      // Reset with new incoming
      group = { value: item.frequency, items: [item] };
    } else {
      //Store
      group.items.push(item);
      group.value += item.frequency;
    }
  });

  //Create slice for whatever is in group
  if(group.items.length > 0)
    outer.push(createSlice(group));

  return { inner, outer };
}

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
  if( typeof props.attendance !== 'number' || props.attendanceFrequency.length === 0 )
    return <Loader width={props.width}/>;

  let pie = calculatePie(props.attendance, props.attendanceFrequency);
  let title = prepareTitle(pie.inner, props.deputyName);

  return (
    <div className="chart">
      <h5 className="text-center mt-2">¿Como es su desempeño con respecto a otros diputados?</h5>
      <DoublePieChart
        width={props.width}
        inner={pie.inner}
        outer={pie.outer}
        title={title}
        subtitle={'Fuente Estadistica'}
        sublink={`/legislatura/LXIII/asistencias`}/>
    </div>
  );
}
