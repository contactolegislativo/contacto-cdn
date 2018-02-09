import React, { Component } from 'react';
import { AttendanceSummaryComparisonByStateGraph, AttendanceSummaryComparisonGraph, AttendanceList } from 'attendance';

export default function(props) {
  return (
    <div>
      <AttendanceSummaryComparisonGraph frame={props.frame}/>
      <AttendanceSummaryComparisonByStateGraph frame={props.frame}/>
      <AttendanceList frame={props.frame}/>
    </div>
  )
}
