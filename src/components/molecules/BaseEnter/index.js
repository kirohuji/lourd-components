import {
  Input,
  Cascader,
  DatePicker,
  Select,
  RadioGroup,
  Option,
} from "element-ui";
import { isFunction } from "lodash";
import Inline from "../Layout/inline";
const Label = ({ props: { value } }) => <span>{value} </span>;
const HtmlText = ({ props: { value } }) => <div domPropsInnerHTML={value} />;
const components = {
  input: Input,
  cascader: Cascader,
  label: Label,
  html: HtmlText,
  "date-picker": DatePicker,
  select: Select,
  option: Option,
  "radio-group": RadioGroup,
  inline: Inline,
};
export default {
  name: "BaseEnter",
  components: {},
  props: ["use"],
  inheritAttrs: false,
  data: () => ({
    components: components,
  }),
  render(h) {
    Reflect.ownKeys(this.$attrs).map(
      (key) =>
        isFunction(this.$attrs[key]) && (this.$attrs[key] = this.$attrs[key]())
    );
    console.log(this.$attrs, this.$props);
    return h(this.components[this.use], {
      props: this.$attrs,
      attrs: this.$attrs,
      on: this.$listeners,
      scopedSlots: this.$attrs.children
        ? {
            default: () =>
              this.$attrs.children.options?.map((item, index) =>
                h(
                  this.components[this.$attrs.children.use],
                  {
                    props: item,
                    key: index,
                  },
                  item.label
                )
              ),
          }
        : this.$scopedSlots,
    });
  },
};
