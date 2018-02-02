import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise';

import { AttendanceContainer } from 'attendance';

import { AttendanceReducer, AttendanceDetailsReducer, AttendanceFrecuencyReducer,
  AttendanceByPartyReducer, AttendanceByDeputyTypeReducer, AttendanceAvgReducer } from 'attendance/reducers';
import {combineReducers} from 'redux';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  attendance: AttendanceReducer,
  attendanceDetails: AttendanceDetailsReducer,
  attendanceFrequency: AttendanceFrecuencyReducer,
  attendanceByParty: AttendanceByPartyReducer,
  attendanceByDeputyType: AttendanceByDeputyTypeReducer,
  attendanceAvg: AttendanceAvgReducer,
});

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

class Register extends Component {
  componentWillMount() {
    let width = document.querySelector('.attendance').offsetWidth;
    let height = document.querySelector('body').offsetHeight;
    this.elementWidth = width < height ? width : height;
    if(this.elementWidth > 550)
      this.elementWidth *= .8;
    else
      this.elementWidth -= 20;
    this.deputyId = parseInt(document.querySelector('meta[name="deputy-id"]').attributes.value.value);
    this.deputyName = document.querySelector('meta[name="deputy-name"]').attributes.value.value;
    this.deputyParty = document.querySelector('meta[name="deputy-party"]').attributes.value.value;
  }

  render() {
    return (
      <Provider store={createStoreWithMiddleware(rootReducer)}>
        <AttendanceContainer deputyId={this.deputyId} deputyName={this.deputyName} deputyParty={this.deputyParty} width={this.elementWidth} />
      </Provider>
    );
  }
}

ReactDOM.render(<Register />, document.querySelector('.attendance'));
