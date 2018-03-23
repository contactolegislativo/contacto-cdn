// https://ecomfe.github.io/echarts-examples/public/editor.html?c=pictorialBar-body-fill
import React from 'react';
import CoreChart from './core_chart';

function buildOptions(props) {
  let legend = [], series = [];
  props.data.forEach(item => {
    let party = item.party.toUpperCase();
    legend.push(party);
    series.push({value: item.quantity, name: party });
  });

  return {
      tooltip : {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
          orient: 'horizontal',
          left: 'center',
          data: legend
      },
      series : [
          {
              name: props.name,
              type: 'pie',
              radius : '55%',
              center: ['50%', '60%'],
              data:series,
              itemStyle: {
                  emphasis: {
                      shadowBlur: 10,
                      shadowOffsetX: 0,
                      shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
              }
          }
      ]
  };

}

export default function(props) {
  let options = buildOptions(props);
  return <CoreChart {...props} options={options}/>;
}
