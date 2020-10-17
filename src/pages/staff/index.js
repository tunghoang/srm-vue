  import Vue from 'vue';
import template from './template.html';
import DropdownList from '../../components/dropdown-list';
import config from '../../config';
import axios from 'axios';
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
      axios.get(config.STAFF_URL).then(res => {
        this.contents = res.data.sort((item1, item2) => (item2.idStaff - item1.idStaff));
      }).catch(err => console.error(err));
    },

    createStaff: function(staffData) {
      console.log(staffData.email)
      if(checkErrorEmail(staffData.email)){
        this.emailError = true;
        return
      }
      axios({
        method:"post",
        url:config.STAFF_URL,
        headers:{
          'Content-Type':'application/json'
        },
        data: staffData
      }).then((res)=>{
        console.log(res.data);
        this.tabIdx = 0;
        this.loadData();
      }).catch((err)=>{console.log(err)});
    },
    editStaff:function(idStaff,email,fullname){
      console.log('editStaff');
      axios({
        method:'PUT',
        url:config.STAFF_URL + idStaff,
        data:{
          email:email,
          fullname:fullname,
        }
      }).then(res=>{
        console.log(res.data);
        this.tabIdx = 0;
        this.loadData();
      }).catch(err=>console.log(err))
    },
    
    deleteStaff: function(idStaff) {
      console.log('delete');
      axios({
        method: 'delete',
        url: config.STAFF_URL + idStaff
      }).then(res => {
        console.log(res.data);
        this.loadData();
        this.tabIdx = 0;
      }).catch(
        e => console.error(e)
      );
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
