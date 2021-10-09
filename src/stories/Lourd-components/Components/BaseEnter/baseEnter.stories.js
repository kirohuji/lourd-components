import BaseEnter from "@/components/molecules/BaseEnter/newIndex";
import { components } from "@/plugins/baseEnter";
import { common, commomTypes, cascaderOptions } from "./constants";
export default {
  component: BaseEnter,
  title: "Lourd Components/Components/BaseEnter/输入器 BaseEnter",
  argTypes: {
    use: {
      description: "要渲染的组件的类型",
      type: { name: "string", required: true },
      table: {
        type: { summary: "string" },
      },
      control: {
        type: "text",
      },
    },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: {
    BaseEnter,
  },
  data: () => ({
    value: "text",
  }),
  created() {
    if (this.default) {
      this.value = this.default;
    }
  },
  watch: {},
  template: `
      <BaseEnter
        v-bind="this.$props"
        style="width: 200px"
        :use="use"
        v-model="value"
      />
  `,
  // render() {
  //   if (this.default) {
  //     this.value = this.default;
  //   }
  //   return (
  //     <BaseEnter
  //       {...{
  //         attrs: this.$props,
  //       }}
  //       style="width: 200px"
  //       use={this.use}
  //       vModel={this.value}
  //     />
  //   );
  // },
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
withBasic.storyName = "基本描述";

// 输入组件
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

withInput.storyName = "use = 'input'";

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
      { label: 3, value: 3 },
    ],
  },
  ...common,
};

withSelect.storyName = "use = 'select'";

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

withRadio.storyName = "use = 'radio-group'";

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

withCascader.storyName = "use = 'cascader'";

export const withLabel = Template.bind({ key: "label" });
withLabel.args = {
  use: "label",
};
withLabel.storyName = "use = 'label'";

export const withHtml = Template.bind({ key: "html" });
withHtml.args = {
  use: "html",
  default: "<h2 style='color: red'>123</h2>",
};

withHtml.storyName = "use = 'html'";

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

withDatePicker.storyName = "use = 'date-picker'";

export const withAsyncSelect = Template.bind({ key: "select" });
withAsyncSelect.argTypes = {
  children: {
    description: "配置子组件",
  },
  ...commomTypes,
};
withAsyncSelect.args = {
  use: "select",
  // multiple: true,
  // filterable: true,
  allowCreate: false,
  defaultFirstOption: false,
  children: {
    use: "option",
    options: {
      runner: () => {
        return new Promise((resolve) => {
          setTimeout(
            () =>
              resolve({
                data: [
                  {
                    node_id: 1,
                  },
                  {
                    node_id: 2,
                  },
                  {
                    node_id: 3,
                  },
                ],
              }),
            2000
          );
        });
      },
      variables: {},
      immediate: true,
      initData: function () {
        return [1];
      },
      callback: (data) => {
        return data.map((item) => {
          return {
            label: item.node_id,
            value: item.node_id,
          };
        });
      },
    },
  },
  ...common,
};

withAsyncSelect.storyName = "child thenable";

export const withAsyncSelectTwo = Template.bind({ key: "select" });
withAsyncSelectTwo.argTypes = {
  children: {
    description: "配置子组件",
  },
  ...commomTypes,
};
withAsyncSelectTwo.args = {
  use: "select",
  // multiple: true,
  // filterable: true,
  allowCreate: false,
  defaultFirstOption: false,
  options: {
    cache: "test",
    runner: () => {
      return new Promise((resolve) => {
        console.log("模拟后端请求");
        setTimeout(
          () =>
            resolve({
              data: [
                {
                  node_id: 1,
                },
                {
                  node_id: 2,
                },
                {
                  node_id: 3,
                },
              ],
            }),
          2000
        );
      });
    },
    variables: {},
    immediate: true,
    initData: function () {
      console.log("加载数据");
      return [1];
    },
    callback: (data) => {
      return data.map((item) => {
        return {
          label: item.node_id,
          value: item.node_id,
        };
      });
    },
  },
  children: {
    use: "option",
    cache: "test",
  },
  ...common,
};

withAsyncSelectTwo.storyName = "thenable";
export const withEditor = Template.bind({ key: "editor" });
withEditor.argTypes = {
  ...commomTypes,
};
withEditor.args = {
  use: "editor",
};

withEditor.storyName = "use = 'editor'";


export const withImage = Template.bind({ key: "image" });
withImage.argTypes = {
  ...commomTypes,
};
withImage.args = {
  use: "image-upload",
};

withImage.storyName = "use image-upload";