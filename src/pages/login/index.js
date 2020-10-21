import Vue from 'vue';
import template from './template.html';
import config from '../../config';
import request from '../../apis';
import {isErrorEmail,isErrorSpace} from '../../check-input';

function getLoginUrl(loginType) {
  return config.LOGIN_URLS[loginType];
}
let component = {
  props: ['loginType'],
  data: function() {
    return {
      errorMessage: "",
      account: {
        email: null,
        password: null
      },
    };
  },
  methods: {
    doLogin: function(account) {
      console.log('doLogin', this.loginType, JSON.stringify(account), getLoginUrl(this.loginType));
      if(isErrorEmail(account.email)||isErrorSpace(account.password)){
        this.errorMessage = "Invalid email"
        return
      }
      request(getLoginUrl(this.loginType), "POST", account).then(res => {
        console.log(res.data);
        this.$router.push('/');
      }).catch(e => {
        console.error(e);
        this.errorMessage = e.response.data.message;
      })
    },
    goHome: function() {
      this.$router.push('/');
    }
  },
  template 
};

export default { path:"/login/:loginType", component:component, props: true }