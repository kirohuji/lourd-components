import BaseMonacoEditor from "./BaseMonacoEditor";
import DataForm from "./DataForm";
import DataSearchForm from "./DataSearchForm";
import DataTable from "./DataTable";
import StepTabs from "./StepTabs";
import Thenable from "./Thenable";
import BaseDialog from "./BaseDialog";
import BaseFormDialog from "./BaseFormDialog";
import BaseEnter from "./BaseEnter";
import DataCacheSearchForm from "./DataCacheSearchForm";
import DataDialog from "./DataDialog";
import EditTable from "./EditTable";
import BaseEnterProvider from "../src/plugins/baseEnter";
import ThenableProvider from "../src/plugins/thenable";
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
  BaseFormDialog,
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
  BaseEnterProvider,
  ThenableProvider,
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
  BaseFormDialog,
};
