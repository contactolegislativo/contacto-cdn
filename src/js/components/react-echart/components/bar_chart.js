import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import echarts from 'echarts/dist/echarts-en.min.js';

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


//
// // Enable data zoom when user click bar.
// var zoomSize = 6;
// myChart.on('click', function (params) {
//     console.log(dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)]);
//     myChart.dispatchAction({
//         type: 'dataZoom',
//         startValue: dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)],
//         endValue: dataAxis[Math.min(params.dataIndex + zoomSize / 2, data.length - 1)]
//     });
// });

class BarChart extends Component {
  createChart() {
    // Initialize after dom ready
    this.chart = echarts.init(ReactDOM.findDOMNode(this), ChartSettings.theme);
    //this.chart.setOption(ChartSettings.defaultOptions);
    this.updateChart(this.props);
  }

  updateChart(nextProps) {
    // give up quickly if props are empty.
    if (!nextProps) {
      return null;
    }
    var newChartOptions = this.parseChartOptions(nextProps);
    this.chart.setOption(newChartOptions);
  }

  parseChartOptions(props) {
    var dataShadow = [];

    for (var i = 0; i < props.data.length; i++) {
        dataShadow.push(props.yMax);
    }

    let opts = {
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
    return opts;
  }

  componentDidMount() {
    this.createChart();
  }

  componentWillUnmount() {
    this.chart.dispose();
  }

  shouldComponentUpdate(nextProps, nextState) {
    // the component never updates and instead uses
    // willreceiveprops in order to reset the data on the chart
    return false;
  }

  componentWillReceiveProps(nextProps) {
    this.updateChart(nextProps);
  }

  render() {
    // render frame div for chart component
    return <div style = {{
          'height': this.props.width,
          'width': this.props.width
        }}/>;
  }
}

export default BarChart;
