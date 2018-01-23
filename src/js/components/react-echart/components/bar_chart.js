import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import echarts from 'echarts/dist/echarts-en.min.js';
import CoreChart from './core_chart';

var ChartSettings = {
  defaultOptions : {
    yAxis: {
        name: 'diputados',
        nameLocation: 'center',
        nameRotate: 90,
        axisLine: {
            show: false
        },
        axisTick: {
            show: false
        },
        axisLabel: {
            textStyle: {
                color: '#999'
            }
        }
    },
    dataZoom: [
        {
            type: 'inside'
        }
    ]
  },
  theme: {
    textStyle: {
        fontFamily: 'Helvetica Neue‘, Arial, Verdana, sans-serif'
    }
  }
};

class BarChart extends Component {
  parseChartOptions(props) {
    var dataShadow = [];

    for (var i = 0; i < props.data.length; i++) {
        dataShadow.push(props.yMax);
    }

    return {
        ...ChartSettings.defaultOptions,
        title: {
            text: 'Como se compara con otros diputados?',
            subtext: 'Feature Sample: Gradient Color, Shadow, Click Zoom',
            show: true,
            left: 'center',
            bottom: 0
        },
        xAxis: {
          name: 'Asistencias',
          nameLocation: 'center',
          nameTextStyle: {
            padding: [30, 55, 30, 50]
          },
          data: props.labels,
          axisLabel: {
            inside: true,
            textStyle: {
                color: '#fff'
            }
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          z: 10
        },
        series: [
            { // For shadow
                type: 'bar',
                itemStyle: {
                    normal: {color: 'rgba(0,0,0,0.05)'}
                },
                barGap:'-100%',
                barCategoryGap:'40%',
                data: dataShadow,
                animation: false
            },
            {
                type: 'bar',
                itemStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(
                            0, 0, 0, 1,
                            [
                                {offset: 0, color: '#83bff6'},
                                {offset: 0.5, color: '#188df0'},
                                {offset: 1, color: '#188df0'}
                            ]
                        )
                    },
                    emphasis: {
                        color: new echarts.graphic.LinearGradient(
                            0, 0, 0, 1,
                            [
                                {offset: 0, color: '#2378f7'},
                                {offset: 0.7, color: '#2378f7'},
                                {offset: 1, color: '#83bff6'}
                            ]
                        )
                    }
                },
                data: props.data,
                markPoint : {
                  data : [props.marker]
                }
            }
        ]
    };
  }

  render() {
    let options = this.parseChartOptions(this.props);
    return <CoreChart {...this.props} options={options}/>
  }
}

export default BarChart;
