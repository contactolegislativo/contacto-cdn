import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import CoreChart from './core_chart';
import CoreHelper from './core_helper';

var formatter = function(value) {
    value = (value + '').split('.');
    value.length < 2 && (value.push('00'));
    return ('000' + value[0]).slice(-3)
        + '.' + (value[1] + '00').slice(0, 2);
}

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
        fontSize: 22,
        formatter: formatter
    },
    data:[{value: 40, name: 'Diputado'}]
};

/* Default format for Gauge Chart */
var ChartSettings = {
  defaultOptions: {
    baseOption: {
      tooltip : { formatter: "{b}<br/>{c} {a}" },
      toolbox: CoreHelper.saveImageToolbox,
      series : []
    },
    media: [{
      query: {
          maxWidth: 600
      },
      option: {
        series: [{
              endAngle:45,
              radius: '50%'
            }, {
              startAngle: 225,
              endAngle: 45,
              center: ['25%', '25%'],
              radius: '40%'
            }, {
              endAngle: 45,
              center: ['75%', '75%'],
              radius: '40%'
            }]
      }
    }]
  },
  theme: {
    textStyle: {
        fontFamily: 'Helvetica Neue‘, Arial, Verdana, sans-serif'
    }
  }
};

class GaugeSetChart extends Component {
  render() {
    const { data, title, subtitle, subtitlelink, boundaries } = this.props;

    let floor = boundaries.min - boundaries.min % 10;
    let ceiling = boundaries.max % 10 === 0 ? boundaries.max : boundaries.max  + (10 - boundaries.max % 10);

    let options = {
      baseOption: {
        ...ChartSettings.defaultOptions.baseOption,
        title: {
          ...CoreHelper.centerTitle,
          text: title,
          subtext: subtitle,
          sublink: subtitlelink
        },
        series: [{
          // center
          ...centerGauge,
          min: floor,
          max: ceiling,
          splitNumber: 10,
          data: [center]
        }, {
          ...rightGauge,
          min: floor,
          max: ceiling,
          splitNumber: 5,
          data: [right]
        }, {
          ...leftGauge,
          min: floor,
          max: ceiling,
          splitNumber: 5,
          data: [left]
        }]
      },
      media: ChartSettings.defaultOptions.media
    };

    return <CoreChart {...this.props} options={options}/>
  }
}

export default GaugeSetChart;
