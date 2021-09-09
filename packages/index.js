import BaseMonacoEditor from "./BaseMonacoEditor";
import DataForm from "./DataForm";
import DataSearchForm from "./DataSearchForm";
import DataTable from "./DataTable";
import StepTabs from "./StepTabs";
import Thenable from "./Thenable";
import BaseDialog from "./BaseDialog";
import BaseEnter from "./BaseEnter";
import DataCacheSearchForm from "./DataCacheSearchForm";
import DataDialog from "./DataCacheSearchForm";
import EditTable from "./EditTable";
const installComponents = [
  BaseMonacoEditor,
  BaseDialog,
  BaseEnter,
  Thenable,
  DataDialog,
  DataForm,
  DataCacheSearchForm,
  DataSearchForm,
  DataTable,
  EditTable,
  Thenable,
  StepTabs,
];
const install = function (Vue) {
  installComponents.forEach((component) => {
    Vue.component(component.name, component);
  });
};
if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}
export default {
  install,
  BaseMonacoEditor,
  BaseDialog,
  BaseEnter,
  Thenable,
  DataDialog,
  DataForm,
  DataCacheSearchForm,
  DataSearchForm,
  DataTable,
  EditTable,
  StepTabs,
};
