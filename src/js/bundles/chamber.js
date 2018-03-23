import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './utils'; // Bootstrap utils

import { PictoralFillBar, PieChart, PictoralBar, CandleStickChart } from 'react-echart';
import { calculateDimensions } from 'react-echart/helper';
import { MultipleDoughnutChart } from 'summary';

let fullFrame = calculateDimensions({ width: 'body', height: 'body'}, { wide: true, height: 0.7 });

function toggle(element, off) {
  let className = element.attributes.getNamedItem('toggle').value;
  let toggleText = element.attributes.getNamedItem('toggle-text') ? element.attributes.getNamedItem('toggle-text').value : null;
  let table = document.querySelector(`.${className}`);

  //Switch text
  if(toggleText) {
    element.attributes.getNamedItem('toggle-text').value = element.innerHTML;
    element.innerHTML = toggleText;
  }

  if(table) {
    if(table.className.indexOf('d-none') < 0) {
      table.className += ' d-none';
    } else if(!off){
      table.className = table.className.replace(' d-none','');
    }
  }
}

/* GENDER CHART */
let genderChart = document.querySelector('.gender-chart .workspace');
ReactDOM.render(<PictoralFillBar data={window.data.chamberGender} frame={fullFrame} />,
  genderChart, () => toggle(genderChart));

/* STUDIES CHART */
let studiesChart = document.querySelector('.studies-chart .workspace');

function selectParty(party) {
  let parties = window.data.chamberStudiesByParty.filter(item => {
    return item.party === party;
  });

  ReactDOM.render(<MultipleDoughnutChart
                    parties={ parties }
                    frame={fullFrame} />,
    studiesChart, () => toggle(studiesChart, true));
}

let parties = ['encuentro', 'independiente', 'morena', 'movimiento ciudadano', 'pan', 'panal', 'prd', 'pri', 'pve', 'sp'];
let selectorArea = document.querySelector('.studies-chart .selector select');
parties.forEach(party => {
    let radio = document.createElement('option');
    radio.name = 'party';
    radio.value = party;
    radio.innerHTML = party;
    selectorArea.appendChild(radio);
});

selectorArea.onchange = function(event) {
  selectParty(event.target.value);
}

selectParty('pri');

/* DISTRIBUTION CHART */
let distributionChart = document.querySelector('.distribution-chart .workspace');
ReactDOM.render(<PictoralBar data={window.data.chamberByParty} name={'Diputados'} frame={fullFrame} />,
  distributionChart, () => toggle(distributionChart));


/* AGE CHART */
let labels = [], avg = [], boundaries = { min: 100, max: 0 };
let data = window.data.chamberAgeDistribution.map(item => {
  if(boundaries.min > item.min) boundaries.min = item.min;
  if(boundaries.max < item.max) boundaries.max = item.max;
  // Labels
  labels.push(item.party.toUpperCase());
  // Avg  Line
  avg.push(item.avg);
  // Candlestick
  return [
    item.max_std, item.min_std,
    item.min, item.max,
    item.avg, item.deputies
  ];
});

let agesChart = document.querySelector('.ages-chart .workspace');
ReactDOM.render(<CandleStickChart data={data} line={avg} labels={labels} boundaries={boundaries} frame={fullFrame} />,
  agesChart, toggle(agesChart));

// Identify table links
document.querySelectorAll('.table-link').forEach(item => {
  item.onclick = (event) => toggle(event.target);
})
