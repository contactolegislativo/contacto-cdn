// https://ecomfe.github.io/echarts-examples/public/editor.html?c=pictorialBar-body-fill
import React from 'react';
import CoreChart from './core_chart';

let markLineSetting = {
    symbol: 'none',
    lineStyle: {
        normal: {
            opacity: 0.3
        }
    },
    data: [{
        type: 'max',
        label: {
            normal: {
                formatter: 'max: {c}'
            }
        }
    }, {
        type: 'min',
        label: {
            normal: {
                formatter: 'min: {c}'
            }
        }
    }]
};

let fillSerie = (name, data, bodyMax) => {
    return {
      name: name,
      type: 'pictorialBar',
      symbolClip: true,
      symbolBoundingData: 100,
      label: {
          normal: {
              show: true,
              position: 'outside',
              offset: [0, -20],
              formatter: function (param) {
                  return (param.value * bodyMax / 100).toFixed(0) + '\n' + param.name;
              },
              textStyle: {
                  fontSize: 18,
                  fontFamily: 'Arial'
              }
          }
      },
      data: data,
      markLine: markLineSetting,
      z: 10
    }
};

let backgroundSerie = (name, bodyMax) => {
    return {
      name: name,
      type: 'pictorialBar',
      symbolBoundingData: 100,
      animationDuration: 0,
      itemStyle: {
          normal: {
              color: '#ccc',
              opacity: .25
          }
      },
      data: [{
          value: 1,
          symbol: 'image:///assets/img/female_empty.svg' // female
      }, {
          value: 1,
          symbol: 'image:///assets/img/male_empty.svg' // male
      }]
    }
}

function buildOptions(props) {
  let labels = [], series = [], max = 0;
  props.data.forEach(item => {
    let total = item.male + item.female;
    let party = item.party.toUpperCase();
    max = total > max ? total : max;
    // Push label into array
    labels.push(party);
    // Create new serie for this party with female and male values
    series.push(fillSerie(
      party,
      [{
          value: (item.female * 100) / total,
          symbol: 'image:///assets/img/female_full.svg' // female
      }, {
          value: (item.male * 100) / total,
          symbol: 'image:///assets/img/male_full.svg' // male
      }],
      total
    ));
    // Create background serie for this party
    series.push(backgroundSerie(party, total));
  });

  return {
      legend: {
          data: labels,
          selectedMode: 'single',
          bottom: '0'
      },
      xAxis: {
          data: ['Mujeres', 'Hombres'],
          axisTick: {show: false},
          axisLine: {show: false},
          axisLabel: {show: false}
      },
      yAxis: {
          max: 100,
          offset: 20,
          splitLine: {show: false}
      },
      grid: {
          top: 'center',
          height: props.frame.height * 0.7
      },
      markLine: {
          z: -100
      },
      series: series
  };
}

export default function(props) {
  let options = buildOptions(props);
  return <CoreChart {...props} options={options}/>;
}
