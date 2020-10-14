  
import Vue from 'vue';
import template from './template.html';
import DropdownList from '../../components/dropdown-list';
import config from '../../config';
import axios from 'axios';
console.log(config);

let component = {
  data: function (){
    return {
      contents: [],
      tabIdx: 0,
      staffData: {},
      contentEdit:{},
      currentStaffId:null
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

    createSemester: function(staffData) {
      console.log('click');
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
    editSemester: function(id){
      console.log("edit")
      axios({
        method:"put",
        url:config.STAFF_URL + id,
        data:id
      }).then(res=>{
        console.log(res.data);
        this.tabIdx = 0;
        this.loadData();
      }).catch(
        e => console.error(e)
      );
    },
    
    deleteSemester: function(idStaff) {
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