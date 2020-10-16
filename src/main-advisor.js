import Vue from 'vue';
import VueRouter from 'vue-router';
import './styles.scss';

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
    message: "Hello world from Vue",
    idAdvisor: 20
  },
  computed: {
  },
  methods: {
    goHome: function() {
      console.log('do click', this.$router.currentRoute );
      this.$router.push('/');
      return;
      let homeUrl = '/project/unsupervised/' + this.idAdvisor;
      if (this.$router.currentRoute.path !== homeUrl) {
        this.$router.push(homeUrl);
      }
    },
    isLogingIn: function() {
      return this.$router.currentRoute.path === '/login/advisor';
    }
  }
});
