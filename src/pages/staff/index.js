import Vue from 'vue';
import template from './template.html';
import DropdownList from '../../components/dropdown-list';
import config from '../../config';
import request from '../../apis';
import {checkErrorEmail} from '../../check-input'

let component = {
  data: function (){
    return {
      contents: [],
      tabIdx: 0,
      staffData: {},
      contentEdit: {},
      currentStaffId:null,
      emailError:false,
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
      console.log(staffData.email)
      if(checkErrorEmail(staffData.email)){
        this.emailError = true;
        return
      }
      request(config.STAFF_URL, 'POST', staffData).then((res)=>{
        console.log(res.data);
        this.tabIdx = 0;
        this.loadData();
      }).catch(e => {
        console.error(e);
        this.$router.push('/');
      });
    },
    editStaff:function(idStaff,email,fullname){
      console.log('editStaff');
      request(config.STAFF_URL + idStaff, 'PUT', {
        email:email,
        fullname:fullname,
      }).then(res=>{
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
    
    selectChanged: function(selectedItem, selectedIdx) {
      console.log(selectedItem);
      this.semesterData.semesterIndex = selectedIdx
    }
  },
  
  template,
  components: {
    DropdownList
  }
};
export default { path: "/staff", component: component }
