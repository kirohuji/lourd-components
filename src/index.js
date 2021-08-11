import "./plugins/element.js";
import NoContnetShow from "./components/atoms/NoContentShow";
import Card from "./components/atoms/Card";
import BaseEnter from "./components/molecules/BaseEnter";
import BaseDialog from "./components/molecules/BaseDialog";
import BaseEchart from "./components/molecules/BaseEchart";
import BaseFormItem from "./components/molecules/BaseFormItem";
import DataCacheSearchForm from "./components/organisms/DataCacheSearchForm";
import DataForm from "./components/organisms/DataForm";
import DataSearchForm from "./components/organisms/DataSearchForm";
import DataTable from "./components/organisms/DataTable";
import ManagerTable from "./components/template/ManagerTable";
const components = [
  NoContnetShow,
  Card,
  BaseEnter,
  BaseDialog,
  BaseEchart,
  BaseFormItem,
  DataCacheSearchForm,
  DataForm,
  DataSearchForm,
  DataTable,
  ManagerTable,
];
const install = function (Vue) {
  components.forEach((component) => {
    Vue.component(component.name, component);
  });
};
/* istanbul ignore if */
if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

export default {
  version: "0.1.6",
  install,
  ...components,
};
