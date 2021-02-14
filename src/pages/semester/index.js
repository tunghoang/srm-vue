import Vue from 'vue';
import template from './template.html';
import style from './style.scss';
import DropdownList from '../../components/dropdown-list';
import Pagination from '../../components/pagination';
import config from '../../config';
import request from '../../apis';
import {uploadRequest} from '../../apis';
import {isEmailError,isEmpty} from '../../check-input'

let component = {
  data: function () {
    return {
      files: null,
      contents: [],
      tabIdx: 0,
      semesterData: {},
      contentEdit: {},
      yearError: false,
      currentSemester: null,
      currentSemesterId: "",
      studentSemesterRels:[],
      searchText1: "",
      loading: false,
      searchAdvisors: null,
      searchFullname: null,
      searchStudentNumber: null,
      searchTitle: null,
      errorMessage: "",
      studentList:[{'fullname':'<No selected>'}],
      student:{},
      pendingAction: {
        fn: null,
        param: null
      }
    };
  },
  created: function () {
    this.loadData();
  },
  methods: {
    onChangeFile($event) {
      this.files = $event.target.files;
    },
    upload: function (event) {
      event.stopPropagation();
      event.preventDefault();
      this.loading = true;
      uploadRequest('/upload/studentSemesterXlsx', 'POST', {
        'xlsx_file': this.files[0]
      }).then(res => {
        console.log(res.data);
      }).catch(e => console.error(e)).finally(() => this.loading=false);
    },
    searchStudentSemesterRels: function($event){
      if ($event) {
        $event.stopPropagation();
        $event.preventDefault();
      }
      let data = {
        idSemester: this.currentSemester.idSemester
      };
      if (this.searchAdvisors && this.searchAdvisors.length) {
        data.advisors = this.searchAdvisors;
      }
      if (this.searchStudentNumber && this.searchStudentNumber.length) {
        data.studentNumber = this.searchStudentNumber;
      }
      if (this.searchFullname && this.searchFullname.length) {
        data.fullname = this.searchFullname;
      }
      if (this.searchTitle && this.searchTitle.length) {
        data.title = this.searchTitle;
      }
      console.log(data)
      request(config.STUDENT_SEMESTER_RELS_URL, "PUT", data).then(res => {
        console.log(res.data + "---------");
        this.studentSemesterRels = res.data;
      }).catch(e=>console.log(e))
    },
    deleteStudentSemesterRel: function(item){
      let idStudentSemesterRel = item.idStudentSemesterRel;
      console.log(item);
      request(config.STUDENT_SEMESTER_RELS_URL + idStudentSemesterRel, "DELETE").then(res => {
        this.searchStudentSemesterRels();
        this.tabIdx = 0;
      }).catch(e=>console.log(e))
    },
    
    loadData: function () {
      request(config.SEMESTERS_URL).then(res => {
        this.contents = res.data.sort((item1, item2) => (item2.idSemester - item1.idSemester));
      }).catch(e => {
        console.error(e);
        this.$router.push('/');
      });
    },
    createSemester: function (semesterData, event) {
      if (isNaN(semesterData.year)) {
        this.errorMessage = "invalid input";
        return
      }
      console.log('click');
      event.stopPropagation();
      event.preventDefault();
      request(config.SEMESTERS_URL, "post", semesterData).then((res) => {
        console.log(res.data);
        this.tabIdx = 0;
        this.loadData();
      }).catch(e => {
        console.error(e);
        this.$router.push('/');
      });
    },
    editSemester: function (contentEdit, event) {
      if (isNaN(semesterData.year)) {
        this.errorMessage = "Invalid input";
        event.stopPropagation();
        event.preventDefault();
        return
      }
      console.log("edit", event);
      event.stopPropagation();
      event.preventDefault();
      request(config.SEMESTERS_URL + contentEdit.idSemester, "PUT", contentEdit).then(res => {
        console.log(res.data);
        this.tabIdx = 0;
        this.loadData();
      }).catch(e => {
        console.error(e);
        this.$router.push('/');
      });
    },

    deleteSemester: function (idSemester) {
      console.log('delete');
      request(config.SEMESTERS_URL + idSemester, 'delete').then(res => {
        console.log(res.data);
        this.loadData();
        this.tabIdx = 0;
      }).catch(e => {
        console.error(e);
        this.$router.push('/');
      });
    },
    selectChanged: function (selectedItem, selectedIdx) {
      console.log("selectInte" + selectedItem);
      this.semesterData.semesterIndex = selectedIdx
    },
    //
    addStudent: function(){
      console.log("---Add Student ---", this.student);
      if (!this.student) return;
      request(config.STUDENT_SEMESTER_RELS_URL, 'POST', {
        idStudent: this.student.idStudent,
        idSemester: this.currentSemester.idSemester
      }).then(res => {
        console.log(res.data);
        this.tabIdx = 0;
      }).catch(e => {
        console.error(e);
        this.errorMessage = e.message;
      });
    },
    searchStudent: function(searchText1,event){
      event.stopPropagation();
      event.preventDefault();
      console.log(searchText1);
      if (isEmpty(searchText1) ) {
        this.errorMessage = "Search data empty";
        return;
      }
      this.errorMessage = "";
      let data = {['email']: searchText1};
      this.student = {};
      console.log(data);
      request(config.STUDENT_URL, 'PUT', data).then(res => {
        this.studentList = res.data;
        console.log("MemberList-----"+ this.studentList);
        if (this.studentList.length)
          this.student = this.studentList[0];
          console.log(this.student);
      }).catch(e => {
        console.error(e);
        this.errorMessage = e.message;
      });
    },
    selectStudent: function(selectedItem, selectedIndex) {
      this.student = selectedItem;
    },
    getFullname: function (instance) {
      return instance.fullname;
    },
    downloadExcel: function() {
      request(config.EXPORT_STUDENT_SEMESTER_URL + this.currentSemester.idSemester, "GET", null, null, 'blob').then(res => {
        const url = URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement('a');
        link.href = url;
        let filename = `HK${this.currentSemester.semesterIndex + 1}-${this.currentSemester.year}-${this.currentSemester.year + 1}.xlsx`;
        console.log(filename);
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
        link.remove();
      }).catch(e => {
        console.error(e);
        this.errorMessage = e.message;
      });
    }
  },

  template,
  components: {
    DropdownList,
    Pagination
  }
};
export default { path: "/semester", component: component }
