import Vue from 'vue';
import template from './template.html';
import DropdownList from '../../components/dropdown-list';
import config from '../../config';
import request from '../../apis';
import axios from 'axios';
import {isErrorNumber,isErrorSpace} from '../../check-input'
console.log(config);

let component = {
  data: function (){
    return {
      contents: [],
      tabIdx: 0,
      quotaData: {},
      contentEdit:{},
      currentQuotaId: null,
      errorMessage:"",
    };
  },
  created: function() {
    this.loadData();
  },
  methods: {
    loadData: function() {
      request(config.QUOTAS_URL).then(res => {
        this.contents = res.data.sort((item1, item2) => (item2.idQuota - item1.idQuota));
      }).catch(e => {
        console.error(e);
        this.$router.push('/');
      });
    },

    createQuota: function(quotaData) {
      console.log(quotaData.n_kltn);
      if(isErrorSpace(quotaData.name)||isErrorSpace(quotaData.description)||isErrorNumber(quotaData.n_dakh)||isErrorNumber(quotaData.n_kltn)){
        this.errorMessage="Input invalid";
        return
      } 
      request(config.QUOTAS_URL, "post", quotaData).then((res)=>{
        console.log(res.data);
        this.tabIdx = 0;
        this.loadData();
      }).catch(e => {
        console.error(e);
        this.errorMessage="Input invalid";
        this.$router.push('/');
      })
    },
    editQuota: function(contentEdit,event){
      console.log("edit" , event);
      event.stopPropagation();
      event.preventDefault();
      request(config.QUOTAS_URL + contentEdit.idQuota, "PUT", contentEdit).then(res=>{
        console.log(res.data);
        this.tabIdx = 0;
        this.loadData();
      }).catch(e => {
        console.error(e);
        this.$router.push('/');
      })
    },

    deleteQuota: function(idQuota) {
      console.log('delete');
      request(config.QUOTAS_URL + idQuota, 'delete').then(res => {
        console.log(res.data);
        this.loadData();
        this.tabIdx = 0;
      }).catch(e => {
        console.error(e);
        this.$router.push('/');
      })
    },

  },
  
  template,
};
export default { path: "/quota", component: component }