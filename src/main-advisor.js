import Vue from 'vue';
import VueRouter from 'vue-router';
import './advisor.scss';
import './styles.scss';

import jwtDecode from 'jwt-decode';
import Cookies from 'js-cookie';
import request from './apis';
import config from './config';

Vue.config.ignoredElements = [/^ion-/]
Vue.use(VueRouter);
import Pages from './pages/advisor-pages';

const router = new VueRouter({
  routes: Pages,
  linkActiveClass: 'is-active',
})
new Vue({
  el: '#vue-app',
  router,
  data: {
    username: "N/A",
    idAdvisor: 20
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
        Cookies.remove('key');
        Cookies.remove('jwt');
        this.$router.push('/login/advisor');
      }).catch(e => {
        console.error(e);
        this.$router.push('/login/advisor');
      });
    },
    isLogingIn: function() {
      if (this.$router.currentRoute.path === '/login/advisor') {
        return true;
      }
      let jwt = Cookies.get('jwt');
      if (jwt) {
        let jwtData = jwtDecode(jwt);
        if (!jwtData.idAdvisor) {
          request(config.LOGOUT_URL).then(res => {
            console.log(res.data);
            this.$router.replace('/login/advisor');
          }).catch(e => {
            console.error(e);
            this.$router.replace('/login/advisor');
          });
          return true;
        }
        else {
          this.idAdvisor = jwtData.idAdvisor;
        }
        this.username = jwtData.fullname;
      }
      else {
        this.$router.replace('/login/advisor');
        return true;
      }
      return false;
    }
  }
});
