import Vue from 'vue';
import template from './template.html';
import style from './style.scss';
import DropdownList from '../../components/dropdown-list';
import config from '../../config';
import request from '../../apis';
import {isErrorNumber} from '../../check-input';

let component = {
  data: function (){
    return {
      contents: [],
      tabIdx: 0,
      semesterData: {},
      contentEdit:{},
      yearError: false,
    };
  },
  created: function() {
    this.loadData();
  },
  methods: {
    loadData: function() {
      request(config.SEMESTERS_URL).then(res => {
        this.contents = res.data.sort((item1, item2) => (item2.idSemester - item1.idSemester));
      }).catch(e => {
        console.error(e);
        this.$router.push('/');
      });
    },

    createSemester: function(semesterData) {
      if(isErrorNumber(semesterData.year)){
        this.yearError = true;
        return
      }
      console.log('click');
      request(config.SEMESTERS_URL,"post", semesterData).then((res)=>{
        console.log(res.data);
        this.tabIdx = 0;
        this.loadData();
      }).catch(e => {
        console.error(e);
        this.$router.push('/');
      });
    },
    editSemester: function(contentEdit,event){
      console.log("edit",event);
      event.stopPropagation();
      event.preventDefault();
      request(config.SEMESTERS_URL + contentEdit.idSemester, "PUT", contentEdit).then(res=>{
        console.log(res.data);
        this.tabIdx = 0;
        this.loadData();
      }).catch(e => {
        console.error(e);
        this.$router.push('/');
      });
    },

    deleteSemester: function(idSemester) {
      console.log('delete');
      request(config.SEMESTERS_URL + idSemester, 'delete').then(res => {
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
    },
  },
  
  template,
  components: {
    DropdownList
  }
};
export default { path: "/semester", component: component }