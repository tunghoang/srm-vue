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
      advisorList: [{ 'fullname': 'abc' }],
      errorMessage: "",
      dataProject: {
        title: "",
        description: ""
      },
      advisors: null,
      members: null,
      errorMessage: "",
      Projecttype:{},
      Semester:{},
    };
  },
  created: async function () {
    if (!this.idProject) return;
    try {
      let res = await this.getProject(this.idProject);
      this.dataProject.title = res.data.title;
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
    labelSemester: function(semesterItem){
      return "Học kỳ: " + (semesterItem.semesterIndex +1) + " Năm: " + semesterItem.year;
    },
    listSemester: function() {
      return new Promise((resolve, reject) => {
        request(config.SEMESTERS_URL).then(res => {
          resolve([...res.data]);
        }).catch(e => {
          reject(e);
        });
      })
    },
    labelProjecttype: function(projecttype){
      return projecttype.name;
    },
    listProjecttype: function () {
      return new Promise((resolve, reject) => {
        request(config.PROJECTTYPE_URL).then(res => {
          resolve([...res.data]);
        }).catch(e => {
          reject(e);
        });
      })
    },
    selectedProjecttype:function(selectedProjecttype, selectedIndex){
      console.log("selectProjecttype", selectedProjecttype, selectedIndex);
      this.Projecttype = selectedProjecttype;
    },
    selectedSemester:function(selectedSemester, selectedIndex){
      console.log("selectSemester", selectedSemester, selectedIndex);
      this.Semester = selectedSemester;
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
    createProject: function (project) {
      console.log(project);
      request(config.PROJECT_URL, "POST", project).then(res => {
        console.log(res.data);
        this.$router.replace('/newproject/idProject/' + res.data.idProject);
      }).catch(e => console.error(e));
    },
    deleteAdvisorRel: function (idProjectAdvisorRel) {
      console.log('delete');
      request(config.PROJECT_ADVISOR_RELS_URL + idProjectAdvisorRel, 'delete').then(res => {
        console.log(res.data);
        this.loadDataAdvisor();
      }).catch(e => {
        console.error(e);
        this.errorMessage = "deleteAdvisorRel:" + e.message; 
      });
    },
    deleteStudentRel: function (idProjectStudentRel) {
      console.log('delete');
      request(config.PROJECT_STUDENT_RELS_URL + idProjectStudentRel, 'delete').then(res => {
        console.log(res.data);
        this.loadDataStudent();
      }).catch(e => {
        console.error(e);
        this.errorMessage ="deleteStudentRel: " +  e.message;
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
