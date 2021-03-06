import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import CoreChart from './core_chart';
import CoreHelper from './core_helper';

class CandleStickChart extends Component {
  parseChartOptions(props) {
    return {
      baseOption: {
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
            return data.name + ':' +
              '<br/>Max:' + data.data[4] +
              '<br/>Std.Max:' + data.data[2] +
              '<br/>Std.Min:' + data.data[1] +
              '<br/>Min:' + data.data[3] +
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
                    color: '#ff4081',
                    color0: '#f50057',
                    borderColor: '#ff4081',
                    borderColor0: '#f50057'
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
      },
      media: [{
          query: {
              maxWidth: 360
          },
          option: {
            title: {
              textStyle: {
                fontSize: 12
              }
            }
          }
        },{
          query: {
              maxWidth: 640
          },
          option: {
            title: {
              textStyle: {
                fontSize: 14
              }
            },
            grid: {
              left: 40,
              right: '5%',
              bottom: '15%'
            },
            dataZoom: [
                {
                    type: 'inside',
                    start: 100 - Math.ceil(250 / props.data.length),
                    end: 100
                },
                {
                    show: true,
                    type: 'slider',
                    y: '90%',
                    start: 100 - Math.ceil(250 / props.data.length),
                    end: 100
                }
            ]
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
