import Vue from 'vue';
import template from './template.html';
import DropdownList from '../../components/dropdown-list';
import config from '../../config';
import request from '../../apis';
import {isErrorSpace} from '../../check-input'
console.log(config);


let component = {
  data: function (){
    return {
      contents: [],
      tabIdx: 0,
      projecttypeData: {},
      currentProjecttypeId: null,
      contentEdit:{},
      nameError: false,
      descriptionError: false,
    };
  },
  created: function() {
    this.loadData();
  },
  methods: {
    loadData: function() {
      request(config.PROJECTTYPE_URL, 'GET').then(res => {
        this.contents = res.data.sort((item1, item2) => (item2.idProjecttype - item1.idProjecttype));
      }).catch(e => {
        console.error(e);
        this.$router.push('/');
      });
    },

    createProjecttype: function(projecttypeData) {
      console.log('click');
      if (isErrorSpace(projecttypeData.name) || isErrorSpace(projecttypeData.description)) {
        if (isErrorSpace(projecttypeData.name)) {
          this.nameError = true;
        }
        if (isErrorSpace(projecttypeData.description)) {
          this.descriptionError = true;
        }
        return
      }
      request(config.PROJECTTYPE_URL, 'POST', projecttypeData).then((res)=>{
        console.log(res.data);
        this.tabIdx = 0;
        this.loadData();
      }).catch(e => {
        console.error(e);
        this.$router.push('/');
      });
    },
    editProjecttype:function(contentEdit,event){
      console.log('edit',event);
      event.stopPropagation();
      event.preventDefault();
      request(config.PROJECTTYPE_URL + contentEdit.idProjecttype, 'PUT', contentEdit).then(res=>{
        console.log(res.data);
        this.tabIdx = 0;
        this.loadData();
      }).catch(e => {
        console.error(e);
        this.$router.push('/');
      });
    },

    deleteProjecttype: function(idProjecttype) {
      console.log('delete');
      request(config.PROJECTTYPE_URL + idProjecttype, 'DELETE').then(res => {
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
export default { path: "/projecttype", component: component }