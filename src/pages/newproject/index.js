import Vue from 'vue';
import template from './template.html';
import DropdownList from '../../components/dropdown-list';
import config from '../../config';
import request from '../../apis';
import {isEmailError,isEmpty} from '../../check-input'
let component = {
  props:['idProject'],
  data: function () {
    return {
      newproject: null,
      advisorList:[{'fullname':'abc'}],
      searchText:"",
      // searchField: "fullname",
      errorMessage: "",
      dataProject:{
        title: "",
        description: ""
      },
      advisors: [{fullname: 'Hoang Xuan Tung'}],
      members: [{fullname: "Do Duong Duy"}, {fullname: "Diep Van Hieu"},{fullname: "Nguyen Van A"}]
    };
  },
  created: function () {
    this.dataProject.title = "";
    this.dataProject.description = "";
    this.getProject(this.idProject);
  },
  watch:{
    idProject: function(idPrj) {
      this.getProject(idPrj)
    }
  },
  methods: {
    getProject: function(idPrj){
      if (!idPrj) {
        this.dataProject.title = "";
        this.dataProject.description = "";
        return;
      }
      this.dataProject.idProject = idPrj;
      request(config.PROJECT_URL + this.idProject,'PUT',{
        idProject: this.idProject
      }).then(res=>{
        console.log(res.data);
        this.dataProject.title = res.data.title;
      }).catch(e=>console.error(e));
    },
    listMembers: function () {
      return new Promise((resolve, reject) => {
        request(config.STUDENT_URL).then(res => {
          resolve([{ fullname: "<Not selected>" }, ...res.data]);
        }).catch(e => {
          reject(e);
        });
      })
    },
    listAdvisors: function () {
      return new Promise((resolve, reject) => {
        request(config.ADVISOR_URL).then(res => {
          resolve([{ fullname: "<Not selected>" }, ...res.data]);
        }).catch(e => {
          reject(e);
        });
      })
    },
    goBack: function () {
      this.$router.back();
    },
    getFullname: function (instance) {
      return instance.fullname;
    }
  },
  template,
  components: {
    DropdownList
  }
};

// export default { path:"/newproject", component: component }
export default function (path, props) {
  return { path, component, props }
}
