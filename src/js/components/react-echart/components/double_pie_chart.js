import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import CoreChart from './core_chart';
import CoreHelper from './core_helper';

let gradientPalette = ['#F81D46', '#F81E3B', '#F82031', '#F72126', '#F72922', '#F73523', '#F74224', '#F74F25', '#F65B27', '#F66728', '#F67329', '#F67F2A', '#F68B2B', '#F5962D', '#F5A22E', '#F5AD2F', '#F5B830', '#F5C331', '#F4CE32', '#F4D934', '#F4E335', '#F4EE36', '#F0F437', '#E5F438', '#DBF339', '#D1F33B', '#C7F33C', '#BDF33D', '#B3F33E', '#A9F23F', '#A0F240', '#97F241', '#8DF243', '#84F244', '#7CF145', '#73F146', '#6AF147', '#62F148', '#5AF149', '#52F04A'];

var makeGradient = function(number) {
  let iterator = Math.floor(gradientPalette.length / (number + 1));
  let r =  gradientPalette.filter((item, index) => {
    return index % iterator === 0;
  });
  return r.reverse();
}

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
              formatter: '{a|{b}}{abg|}\n{hr|}\n  {c} - {per|{d}%}  ',
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
      color: gradientPalette.reverse(),
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
    options: {
      title: CoreHelper.centerTitle,
      toolbox: CoreHelper.saveImageToolbox,
      tooltip: {
          trigger: 'item',
          formatter: "{b} <br/>{c} - ({d}%)"
      },
      series: []
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
        series: [{
          center: ['50%', '45%'],
          radius: ['50%', '80%'],
          label: {
            normal: {
              position: 'inner',
              formatter: '{b} \n ({d}%)',
              backgroundColor: 'transparent',
              borderColor: 'transparent',
              borderWidth: 0,
              borderRadius: 0,
              rich: {}
            }
          },
          labelLine: {
            normal: {
              show: false
            },
            emphasis: {
              show: true
            }
          }
        }, {
            center: ['50%', '45%'],
            radius: [0, '40%']
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

class DoublePieChart extends Component {
  render() {

    if(this.props.inner[0].value === 0) delete this.props.inner[0];
    if(this.props.inner[2].value === 0) delete this.props.inner[2];

    let options = {
      baseOption: {
        ...ChartSettings.defaultOptions.options,
        title: {
          ...CoreHelper.centerTitle,
          text: this.props.title,
          subtext: this.props.subtitle || '',
          sublink: this.props.sublink || ''
        },
        series: [{
          ...ChartSettings.doughtnut,
          color: makeGradient(this.props.outer.length),
          data: this.props.outer
        }, {
          ...ChartSettings.pie,
          color: makeGradient(this.props.inner.length),
          data: this.props.inner
        }]
      },
      media: ChartSettings.defaultOptions.media
    };

    return <CoreChart {...this.props} options={options}/>
  }
}

export default DoublePieChart;
