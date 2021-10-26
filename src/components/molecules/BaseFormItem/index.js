import { FormItem } from "element-ui";
import BaseEnter from "../BaseEnter/newIndex";
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
            vModel={this.$attrs.value[this.item.prop]}
            {...{
              props: {
                use: this.item?.use || this.$attrs.use,
              },
              attrs: this.item || this.$attrs,
              on: {
                ...this.$listeners,
              },
            }}
          />
        )}
      </FormItem>
    );
  },
};
