// https://ecomfe.github.io/echarts-examples/public/editor.html?c=pictorialBar-spirit
import React from 'react';
import CoreChart from './core_chart';

const spirit = 'image://https://image.flaticon.com/icons/svg/683/683646.svg';

function buildOptions(props) {
  let maxData = 0, data = [], label = [];
  props.data.forEach(item => {
    if(maxData < item.quantity) maxData = item.quantity;
    data.push(item.quantity);
    label.push(item.party.toUpperCase().replace(' ','\n'));
  });

  return {
      xAxis: {
          max: maxData,
          splitLine: {show: false},
          offset: 10,
          axisLine: {
              lineStyle: {
                  color: '#999'
              }
          },
          axisLabel: {
              margin: 10
          }
      },
      yAxis: {
          data: label,
          inverse: false,
          axisTick: {show: false},
          axisLine: {show: false},
          axisLabel: {
              margin: 10,
              textStyle: {
                  color: '#999',
                  fontSize: 12
              }
          }
      },
      grid: {
          top: 'center',
          height: props.frame.height,
          left: 100,
          right: 100
      },
      series: [{
          // current data
          type: 'pictorialBar',
          symbol: spirit,
          symbolRepeat: 'fixed',
          symbolMargin: '10%',
          symbolClip: true,
          symbolSize: 25,
          symbolBoundingData: maxData,
          data: data,
          markLine: {
              symbol: 'none',
              label: {
                  normal: {
                      formatter: 'max: {c}',
                      position: 'start'
                  }
              },
              lineStyle: {
                  normal: {
                      color: 'green',
                      type: 'dotted',
                      opacity: 0.2,
                      width: 2
                  }
              },
              data: [{
                  type: 'max'
              }]
          },
          z: 10
      }, {
          // full data
          type: 'pictorialBar',
          itemStyle: {
              normal: {
                  opacity: 0.3
              }
          },
          label: {
              normal: {
                  show: true,
                  formatter: function (params) {
                      return `${params.value}  (${(params.value / 557 * 100).toFixed(1)}%)`;
                  },
                  position: 'right',
                  offset: [10, 0],
                  textStyle: {
                      color: 'green',
                      fontSize: 12
                  }
              }
          },
          animationDuration: 0,
          symbolRepeat: 'fixed',
          symbolMargin: '10%',
          symbol: spirit,
          symbolSize: 25,
          symbolBoundingData: maxData,
          data: data,
          z: 5
      }]
  };
}

export default function(props) {
  let options = buildOptions(props);
  return <CoreChart {...props} options={options}/>;
}
