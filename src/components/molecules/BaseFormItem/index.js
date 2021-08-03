import { FormItem } from "element-ui";
import BaseEnter from "../BaseEnter";
import _ from "lodash";
export default {
  name: "BaseFormItem",
  inject: {
    model: {
      from: "model",
      default: {},
    },
  },
  props: ["item", "value"],
  inheritAttrs: false,
  data() {
    return {
      innerValue: undefined,
    };
  },
  watch: {
    value(val) {
      if (val) {
        this.initData(val);
      }
    },
  },
  methods: {
    initData(value) {
      this.innerValue = _.cloneDeep(value);
    },
  },
  created() {
    this.initData(this.value);
  },
  render() {
    return (
      <FormItem
        {...{
          props: this.item,
        }}
      >
        <BaseEnter
          {...{
            props: {
              use: this.item?.use || this.$attrs.use,
            },
            attrs: this.item || this.$attrs,
            on: this.$listeners,
          }}
          vModel={this.innerValue}
        />
      </FormItem>
    );
  },
};
