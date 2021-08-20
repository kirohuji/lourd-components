import { isFunction } from "lodash";
import { components } from "../../../index";
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
  data() {
    return {
      components: this.$baseComponents || components,
    };
  },
  render(h) {
    Reflect.ownKeys(this.$attrs).map(
      (key) =>
        isFunction(this.$attrs[key]) &&
        (this.$attrs[key] = this.$attrs[key].call(this))
    );
    return h(this.components[this.use], {
      props: this.$attrs,
      attrs: this.$attrs,
      on: this.$listeners,
      scopedSlots: this.$attrs.children
        ? {
            [this.$attrs.children.slot || "default"]: () =>
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
