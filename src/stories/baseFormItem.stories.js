import BaseFormItem from "../components/molecules/BaseFormItem";
import { Form } from "element-ui";
export default {
  title: "molecules/BaseFormItem",
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
export const withItem = () => ({
  render() {
    return (
      <Form>
        <BaseFormItem item={item} value={1} />
      </Form>
    );
  },
});
