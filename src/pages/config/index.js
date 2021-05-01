import Vue from 'vue';
import template from './template.html';
import config from '../../config';
import request from '../../apis';
import {handleError} from '../../apis';
let component = {
  props: ['idStudent', 'idAdvisor', 'idSemester', 'idProjecttype', 'status'],
  data: function (){
    return {
      contents: [],
      errorMessage: null
    };
  },
  watch: {
    status: function() {
      this.doInit();
    }
  },
  created: function() {
    this.handleError = handleError.bind(this);
    this.doInit();
  },
  methods: {
    doInit: async function() {
      this.loadData();
    },
    loadData: async function() {
      try {
        this.contents = (await request(config.CONFIGS_URL, 'GET')).data;
      }
      catch(e) {
        this.errorMessage = this.handleError(e);
      }
    },
    toggle: async function(content, idx) {
      let method = 'GET';
      if (content.value.length > 0) {
        content.value = "";
        method = 'POST';
      }
      else {
        content.value = "allow";
      }
      try {
        let response = await request(config.CHECKPOINT_URL, method);
        console.log(response.data);
      }
      catch(e) {
        this.errorMessage = this.handleError(e);
      }
      request(config.CONFIGS_URL + content.idConfig, 'PUT', content).then(res => {
        content.value = res.data.value; 
      }).catch(e => {
        this.errorMessage = this.handleError(e);
      });
    },
    createConfig: function() {
      if (this.contents.length > 0) return;
      request(config.CONFIGS_URL, 'POST', {key: "Allow edit project", value:""}).then(res => {
        this.loadData();
      }).catch(e => this.errorMessage = this.handleError(e));
    },
    checkpointCompare: function() {
      request(config.CHECKPOINT_URL, 'PUT').then(res => {
        const url = URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement('a');
        link.href = url;
        let filename = 'checkpoint-diff.csv';
        console.log(filename);
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
        link.remove();
      }).catch(e => {
        this.errorMessage = this.handleError(e);
      });
    }
  },
  template
};
export default { path: '/configs', component }
