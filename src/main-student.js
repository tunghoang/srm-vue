import Vue from 'vue';
import VueRouter from 'vue-router';
import './styles.scss';

import jwtDecode from 'jwt-decode';
import Cookies from 'js-cookie';
import request from './apis';
import config from './config';

Vue.config.ignoredElements = [/^ion-/]
Vue.use(VueRouter);
import Pages from './pages/student-pages';

const router = new VueRouter({
  routes: Pages,
  linkActiveClass: 'is-active',
})
new Vue({
  el: '#vue-app',
  router,
  data: {
    username: "N/A",
    idStudent: 123
  },
  computed: {
  },
  methods: {
    goHome: function() {
      this.$router.push('/');
      return;
    },
    doLogout: function() {
      request(config.LOGOUT_URL).then(res => {
        console.log(res.data);
        Cookies.remove('key');
        Cookies.remove('jwt');
        this.$router.push('/login/student');
      }).catch(e => {
        console.error(e);
        this.$router.push('/login/student');
      });
    },
    isLogingIn: function() {
      if (this.$router.currentRoute.path === '/login/student') {
        return true;
      }
      let jwt = Cookies.get('jwt');
      if (jwt) {
        let jwtData = jwtDecode(jwt);
        if (!jwtData.idStudent) {
          request(config.LOGOUT_URL).then(res => {
            console.log(res.data);
            this.$router.replace('/login/student');
          }).catch(e => {
            console.error(e);
            this.$router.replace('/login/student');
          });
        }
        this.username = jwtData.fullname;
      }
      else {
        this.$router.replace('/login/student');
      }
      return false;
    }
  }
});
