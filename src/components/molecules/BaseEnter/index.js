import { isFunction } from "lodash";
import { components } from "../../../index";
import { dictionaries } from "../../../composables/context-cache";
export default {
  name: "BaseEnter",
  components: {},
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
      components: this.$baseComponents || components,
    };
  },
  methods: {
    checkCached(target) {
      if (target.cache) {
        if (!this.$cache[target.cache]) {
          this.$cache[target.cache] = dictionaries(target.cache);
        }
        target.options = this.$cache[target.cache](target.options);
      }
    },
  },
  render(h) {
    Reflect.ownKeys(this.$attrs).map(
      (key) =>
        isFunction(this.$attrs[key]) &&
        ((this.$attrs[key] = this.$attrs[key].call(this)),
        this.checkCached(this.$attrs[key]))
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
