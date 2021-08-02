import { Input, Cascader, DatePicker, Select, RadioGroup } from "element-ui";
const Label = () => <span>Label </span>;
const HtmlText = {
  template: `<div>html</div>`,
};
const components = new Map([
  ["input", Input],
  ["cascader", Cascader],
  ["label", Label],
  ["html", HtmlText],
  ["date-picker", DatePicker],
  ["select", Select],
  ["radio-group", RadioGroup],
]);
export default {
  name: "BaseEnter",
  components: {},
  props: ["use"],
  data: () => ({
    components: components,
  }),
  render() {
    return this.components.get(this.use);
  },
};
