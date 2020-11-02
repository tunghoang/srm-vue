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
      searchText:"",
      searchStatus:"",
      errorMessage: "",
      projecttypes:[],
      semesters: [],
      advisors: [],
      projects:['--status--',"on-going",'finish']

    };
  },
  created: function() {
    if(this.idStudent || this.idAdvisor){
      this.loadData();
    }
    else {
      this.loadDataStaff();
    }
    console.log("projecttype" + this.projecttypes);
  },
  methods: {
    semesterLabel: function(prj){
      console.log(prj);
      return `HK${prj.semesterIndex + 1} ${prj.year}-${prj.year + 1}`;
    },
    advisorLabel: function(prj){
      console.log("advisorLabel" + prj);
      return prj.idAdvisor;
    },
    loadDataStaff: async function(){
      console.log();
      try {
        let response = await request(config.PROJECTTYPE_URL,"GET");
        this.projecttypes = response.data;
        response = await request(config.SEMESTERS_URL,"GET");
        this.semesters = response.data;
        response = await request(config.ADVISOR_URL,"GET");
        this.advisors = response.data;
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
        this.search(this.searchText, this.searchField);
      }).catch(e => {
        console.error(e);
        this.$router.push('/');
      });
    },
    deleteProject: function(idProject) {
      console.log('delete');
      request(config.PROJECT_URL + idProject, 'delete').then(res => {
        console.log(res.data);
        this.search(this.searchText, this.searchField);
        this.tabIdx = 0;
      }).catch(e => {
        console.error(e);
        // this.$router.push('/');
      });
    },
    
    search: function(searchText,searchStatus){
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
          return
        }).catch(e => {
          this.errorMessage = e.message;
        });
      } 
      if (!isEmpty(searchStatus)) {
        let data;
        searchStatus==1 ? data = {["status"]: "on-going"}:data = {["status"]: "finish"};
          request(config.PROJECT_URL, 'PUT', data).then(res => {
            this.contents = res.data;
            return
          }).catch(e => {
            this.errorMessage = e.message;
          });
      }     
    },
    getName: function(item){
      return item.name;
    },
    getYear: function(item){
      return `HK${item.semesterIndex + 1} ${item.year}-${item.year + 1}`;
    },
    getFullname: function(item){
      return item.fullname;
    },
    selectFullname: function(selectedItem,selectedIdx){
      this.advisors = selectedItem;
    }
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
