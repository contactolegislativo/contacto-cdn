// Boottrap
import 'bootstrap/js/src/util';
import 'bootstrap/js/src/dropdown';
import 'bootstrap/js/src/collapse';
// DataTables
import 'datatables/media/js/jquery.dataTables'

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise';

import { AttendanceSummaryContainer } from 'attendance';

import { AttendanceReducer, AttendanceListReducer, AttendanceDetailsReducer, AttendanceFrecuencyReducer,
  AttendanceByPartyReducer, AttendanceByStateReducer, AttendanceByDeputyTypeReducer, AttendanceAvgReducer } from 'attendance/reducers';
import {combineReducers} from 'redux';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  attendanceList: AttendanceListReducer,
  attendance: AttendanceReducer,
  attendanceDetails: AttendanceDetailsReducer,
  attendanceFrequency: AttendanceFrecuencyReducer,
  attendanceByParty: AttendanceByPartyReducer,
  attendanceByState: AttendanceByStateReducer,
  attendanceByDeputyType: AttendanceByDeputyTypeReducer,
  attendanceAvg: AttendanceAvgReducer,
});

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

class Register extends Component {
  componentWillMount() {
    let width = document.querySelector('.attendance').offsetWidth;
    let height = document.querySelector('body').offsetHeight;

    if(width > height) { /* Landscape */
      if(height < 500) /* min-height:*/
        height = 600;
      this.frame = { width: width - 26, height };
    } else { /* Portrait */
      this.frame = { width: width, height: height * .8 };
      if(width < 500 ) { /* Mobile */
        this.frame.width -= 25;
      } else { /* Wide */
        this.frame.width *= .8;
      }
    }

  }

  render() {
    return (
      <Provider store={createStoreWithMiddleware(rootReducer)}>
        <AttendanceSummaryContainer frame={this.frame} />
      </Provider>
    );
  }
}

ReactDOM.render(<Register />, document.querySelector('.attendance'));
