import Vue from 'vue';
import template from './template.html';
import DropdownList from '../../components/dropdown-list';
import Pagination from '../../components/pagination';
import config from '../../config';
import request from '../../apis';
import {handleError} from '../../apis';
import {isEmailError,isEmpty} from '../../check-input'

let component = {
  data: function (){
    return {
      contents: [],
      semesters: [],
      idSemester: null,
      advisorSearch: null,
      errorMessage:"",
    };
  },
  created: async function() {
    this.handleError = handleError.bind(this);
    try {
      this.semesters = (await request(config.SEMESTERS_URL, 'GET')).data;
      this.semesters.unshift({'idSemester':0, 'year': '', semesterIndex: -1});
    }
    catch(e) {
      this.errorMessage = this.handleError(e);
    }
  },
  methods: {
    checkQuota: function($event) {
      event.preventDefault();
      let payload = {idSemester: this.idSemester};
      if (this.advisorSearch && this.advisorSearch.length) {
        payload.advisor = this.advisorSearch;
      }
      request(config.QUOTAS_URL, 'PUT', payload).then(res => {
        this.contents = res.data;
      }).catch(e => {
        this.errorMessage = this.handleError(e);
      });
    }
  },
  
  template,
  components: {
    DropdownList, Pagination
  }
};
export default { path: "/quota-checking", component: component }
