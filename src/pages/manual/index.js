import Vue from 'vue';
import template from './template.html';
let component = {
  props: ['userClass'],
  template
};
export default function(path, hasProps) {
  return { path, component, props:hasProps}
}
