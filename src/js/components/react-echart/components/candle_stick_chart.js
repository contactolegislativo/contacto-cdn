import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import echarts from 'echarts/dist/echarts-en.min.js';
import CoreChart from './core_chart';
import CoreHelper from './core_helper';

class CandleStickChart extends Component {
  parseChartOptions(props) {
    return {
      toolbox: CoreHelper.saveImageToolbox,
      title: {
        text: props.title,
        subtext: props.subtitle,
        show: true,
        left: 'center',
        top: 0
      },
      grid: {
        left: '5%',
        right: '5%',
        bottom: '15%'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross'
        },
        formatter: function (params) {
          let data = params[0];
          return data.name +
            ': <br/>Min:' + data.data[1] +
              '<br/>Max:' + data.data[2] +
              '<br/>Promedio:' + data.data[5] +
              '<br/>Diputados:' + data.data[6]
        }
      },
      xAxis: {
        data: props.labels,
      },
      yAxis: {
        min: props.boundaries.min,
        max: props.boundaries.max,
        scale: true,
        splitArea: {
            show: true
        }
      },
      dataZoom: [
          {
              type: 'inside',
              start: 50,
              end: 100
          },
          {
              show: true,
              type: 'slider',
              y: '90%',
              start: 50,
              end: 100
          }
      ],
      series: [{
          type: 'candlestick',
          data: props.data,
          itemStyle: {
              normal: {
                  color: '#f50057',
                  color0: '#ff4081',
                  borderColor: '#f50057',
                  borderColor0: '#ff4081'
              }
          }
      }, {
        data: this.props.line,
        type: 'line',
        smooth: true,
        zlevel: 10,
        itemStyle: {
            normal: {
                color: '#3d5afe',
                borderColor: '#3d5afe',
            }
        }
      }]
    };

  }

  render() {
    let options = this.parseChartOptions(this.props);
    return <CoreChart {...this.props} options={options}/>
  }
}

export default CandleStickChart;
