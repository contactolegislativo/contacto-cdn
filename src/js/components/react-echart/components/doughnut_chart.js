import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import echarts from 'echarts/dist/echarts-en.min.js';

var ChartSettings = {
  defaultOptions : {
    angleAxis: {
    },
    radiusAxis: {
        type: 'category',
        data: ['A', 'B', 'C', 'E'],
        z: 10
    },
    polar: {
    },
    series: [{
        type: 'bar',
        data: [1, 2, 3, 4],
        coordinateSystem: 'polar',
        name: 'A',
        stack: 'a'
    }, {
        type: 'bar',
        data: [2, 4, 6, 8],
        coordinateSystem: 'polar',
        name: 'B',
        stack: 'a'
    }, {
        type: 'bar',
        data: [1, 2, 3, 4],
        coordinateSystem: 'polar',
        name: 'C',
        stack: 'a'
    }],
    legend: {
        show: true,
        data: ['A', 'B', 'C']
    }
  },
  theme: {
    textStyle: {
        fontFamily: 'Helvetica Neue‘, Arial, Verdana, sans-serif'
    }
  }
};

var dataStyle = {
    normal: {
        label: {show:false},
        labelLine: {show:false},
        shadowBlur: 40,
        shadowColor: 'rgba(40, 40, 40, 0.3)',
    },
    emphasis : {
        label : {
            show : true,
            position : 'center',
            textStyle : {
                fontSize : '24',
                fontWeight : 'bold'
            }
        }
    }
};

let invisible = {
  name:'invisible',
  itemStyle : {
      normal : {
          color: 'rgba(0,0,0,0)',
          label: {show:false},
          labelLine: {show:false}
      },
      emphasis : {
          color: 'rgba(0,0,0,0)'
      }
  }
}

let option = {
  color: ['#85b6b2', '#6d4f8d','#cd5e7e', '#e38980','#f7db88'],
  tooltip : {
      show: true,
      formatter: "{a} <br/>{b} : {c} ({d}%)"
  },
  legend: {
    itemGap: 10,
    orient: 'horizontal',
    bottom: 0,
    type: 'scroll',
    data:['01','02','03','04','05','06']
  },
  toolbox: {
      show : true,
      feature : {
          mark : {show: true},
          dataView : {show: true, readOnly: false},
          restore : {show: true},
          saveAsImage : {show: true}
      }
  }
};

class DoughnutChart extends Component {
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
    let initialRatio = (props.width / 3);
    let doughtnutWidth = initialRatio / (2 * props.seriesArray.length);
    let x = initialRatio, y = initialRatio + doughtnutWidth;
    let seriesArray = props.seriesArray.map(item => {
      x -= doughtnutWidth; y -= doughtnutWidth;

      if(props.limit - item.total > 0)
        item.data.push({ ...invisible, value: props.limit - item.total});

      return {
        ...item,
        type:'pie',
        clockWise: false,
        hoverAnimation: false,
        radius : [x, y],
        itemStyle : dataStyle,
        label: {
            normal: {
                show: false,
                position: 'center'
            },
            emphasis: {
                show: true,
                formatter: props.complexFormatter,
                textStyle: {
                    fontSize: '20',
                    fontWeight: 'bold'
                }
            }
        },
        labelLine: {
            normal: {
                show: false
            }
        }
      }
    });

    option.title = {
      show: true,
      left: 'center',
      bottom: 0,
      text: props.title,
      subtext: props.subtitle,
      sublink: props.sublink
    };
    option.series = seriesArray;
    option.legend.data = props.labels;
    option.legend.top = 55;
    option.legend.formatter = props.simpleFormatter;
    return option;
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

export default DoughnutChart;
