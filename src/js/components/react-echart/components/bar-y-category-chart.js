// https://ecomfe.github.io/echarts-examples/public/editor.html?c=bar-y-category-stack
import React from 'react';
import CoreChart from './core_chart';

let newSerie = (name) => {
    return {
        name: name,
        type: 'bar',
        stack: 'Unique',
        label: {
            normal: {
                show: true,
                position: 'insideRight'
            }
        },
        data: []
    };
}

// props: {
//   chamberStudies: [
//     { party: 'pri', studies: 'Doctorado', quantity: 10 },
//     { party: 'pri', studies: 'Maestria', quantity: 16 },
//     { party: 'pri', studies: 'Licenciatura', quantity: 20 },
//     ...
//   ]
// }

function buildOptions(props) {
  let series = [], hash = {};
  let labels = props.labels;
  let legend = [];
  props.data.forEach(item => {
      let serie = hash[item.party];
      if(!serie) {
        serie = newSerie(item.party);
        hash[item.party] = serie;
        series.push(serie);
        legend.push(item.party);
      }
      for(var label in item) {
        if(label !== 'party') {
          serie.data.push(item[label]);
        }
      }
  });

  console.log(series)
  console.log(labels)

  return {
      tooltip : {
          trigger: 'axis',
          axisPointer : {
              type : 'shadow'
          }
      },
      legend: {
            data: legend
      },
      grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
      },
      xAxis:  {
          type: 'value'
      },
      yAxis: {
          type: 'category',
          data: labels
      },
      series: series
  };
}

export default function(props) {
  let options = buildOptions(props);
  return <CoreChart {...props} options={options}/>;
}
