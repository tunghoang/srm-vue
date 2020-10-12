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
    // onClick: function() {
    //   console.log('click');
    //   this.$router.push('/student');
    // },
    // deleteSemester(id){
    //   this.axios.delete(config.SEMESTERS_URL+id).then((result)=>{this.contents=result.data}),
    //   console.log('delete')
    // }
  },
  template,
};


export default { path:"/quota", component: component }
