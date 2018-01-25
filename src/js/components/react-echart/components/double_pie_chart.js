import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import echarts from 'echarts/dist/echarts-en.min.js';
import CoreChart, { CoreHelper } from './core_chart';

var ChartSettings = {
  pie: {
      name:'Serie A',
      type:'pie',
      selectedMode: 'single',
      radius: [0, '25%'],
      label: {
          normal: {
              position: 'inner'
          }
      },
      labelLine: {
          normal: {
              show: false
          }
      },
      data:[
          {value:335, name:'A', selected:true},
          {value:679, name:'B'},
          {value:1548, name:'C'}
      ]
  },
  doughtnut: {
      name:'Serie B',
      type:'pie',
      radius: ['35%', '50%'],
      label: {
          normal: {
              formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
              backgroundColor: '#eee',
              borderColor: '#aaa',
              borderWidth: 1,
              borderRadius: 4,
              rich: {
                  a: {
                      color: '#999',
                      lineHeight: 22,
                      align: 'center'
                  },
                  abg: {
                      backgroundColor: '#333',
                      width: '100%',
                      align: 'right',
                      height: 22,
                      borderRadius: [4, 4, 0, 0]
                  },
                  hr: {
                      borderColor: '#aaa',
                      width: '100%',
                      borderWidth: 0.5,
                      height: 0
                  },
                  b: {
                      fontSize: 16,
                      lineHeight: 33
                  },
                  per: {
                      color: '#eee',
                      backgroundColor: '#334455',
                      padding: [2, 4],
                      borderRadius: 2
                  }
              }
          }
      },
      data:[
          {value:335, name:'A'},
          {value:310, name:'E'},
          {value:234, name:'F'},
          {value:135, name:'G'},
          {value:1048, name:'H'},
          {value:251, name:'I'},
          {value:147, name:'J'},
          {value:102, name:'K'}
      ]
  },
  defaultOptions : {
      title: CoreHelper.centerTitle,
      toolbox: CoreHelper.saveAsImageToolbox,
      tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b}: {c} ({d}%)"
      },
      series: []
  },
  theme: {
    textStyle: {
        fontFamily: 'Helvetica Neue‘, Arial, Verdana, sans-serif'
    }
  }
};

class DoublePieChart extends Component {
  render() {
    let options = {
      ...ChartSettings.defaultOptions,
      title: {
        show: true,
        left: 'center',
        bottom: 0,
        text: this.props.title,
        subtext: this.props.subtitle || '',
        sublink: this.props.sublink || ''
      },
      series: [
        {
          ...ChartSettings.pie,
          data: this.props.inner
        },
        {
          ...ChartSettings.doughtnut,
          data: this.props.outer
        }
      ]
    }
    return <CoreChart {...this.props} options={options}/>
  }
}

export default DoublePieChart;
