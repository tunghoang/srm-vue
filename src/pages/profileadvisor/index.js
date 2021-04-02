import Vue from 'vue';
import request from '../../apis';
import {handleError} from '../../apis';
import DropdownList from '../../components/dropdown-list';
import template from './template.html';
import config from '../../config';
let component = {
  template,
  props: ['idAdvisor'],
  data: function () {
    return {
      projects: null,
      errorMessage: null,
      fullname:null,
      email: null,
      affiliation: null
    };
  },
  created: async function () {
    this.handleError = handleError.bind(this);
    try {
      let res = await request(config.ADVISOR_URL + this.idAdvisor, 'GET');
      this.fullname = res.data.fullname;
      this.email = res.data.email;
      this.affiliation = res.data.affiliation;

      let res1 = await request(config.PROJECT_URL, 'PUT', {idAdvisor: this.idAdvisor});
      this.projects = res1.data;
    }
    catch(e) {
      this.errorMessage = this.handleError(e);
    };
  },
  computed: {
    onGoing: function() {
      if (!this.projects || !this.projects.length) return 0;
      return this.projects.reduce((total, prj) => {
        if (prj.project_status === 'on-going') return total + 1;
        return total;
      }, 0);
    },
    finished: function() {
      if (!this.projects || !this.projects.length) return 0;
      return this.projects.reduce((total, prj) => {
        if (prj.project_status === 'finished') return total + 1;
        return total;
      }, 0);
    },
    unconfirmed: function() {
      if (!this.projects || !this.projects.length) return 0;
      return this.projects.reduce((total, prj) => {
        let idAdvisors = JSON.parse(prj.idAdvisors);
        let confirmeds = JSON.parse(prj.confirmeds);
        let idx = idAdvisors.findIndex(id => parseInt(id) === parseInt(this.idAdvisor))
        
        if (!confirmeds[idx]) return total + 1;
        return total;
      }, 0);
    }
  },
  methods: {
    editProfile: function(){
      console.log("edit");
    },
  },
  components: {
    DropdownList
  }
};

// export default { path:"/profileadvisor", component: component }
export default function (path, props) {
  return { path, component, props }
}
