import Vue from "vue";
import Element from "element-ui";
import "../element-variables.scss";
Vue.prototype.$cache = {};
window.cache = Vue.prototype.$cache;
Vue.use(Element);
