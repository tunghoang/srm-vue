//const baseUrl = 'http://10.10.1.159';
//const baseUrl = 'http://112.137.129.214:15980';
const baseUrl = "";
import axios from 'axios';
//const baseUrl = 'http://localhost:3000';
export default {
  baseUrl,
  SEMESTERS_URL: baseUrl + '/semesters/',
  QUOTAS_URL: baseUrl + '/quotas/',
  PROJECTTYPE_URL: baseUrl + '/projecttypes/',
  STAFF_URL: baseUrl + '/staffs/',
  LOGIN_URLS : {
    student: baseUrl + '/studentlogin/',
    advisor: baseUrl + '/advisorlogin/',
    staff: baseUrl + '/stafflogin/'
  },
  LOGOUT_URL: baseUrl + '/logout/'
}
