import Vue from 'vue';
import template from './template.html';

let component = {
    data: function() {
        return {
            tabIdx: 0,
        };
    },
    template,
}

export default { path:"/student", component:component }
