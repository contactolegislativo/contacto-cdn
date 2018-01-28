import { FETCH_ATTENDANCE, FETCH_ATTENDANCE_FREQUENCY, FETCH_ATTENDANCE_BY_PARTY,
  FETCH_ATTENDANCE_BY_DEPUTY_TYPE, FETCH_ATTENDANCE_AVG } from '../actions';

export function AttendanceReducer(state = [], action) {
  switch (action.type) {
    case FETCH_ATTENDANCE:
        return action.payload.data.total;
    default:
      return state;
  }
}

export function AttendanceDetailsReducer(state = [], action) {
  switch (action.type) {
    case FETCH_ATTENDANCE:
        return action.payload.data.details;
    default:
      return state;
  }
}

export function AttendanceFrecuencyReducer(state = [], action) {
  switch (action.type) {
    case FETCH_ATTENDANCE_FREQUENCY:
        return action.payload.data;
    default:
      return state;
  }
}

export function AttendanceByPartyReducer(state = [], action) {
  switch (action.type) {
    case FETCH_ATTENDANCE_BY_PARTY:
        return action.payload.data;
    default:
      return state;
  }
}

export function AttendanceByDeputyTypeReducer(state = [], action) {
  switch (action.type) {
    case FETCH_ATTENDANCE_BY_DEPUTY_TYPE:
        return action.payload.data;
    default:
      return state;
  }
}

export function AttendanceAvgReducer(state = [], action) {
  switch (action.type) {
    case FETCH_ATTENDANCE_AVG:
        return action.payload.data;
    default:
      return state;
  }
}
