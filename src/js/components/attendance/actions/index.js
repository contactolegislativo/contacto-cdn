import axios from 'axios';

export const FETCH_ATTENDANCE = 'fetch_attendance';
export const FETCH_ATTENDANCE_LIST = 'fetch_attendance_list';
export const FETCH_ATTENDANCE_FREQUENCY = 'fetch_attendance_frequency';
export const FETCH_ATTENDANCE_BY_PARTY = 'fetch_attendance_by_party';
export const FETCH_ATTENDANCE_BY_DEPUTY_TYPE = 'fetch_attendance_by_deputy_type';
export const FETCH_ATTENDANCE_AVG = 'fetch_attendance_avg';

export function fetchAttendanceList() {
  const request = axios.get(`/api/legislature/LXIII/attendance`);
  return {
    type: FETCH_ATTENDANCE_LIST,
    payload: request
  }
}

export function fetchAttendance(deputyId) {
  const request = axios.get(`/api/legislature/LXIII/deputy/${deputyId}/attendance`);
  return {
    type: FETCH_ATTENDANCE,
    payload: request
  }
}

export function fetchAttendanceFrequency() {
  const request = axios.get('/api/legislature/LXIII/attendance/frequency');
  return {
    type: FETCH_ATTENDANCE_FREQUENCY,
    payload: request
  }
}

export function fetchAttendanceByParty() {
  const request = axios.get('/api/legislature/LXIII/attendance/by_party');
  return {
    type: FETCH_ATTENDANCE_BY_PARTY,
    payload: request
  }
}

export function fetchAttendanceByDeputyType() {
  const request = axios.get('/api/legislature/LXIII/attendance/by_deputy_type');
  return {
    type: FETCH_ATTENDANCE_BY_DEPUTY_TYPE,
    payload: request
  }
}

export function fetchAttendanceAvg() {
  const request = axios.get('/api/legislature/LXIII/attendance/avg');
  return {
    type: FETCH_ATTENDANCE_AVG,
    payload: request
  }
}
