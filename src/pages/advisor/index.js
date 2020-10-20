import Vue from 'vue';
import template from './template.html';
import DropdownList from '../../components/dropdown-list';
import config from '../../config';
import request from '../../apis';
import {checkErrorEmail} from '../../check-input'

let component = {
  data: function (){
    return {
      contents: [],
      tabIdx: 0,
      advisorData: {},
      contentEdit: {},
      currentAdvisorId:null,
      emailError:false,
    };
  },
  created: function() {
    this.loadData();
  },
  methods: {
    loadData: function() {
      request(config.ADVISOR_URL, 'GET').then(res => {
        this.contents = res.data.sort((item1, item2) => (item2.idAdvisor - item1.idAdvisor));
      }).catch(e => {
        console.error(e);
        this.$router.push('/');
      });
    },

    createAdvisor: function(advisorData) {
      console.log(advisorData.email)
      if(checkErrorEmail(advisorData.email)){
        this.emailError = true;
        return
      }
      request(config.ADVISOR_URL, 'POST', advisorData).then((res)=>{
        console.log(res.data);
        this.tabIdx = 0;
        this.loadData();
      }).catch(e => {
        console.error(e);
        this.$router.push('/');
      });
    },
    editAdvisor:function(idAdvisor,email,fullname,idQuota){
      console.log('editAdvisor');
      request(config.ADVISOR_URL + idAdvisor, 'PUT', {
        email:email,
        fullname:fullname,
        idQuota: idQuota
      }).then(res=>{
        console.log(res.data);
        this.tabIdx = 0;
        this.loadData();
      }).catch(e => {
        console.error(e);
        this.$router.push('/');
      });
    },
    deleteAdvisor: function(idAdvisor) {
      console.log('delete');
      request(config.ADVISOR_URL + idAdvisor, 'delete').then(res => {
        console.log(res.data);
        this.loadData();
        this.tabIdx = 0;
      }).catch(e => {
        console.error(e);
        this.$router.push('/');
      });
    },
    
    selectChanged: function(selectedItem, selectedIdx) {
      console.log(selectedItem);
      this.advisorData.idQuota = selectedIdx
    }
  },
  
  template,
  components: {
    DropdownList
  }
};
export default { path: "/advisor", component: component }
