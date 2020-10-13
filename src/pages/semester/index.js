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
      semesterData: {}
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
    createSemester: function(semesterData) {
      console.log('click');
      axios({
        method:"post",
        url:config.SEMESTERS_URL,
        headers:{
          'Content-Type':'application/json'
        },
        data: semesterData
      }).then((res)=>{console.log(res.data)}).catch((err)=>{console.log(err)});
    },
    deleteSemester: function(idSemester) {
      console.log('delete');
      axios({
        method: 'delete',
        url: config.SEMESTERS_URL + idSemester
      }).then(
        res => console.log(res.data)
      ).catch(
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
