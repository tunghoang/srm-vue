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
      errorMessage:"",
      comfirmPassword:"",
      dataAdvisor:{
        email: "",
        fullname: "",
        affiliation: "",
        password: ""
      },
    };
  },
  created: function () {
  },
  watch: {
  },
  methods: {
    loadData: function() {
      request(config.GUESTADVISOR_URL).then(res => {
        this.dataAdvisor = res.data.sort((item1, item2) => (item2.idGuestadvisor - item1.idGuestadvisor));
      }).catch(e => {
        console.error(e);
        this.$router.push('/');
      });
    },
    createAdvisor: function(dataAdvisor) {
      if (dataAdvisor.password != this.comfirmPassword){
         this.errorMessage="Input password invalid ";
        return;
      }
      request(config.GUESTADVISOR_URL, 'POST', dataAdvisor).then((res)=>{
        console.log(res.data);
        this.loadData();
      }).catch(e => {
        // this.errorMessage="Input invalid";
        console.error(e);
      });
    },
    goBack: function(){
      this.$router.back();
    },
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
