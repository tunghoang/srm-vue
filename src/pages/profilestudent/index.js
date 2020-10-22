import Vue from 'vue';
import request from '../../apis';
import DropdownList from '../../components/dropdown-list';
import template from './template.html';
import config from '../../config';
let component = {
  data: function () {
    return {
      profile: null,
    };
  },
  created: function () {
  },
  methods: {
    editProfile: function(){
      console.log("edit");
    },
  },
  template,
  components: {
    DropdownList
  }
};

// export default { path:"/profile", component: component }
export default function (path) {
  return { path, component }
}
