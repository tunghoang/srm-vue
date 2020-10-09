import Vue from 'vue';

import template from './template.html';
let component = {
  data: function() {
    return {};
  },
  methods: {
    onClick: function() {
      console.log('click');
      this.$router.push('/student');
    }
  },
  template 
};

export default { path:"/login", component:component }
