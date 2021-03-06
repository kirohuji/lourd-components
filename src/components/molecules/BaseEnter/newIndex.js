import { isFunction, isObject, pick, omit, isBoolean } from "lodash";
import { dictionaries } from "../../../composables/context-cache";
import Thenable from "@/components/atoms/Thenable";
import emitter from 'element-ui/src/mixins/emitter'
export default {
  name: "BaseEnter",
  componentName: "BaseEnter",
  components: {
    Thenable,
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
  mixins: [emitter],
  data() {
    return {
      initialized: false,
      innerValue: undefined,
      thenableKey: "",
      component: undefined,
      isThenable: false,
      props: undefined,
      attrs: undefined,
      loading: false,
    };
  },
  methods: {
    renderChildren(children, innerH) {
      return this.checkRunner(children) ? (
        <Thenable
          {...{
            props: children.options,
            scopedSlots: {
              default: ({ result }) => {
                if (!result.loading && !this.initialized) {
                  this.initialized = true;
                  this.loading = false;
                  result.onAfter &&
                    this.$emit("input", result.onAfter.call(this, result.data));
                }
                if (result.loading) {
                  this.loading = true;
                } else {
                  this.loading = false;
                }
                return (
                  <div>
                    {!result.loading &&
                      result.data.map((item, index) => {
                        return this.renderChildrenComponent(
                          children.use,
                          item,
                          index,
                          innerH
                        );
                      })}
                  </div>
                );
              },
            },
          }}
        />
      ) : (
        children.options?.map((item, index) =>
          this.renderChildrenComponent(children.use, item, index, innerH)
        )
      );
    },
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
    checkPropsAndAttrs() {
      const property = this.$attrs;
      this.component = this.$baseComponents[this.use];
      if (this.component.props) {
        if (Array.isArray(this.component.props)) {
          this.props = pick(property, this.component.props);
          this.attrs = omit(property, [...this.component.props, "children"]);
        } else {
          this.props = pick(property, Object.keys(this.component.props));
          this.attrs = omit(property, [
            ...Object.keys(this.component?.props),
            "children",
          ]);
        }
      }
    },
    renderComponent(h, { data, loading }) {
      return h(this.component, {
        directives: [
          {
            name: "loading",
            value: isBoolean(loading) ? loading : this.loading,
          },
        ],
        props: {
          ...this.props,
          [this.thenableKey]: data,
          value: this.$attrs.value,
        },
        attrs: {
          ...this.attrs,
          [this.thenableKey]: data,
        },
        on: this.$listeners,
        ref: "parent",
        // 判断子节点
        scopedSlots: this.$attrs.children
          ? {
              [this.$attrs.children.slot || "default"]: () =>
                this.renderChildren(this.$attrs.children, h),
            }
          : this.$scopedSlots,
      });
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
    functional() {
      Reflect.ownKeys(this.$attrs).forEach((key) => {
        if (isFunction(this.$attrs[key])) {
          this.$attrs[key] = this.$attrs[key].call(this);
        }
        if (isObject(this.$attrs[key]) && this.$attrs[key].runner) {
          this.isThenable = this.$attrs[key];
          this.thenableKey = key;
        }
        this.checkCached(this.$attrs[key]);
      });
    },
  },
  created() {
    this.innerValue = this.$attrs.value;
    this.functional();
    this.checkPropsAndAttrs();
  },
  render(h) {
    return this.isThenable ? (
      <Thenable
        {...{
          props: this.isThenable,
          scopedSlots: {
            default: ({ result: { loading, data, onAfter } }) => {
              this.loading = loading;
              if (!loading && !this.initialized) {
                this.initialized = true;
                onAfter && this.$emit("input'", onAfter.call(this, data));
              }
              return this.renderComponent(h, {
                data: data,
                loading: loading,
              });
            },
          },
        }}
      />
    ) : (
      this.renderComponent(h, {
        loading: false,
      })
    );
  },
};
