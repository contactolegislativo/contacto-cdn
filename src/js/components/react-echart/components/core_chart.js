import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import echarts from 'echarts/dist/echarts-en.min.js';

var CoreHelper = {
  centerTitle: {
    text: 'Default Title',
    subtext: 'Default sub text',
    sublink: '/#',
    show: true,
    left: 'center',
    bottom: 0
  },
  horizontalScrollLegend: {
    itemGap: 10,
    orient: 'horizontal',
    type: 'scroll'
  }
  saveImageToolbox: {
    show: true,
    feature: {
        saveAsImage: {show: true}
    }
  }
};

class CoreChart extends Component {
  createChart() {
    // Initialize after dom ready
    this.chart = echarts.init(ReactDOM.findDOMNode(this), this.props.theme || {});
    this.updateChart(this.props);
  }

  updateChart(nextProps) {
    // give up quickly if props are empty.
    if (!nextProps) {
      return null;
    }
    this.chart.setOption(nextProps.options);
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

export CoreHelper;
export default CoreChart;
