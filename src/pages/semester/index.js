import Vue from 'vue';
import template from './template.html';
import style from './style.scss';
import DropdownList from '../../components/dropdown-list';
import config from '../../config';
import request from '../../apis';

let component = {
  data: function () {
    return {
      files: null,
      contents: [],
      tabIdx: 0,
      semesterData: {},
      contentEdit: {},
      yearError: false,
      errorMessage: "",
      currentSemesterId: ""
    };
  },
  created: function () {
    this.loadData();
  },
  methods: {
    previewFiles() {
      this.files = this.$refs.myFiles.files;
      console.log("file", this.files);
    },
    Upload: function () {
      console.log("Upload!!!", "idSemester:" + this.currentSemesterId, "choosefile : " + this.files);
    },
    loadData: function () {
      request(config.SEMESTERS_URL).then(res => {
        this.contents = res.data.sort((item1, item2) => (item2.idSemester - item1.idSemester));
      }).catch(e => {
        console.error(e);
        this.$router.push('/');
      });
    },
    createSemester: function (semesterData, event) {
      if (isNaN(semesterData.year)) {
        this.errorMessage = "invalid input";
        return
      }
      console.log('click');
      event.stopPropagation();
      event.preventDefault();
      request(config.SEMESTERS_URL, "post", semesterData).then((res) => {
        console.log(res.data);
        this.tabIdx = 0;
        this.loadData();
      }).catch(e => {
        console.error(e);
        this.$router.push('/');
      });
    },
    editSemester: function (contentEdit, event) {
      if (isNaN(semesterData.year)) {
        this.errorMessage = "Invalid input";
        event.stopPropagation();
        event.preventDefault();
        return
      }
      console.log("edit", event);
      event.stopPropagation();
      event.preventDefault();
      request(config.SEMESTERS_URL + contentEdit.idSemester, "PUT", contentEdit).then(res => {
        console.log(res.data);
        this.tabIdx = 0;
        this.loadData();
      }).catch(e => {
        console.error(e);
        this.$router.push('/');
      });
    },

    deleteSemester: function (idSemester) {
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
    selectChanged: function (selectedItem, selectedIdx) {
      console.log("selectInte" + selectedItem);
      this.semesterData.semesterIndex = selectedIdx
    },
  },

  template,
  components: {
    DropdownList
  }
};
export default { path: "/semester", component: component }