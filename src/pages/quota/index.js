import Vue from 'vue';
import template from './template.html';
import DropdownList from '../../components/dropdown-list';
import config from '../../config';
import axios from 'axios';
console.log(config);

let component = {
  data: function (){
    return {
      contents: [],
      tabIdx: 0,
      quotaData: {},
      currentQuotaId: null,
      editQuotaId:null,
      editQuotaYear:null,
      editQuotaIndex:null,
    };
  },
  created: function() {
    this.loadData();
  },
  methods: {
    loadData: function() {
      axios.get(config.QUOTAS_URL).then(res => {
        this.contents = res.data.sort((item1, item2) => (item2.idQuota - item1.idQuota));
      }).catch(err => console.error(err));
    },

    createQuota: function(quotaData) {
      console.log('click');
      axios({
        method:"post",
        url:config.QUOTAS_URL,
        headers:{
          'Content-Type':'application/json'
        },
        data: quotaData
      }).then((res)=>{
        console.log(res.data);
        this.tabIdx = 0;
        this.loadData();
      }).catch((err)=>{console.log(err)});
    },
    editQuota: function(idquota){
      console.log("edit")
      axios({
        method:"put",
        url:config.QUOTAS_URL + idquota,
      }).then(res=>{
        console.log(res.data);
      }).catch()
    },

    deleteQuota: function(idQuota) {
      console.log('delete');
      axios({
        method: 'delete',
        url: config.QUOTAS_URL + idQuota
      }).then(res => {
        console.log(res.data);
        this.loadData();
        this.tabIdx = 0;
      }).catch(
        e => console.error(e)
      );
    },
    
    selectChanged: function(selectedItem, selectedIdx) {
      console.log(selectedItem);
      this.quotaData.quotaIndex = selectedIdx
    }

  },
  
  template,
  components: {
    DropdownList
  }
};
export default { path: "/quota", component: component }