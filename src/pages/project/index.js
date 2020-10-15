import Vue from 'vue';

import template from './template.html';
let component = {
  props: ['idStudent', 'idAdvisor', 'idSemester', 'idProjecttype', 'status'],
  data: function() {
    return {
      projects: null,
    };
  },
  created: function() {

  },
  template
};

//export default { path:"/project", component: component }
export default function(path, props) {
  return { path, component, props }
}
