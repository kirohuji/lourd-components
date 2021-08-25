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
import EditTable from "./components/template/EditTable/index.js";
import BaseSearch from "./components/molecules/BaseSearch";
import {
  Input,
  Cascader,
  DatePicker,
  Select,
  RadioGroup,
  Radio,
  Option,
} from "element-ui";
import Inline from "./components/molecules/Layout/inline";
import RowGrid from "./components/molecules/Layout/row-grid";
const Label = ({ props: { value } }) => <span>{value} </span>;
const HtmlText = ({ props: { value } }) => <div domPropsInnerHTML={value} />;
export const components = {
  input: Input,
  cascader: Cascader,
  label: Label,
  html: HtmlText,
  "date-picker": DatePicker,
  select: Select,
  option: Option,
  "radio-group": RadioGroup,
  radio: Radio,
  inline: Inline,
  "row-grid": RowGrid,
  search: BaseSearch,
};
const installComponents = [
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
  EditTable,
];
const install = function (Vue, opts) {
  installComponents.forEach((component) => {
    Vue.component(component.name, component);
  });
  Vue.prototype.$baseComponents = Object.assign(components, opts.baseEnter);
};
/* istanbul ignore if */
if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

export default {
  install,
  ...installComponents,
};
