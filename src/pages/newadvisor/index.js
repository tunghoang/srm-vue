import Vue from 'vue';
import template from './template.html';
import DropdownList from '../../components/dropdown-list';
import config from '../../config';
import request from '../../apis';
import { isEmailError, isEmpty } from '../../check-input'
let component = {
  props: [],
  data: function () {
    return {
    };
  },
  created: function () {
  },
  watch: {
  },
  methods: {
  },
  template,
  components: {
    DropdownList
  }
};

// export default { path:"/newadvisor", component: component }
export default function (path, props) {
  return { path, component, props }
}
