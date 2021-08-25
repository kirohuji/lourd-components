import { isFunction, isObject } from "lodash";
import { components } from "../../../index";
import Thenable from "@/components/atoms/Thenable";
import { dictionaries } from "../../../composables/context-cache";
export default {
  name: "BaseEnter",
  components: {
    Thenable,
  },
  inject: {
    // organisms: {
    //   from: "organisms",
    //   default: {},
    // },
    template: {
      from: "template",
      default: {},
    },
    // model: {
    //   from: "model",
    //   default: {},
    // },
    // form: {
    //   from: "form",
    //   default: [],
    // },
  },
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
      thenableKey: "",
      isThenable: false,
      components: this.$baseComponents || components,
    };
  },
  methods: {
    checkCached(target) {
      if (isObject(target) && target.cache && !target.runner) {
        if (!this.$cache[target.cache]) {
          this.$cache[target.cache] = dictionaries(target.cache);
        }
        target.options = this.$cache[target.cache](target.options);
      }
    },
  },
  render(h) {
    Reflect.ownKeys(this.$attrs).forEach((key) => {
      if (isFunction(this.$attrs[key])) {
        this.$attrs[key] = this.$attrs[key].call(this);
        if (this.$attrs[key].runner) {
          this.isThenable = this.$attrs[key];
          this.thenableKey = key;
        }
      }
      this.checkCached(this.$attrs[key]);
    });
    const render = ({ data, loading }) =>
      h(this.components[this.use], {
        directives: [
          {
            name: "loading",
            value: loading,
          },
        ],
        props: {
          ...this.$attrs,
          [this.thenableKey]: data,
        },
        attrs: {
          ...this.$attrs,
          [this.thenableKey]: data,
        },
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
    return this.isThenable ? (
      <Thenable
        {...{
          props: this.isThenable,
          scopedSlots: {
            default: ({ result: { loading, data } }) =>
              render({
                data: data,
                loading: loading,
              }),
          },
        }}
      />
    ) : (
      render({})
    );
  },
};
