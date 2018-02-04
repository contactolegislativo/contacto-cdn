import React, { Component } from 'react';

export default function(props) {
  return (
    <div className="chart" style={{ height: props.width + 'px'}}>
      <div style={{transform: 'translateY(45%)', height: props.width + 'px'}}>
        <div className="loader">Loading...</div>
      </div>
    </div>
  );
}
