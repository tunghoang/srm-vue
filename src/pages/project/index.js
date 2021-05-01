import Vue from 'vue';
import _ from 'lodash';
import template from './template.html';
import DropdownList from '../../components/dropdown-list';
import Pagination from '../../components/pagination';
import config from '../../config';
import request from '../../apis';
import {handleError} from '../../apis';
import {isEmailError,isEmpty} from '../../check-input'
import advisor from '../advisor';

let component = {
  props: ['idStudent', 'idAdvisor', 'idSemester', 'idProjecttype', 'status'],
  data: function (){
    return {
      contents: [],
      tabIdx: 0,
      projectData: {},
      contentEdit: {},
      currentProjectId:null,
      emailError:false,
      errorMessage: "",
      projecttypes:[],
      semesters: [],
      advisors: [],
      projectStatuses:["--status--","on-going",'finish'],
      searchText:"",
      searchTitle:"",
      searchIdAdvisor:null,
      searchIdProjecttype: null,
      projectFields: null,
      projectActions: null,
      searchAdvisors: null,
      searchMembers: null,
      orderField: null,
      descending: false
    };
  },
  watch: {
    status: function() {
      this.doInit();
    }
  },
  created: function() {
    this.handleError = handleError.bind(this);
    if (this.idAdvisor) {
      this.projectFields = [{
        value: 'idProject',
        label: 'id'
      },{
        value: 'project_title', 
        label: 'Title'
      }, {
        value: 'semester_year',
        label: 'Year'
      }, {
        value: 'semester_semesterIndex',
        label: 'HK',
        fn: (v) => v + 1
      }, {
        value: 'project_status', 
        label: 'Status'
      }, {
        value: 'student',
        label: 'Student'
      },{
        value: 'studentNumber',
        label: 'MSSV',
        klass: {
          'icon-arrow-down': this.orderField === 'studentNumber' && this.descending,
          'icon-arrow-up': this.orderField === 'studentNumber' && !this.descending
        }
      }, {
        value: 'confirmedAdvisors',
        label: 'Advisors',
        klass: {
          'icon-arrow-down': this.orderField === 'advisors' && this.descending,
          'icon-arrow-up': this.orderField === 'advisors' && !this.descending
        }
      }, {
        value: 'unconfirmedAdvisors',
        label: 'Advisor (unconfirmed)',
        klass: 'has-text-danger'
      },{
        value: 'grade', 
        label: 'Grade'
      }];

      this.projectActions = [{
        class: 'icon-pencil-alt',
        fn: this.gotoEditProject
      }/*, {
        classFn: (item) => ({
          'icon-check-box has-text-success': true,
          'is-hidden': item.confirmed
        }),
        tooltip:'Accept project',
        fn: this.acceptProject
      }, {
        classFn: (item) => ({
          'icon-na has-text-danger': true,
          'is-hidden': item.confirmed
        }),
        tooltip:'Refuse project',
        fn: this.refuseProject
      }*/];
    }
    else {
      this.projectFields = [{
        value: 'idProject',
        label: 'id',
        klass: {
          'icon-arrow-down': this.orderField === 'idProject' && this.descending,
          'icon-arrow-up': this.orderField === 'idProject' && !this.descending
        }

      },{
        value: 'project_title', 
        label: 'Title',
        klass: {
          'icon-arrow-down': this.orderField === 'project_title' && this.descending,
          'icon-arrow-up': this.orderField === 'project_title' && !this.descending
        }

      }, {
        value: 'semester_year',
        label: 'Year',
        klass: {
          'icon-arrow-down': this.orderField === 'semester_year' && this.descending,
          'icon-arrow-up': this.orderField === 'semester_year' && !this.descending
        }

      }, {
        value: 'semester_semesterIndex',
        label: 'HK',
        fn: (v) => v + 1
      }, {
        value: 'project_status', 
        label: 'Status',
        klass: {
          'icon-arrow-down': this.orderField === 'project_status' && this.descending,
          'icon-arrow-up': this.orderField === 'project_status' && !this.descending
        }

      }, {
        value: 'student',
        label: 'Student',
        klass: {
          'icon-arrow-down': this.orderField === 'student' && this.descending,
          'icon-arrow-up': this.orderField === 'student' && !this.descending
        }

      }, {
        value: 'studentNumber',
        label: 'MSSV',
        klass: {
          'icon-arrow-down': this.orderField === 'studentNumber' && this.descending,
          'icon-arrow-up': this.orderField === 'studentNumber' && !this.descending
        }

      }, {
        value: 'confirmedAdvisors',
        label: 'Advisors',
        klass: {
          'icon-arrow-down': this.orderField === 'advisors' && this.descending,
          'icon-arrow-up': this.orderField === 'advisors' && !this.descending
        }
      }, {
        value: 'unconfirmedAdvisors',
        label: 'Advisor (unconfirmed)',
        klass: 'has-text-danger'
      },{
        value: 'project_type',
        label: 'Type',
        klass: {
          'icon-arrow-down': this.orderField === 'project_type' && this.descending,
          'icon-arrow-up': this.orderField === 'project_type' && !this.descending
        }

      },{
        value: 'grade', 
        label: 'Grade',
        klass: {
          'icon-arrow-down': this.orderField === 'grade' && this.descending,
          'icon-arrow-up': this.orderField === 'grade' && !this.descending
        }

      }];
      this.projectActions = [{
        class: 'icon-pencil-alt',
        fn: this.gotoEditProject
      }]
    }
    this.doInit();
  },
  methods: {
    doInit: async function() {
      if(this.idStudent || this.idAdvisor){
        this.loadData();
      }
      else {
        await this.loadDataStaff();
        //await this.loadData();
      }
    },
    semesterLabel: function(prj){
      console.log(prj);
      return `HK${prj.semesterIndex + 1} ${prj.year}-${prj.year + 1}`;
    },
    loadDataStaff: async function(){
      console.log();
      try {
        let response = await request(config.PROJECTTYPE_URL,"GET");
        this.projecttypes =response.data;
        this.projecttypes.unshift({name: "--projecttype--"});
        response = await request(config.SEMESTERS_URL,"GET");
        this.semesters = response.data;
        this.semesters.unshift({});
        response = await request(config.ADVISOR_URL,"GET");
        this.advisors = response.data;
        this.advisors.unshift({fullname: "--advisor--"});
      }
      catch(e) {
        this.errorMessage = this.handleError(e);
      }
    },
    loadData: async function() {
      let criteria = {};
      if (this.idAdvisor) {
        criteria.idAdvisor = this.idAdvisor;
      }
      if (this.idStudent) {
        criteria.idStudent = this.idStudent;
      }
      if (this.idSemester) {
        criteria.idSemester = this.idSemester;
      }
      if (this.idProjecttype) {
        criteria.idProjecttype = this.idProjecttype;
      }
      if (this.status) {
        criteria.status = this.status;
      }
      try {
        this.contents = (await request(config.PROJECT_URL, 'PUT', criteria)).data.map(item => {
          //let members = item.members.split(',');
          //item.members = _.uniq(members).join(',');
          let advisors = (item.advisors || "").split(',');
          let confirmedAdvisors = [];
          let unconfirmedAdvisors = [];
          let confirmeds = JSON.parse(item.confirmeds)
          for (let i = 0; i < confirmeds.length; i++) {
            if (confirmeds[i]) {
              confirmedAdvisors.push(advisors[i]);
            }
            else {
              unconfirmedAdvisors.push(advisors[i]);
            }
          }
          item.confirmedAdvisors = confirmedAdvisors.join(',');
          item.unconfirmedAdvisors = unconfirmedAdvisors.join(',');
          return item;
        }).sort((item1, item2) => (item2.idProject - item1.idProject));
      }
      catch(e) {
        this.errorMessage = this.handleError(e);
      }
    },
    gotoEditProject: function(prj) {
      let targetUrl = `/newproject/idProject/${prj.idProject}`;
      if (this.idStudent) {
        targetUrl += `/idStudent/${this.idStudent}`;
      }
      if (this.idAdvisor) 
        targetUrl += `/idAdvisor/${this.idAdvisor}`;
      this.$router.push({path:targetUrl});
    },
    acceptProject: function(prj) {
      console.log('Confirm Project');
    },
    refuseProject: function(prj) {
      console.log('Refuse Project');
    },
    editProject:function(contentEdit){
      console.log('editProject');
      request(config.PROJECT_URL + contentEdit.idProject, 'PUT', contentEdit).then(res=>{
        console.log(res.data);
        this.tabIdx = 0;
      }).catch(e => {
        console.error(e);
      });
    },
    deleteProject: function(idProject) {
      console.log('delete');
      request(config.PROJECT_URL + idProject, 'delete').then(res => {
        console.log(res.data);
        this.tabIdx = 0;
      }).catch(e => {
        console.error(e);
      });
    },
    search: async function(evt){
      evt.stopPropagation();
      evt.preventDefault();
      let searchProject= {};
      if (this.searchTitle && this.searchTitle.length>0){
        searchProject.title = this.searchTitle;
      }
      if (this.searchAdvisors) {
        searchProject.advisors = this.searchAdvisors;
      }
      if (this.searchMembers) {
        searchProject.members = this.searchMembers;
      }
      if( this.searchIdProjecttype ){
        searchProject.idProjecttype = this.searchIdProjecttype;
      }
      console.log("searchProject", this.searchProject);
      try {
        this.contents = (await request(config.PROJECT_URL, 'PUT', searchProject)).data.map(item => {
          let advisors = (item.advisors || "").split(',');
          let confirmedAdvisors = [];
          let unconfirmedAdvisors = [];
          let confirmeds = JSON.parse(item.confirmeds);
          for (let i = 0; i < confirmeds.length; i++) {
            if (confirmeds[i]) {
              confirmedAdvisors.push(advisors[i]);
            }
            else {
              unconfirmedAdvisors.push(advisors[i]);
            }
          }
          item.confirmedAdvisors = confirmedAdvisors.join(',');
          item.unconfirmedAdvisors = unconfirmedAdvisors.join(',');
          return item;
        }).sort((item1, item2) => (item2.idProject - item1.idProject));
      }
      catch(e) {
        this.errorMessage = this.handleError(e);
      }
    },
    
    getName: function(item){
      return item.name;
    },
    getYear: function(item){
      return item.year;
    },
    getFullname: function(item){
      return item.fullname;
    },
    headerClicked: function(field) {
      console.log(field);
      this.orderField = field.value || field;
      this.descending = !this.descending;
      this.contents = this.contents.sort(this.sorter);
    },
    sorter: function(item1, item2) {
      if (!this.orderField) return 1; 
      switch(this.orderField) {
        case 'studentNumber':
          if (!this.descending) 
            return item2.studentNumber - item1.studentNumber;
          return item1.studentNumber - item2.studentNumber;
        default:
          if (this.descending)
            return item2[this.orderField].localeCompare(item1[this.orderField])
          return item1[this.orderField].localeCompare(item2[this.orderField])
      }
    },
  },
  
  template,
  components: {
    DropdownList, Pagination
  }
};
export default function(path, props) {
  return { path, component, props }
}
