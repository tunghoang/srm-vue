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
      projecttypeData: {},
      currentProjecttypeId: null,
      editProjecttype:{},
    };
  },
  created: function() {
    this.loadData();
  },
  methods: {
    loadData: function() {
      axios.get(config.PROJECTTYPE_URL).then(res => {
        this.contents = res.data.sort((item1, item2) => (item2.idProjecttype - item1.idProjecttype));
      }).catch(err => console.error(err));
    },

    createProjecttype: function(projecttypeData) {
      console.log('click');
      axios({
        method:"post",
        url:config.PROJECTTYPE_URL,
        headers:{
          'Content-Type':'application/json'
        },
        data: projecttypeData
      }).then((res)=>{
        console.log(res.data);
        this.tabIdx = 0;
        this.loadData();
      }).catch((err)=>{console.log(err)});
    },
    editProjecttype: function(id){
      console.log("edit")
      axios({
        method:"put",
        url:config.PROJECTTYPE_URL + id,
        data: id,
      }).then(res=>{
        this.tabIdx=0;
        this.loadData();
      }).catch(
        e => console.error(e)
      );
    },

    deleteProjecttype: function(idProjecttype) {
      console.log('delete');
      axios({
        method: 'delete',
        url: config.PROJECTTYPE_URL + idProjecttype
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
      this.projecttypeData.projecttypeIndex = selectedIdx
    }

  },
  
  template,
  components: {
    DropdownList
  }
};
export default { path: "/projecttype", component: component }