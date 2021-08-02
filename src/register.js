const components = [];
const install = function (Vue, opts = {}) {
  console.log(opts)
  components.forEach((component) => {
    Vue.component(component.name, component);
  });
};
export default install