import Vue from 'vue';
import template from './template.html';
import DropdownList from '../../../components/dropdown-list';
import request from '../../../apis';
import config from '../../../config';
import {isEmailError,isEmpty} from '../../../check-input'
let component = {
  props:[],
  data: function () {
    return {
      searchText:"",
      errorMessage: "",
      memberList:[{'fullname':'<No selected>'}],
      student:{}
      ,
    };
  },
  created: function () {
  },
  watch:{
  },
  methods: {
    addStudent: function(){
      console.log('addStudent', this.student, this.idProject);
      request(config.PROJECT_STUDENT_RELS_URL, 'POST', {
        idStudent: this.student.idStudent,
        idProject: this.idProject
      }).then(res => {
        console.log(res.data);
      }).catch(e=> console.error(e));
    },
    searchStudent: function(searchText){
      console.log(searchText);
      if (isEmpty(searchText) ) {
        this.errorMessage = "Search data empty";
        return;
      }
      this.errorMessage = "";
      let data = {['fullname']: searchText};
      console.log(data);
      request(config.STUDENT_URL, 'PUT', data).then(res => {
        this.memberList = res.data;
      }).catch(e => {
        console.error(e);
        this.errorMessage = e.message;
      });
    },
    getFullname: function (instance) {
      return instance.fullname;
    },
    goBack: function () {
      this.$router.back();
    },
  },
  template,
  components: {
    DropdownList
  }
};

// export default { path:"/addAdvisor", component: component }
export default function (path, props) {
  return { path, component, props }
}
