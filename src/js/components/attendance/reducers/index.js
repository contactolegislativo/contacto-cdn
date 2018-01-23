import { FETCH_ATTENDANCE, FETCH_ATTENDANCE_FREQUENCY } from '../actions';

export function AttendanceReducer(state = [], action) {
  switch (action.type) {
    case FETCH_ATTENDANCE:
        return action.payload.data;
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
