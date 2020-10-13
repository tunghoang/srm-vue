import Vue from 'vue';
import template from './template.html';
import DropdownList from '../../components/dropdown-list';
import config from '../../config';
import axios from 'axios';
console.log(config);
let component = {
  data: function () {
    return {
      contents: [],
      tabIdx: 0,
    };
  },
  created: async function() {
    try {
      const res = await axios.get(config.SEMESTERS_URL);
      this.contents = res.data;
    }
    catch(err){
      console.log(err);
    }
  },
  methods: {
    onClick: function() {
      console.log('click');
      axios({
        method:"post",
        url:config.SEMESTERS_URL,
        headers:{
          'Content-Type':'application/json'
        },
        data:{
          year: 2017,
          semesterIndex: 0
        }
      }).then((res)=>{console.log(res.data)}).catch((err)=>{console.log(err)});
    },
    selectChanged: function(selectedItem) {
      console.log(selectedItem);
    }
  },
  template,
  components: {
    DropdownList
  }
};
export default { path: "/semester", component: component }
