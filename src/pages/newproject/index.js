import Vue from 'vue';

import template from './template.html';
let component = {
  data: function() {
    return {
      newproject: null,
    };
  },
  created: function() {

  },
  template
};

// export default { path:"/newproject", component: component }
export default function(path) {
  return { path, component}
}
