import axios from 'axios';

export const FETCH_ATTENDANCE = 'fetch_attendance';
export const FETCH_ATTENDANCE_FREQUENCY = 'fetch_attendance_frequency';

export function fetchAttendance(deputyId) {
  const request = axios.get(`/api/attendance/${deputyId}`);
  return {
    type: FETCH_ATTENDANCE,
    payload: request
  }
}

export function fetchAttendanceFrequency() {
  const request = axios.get(`/api/attendance`);
  return {
    type: FETCH_ATTENDANCE_FREQUENCY,
    payload: request
  }
}
