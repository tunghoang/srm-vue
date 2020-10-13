import Vue from 'vue';
import template from './template.html';
import config from '../../config';
import axios from 'axios';
console.log(config);
let component = {
  data: function() {
    return {
      contents:[],
      tabIdx : 0,
    };
  },
  async created(){
    try{
      const res = await axios.get(config.QUOTAS_URL);
      this.contents = res.data;
    }catch(err){
      console.log(err);
    }
  },
  methods: {
    deleteContent: async function(id){
      try{
        axios.delete(config.QUOTAS_URL)
      }catch(err){
        console.log(err);
      }
    },
    // addContent: async function() {
    //   const res = await axios.post(config.QUOTAS_URL, { name: this.contents })
    //   this.contents = [...this.contents, res.data]
    //   this.contents = ''
    // }
  },
  template,
};


export default { path:"/quota", component: component }
