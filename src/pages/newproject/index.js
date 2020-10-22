import Vue from 'vue';
import request from '../../apis';
import DropdownList from '../../components/dropdown-list';
import template from './template.html';
import config from '../../config';
let component = {
  data: function () {
    return {
      newproject: null,
    };
  },
  created: function () {
  },
  methods: {
    listMembers: function () {
      return new Promise((resolve, reject) => {
        request(config.STUDENT_URL).then(res => {
          resolve([{ fullname: "<Not selected>" }, ...res.data]);
        }).catch(e => {
          reject(e);
        });
      })
    },
    listAdvisors: function () {
      return new Promise((resolve, reject) => {
        request(config.ADVISOR_URL).then(res => {
          resolve([{ fullname: "<Not selected>" }, ...res.data]);
        }).catch(e => {
          reject(e);
        });
      })
    },
    goBack: function () {
      this.$router.back();
    },
    getAdvisorFullname: function (advisor) {
      return advisor.fullname;
    },
    getMemberFullname: function (student) {
      return student.fullname;
    }
  },
  template,
  components: {
    DropdownList
  }
};

// export default { path:"/newproject", component: component }
export default function (path) {
  return { path, component }
}
