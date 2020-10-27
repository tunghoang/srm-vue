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
    };
  },
  created: function () {
    this.dataProject.title = "";
    this.dataProject.description = "";
    this.getProject(this.idProject);
    this.loadDataAdvisor();
    this.loadDataStudent();
  },
  watch: {
    idProject: function (idPrj) {
      this.getProject(idPrj)
    }
  },
  methods: {
    loadDataAdvisor: function () {
      request(config.PROJECT_ADVISOR_RELS_URL).then(res => {
        this.advisors = res.data;
      }).catch(e => {
        console.error(e);
        this.$router.push('/');
      });
    },
    loadDataStudent: function () {
      request(config.PROJECT_STUDENT_RELS_URL).then(res => {
        this.members = res.data;
      }).catch(e => {
        console.error(e);
        this.$router.push('/');
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
        this.errorMessage = 'cant delete AdvisorRel';
        // this.$router.push('/');
      });
    },
    deleteStudentRel: function (idProjectStudentRel) {
      console.log('delete');
      request(config.PROJECT_STUDENT_RELS_URL + idProjectStudentRel, 'delete').then(res => {
        console.log(res.data);
        this.loadDataStudent();
      }).catch(e => {
        console.error(e);
        // this.errorMessage = 'cant delete studentRel';
        // this.$router.push('/');
      });
    },
    getProject: function (idPrj) {
      if (!idPrj) {
        this.dataProject.title = "";
        this.dataProject.description = "";
        return;
      }
      this.dataProject.idProject = idPrj;
      request(config.PROJECT_URL + this.idProject, 'PUT', {
        idProject: this.idProject
      }).then(res => {
        console.log(res.data);
        this.dataProject.title = res.data.title;
      }).catch(e => console.error(e));
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
