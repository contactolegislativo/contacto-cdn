import React, { Component } from 'react';
import { AttendanceSummaryComparisonByStateGraph, AttendanceSummaryComparisonGraph, AttendanceList } from 'attendance';

export default function(props) {
  return (
    <div>
      <AttendanceSummaryComparisonGraph width={props.width} height={props.height}/>
      <AttendanceSummaryComparisonByStateGraph width={props.width} height={props.height}/>
      <AttendanceList/>
    </div>
  )
}
