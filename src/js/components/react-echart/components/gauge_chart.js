import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import echarts from 'echarts/dist/echarts-en.min.js';
import CoreChart from './core_chart';
import CoreHelper from './core_helper';

/* Default axis format  */
var gaugeAxis = {
  axisLine: {
      lineStyle: {
          width: 10
      }
  },
  axisTick: {
      length: 15,
      lineStyle: {
          color: 'auto'
      }
  },
  splitLine: {
      length: 20,
      lineStyle: {
          color: 'auto'
      }
  }
};

/* Default format for center gauge  */
var centerGauge = {
    ...gaugeAxis,
    name: 'Name',
    type: 'gauge',
    z: 3,
    min: 0,
    max: 220,
    splitNumber: 11,
    radius: '50%',
    title : {
        fontWeight: 'bolder',
        fontSize: 20,
        fontStyle: 'italic'
    },
    detail : {
        fontSize: 18,
        formatter: function (value) {
            value = (value + '').split('.');
            value.length < 2 && (value.push('00'));
            return ('00' + value[0]).slice(-2)
                + '.' + (value[1] + '00').slice(0, 2)
                + '\n Iniciativas';
        }
    },
    data:[{value: 40, name: 'Diputado'}]
};

/* Default format for left gauge  */
var leftGauge = {
    ...gaugeAxis,
    name: 'Name',
    type: 'gauge',
    center: ['20%', '55%'],
    radius: '35%',
    min:0,
    max:7,
    endAngle:45,
    splitNumber:7,
    pointer: {
        width:5
    },
    title: {
        offsetCenter: [0, '-30%'],
    },
    detail: {
        fontWeight: 'bolder'
    },
    data:[{value: 1.5, name: 'Promedio \n Camara'}]
};

/* Default format for right gauge  */
let rightGauge = {
    ...gaugeAxis,
    name: 'Inicativas',
    type: 'gauge',
    center: ['80%', '55%'],
    radius: '35%',
    min:0,
    max:7,
    startAngle: 135,
    endAngle: -45,
    splitNumber:7,
    pointer: {
        width:5
    },
    title: {
        offsetCenter: [0, '-30%'],
    },
    detail: {
        fontWeight: 'bolder'
    },
    data:[{value: 2.5, name: 'Promedio \n Plurinominal'}]
};

/* Default format for Gauge Chart */
var ChartSettings = {
  defaultOptions: {
      tooltip : { formatter: "{b}<br/>{c} {a}" },
      toolbox: CoreHelper.saveAsImageToolbox,
      series : []
  },
  theme: {
    textStyle: {
        fontFamily: 'Helvetica Neue‘, Arial, Verdana, sans-serif'
    }
  }
};

class GaugeChart extends Component {
  render() {
    const { left, right, center, title, subtitle, subtitlelink } = this.props;

    let options = {
      ...ChartSettings.defaultOptions,
      title: {
        ...CoreHelper.centerTitle,
        text: title,
        subtext: subtitle,
        sublink: subtitlelink
      },
      series: [{
        // center
        ...centerGauge,
        min: 0,
        max: 220,
        splitNumber: 11,
        data: [center]
      }, {
        ...rightGauge,
        min:0,
        max:7,
        splitNumber:7,
        data: [right]
      }, {
        ...leftGauge,
        min:0,
        max:7,
        splitNumber:7,
        data: [left]
      }]
    };

    console.log(options);

    // options = ChartSettings.defaultOptions;
    return <CoreChart {...this.props} options={options}/>
  }
}

export default GaugeChart;
