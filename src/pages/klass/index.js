import Vue from 'vue';
import template from './template.html';
import DropdownList from '../../components/dropdown-list';
import Pagination from '../../components/pagination';
import config from '../../config';
import request from '../../apis';
import {isEmpty} from '../../check-input'

let component = {
  data: function (){
    return {
      contents: [],
      tabIdx: 0,
      klassData: {},
      contentEdit: {},
      currentKlassId:null,
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
      request(config.KLASS_URL, 'GET').then(res => {
        this.contents = res.data.sort((item1, item2) => (item2.idKlass - item1.idKlass));
      }).catch(e => {
        console.error(e);
        this.$router.push('/');
      });
    },

    createKlass: function(klassData,event) {
      // console.log(klassData.fullname)

      event.stopPropagation();
      event.preventDefault();
      request(config.KLASS_URL, 'POST', klassData).then((res)=>{
        console.log(res.data);
        this.tabIdx = 0;
        this.loadData();
      }).catch(e => {
        console.error(e);
        this.errorMessage = "Invalid input";
        this.$router.push('/');
      });
    },
    editKlass:function(contentEdit,event){
      if(isEmpty(contentEdit.className)){
        this.errorMessage = "Invalid input";
        event.stopPropagation();
        event.preventDefault();
        return
      }
      console.log('editKlass');
      event.stopPropagation();
      event.preventDefault();
      request(config.KLASS_URL + contentEdit.idKlass, 'PUT', contentEdit).then(res=>{
        console.log(res.data);
        this.tabIdx = 0;
        this.loadData();
      }).catch(e => {
        console.error(e);
        this.$router.push('/');
      });
    },
    
    deleteKlass: function(idKlass) {
      console.log('delete');
      request(config.KLASS_URL + idKlass, 'DELETE').then(res => {
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
    DropdownList, Pagination
  }
};
export default { path: "/klass", component: component }
