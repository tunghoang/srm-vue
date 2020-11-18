import Vue from 'vue';
import template from './template.html';
import style from './style.scss';
import DropdownList from '../../components/dropdown-list';
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
      searchText:"",
      errorMessage: "",
      memberList:[{'fullname':'<No selected>'}],
      student:{}
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
      let data = {[this.searchField]: this.searchText};
      console.log(data)
      request(config.STUDENT_SEMESTER_RELS_URL, "PUT", data).then(res => {
        console.log(res.data + "---------");
        this.studentSemesterRels = res.data;
      }).catch(e=>console.log(e))
    },
    deleteStudentSemesterRel: function(idStudentSemesterRel){
      request(config.STUDENT_SEMESTER_RELS_URL + idStudentSemesterRel, "DELETE").then(res => {
        this.searchStudentSemesterRels();
      }).catch(e=>console.log(e))
    },
    //
    
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
    searchFieldChanged: function(selectedItem,selectedIdx){
      console.log("searchFieldChanged");
      this.searchField = selectedItem.toLowerCase()
    },
    //
    addStudent: function(){
      console.log("---Add Student ---" );
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
        this.memberList = res.data;
        console.log("MemberList-----"+ this.memberList);
        if (this.memberList.length)
          this.student = this.memberList[0];
          console.log(this.student);
      }).catch(e => {
        console.error(e);
        this.errorMessage = e.message;
      });
    },
    selectMember: function(selectedItem, selectedIndex) {
      this.student = selectedItem;
    },
    getFullname: function (instance) {
      return instance.fullname;
    },
  },

  template,
  components: {
    DropdownList
  }
};
export default { path: "/semester", component: component }
