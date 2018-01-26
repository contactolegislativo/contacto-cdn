import React, { Component } from 'react';
import { AttendanceGraph, AttendanceFrequencyGraph, AttendanceComparisonGraph } from 'attendance';

export default function(props) {
  return (
    <div>
      <AttendanceGraph deputyId={props.deputyId} deputyName={props.deputyName} width={props.width}/>
      <AttendanceFrequencyGraph deputyId={props.deputyId} deputyName={props.deputyName} width={props.width}/>
      <AttendanceComparisonGraph deputyId={props.deputyId} deputyName={props.deputyName} width={props.width}/>
    </div>
  )
}
