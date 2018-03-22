import React from 'react';
import { DoughnutChart } from 'react-echart';

function complexFormatter(params){
  return `${params.data.name} \n ${params.value}`;
}

function parseOptions(props) {
  let total = 0;
  let seriesArray = [];
  props.parties.forEach(party => {
    let serieUp = { name: 'Superior', data: [], total: 0};
    let serieDown = { name: 'Media', data: [], total: 0};
    for(let property in party) {
      if(property !== 'party') {
        let value = parseInt(party[property]);
        if(property === 'doctorado' || property === 'maestria'  || property === 'licenciatura' || property === 'normalista') {
          serieUp.data.push({
            name: property,
            value: value
          });
          serieUp.total += value;
        } else {
          serieDown.data.push({
            name: property,
            value: value
          });
          serieDown.total += value;
        }
      }
    }
    total = serieUp.total < total ? total : serieUp.total;
    seriesArray.push(serieUp);
    seriesArray.push(serieDown);
  });

  return {
    total: total,
    seriesArray: seriesArray,
    labels: ['doctorado', 'maestria', 'licenciatura', 'pasante', 'normalista', 'tecnico', 'preparatoria', 'secundaria', 'primaria', 'desconocido'],
    legend: { orient: 'vertical', x: 'left' }
  };
}


export default function(props) {
  let options = parseOptions(props);

  return <DoughnutChart
              seriesArray={ options.seriesArray }
              limit={options.total}
              complexFormatter={complexFormatter}
              labels={options.labels}
              legend={options.legend}
              frame={props.frame} />;
}
