import Vue from 'vue';
import template from './template.html';
import DropdownList from '../../components/dropdown-list';
import config from '../../config';
import request from '../../apis';
import {checkErrorEmail,isErrorSpace} from '../../check-input'

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
      searchField: "email",
      errorMessage: ""
    };
  },
  created: function() {
    //this.loadData();
  },
  methods: {
    loadData: function() {
      request(config.PROJECT_URL, 'GET').then(res => {
        this.contents = res.data.sort((item1, item2) => (item2.idProject - item1.idProject));
      }).catch(e => {
        console.error(e);
        this.$router.push('/');
      });
    },
    createProject: function(projectData) {
      console.log(projectData.email)
      if(checkErrorEmail(projectData.email)){
        this.emailError = true;
        return
      }
      request(config.PROJECT_URL, 'POST', projectData).then((res)=>{
        console.log(res.data);
        this.tabIdx = 0;
        this.search(this.searchText, this.searchField);
      }).catch(e => {
        console.error(e);
        this.$router.push('/');
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
        this.$router.push('/');
      });
    },
    
    searchFieldChanged: function(selectedItem, selectedIdx) {
      this.searchField = selectedItem.toLowerCase();
    },
    search: function(searchText, searchField){
      console.log(searchText, searchField);
      if (isErrorSpace(searchText) || isErrorSpace(searchField)) {
        this.errorMessage = "Search data empty";
        return;
      }
      this.errorMessage = "";
      let data = {[searchField]: searchText};
      console.log(data);
      request(config.PROJECT_URL, 'PUT', data).then(res => {
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
// export default { path: "/project", component: component }
export default function(path, props) {
  return { path, component, props }
}
