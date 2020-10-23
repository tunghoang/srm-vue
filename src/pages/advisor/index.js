import Vue from 'vue';
import template from './template.html';
import DropdownList from '../../components/dropdown-list';
import config from '../../config';
import request from '../../apis';
import {isEmpty} from '../../check-input'

let component = {
  data: function (){
    return {
      contents: [],
      tabIdx: 0,
      advisorData: {},
      contentEdit: {},
      currentAdvisorId:null,
      emailError:false,
      searchText:"",
      searchField: "email",
      errorMessage: "",
    };
  },
  created: function() {
    //this.loadData();
  },
  methods: {
    loadData: function() {
      request(config.ADVISOR_URL, 'GET').then(res => {
        this.contents = res.data.sort((item1, item2) => (item2.idAdvisor - item1.idAdvisor));
      }).catch(e => {
        console.error(e);
        this.$router.push('/');
      });
    },
    createAdvisor: function(advisorData,event) {
       console.log('create');
       event.stopPropagation();
       event.preventDefault();
      // if(checkErrorEmail(advisorData.email)){
      //   this.emailError = true;
      //   return
      // }
      // request(config.ADVISOR_URL, 'POST', advisorData).then((res)=>{
      //   console.log(res.data);
      //   this.tabIdx = 0;
      //   this.search(this.searchText, this.searchField);
      // }).catch(e => {
      //   console.error(e);
      //   this.$router.push('/');
      // });
    },
    editAdvisor:function(contentEdit,event){
      console.log('editAdvisor');
      event.stopPropagation();
      event.preventDefault();
      request(config.ADVISOR_URL + contentEdit.idAdvisor, 'PUT', contentEdit).then(res=>{
        console.log(res.data);
        this.tabIdx = 0;
        this.search(this.searchText, this.searchField);
      }).catch(e => {
        console.error(e);
        this.$router.push('/');
      });
    },
    deleteAdvisor: function(idAdvisor) {
      console.log('delete');
      request(config.ADVISOR_URL + idAdvisor, 'delete').then(res => {
        console.log(res.data);
        this.search(this.searchText, this.searchField);
        this.tabIdx = 0;
      }).catch(e => {
        console.error(e);
        this.$router.push('/');
      });
    },
    
    searchFieldChanged: function(selectedItem, selectedIdx) {
      this.searchField = selectedItem.toLowerCase();
    },
    search: function(searchText, searchField){
      console.log(searchText, searchField);
      if (isEmpty(searchText) || isEmpty(searchField)) {
        this.errorMessage = "Search data empty";
        return;
      }
      this.errorMessage = "";
      let data = {[searchField]: searchText};
      console.log(data);
      request(config.ADVISOR_URL, 'PUT', data).then(res => {
        console.log(res.data);
        this.contents = res.data;
      }).catch(e => {
        console.error(e);
        this.errorMessage = e.message;
      });
    }
  },
  
  template,
  components: {
    DropdownList
  }
};
export default { path: "/advisor", component: component }
