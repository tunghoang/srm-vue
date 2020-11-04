import Vue from 'vue';
import template from './template.html';
import DropdownList from '../../components/dropdown-list';
import config from '../../config';
import request from '../../apis';
import {isEmailError,isEmpty} from '../../check-input'
import advisor from '../advisor';

let component = {
  props: ['idStudent', 'idAdvisor', 'idSemester', 'idProjecttype', 'status'],
  data: function (){
    return {
      contents: [],
      tabIdx: 0,
      projectData: {},
      contentEdit: {},
      currentProjectId:null,
      emailError:false,
      errorMessage: "",
      projecttypes:[],
      semesters: [],
      advisors: [],
      projectStatuses:["","on-going",'finish'],
      searchText:"",
      searchTitle:"",
      searchStatus:"",
      searchIdSemester:null,
      searchIdAdvisor:null,
      searchIdProjecttype: null,
      searchProject:{
        title: null,
        idProjecttype: null,
        idSemester: null,
        status: null}
    };
  },
  created: function() {
    if(this.idStudent || this.idAdvisor){
      this.loadData();
    }
    else {
      this.loadDataStaff();
    }
    this.loadData();
  },
  methods: {
    semesterLabel: function(prj){
      console.log(prj);
      return `HK${prj.semesterIndex + 1} ${prj.year}-${prj.year + 1}`;
    },
    loadDataStaff: async function(){
      console.log();
      try {
        let response = await request(config.PROJECTTYPE_URL,"GET");
        this.projecttypes =response.data;
        this.projecttypes.unshift({name: "--projecttype--"});
        response = await request(config.SEMESTERS_URL,"GET");
        this.semesters = response.data;
        this.semesters.unshift({});
        response = await request(config.ADVISOR_URL,"GET");
        this.advisors = response.data;
        this.advisors.unshift({fullname: "--advisor--"});
      }
      catch(e) {
        console.error(e);
        this.errorMessage = e.response.data.message;
      }
    },
    loadData: function() {
      let criteria = {};
      if (this.idAdvisor) {
        criteria.idAdvisor = this.idAdvisor;
      }
      if (this.idStudent) {
        criteria.idStudent = this.idStudent;
      }
      if (this.idSemester) {
        criteria.idSemester = this.idSemester;
      }
      if (this.idProjecttype) {
        criteria.idProjecttype = this.idProjecttype;
      }
      if (this.status) {
        //criteria.status = this.status;
      }
      request(config.PROJECT_URL, 'put', criteria).then(res => {
        this.contents = res.data.sort((item1, item2) => (item2.idProject - item1.idProject));
      }).catch(e => {
        console.error(e);
        this.errorMessage = e.response.data.message;
      });
    },
    editProject:function(contentEdit){
      console.log('editProject');
      request(config.PROJECT_URL + contentEdit.idProject, 'PUT', contentEdit).then(res=>{
        console.log(res.data);
        this.tabIdx = 0;
        // this.search1(this.searchTitle, this.searchField);//to do
      }).catch(e => {
        console.error(e);
      });
    },
    deleteProject: function(idProject) {
      console.log('delete');
      request(config.PROJECT_URL + idProject, 'delete').then(res => {
        console.log(res.data);
        // this.search1(this.searchText, this.searchField);// to do
        this.tabIdx = 0;
      }).catch(e => {
        console.error(e);
      });
    },
    search: function(){
      this.searchProject.title = this.searchTitle;
      this.searchProject.idProjecttype = this.searchIdProjecttype;
      this.searchProject.idSemester = this.searchIdSemester;
      this.searchProject.status = this.searchStatus;
      console.log("searchProject", this.searchProject);
      request(config.PROJECT_URL, "PUT", this.searchProject).then(res => {
        console.log(res.data);
        this.contents = res.data;
      }).catch(e=> console.error)
    },
    search1: function(searchText,searchStatus){
      console.log(searchText);
      if (isEmpty(searchText) && isEmpty(searchStatus)) {
        this.errorMessage = "Search data empty";
        return;
      }
      this.errorMessage = "";
      if (!isEmpty(searchText)) {
        let data = {["title"]: searchText};
        request(config.PROJECT_URL, 'PUT', data).then(res => {
          this.contents = res.data;
        }).catch(e => {
          this.errorMessage = e.message;
        });
      } 
      if (!isEmpty(searchStatus)) {
        let data;
        searchStatus==1 ? data = {["status"]: "on-going"}:data = {["status"]: "finish"};
          request(config.PROJECT_URL, 'PUT', data).then(res => {
            this.contents = res.data;
          }).catch(e => {
            this.errorMessage = e.message;
          });
      }     
    },
    getName: function(item){
      return item.name;
    },
    getYear: function(item){
      // return `HK${item.semesterIndex + 1} ${item.year}-${item.year + 1}`;
      return item.year;
    },
    getFullname: function(item){
      return item.fullname;
    },
  },
  
  template,
  components: {
    DropdownList
  }
};
// export default { path: "/project", component: component }
export default function(path, props) {
  return { path, component, props }
}
