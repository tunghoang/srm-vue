const baseUrl = "";
export default {
  baseUrl,
  SEMESTERS_URL: baseUrl + '/semesters/',
  QUOTAS_URL: baseUrl + '/quotas/',
  PROJECTTYPE_URL: baseUrl + '/projecttypes/',
  STAFF_URL: baseUrl + '/staffs/',
  ADVISOR_URL: baseUrl + '/advisors/',
  STUDENT_URL: baseUrl + '/students/',
  LOGIN_URLS : {
    student: baseUrl + '/studentlogin/',
    advisor: baseUrl + '/advisorlogin/',
    staff: baseUrl + '/stafflogin/'
  },
  LOGOUT_URL: baseUrl + '/logout/'
}
