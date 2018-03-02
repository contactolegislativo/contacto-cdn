// Boottrap
import 'bootstrap/js/src/util';
import 'bootstrap/js/src/dropdown';
import 'bootstrap/js/src/collapse';
import 'bootstrap/js/src/tooltip';

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

    if(width > height) { /* Landscape */
      if(height < 500) /* min-height:*/
        height = 600;
      this.frame = { width: height, height: height };
    } else { /* Portrait */
      this.frame = { width: width, height: height * .8 };
      if(width < 500 ) { /* Mobile */
        this.frame.width -= 15;
      } else { /* Wide */
        this.frame.width *= .8;
      }
    }

    this.deputy = {
      id: parseInt(document.querySelector('meta[name="deputy-id"]').attributes.value.value),
      name: document.querySelector('meta[name="deputy-name"]').attributes.value.value,
      slug: document.querySelector('meta[name="deputy-slug"]').attributes.value.value,
      party: document.querySelector('meta[name="deputy-party"]').attributes.value.value,
      email: document.querySelector('meta[name="deputy-email"]').attributes.value.value,
      facebook: document.querySelector('meta[name="deputy-facebook"]').attributes.value.value,
      twitter: document.querySelector('meta[name="deputy-twitter"]').attributes.value.value
    }
  }

  render() {
    return (
      <Provider store={createStoreWithMiddleware(rootReducer)}>
        <AttendanceContainer
          deputy={this.deputy}
          frame={this.frame} />
      </Provider>
    );
  }
}

ReactDOM.render(<Register />, document.querySelector('.attendance'));

// Enable tooltip
$(function () { $('[data-toggle="tooltip"]').tooltip(); })
