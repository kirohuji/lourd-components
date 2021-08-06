import BaseEnter, { components } from "../components/molecules/BaseEnter";
const common = {
  disabled: false,
  readonly: false,
  clearable: false,
  size: "mini",
  placeholder: "请输入内容",
};
const commomTypes = {
  size: {
    description: "Element ui 组件自带的属性：组件大小",
    options: ["medium", "small", "mini"],
    control: { type: "radio" },
  },
};
const cascaderOptions = [
  {
    value: "zhinan",
    label: "指南",
    children: [
      {
        value: "shejiyuanze",
        label: "设计原则",
        disabled: true,
      },
      {
        value: "daohang",
        label: "导航",
        children: [
          {
            value: "cexiangdaohang",
            label: "侧向导航",
          },
          {
            value: "dingbudaohang",
            label: "顶部导航",
          },
        ],
      },
    ],
  },
];
export default {
  title: "Design System/Molecules/BaseEnter",
  argTypes: {
    use: {
      description: "要渲染的组件的类型",
      control: {
        type: "text",
      },
    },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  data: () => ({
    value: undefined,
  }),
  render() {
    if (this.default) {
      this.value = this.default;
    }
    return (
      <BaseEnter
        {...{
          attrs: this.$props,
        }}
        style="width: 200px"
        use={this.use}
        vModel={this.value}
      />
    );
  },
});

export const withBasic = Template.bind({ key: "basic" });
withBasic.argTypes = {
  use: {
    description: "要渲染的组件的类型",
    options: Reflect.ownKeys(components),
    control: { type: "radio" },
  },
};
withBasic.args = {
  use: "input",
  ...common,
};

export const withInput = Template.bind({ key: "input" });
withInput.argTypes = {
  type: {
    description: "text，textarea 和其他 原生 input 的 type 值",
    options: ["text", "textarea"],
    control: {
      type: "radio",
    },
  },
  ...commomTypes,
};
withInput.args = {
  use: "input",
  showPassword: false,
  type: "text",
  ...common,
};

export const withSelect = Template.bind({ key: "select" });
withSelect.argTypes = {
  children: {
    description: "配置子组件",
  },
  ...commomTypes,
};
withSelect.args = {
  use: "select",
  multiple: true,
  filterable: true,
  allowCreate: false,
  defaultFirstOption: false,
  children: {
    use: "option",
    options: [
      { label: 1, value: 1 },
      { label: 2, value: 2 },
    ],
  },
  ...common,
};

export const withRadio = Template.bind({ key: "radio" });
withRadio.argTypes = {
  children: {
    description: "配置子组件",
  },
};
withRadio.args = {
  use: "radio-group",
  children: {
    use: "radio",
    options: [
      { label: 1, value: 1 },
      { label: 2, value: 2 },
    ],
  },
  disabled: false,
};

export const withCascader = Template.bind({ key: "cascader" });
withCascader.argTypes = {
  ...commomTypes,
};
withCascader.args = {
  use: "cascader",
  options: cascaderOptions,
  collapseTags: true,
  separator: "/",
  debounce: 300,
  ...common,
};

export const withLabel = Template.bind({ key: "label" });
withLabel.args = {
  use: "label",
  default: "label",
};

export const withHtml = Template.bind({ key: "html" });
withHtml.args = {
  use: "html",
  default: "<h2 style='color: red'>123</h2>",
};
export const withDatePicker = Template.bind({ key: "date-picker" });
withDatePicker.args = {
  use: "date-picker",
  type: "date",
  align: "right",
  size: "mini",
  placeholder: "选择日期",
  format: "yyyy-MM-dd",
  "default-value": "2021-08-06",
};
withDatePicker.argTypes = {
  "default-value": {
    control: {
      type: "date",
    },
  },
  size: {
    description: "Element ui 组件自带的属性：组件大小",
    options: ["medium", "small", "mini"],
    control: { type: "radio" },
  },
  align: {
    options: ["left", "center", "right"],
    control: {
      type: "radio",
    },
  },
  type: {
    options: [
      "year",
      "month",
      "date",
      "dates",
      "week",
      "datetime",
      "datetimerange",
      "daterange",
      "monthrange",
    ],
    control: {
      type: "select",
    },
  },
};
