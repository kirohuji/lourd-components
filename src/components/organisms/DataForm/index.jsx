import _ from "lodash";
import BaseFormItem from "../../molecules/BaseFormItem";
import BaseEnter from "../../molecules/BaseEnter";
import "./style.scss";
// import { isObject, isFunction } from "lodash";
// const isPromise = (val) => {
//   return isObject(val) && isFunction(val.then) && isFunction(val.catch);
// };
export default {
  name: "DataForm",
  componentName: "DataForm",
  inheritAttrs: false,
  inject: {
    template: {
      from: "template",
      default: {},
    },
  },
  props: {
    /**
     * 表单配置项
     */
    forms: {
      type: Array,
      required: true,
    },
    layout: {
      type: Object,
      required: false,
    },
    data: {
      type: Object,
      required: false,
    },
    question: {
      type: Boolean,
      required: false,
    },
    collector: {
      type: String,
      required: false,
    },
  },
  provide() {
    return {
      organisms: this,
      form: this,
      model: this.model,
    };
  },
  data() {
    return {
      properties: [],
      model: {},
    };
  },
  watch: {
    data(val) {
      if (val) {
        this.transform();
        this.initData(val);
      }
    },
  },
  created() {
    this.transform();
    if (this.data) {
      this.initData(this.data);
    }
  },
  methods: {
    refs() {
      return this.$refs.form;
    },
    resetFields() {
      this.$refs.form && this.$refs.form.resetFields();
    },
    initData(data) {
      this.model = _.pick(Object.assign(this.model, data), this.properties);
    },
    search() {
      this.$emit("search", this.model);
    },
    currentData() {
      const currentData = {};
      // console.log(this);
      // debugger;
      Object.keys(this.$refs)
        .filter((item) => item.includes("baseFormItem-"))
        .forEach((item) => {
          currentData[this.$refs[item].item.prop] = this.$refs[item].innerValue;
        });
      return currentData;
    },
    transform() {
      this.model = {};
      this.properties = this.forms.map((n) => n.prop);
      this.$set(
        this,
        "model",
        _.zipObject(
          this.properties,
          this.forms.map((n) =>
            _.defaultTo(
              _.isFunction(n.default) ? n.default.call(this) : n.default,
              ""
            )
          )
        )
      );
    },
  },
  render() {
    const uses = this.forms.map((item, index) =>
      Array.isArray(item) ? (
        item.map((rowItem, rowIndex) => (
          <BaseFormItem
            ref={`baseFormItem-${rowIndex}`}
            key={index}
            item={rowItem}
            vModel={this.model[rowItem.prop]}
            {...{
              on: this.$listeners,
            }}
          />
        ))
      ) : (
        <BaseFormItem
          key={index}
          ref={`baseFormItem-${index}`}
          item={item}
          vModel={this.model[item.prop]}
          {...{
            on: {
              ...this.$listeners,
            },
          }}
        />
      )
    );
    return (
      <ElForm
        inline
        ref="form"
        class="data-form"
        {...{
          props: {
            model: this.model,
            ...this.$attrs,
          },
        }}
      >
        {this.$scopedSlots.default ? (
          this.$scopedSlots.default({ uses })
        ) : (
          <BaseEnter
            {...{
              props: {
                use: this.layout.use,
              },
              attrs: {
                uses: uses,
                length: uses.length,
                ...this.layout,
              },
              on: this.$listeners,
            }}
          />
        )}
      </ElForm>
    );
  },
};
