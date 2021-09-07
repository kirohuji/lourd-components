import BaseMonacoEditor from "./BaseMonacoEditor";
import DataForm from "./DataForm";
import DataSearchForm from "./DataSearchForm";
import DataTable from "./DataTable";
import StepTabs from "./StepTabs";
import Thenable from "./Thenable";

const installComponents = [
  BaseMonacoEditor,
  Thenable,
  DataForm,
  DataSearchForm,
  DataTable,
  StepTabs,
];
const install = function (Vue) {
  installComponents.forEach((component) => {
    Vue.component(component.name, component);
  });
};
export default {
  install,
  BaseMonacoEditor,
  Thenable,
  DataForm,
  DataSearchForm,
  DataTable,
  StepTabs,
};
