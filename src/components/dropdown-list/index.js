import template from './template.html';
import style from './style.scss';
let component = {
  template,
  props: ['items', 'selectedIndex', 'loadItemsFn', 'itemLabelFn', 'itemIconFn', 'onSelectChanged'],
  data: function() {
    return {
      dataItems: [],
      selectedIdx: 0,
      showDropdown: false
    }
  },
  created: function() {
    if (this.items) {
      this.dataItems = this.items
    }
    else if (this.loadItemsFn) {
      this.loadItemsFn().then(items => {
        this.dataItems = items;
      }).catch(
        e => console.error(e)
      );
    }
    this.selectedIdx = this.selectedIndex || 0;
  },
  watch: {
    items: function(values) {
      this.dataItems = this.items;
    }
  },
  methods: {
    itemLabel: function(item) {
      let label = (this.itemLabelFn && this.itemLabelFn(item)) || item;
      return label;
    },
    selectItem: function(oldIdx, newIdx) {
      if (oldIdx !== newIdx) {
        this.onSelectChanged && this.onSelectChanged(this.dataItems[newIdx], newIdx);
      }
    },
    toggleDropdown: function() {
      this.showDropdown = ! this.showDropdown;
      this.$nextTick(() => {
        this.$refs['itemList'].focus();
      });
    },
    onFocus: function() {
      console.log("focus");
    },
    onBlur: function() {
      console.log('blur');
    }
  },
  computed: {
    selectedItemLabel: function() {
      if (this.dataItems[this.selectedIdx]) {
        return this.itemLabel(this.dataItems[this.selectedIdx]);
      }
      return "nothing";
    }
  }
}
export default component;
