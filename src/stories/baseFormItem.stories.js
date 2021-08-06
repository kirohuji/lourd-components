import BaseFormItem from "../components/molecules/BaseFormItem";
import { Form } from "element-ui";
export default {
  title: "Design System/Molecules/BaseFormItem",
};
const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  data: () => ({
    value: 1,
  }),
  render() {
    return (
      <Form>
        <BaseFormItem
          use="input"
          size="mini"
          value={this.value}
          style="width: 200px"
          {...{
            attrs: this.$props,
          }}
        />
      </Form>
    );
  },
});
export const withBasic = Template.bind({});
withBasic.args = {
  prop: "name",
  label: "名称",
  required: true,
  error: "",
  "show-message": false,
  rules: [
    { required: true, message: "请输入内容", trigger: "blur" },
    { required: true, message: "请输入内容", trigger: "change" },
  ],
  size: "mini",
};
withBasic.argTypes = {
  size: {
    description: "Element ui 组件自带的属性：组件大小",
    options: ["medium", "small", "mini"],
    control: { type: "radio" },
  },
};
export const withAttrs = () => ({
  render() {
    return (
      <Form>
        <BaseFormItem
          use="select"
          size="mini"
          children={{
            use: "option",
            options: [
              { label: 1, value: 1 },
              { label: 2, value: 2 },
            ],
          }}
          prop="name"
          value={1}
        />
      </Form>
    );
  },
});
export const withItem = () => ({
  render() {
    const item = {
      use: "select",
      size: "mini",
      prop: "name",
      children: {
        use: "option",
        options: [
          { label: 1, value: 1 },
          { label: 2, value: 2 },
        ],
      },
    };
    return (
      <Form>
        <BaseFormItem item={item} value={1} />
      </Form>
    );
  },
});
