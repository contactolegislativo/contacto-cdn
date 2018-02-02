import React, { Component } from 'react';
import { AttendanceSummaryComparisonGraph } from 'attendance';

export default function(props) {
  return (
    <div>
      <AttendanceSummaryComparisonGraph width={props.width} height={props.height}/>
    </div>
  )
}
