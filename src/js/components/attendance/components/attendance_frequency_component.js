import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAttendanceFrequency } from '../actions';
import { DoublePieChart, BarChart, GaugeChart } from 'react-echart';

class AttendanceFrequencyGraph extends Component {
  componentDidMount() {
    // Read API
    this.props.fetchAttendanceFrequency();
  }

  renderPlaceholder() {
    return (
      <div>
        <h3 className="text-center"></h3>
        <h5 className="text-center mt-2"></h5>
        <div style={{"height": this.elementWidth + 'px'}}>
          <h4>Loading ...</h4>
        </div>
      </div>
    );
  }

  calculate() {
    let groups = [], group = { value: 0, items: [] }, groupSize = 50;
    this.inner = [{ value: 0, name: `< ${this.props.attendance}`}, { value: 0, name: `${this.props.attendance}`, selected: true }, { value: 0, name: `> ${this.props.attendance}`}];
    this.outer = [];

    function createSlice(group) {
      let label = group.items.length > 1 ?
        `${group.items[0].quantity} - ${group.items[group.items.length - 1].quantity}` :
        group.items[0].quantity;

      return {
        name: label,
        value: group.value
      }
    }

    this.props.attendanceFrequency.forEach(item => {

      if(item.quantity < this.props.attendance) {
        this.inner[0].value += item.frequency;
      } else if(item.quantity === this.props.attendance) {
        this.inner[1].value += item.frequency;
        item.selected = true;
      } else {
        this.inner[2].value += item.frequency;
      }

      if(item.frequency > groupSize || item.selected) {
        //Create slice for whatever is in group
        if(group.items.length > 0)
          this.outer.push(createSlice(group));
        // Create single slice for selected item
        this.outer.push({
          name: item.quantity,
          value: item.frequency
        });

        group = { value: 0, items: [] };
      } else if(group.value + item.frequency > groupSize ) {
        // Create slice
        this.outer.push(createSlice(group));

        // Reset with new incoming
        group = { value: item.frequency, items: [item] };
      } else {
        //Store
        group.items.push(item);
        group.value += item.frequency;
      }
    });

    //Create slice for whatever is in group
    if(group.items.length > 0)
      this.outer.push(createSlice(group));
  }

  prepareTitle() {
    this.title = '';
    if(this.inner[0].value > this.inner[2].value) {
      let percentage = this.inner[0].value / (this.inner[0].value + this.inner[1].value + this.inner[2].value);
      this.title = `${this.props.deputyName} \n tiene mejor asistencia que ${this.inner[0].value} diputados.`;
    } else {
      let percentage = this.inner[2].value / (this.inner[0].value + this.inner[1].value + this.inner[2].value);
      this.title = `${this.inner[2].value} diputados tienen mejor asistencia que \n ${this.props.deputyName}`;
    }
  }

  render() {
    // We need to have attedance and attendance frequency to display thisdeputyAttendance chart
    if( this.props.attendanceFrequency.length === 0 || this.props.attendanceDetails.length === 0 ) {
      return this.renderPlaceholder();
    }

    this.calculate();
    this.prepareTitle();

    return (
      <div className="chart">
        <h5 className="text-center mt-2">¿Como es su desempeño con respecto a otros diputados?</h5>
        <DoublePieChart
          width={this.props.width}
          inner={this.inner}
          outer={this.outer}
          title={this.title}
          subtitle={'Fuente Estadistica'}
          sublink={`/legislatura/LXIII/asistencias`}/>
      </div>
    );
  }
}

export default connect((state) => {
  return {
    attendance: state.attendance,
    attendanceDetails: state.attendanceDetails,
    attendanceFrequency: state.attendanceFrequency
  };
}, { fetchAttendanceFrequency })(AttendanceFrequencyGraph);
