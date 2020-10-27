import Vue from 'vue';
import template from './template.html';
import DropdownList from '../../../components/dropdown-list';
import request from '../../../apis';
import config from '../../../config';
import {isEmailError,isEmpty} from '../../../check-input'
let component = {
  props:["idProject"],
  data: function () {
    return {
      searchText:"",
      errorMessage: "",
      advisorList:[{'fullname':'<No selected>'}],
      advisor:{}
    };
  },
  created: function () {
  },
  watch:{
  },
  methods: {
    addAdvisor: function(){
      console.log('addAdvisor', this.advisor, this.idProject);
      request(config.PROJECT_ADVISOR_RELS_URL, 'POST', {
        idAdvisor: this.advisor.idAdvisor,
        idProject: this.idProject
      }).then(res => {
        console.log(res.data);
      }).catch(e=> console.error(e));
    },
    searchAdvisor: function(searchText){
      console.log(searchText);
      this.advisor = {};
      if (isEmpty(searchText) ) {
        this.errorMessage = "Search data empty";
        return;
      }
      this.errorMessage = "";
      let data = {['fullname']: searchText};
      console.log(data);
      request(config.ADVISOR_URL, 'PUT', data).then(res => {
        this.advisorList = res.data;
        if (this.advisorList.length > 0)
          this.advisor = this.advisorList[0];
      }).catch(e => {
        console.error(e);
        this.errorMessage = e.message;
      });
    },
    getFullname: function (instance) {
      return instance.fullname;
    },
    goBack: function () {
      this.$router.back();
    },
    selectAdvisor: function(selectedAdvisor, selectedIndex){
      console.log("selectAdvisor", selectedAdvisor, selectedIndex);
      this.advisor = selectedAdvisor;
      request(config.PROJECT_ADVISOR_RELS_URL, "POST", {
        idAdvisor: this.advisor.idAdvisor,
        idProject: this.idProject
      }).then(res => {
        // this.$router.back();
      }).catch(e => console.error(e));
    }
  },
  template,
  components: {
    DropdownList
  }
};

// export default { path:"/addAdvisor", component: component }
export default function (path, props) {
  return { path, component, props }
}
