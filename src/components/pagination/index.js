import template from './template.html';
import style from './style.scss';

const PAGE_SIZE = 20;
function subarray(array, from, to) {
  var self = this, arr = [];
  for(let i = from; i < to; i++){
    arr.push(array[i]);
  }
  return arr;
}

let component = {
  template,
  props: ['items', 'currentPage', 'fields', 'onHeaderClicked', 'actions', 'rowClassFn'],
  data: function() {
    return {
      rCurrentPage: 1,
      //_paginationList: []
    }
  },
  created: function() {
    this.rCurrentPage = this.currentPage || 1;
    //this._paginationList = this.generateList()
  },
  computed: {
    cItems: function() {
      if (this.items.length <= 20) 
        return this.items;
      return subarray(this.items, (this.rCurrentPage - 1) * PAGE_SIZE, Math.min(this.rCurrentPage * PAGE_SIZE, this.items.length));
    },
    cPageNum : function() {
      return Math.ceil(this.items.length/PAGE_SIZE);
    },
    cPaginationList: function() {
      let pageNum = Math.ceil(this.items.length / PAGE_SIZE);
      if (pageNum <= 9) 
        return Array.from(new Array(pageNum).keys()).map(item => ({
          pageIndex: item + 1,
          type: 'pagination-link'
        }));
      
      let toReturn = [];
      for (let i = 0; i < 3; i++) {
        toReturn.push({
          pageIndex: i + 1,
          type: 'pagination-link'
        });
      }
      if (this.rCurrentPage > 3 && this.rCurrentPage < pageNum - 2) {
        if (this.rCurrentPage > 4) {
          toReturn.push({
            type: 'pagination-ellipsis'
          });
        }
        console.log(Math.max(this.rCurrentPage - 2, 3), Math.min(this.rCurrentPage + 1, pageNum - 3));
        for (let i = Math.max(this.rCurrentPage - 2, 3); i < Math.min(this.rCurrentPage + 1, pageNum - 3); i++) {
          toReturn.push({
            pageIndex: i + 1,
            type: 'pagination-link'
          });
        }
      }
      toReturn.push({
        type: 'pagination-ellipsis'
      });
      for (let i = pageNum - 3; i < pageNum; i++) {
        toReturn.push({
          pageIndex: i + 1,
          type: 'pagination-link'
        });
      }
      return toReturn;
    }
  },
  methods: {
    navigate: function(pageIndex) {
      let pageNum = Math.ceil(this.items.length / PAGE_SIZE);
      if (pageIndex <= 0) return;
      if (pageIndex > pageNum) return;
      console.log('go to ', pageIndex);
      this.rCurrentPage = pageIndex;
    },
    showField: function(field, item) {
      let v = item[field.value || field];
      if (field.fn) return field.fn(v);
      return v
    },
    headerClick: function(field) {
      if (this.onHeaderClicked) this.onHeaderClicked(field);
    }
  }
}
export default component;
