import {
  Input,
  Cascader,
  DatePicker,
  Select,
  RadioGroup,
  Radio,
  Option,
} from "element-ui";
import { isFunction } from "lodash";
import Inline from "../Layout/inline";
import RowGrid from "../Layout/row-grid";
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
  "radio": Radio,
  inline: Inline,
  "row-grid": RowGrid,
};
export default {
  name: "BaseEnter",
  components: {},
  props: {
    /**
     * 要渲染的组件名称
     */
    use: {
      type: String,
      required: true,
      default: false,
    },
  },
  inheritAttrs: false,
  data: () => ({
    components: components,
  }),
  render(h) {
    Reflect.ownKeys(this.$attrs).map(
      (key) =>
        isFunction(this.$attrs[key]) && (this.$attrs[key] = this.$attrs[key]())
    );
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
                    key: index + new Date(),
                  },
                  item.label
                )
              ),
          }
        : this.$scopedSlots,
    });
  },
};
