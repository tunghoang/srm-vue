import Vue from 'vue';
import axios from 'axios';
import template from './template.html';
import config from '../../config';
import {checkErrorEmail} from '../../check-input';

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
      emailError:false,
    };
  },
  methods: {
    doLogin: function(account) {
      
      console.log('doLogin', this.loginType, JSON.stringify(account), getLoginUrl(this.loginType));
      if(checkErrorEmail(account.email)){
        this.emailError=true;
        return
      }
      axios(getLoginUrl(this.loginType), {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        data: account
      }).then(res => {
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
