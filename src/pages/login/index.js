import Vue from 'vue';

import template from './template.html';
let component = {
  props: ['loginType'],
  data: function() {
    return {};
  },
  methods: {
    onClick: function() {
      console.log('click');
      this.$router.push('/');
    }
  },
  template 
};

export default { path:"/login/:loginType", component:component, props: true }
