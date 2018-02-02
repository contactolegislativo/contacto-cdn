import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise';

import { AttendanceSummaryContainer } from 'attendance';

import { AttendanceReducer, AttendanceListReducer, AttendanceDetailsReducer, AttendanceFrecuencyReducer,
  AttendanceByPartyReducer, AttendanceByDeputyTypeReducer, AttendanceAvgReducer } from 'attendance/reducers';
import {combineReducers} from 'redux';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  attendanceList: AttendanceListReducer,
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
    this.elementFullWidth = width - 20;
    this.elementFullHeight = height * .8;
    if(this.elementWidth > 550)
      this.elementWidth *= .8;
    else
      this.elementWidth -= 20;
  }

  render() {
    return (
      <Provider store={createStoreWithMiddleware(rootReducer)}>
        <AttendanceSummaryContainer width={this.elementFullWidth} height={this.elementFullHeight} />
      </Provider>
    );
  }
}

ReactDOM.render(<Register />, document.querySelector('.attendance'));
