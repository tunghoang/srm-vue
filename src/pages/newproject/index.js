import Vue from 'vue';
import template from './template.html';
import DropdownList from '../../components/dropdown-list';
import config from '../../config';
import request from '../../apis';
import { isEmailError, isEmpty } from '../../check-input'
let component = {
  props: ['idProject'],
  data: function () {
    return {
      newproject: null,
      // advisorList: [{ 'fullname': 'abc' }],
      errorMessage: "",
      dataProject: {
        title: "",
        description: "",
        idSemester: null,
        idProjecttype: null
      },
      semesterSelectedIdx: 0,
      projecttypeSelectedIdx: 0,
      advisors: null,
      members: null,
      errorMessage: "",
      projecttypes: [],
      semesters: []
    };
  },
  created: async function () {
    try {
      let res = await this.listSemester();
      this.semesters = res.data;
      if (this.semesters.length > 0) {
        this.dataProject.idSemester = this.semesters[0].idSemester;
        this.semesterSelectedIdx = 0;
      }
      else {
        this.dataProject.idSemester = null;
      }
      res = await this.listProjecttype();
      this.projecttypes = res.data;
      if (this.projecttypes.length > 0) {
        this.dataProject.idProjecttype = this.projecttypes[0].idProjecttype;
        this.projecttypeSelectedIdx = 0;
      }
      else {
        this.dataProject.idSemester = null;
      }

      if (!this.idProject) return;
      res = await this.getProject(this.idProject);
      this.dataProject = res.data;
      this.semesterSelectedIdx = this.semesters.findIndex(item => item.idSemester == this.dataProject.idSemester);
      this.projecttypeSelectedIdx = this.projecttypes.findIndex(item => item.idProjecttype == this.dataProject.idProjecttype);

      res = await this.loadDataAdvisor();
      this.advisors = res.data;
      res = await this.loadDataStudent();
      this.members = res.data;
    }
    catch (e) {
      console.error(e);
      this.errorMessage = e.message;
    }
  },
  watch: {
    idProject: function (idPrj) {
      this.getProject(idPrj).then(res => {
        console.log(res.data);
        this.dataProject.title = res.data.title;
      }).catch(e => console.error(e));
    }
  },
  methods: {
    deleteProject:function(idProject){
      console.log("deletePrject" , idProject);
      if (!idProject) return;
      request(config.PROJECT_URL + idProject,"delete").then(res=>{
        this.errorMessage= "";
        this.$router.back();
        console.log(res.data);
      }).catch(e=>{
        console.error(e);
        this.errorMessage = "Delete error: " + e.response.data.message;
      });
    },
    labelSemester: function(semesterItem){
      return "HK" + (semesterItem.semesterIndex +1) +" "+ semesterItem.year +"-"+ (semesterItem.year +1);
    },
    listSemester: function() {
      return request(config.SEMESTERS_URL);
    },
    labelProjecttype: function(projecttype){
      return projecttype.name;
    },
    listProjecttype: function () {
      return request(config.PROJECTTYPE_URL);
    },
    selectedProjecttype:function(selectedProjecttype, selectedIndex){
      console.log("selectProjecttype", selectedProjecttype, selectedIndex);
      this.dataProject.idProjecttype = selectedProjecttype.idProjecttype;
    },
    selectedSemester:function(selectedSemester, selectedIndex){
      this.dataProject.idSemester = selectedSemester.idSemester;
    },
    //
    loadDataAdvisor: function () {
      console.log("loadDataAdvisor", this.idProject);
      return request(config.PROJECT_ADVISOR_RELS_URL, "PUT", {
        idProject:this.idProject
      });
    },
    loadDataStudent: function () {
      console.log("loadDataStudent", this.idProject);
      return request(config.PROJECT_STUDENT_RELS_URL,"PUT",{
        idProject: this.idProject
      });
    },
    saveProject: function (project) {
      console.log(project);
      project.status = project.status||'on-going';
      let method = "POST";
      let url = config.PROJECT_URL;
      if (project.idProject) {
        method = 'PUT';
        url = config.PROJECT_URL + project.idProject;
      }
      if(project.title){
        request(url, method, project).then(res => {
          console.log(res.data);
          this.errorMessage = "";
          this.$router.back();
          let idProject = null;
          if (method === 'POST') {
            idProject = res.data.idProject;
            this.$router.replace('/newproject/idProject/' + idProject);
          }
        }).catch(e => console.error(e));
      }else{
        this.errorMessage = "Empty title";
      }
    },
    deleteAdvisorRel: function (idProjectAdvisorRel) {
      console.log('delete');
      request(config.PROJECT_ADVISOR_RELS_URL + idProjectAdvisorRel, 'DELETE').then(res => {
        console.log(res.data);
        this.errorMessage = "";
        return this.loadDataAdvisor();
      }).then(res => {
        this.advisors = res.data;
      }).catch(e => {
        console.error(e);
        this.errorMessage = e.response.data.message;
      });
    },
    deleteStudentRel: function (idProjectStudentRel) {
      request(config.PROJECT_STUDENT_RELS_URL + idProjectStudentRel, 'delete').then(res => {
        console.log(res.data);
        return this.loadDataStudent();
      }).then(res => {
        this.members = res.data;
      }).catch(e => {
        console.error(e);
        this.errorMessage = "deleteStudentRel: " +  e.response.data.message;
      });
    },
    getProject: function (idPrj) {
      if (!idPrj) {
        this.dataProject.title = "";
        this.dataProject.description = "";
        return;
      }
      this.dataProject.idProject = idPrj;
      return request(config.PROJECT_URL + this.idProject, 'PUT', {
        idProject: this.idProject
      });
    },
    listMembers: function () {
      return new Promise((resolve, reject) => {
        request(config.STUDENT_URL).then(res => {
          this.errorMessage = "";
          resolve([{ fullname: "<Not selected>" }, ...res.data]);
        }).catch(e => {
          reject(e);
        });
      })
    },
    listAdvisors: function () {
      return new Promise((resolve, reject) => {
        request(config.ADVISOR_URL).then(res => {
          this.errorMessage = "";
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
    },
    deleteMember: function () {
      console.log("del");
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
