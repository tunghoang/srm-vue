import Vue from 'vue';
import template from './template.html';
import config from '../../config';
import axios from 'axios';
const base_url = 'http://112.137.129.214:15980/semesters/';
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
      const res = await axios.get(base_url);
      this.contents = res.data;
    }catch(err){
      console.log(err);
    }
  },
  methods: {
    // getContent() {
    //   console.log('get Content');
    //   fetch(config.SEMESTERS_URL)
    //     .then(response => response.json())
    //     .then(data => (this.contents = data));
    // },
    onClick: function() {
      console.log('click');
      this.$router.push('/semester');
    }
  },
  template,
};


export default { path:"/semester", component: component }
