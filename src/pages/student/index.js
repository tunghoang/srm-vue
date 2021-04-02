import Vue from 'vue';
import template from './template.html';
import DropdownList from '../../components/dropdown-list';
import Pagination from '../../components/pagination';
import config from '../../config';
import request from '../../apis';
import {isEmailError,isEmpty} from '../../check-input'

let component = {
  data: function (){
    return {
      contents: [],
      klasses: [],
      classFilterTxt: "",
      tabIdx: 0,
      studentData: {},
      contentEdit: {},
      currentStudentId:null,
      emailError:false,
      searchText:"",
      searchField: "email",
      errorMessage: "",
      orderField: "studentNumber",
      descending: false
    };
  },
  created: function() {
    this.loadData();
  },
  methods: {
    sorter: function(item1, item2) {
      switch(this.orderField) {
        case 'studentNumber':
          if (!this.descending) 
            return item2.idStudent - item1.idStudent;
          return item1.idStudent - item2.idStudent;
        default:
          if (this.descending)
            return item2[this.orderField].localeCompare(item1[this.orderField])
          return item1[this.orderField].localeCompare(item2[this.orderField])
      }
    },
    loadData: async function() {
      try {
        this.klasses = (await request(config.KLASS_URL, 'GET')).data;
        /*let res = await request(config.STUDENT_URL, 'GET');
        this.contents = res.data.sort(this.sorter);*/
      }
      catch(e) {
        console.error(e);
        this.$router.push('/');
      }
    },
    createStudent: function(studentData) {
      console.log(studentData.email)
      if(isEmailError(studentData.email)){
        this.emailError = true;
        return
      }
      request(config.STUDENT_URL, 'POST', studentData).then((res)=>{
        console.log(res.data);
        this.tabIdx = 0;
        this.search(null, this.searchText, this.searchField);
      }).catch(e => {
        console.error(e);
        this.$router.push('/');
      });
    },
    editStudent: function(contentEdit,event){
      console.log("edit" , event);
      event.stopPropagation();
      event.preventDefault();
      request(config.STUDENT_URL + contentEdit.idStudent, "PUT", contentEdit).then(res=>{
        console.log(res.data);
        this.tabIdx = 0;
        this.loadData();
      }).catch(e => {
        console.error(e);
        this.$router.push('/');
      })
    },
    deleteStudent: function(idStudent) {
      console.log('delete');
      request(config.STUDENT_URL + idStudent, 'delete').then(res => {
        console.log(res.data);
        this.search(null, this.searchText, this.searchField);
        this.tabIdx = 0;
      }).catch(e => {
        console.error(e);
        this.$router.push('/');
      });
    },
    
    searchFieldChanged: function(selectedItem, selectedIdx) {
      this.searchField = selectedItem.toLowerCase();
    },
    search: function($event, searchText, searchField){
      $event && $event.preventDefault();
      console.log(searchText, searchField);
      this.errorMessage = "";
      let data = {[searchField]: searchText};
      console.log(data);
      request(config.STUDENT_URL, 'PUT', data).then(res => {
        console.log(res.data);
        this.contents = res.data.sort(this.sorter);
      }).catch(e => {
        console.error(e);
        this.errorMessage = e.message;
      });
    },
    headerClicked: function(field) {
      console.log(field);
      this.orderField = field.value || field;
      this.descending = !this.descending;
      this.contents = this.contents.sort(this.sorter);
    }
  },
  computed: {
    cClassIdx: function() {
      if (!this.contentEdit) return -1;
      return this.cClasses.findIndex((item) => item.idKlass === this.contentEdit.idKlass);
    },
    cClasses: function() {
      if (!this.classFilterTxt || !this.classFilterTxt.length) return this.klasses;
      return this.klasses.filter(item => item.className.includes(this.classFilterTxt));
    }
  },
  template,
  components: {
    DropdownList, Pagination
  }
};
export default { path: "/student", component: component }
