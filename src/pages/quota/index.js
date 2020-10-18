import Vue from 'vue';
import template from './template.html';
import DropdownList from '../../components/dropdown-list';
import config from '../../config';
import request from '../../apis';
console.log(config);

let component = {
  data: function (){
    return {
      contents: [],
      tabIdx: 0,
      quotaData: {},
      contentEdit:{},
      currentQuotaId: null,
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
      console.log('click');
      request(config.QUOTAS_URL, "post", quotaData).then((res)=>{
        console.log(res.data);
        this.tabIdx = 0;
        this.loadData();
      }).catch(e => {
        console.error(e);
        this.$router.push('/');
      })
    },
    editQuota: function(idQuota,name,description, n_kltn, n_dakh){
      console.log("edit")
      request(config.QUOTAS_URL + idQuota, "PUT", {
          name:name,
          description: description,
          n_kltn: n_kltn,
          n_dakh: n_dakh
      }).then(res=>{
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
