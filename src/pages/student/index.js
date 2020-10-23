import Vue from 'vue';
import template from './template.html';
import DropdownList from '../../components/dropdown-list';
import config from '../../config';
import request from '../../apis';
import {isEmailError,isEmpty} from '../../check-input'

let component = {
  data: function (){
    return {
      contents: [],
      tabIdx: 0,
      studentData: {},
      contentEdit: {},
      currentStudentId:null,
      emailError:false,
      searchText:"",
      searchField: "email",
      errorMessage: ""
    };
  },
  created: function() {
    this.loadData();
  },
  methods: {
    loadData: function() {
      request(config.STUDENT_URL, 'GET').then(res => {
        this.contents = res.data.sort((item1, item2) => (item2.idStudent - item1.idStudent));
      }).catch(e => {
        console.error(e);
        this.$router.push('/');
      });
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
        this.search(this.searchText, this.searchField);
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
        this.search(this.searchText, this.searchField);
        this.tabIdx = 0;
      }).catch(e => {
        console.error(e);
        this.$router.push('/');
      });
    },
    
    searchFieldChanged: function(selectedItem, selectedIdx) {
      this.searchField = selectedItem.toLowerCase();
    },
    search: function(searchText, searchField){
      console.log(searchText, searchField);
      if (isEmpty(searchText) || isEmpty(searchField)) {
        this.errorMessage = "Search data empty";
        return;
      }
      this.errorMessage = "";
      let data = {[searchField]: searchText};
      console.log(data);
      request(config.STUDENT_URL, 'PUT', data).then(res => {
        console.log(res.data);
        this.contents = res.data;
      }).catch(e => {
        console.error(e);
        this.errorMessage = e.message;
      });
    }
  },
  
  template,
  components: {
    DropdownList
  }
};
export default { path: "/student", component: component }
