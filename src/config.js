const baseUrl = "";
export default {
  baseUrl,
  SEMESTERS_URL: baseUrl + '/semesters/',
  QUOTAS_URL: baseUrl + '/quotas/',
  PROJECTTYPE_URL: baseUrl + '/projecttypes/',
  STAFF_URL: baseUrl + '/staffs/',
  ADVISOR_URL: baseUrl + '/advisors/',
  STUDENT_URL: baseUrl + '/students/',
  PROJECT_URL : baseUrl + '/projects/',
  PROJECT_ADVISOR_RELS_URL : baseUrl + '/projectAdvisorRels/',
  PROJECT_STUDENT_RELS_URL : baseUrl + '/projectStudentRels/',
  GUESTADVISOR_URL : baseUrl + '/guestadvisors/',
  STUDENT_SEMESTER_RELS_URL : baseUrl + '/studentSemesterRels/',
  LOGIN_URLS : {
    student: baseUrl + '/studentlogin/',
    advisor: baseUrl + '/advisorlogin/',
    staff: baseUrl + '/stafflogin/',
    guest: baseUrl + '/guestlogin/'
  },
  LOGOUT_URL: baseUrl + '/logout/'
}
