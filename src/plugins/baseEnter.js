import Vue from "vue";
import {
  Input,
  Cascader,
  DatePicker,
  Select,
  RadioGroup,
  Radio,
  Option,
  CheckboxGroup,
  Checkbox,
} from "element-ui";
import Inline from "@/components/molecules/Layout/inline";
import RowGrid from "@/components/molecules/Layout/row-grid";
import BaseSearch from "@/components/molecules/BaseSearch";
import BaseRadio from "@/components/molecules/BaseRadio";
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
  checkbox: Checkbox,
  "checkbox-group": CheckboxGroup,
  "radio-group": RadioGroup,
  radio: Radio,
  "base-radio": BaseRadio,
  inline: Inline,
  "row-grid": RowGrid,
  search: BaseSearch,
};

Vue.prototype.$baseComponents = components;
