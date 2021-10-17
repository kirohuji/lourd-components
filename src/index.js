import "./plugins/element.js";
import NoContnetShow from "./components/atoms/NoContentShow";
import Card from "./components/atoms/Card";
import BaseEnter from "./components/molecules/BaseEnter/newIndex";
import BaseDialog from "./components/molecules/BaseDialog";
import BaseEchart from "./components/molecules/BaseEchart";
import BaseFormItem from "./components/molecules/BaseFormItem";
import BaseRadio from "./components/molecules/BaseRadio";
import DataCacheSearchForm from "./components/organisms/DataCacheSearchForm";
import DataForm from "./components/organisms/DataForm";
import DataSearchForm from "./components/organisms/DataSearchForm";
import DataTable from "./components/organisms/DataTable";
import DataDialog from "./components/organisms/DataDialog/index.js";
import ManagerTable from "./components/template/ManagerTable";
import EditTable from "./components/template/EditTable/index.js";
import StepTabs from "./components/organisms/StepTabs/index.js";
import QuestionDialog from "./components/molecules/QuestionDialog/index.js";
import QuestionOption from "./components/molecules/QuestionOption/index.js";
import BaseMonacoEditor from "./components/molecules/BaseMonacoEditor/index.js";
const installComponents = [
  NoContnetShow,
  Card,
  BaseEnter,
  BaseDialog,
  BaseEchart,
  BaseFormItem,
  BaseMonacoEditor,
  DataCacheSearchForm,
  DataForm,
  DataSearchForm,
  DataTable,
  DataDialog,
  ManagerTable,
  EditTable,
  BaseRadio,
  StepTabs,
  QuestionDialog,
  QuestionOption,
];
const install = function (Vue) {
  installComponents.forEach((component) => {
    Vue.component(component.name, component);
  });
};
/* istanbul ignore if */
if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

export default {
  install,
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
  DataDialog,
  ManagerTable,
  EditTable,
  BaseRadio,
  StepTabs,
  QuestionDialog,
  QuestionOption,
};
