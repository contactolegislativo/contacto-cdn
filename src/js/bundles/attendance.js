import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise';

import { AttendanceContainer } from 'attendance';

import { AttendanceReducer, AttendanceFrecuencyReducer } from 'attendance/reducers';
import {combineReducers} from 'redux';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  attendance: AttendanceReducer,
  attendanceFrequency: AttendanceFrecuencyReducer
});

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

class Register extends Component {
  componentWillMount() {
    this.elementWidth = document.querySelector('.attendance').offsetWidth;
    this.deputyId = parseInt(document.querySelector('meta[name="deputy-id"]').attributes.value.value);
    this.deputyName = document.querySelector('meta[name="deputy-name"]').attributes.value.value;
  }

  render() {
    return (
      <Provider store={createStoreWithMiddleware(rootReducer)}>
        <AttendanceContainer deputyId={this.deputyId} deputyName={this.deputyName} width={this.elementWidth} />
      </Provider>
    );
  }
}

ReactDOM.render(<Register />, document.querySelector('.attendance'));
