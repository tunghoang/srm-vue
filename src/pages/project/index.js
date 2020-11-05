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
      searchIdProjecttype: null
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
      }).catch(e => {
        console.error(e);
      });
    },
    deleteProject: function(idProject) {
      console.log('delete');
      request(config.PROJECT_URL + idProject, 'delete').then(res => {
        console.log(res.data);
        this.tabIdx = 0;
      }).catch(e => {
        console.error(e);
      });
    },
    search: function(){
      let searchProject= {};
      if (this.searchTitle && this.searchTitle.length>0){
        searchProject.title = this.searchTitle;
      }
      if( this.searchIdProjecttype ){
        searchProject.idProjecttype = this.searchIdProjecttype;
      }
      if(this.searchIdSemester){
      searchProject.idSemester = this.searchIdSemester;
      }
      if(this.searchStatus){
        searchProject.status = this.searchStatus;
      }
      console.log("searchProject", this.searchProject);
      request(config.PROJECT_URL, "PUT", searchProject).then(res => {
        console.log(res.data);
        this.contents = res.data;
      }).catch(e=> console.error)
    },
    
    getName: function(item){
      return item.name;
    },
    getYear: function(item){
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
export default function(path, props) {
  return { path, component, props }
}
