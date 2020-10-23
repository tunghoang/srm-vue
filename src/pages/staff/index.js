import Vue from 'vue';
import template from './template.html';
import DropdownList from '../../components/dropdown-list';
import config from '../../config';
import request from '../../apis';
import {isEmailError,isEmpty} from '../../check-input'

let component = {
  data: function (){
    return {
      contents: [],
      tabIdx: 0,
      staffData: {},
      contentEdit: {},
      currentStaffId:null,
      errorEmail:false,
      errorFullname:false,
      errorMessage:"",
    };
  },
  created: function() {
    this.loadData();
  },
  methods: {
    loadData: function() {
      request(config.STAFF_URL, 'GET').then(res => {
        this.contents = res.data.sort((item1, item2) => (item2.idStaff - item1.idStaff));
      }).catch(e => {
        console.error(e);
        this.$router.push('/');
      });
    },

    createStaff: function(staffData) {
      // console.log(staffData.fullname)

      if(isEmpty(staffData.email)||isEmpty(staffData.fullname)||isEmailError(staffData.email)){
        this.errorMessage = "Invalid email";
        return
      }
      request(config.STAFF_URL, 'POST', staffData).then((res)=>{
        console.log(res.data);
        this.tabIdx = 0;
        this.loadData();
      }).catch(e => {
        console.error(e);
        this.errorMessage = "Invalid email";
        this.$router.push('/');
      });
    },
    editStaff:function(contentEdit,event){
      console.log('editStaff');
      event.stopPropagation();
      event.preventDefault();
      request(config.STAFF_URL + contentEdit.idStaff, 'PUT', contentEdit).then(res=>{
        console.log(res.data);
        this.tabIdx = 0;
        this.loadData();
      }).catch(e => {
        console.error(e);
        this.$router.push('/');
      });
    },
    
    deleteStaff: function(idStaff) {
      console.log('delete');
      request(config.STAFF_URL + idStaff, 'DELETE').then(res => {
        console.log(res.data);
        this.loadData();
        this.tabIdx = 0;
      }).catch(e => {
        console.error(e);
        this.$router.push('/');
      });
    },
  },
  
  template,
  components: {
    DropdownList
  }
};
export default { path: "/staff", component: component }
