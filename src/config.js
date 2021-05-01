const baseUrl = "/srm8000";
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
  KLASS_URL: baseUrl + '/klass/',
  LOGIN_URLS : {
    student: baseUrl + '/studentlogin/',
    advisor: baseUrl + '/advisorlogin/',
    staff: baseUrl + '/stafflogin/',
    guest: baseUrl + '/guestlogin/'
  },
  LOGOUT_URL: baseUrl + '/logout/',
  EXPORT_ADVISORS_URL: baseUrl + '/exportAdvisors/',
  EXPORT_STUDENT_SEMESTER_URL: baseUrl + '/exportStudentSemester/',
  CONFIGS_URL: baseUrl + '/configs/',
  CHECKPOINT_URL: baseUrl + '/checkpoint/'
}
