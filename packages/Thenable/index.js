import Thenable from "@/components/atoms/Thenable";
Thenable.install = function (Vue) {
  Vue.component(Thenable.name, Thenable);
};
export default Thenable;
