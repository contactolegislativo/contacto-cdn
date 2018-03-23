import './utils'; // Bootstrap utils
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

$('.table').dataTable({
  "language": {
    "lengthMenu": "Mostrando _MENU_ diputados por pagina",
    "zeroRecords": "No se encontro",
    "info": "Mostrando _PAGE_ de _PAGES_",
    "infoEmpty": "Ningun diputado disponible",
    "infoFiltered": "(filtrado de un total de _MAX_ diputados)"
  }
});
