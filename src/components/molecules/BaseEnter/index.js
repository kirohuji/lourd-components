import { isFunction, isObject } from "lodash";
// import { components } from "../../../index";
import Thenable from "@/components/atoms/Thenable";
import { dictionaries } from "../../../composables/context-cache";
export default {
  name: "BaseEnter",
  components: {
    Thenable,
  },
  inject: {
    template: {
      from: "template",
      default: {},
    },
    form: {
      from: "form",
      default: [],
    },
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
    };
  },
  methods: {
    /** 判断是否是有runner作为Thenable的运行参数 */
    checkRunner(target) {
      return isObject(target.options) && target.options.runner;
    },
    /** 判断是否需要进行缓存 */
    checkCached(target) {
      if (isObject(target) && target.cache && !target.runner) {
        if (!this.$cache[target.cache]) {
          this.$cache[target.cache] = dictionaries(target.cache);
        }
        target.options = this.$cache[target.cache](target.options);
      }
    },
    renderChildrenComponent(use, item, index, h) {
      return h(
        this.$baseComponents[use],
        {
          props: item,
          key: index + new Date(),
        },
        item.label
      );
    },
    renderChildren(children, innerH) {
      // debugger;
      return this.checkRunner(children) ? (
        <Thenable
          {...{
            props: children.options,
            scopedSlots: {
              default: ({ result }) => (
                <div>
                  {!result.loading
                    ? result.data.map((item, index) =>
                        this.renderChildrenComponent(
                          children.use,
                          item,
                          index,
                          innerH
                        )
                      )
                    : ""}
                </div>
              ),
            },
          }}
        />
      ) : (
        children.options?.map((item, index) =>
          this.renderChildrenComponent(children.use, item, index, innerH)
        )
      );
    },
  },
  render(h) {
    Reflect.ownKeys(this.$attrs).forEach((key) => {
      if (isFunction(this.$attrs[key])) {
        this.$attrs[key] = this.$attrs[key].call(this);
        if (isObject(this.$attrs[key]) && this.$attrs[key].runner) {
          this.isThenable = this.$attrs[key];
          this.thenableKey = key;
        }
      }
      this.checkCached(this.$attrs[key]);
    });
    const render = ({ data, loading }) =>
      h(this.$baseComponents[this.use], {
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
        // 判断子节点
        scopedSlots: this.$attrs.children
          ? {
              [this.$attrs.children.slot || "default"]: () =>
                this.renderChildren(this.$attrs.children, h),
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
