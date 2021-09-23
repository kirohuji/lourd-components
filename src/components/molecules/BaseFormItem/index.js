import { FormItem } from "element-ui";
import BaseEnter from "../BaseEnter";
import _ from "lodash";
import emitter from "element-ui/src/mixins/emitter";
export default {
  name: "BaseFormItem",
  inject: {
    model: {
      from: "model",
      default: {},
    },
    form: {
      from: "form",
      default: {},
    },
  },
  mixins: [emitter],
  props: ["item"],
  inheritAttrs: false,
  data() {
    return {
      innerValue: undefined,
    };
  },
  watch: {
    innerValue() {
      if (this.item.isReal) {
        this.dispatch("DataSearchForm", "search");
      }
    },
    "$attrs.value"(val) {
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
    this.initData(this.$attrs.value);
  },
  render() {
    return (
      <FormItem
        {...{
          props: {
            ...this.$attrs,
            ...this.item,
          },
        }}
      >
        {this.form.question ? (
          <BaseEnter
            {...{
              props: {
                use: this.item?.use || this.$attrs.use,
              },
              attrs: this.item || this.$attrs,
              on: this.$listeners,
            }}
          />
        ) : (
          <BaseEnter
            {...{
              props: {
                use: this.item?.use || this.$attrs.use,
              },
              attrs: this.item || this.$attrs,
              on: {
                input: (val) => (this.innerValue = val),
                ...this.$listeners,
              },
            }}
            value={this.innerValue}
            // vModel={this.innerValue}
          />
        )}
      </FormItem>
    );
  },
};
