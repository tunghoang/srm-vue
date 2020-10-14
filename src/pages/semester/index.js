  
import Vue from 'vue';
import template from './template.html';
import style from './style.scss';
import DropdownList from '../../components/dropdown-list';
import config from '../../config';
import axios from 'axios';
console.log(config);

let component = {
  data: function (){
    return {
      contents: [],
      tabIdx: 0,
      semesterData: {},
      contentEdit:{},
      currentSemesterId:null
    };
  },
  created: function() {
    this.loadData();
  },
  methods: {
    loadData: function() {
      axios.get(config.SEMESTERS_URL).then(res => {
        this.contents = res.data.sort((item1, item2) => (item2.idSemester - item1.idSemester));
      }).catch(err => console.error(err));
    },

    createSemester: function(semesterData) {
      console.log('click');
      axios({
        method:"post",
        url:config.SEMESTERS_URL,
        headers:{
          'Content-Type':'application/json'
        },
        data: semesterData
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
        url:config.SEMESTERS_URL + id,
        data:id
      }).then(res=>{
        console.log(res.data);
        this.tabIdx = 0;
        this.loadData();
      }).catch(
        e => console.error(e)
      );
    },
    
    deleteSemester: function(idSemester) {
      console.log('delete');
      axios({
        method: 'delete',
        url: config.SEMESTERS_URL + idSemester
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
export default { path: "/semester", component: component }