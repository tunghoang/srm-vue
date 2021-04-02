import Vue from 'vue';
import template from './template.html';
import config from '../../config';
import request from '../../apis';
import {isEmailError,isEmpty} from '../../check-input';
import Cookies from 'js-cookie';

function getLoginUrl(loginType, isGuest) {
  if (loginType !== 'advisor') 
    return config.LOGIN_URLS[loginType];
  if (isGuest) 
    return config.LOGIN_URLS['guest'];
  return config.LOGIN_URLS['advisor'];
}
let component = {
  props: ['loginType'],
  data: function() {
    return {
      isGuest: false,
      errorMessage: "",
      account: {
        email: null,
        password: null
      },
    };
  },
  created: function() {
    if (Cookies.get('jwt')) {
      Cookies.remove('jwt');
      Cookies.remove('key');
      //this.$router.replace('/');
    }
  },
  methods: {
    doLogin: function(event, account) {
      event.stopPropagation();
      event.preventDefault();
      console.log('doLogin', this.loginType, JSON.stringify(account), getLoginUrl(this.loginType, this.isGuest));
      if(isEmailError(account.email)||isEmpty(account.password)){
        this.errorMessage = "Invalid email"
        return
      }
      request(getLoginUrl(this.loginType, this.isGuest), "POST", account).then(res => {
        console.log(res.data);
        this.$router.push('/');
      }).catch(e => {
        console.error(e);
        try {
          this.errorMessage = e.response.data.message;
        }
        catch(_e) {
          this.errorMessage = e.message;
        }
      })
    },
    goHome: function() {
      this.$router.push('/');
    }
  },
  template 
};

export default { path:"/login/:loginType", component:component, props: true }

