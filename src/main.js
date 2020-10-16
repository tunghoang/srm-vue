import Vue from 'vue';
import VueRouter from 'vue-router';
import './styles.scss';

Vue.config.ignoredElements = [/^ion-/]
Vue.use(VueRouter);
import Pages from './pages';

const router = new VueRouter({
  routes: Pages,
  linkActiveClass: 'is-active',
})
new Vue({
  el: '#vue-app',
  router,
  data: {
    message: "Hello world from Vue"
  },
  computed: {
  },
  methods: {
    doClick: function() {
      console.log('do click', this.$router.currentRoute );
      if (this.$router.currentRoute.path !== '/staff') {
        this.$router.push('/staff');
      }
    },
    isLogingIn: function() {
      return this.$router.currentRoute.path === '/login';
    }
  }
});
