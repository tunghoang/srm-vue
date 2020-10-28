import Vue from 'vue';
import template from './template.html';
import DropdownList from '../../components/dropdown-list';
import config from '../../config';
import request from '../../apis';
import {isEmailError,isEmpty} from '../../check-input'

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
      searchSemester:"",
      searchAdvisor:"",
      errorMessage: "",
    };
  },
  created: function() {
    // if (this.idStudent || this.idAdvisor) {
    //   this.loadData();
    // }
    this.loadData();
  },
  methods: {
    semesterLabel: function(prj){
      console.log(prj);
      return `HK${prj.semesterIndex + 1} ${prj.year}-${prj.year + 1}`;
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
      request(config.PROJECT_URL, 'PUT', criteria).then(res => {
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
    
    search: function(searchText,searchSemester,searchAdvisor,searchStatus){
      console.log(searchText,searchSemester,searchAdvisor);
      if (!isEmpty(searchText)) {
        let data = {["title"]: searchText};
        request(config.PROJECT_URL, 'PUT', data).then(res => {
          this.contents = res.data;
          return
        }).catch(e => {
          console.error(e);
          this.errorMessage = e.message;
        });
      }     
      if (!isEmpty(searchSemester)) {
        let data = {["year"]: searchSemester};
        console.log(data);
        request(config.PROJECT_URL, 'PUT', data).then(res => {
          console.log(res.data);
          this.contents = res.data;
          return
        }).catch(e => {
          console.error(e);
          this.errorMessage = e.message;
        });
      }     
      if (!isEmpty(searchStatus)) {
        if(searchStatus==1){
          let data = {["status"]: "on-going"};
          console.log(data);
          request(config.PROJECT_URL, 'PUT', data).then(res => {
            console.log(res.data);
            this.contents = res.data;
            return
          }).catch(e => {
            console.error(e);
            this.errorMessage = e.message;
          });
        }
      }     
    },
    selectChanged: function(selectedItem, selectedIdx) {
      console.log("selectInte" + selectedItem);
      this.searchStatus = selectedIdx
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
