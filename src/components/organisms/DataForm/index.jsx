import _ from "lodash";
import BaseFormItem from "../../molecules/BaseFormItem";
import BaseEnter from "../../molecules/BaseEnter/newIndex";
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
      model: {
        age: 1
      },
      uses: [],
    };
  },
  watch: {
    data(val) {
      if (val) {
        this.transform();
        this.initData(val);
      } else {
        this.model = {};
      }
    },
  },
  created() {
    this.transform();
    if (this.data) {
      this.initData(this.data);
    }
    this.uses = this.forms.map((item, index) =>
      Array.isArray(item) ? (
        item.map((rowItem, rowIndex) => (
          <BaseFormItem
            ref={`baseFormItem-${rowIndex}`}
            key={index}
            item={rowItem}
            {...{
              on: {
                ...this.$listeners,
                input: (val) => this.model[rowItem.prop] = val,
              },
            }}
            value={this.model}
            // vModel={this.model[rowItem.prop]}
          />
        ))
      ) : (
        <BaseFormItem
          key={index}
          ref={`baseFormItem-${index}`}
          item={item}
          {...{
            on: {
              ...this.$listeners,
              input: (val) => this.model[item.prop] = val,
            },
          }}
          value={this.model}
          // vModel={this.model[item.prop]}
        />
      )
    );
  },
  methods: {
    refs() {
      return this.$refs.form;
    },
    resetFields() {
      this.$refs.form && this.$refs.form.resetFields();
    },
    clearFields() {
      this.$set(this, "model", {});
    },
    initData(data) {
      // debugger
      // this.model = _.pick(Object.assign(this.model, data), this.properties);
      this.$set(this, "model", _.pick(data, this.properties));
      // this.$forceUpdate()
      // console.log(this.model)
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
          currentData[this.$refs[item].item.prop] =
            this.$refs[item].$attrs.value;
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
    console.log("更新render");
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
          this.$scopedSlots.default({ uses: this.uses })
        ) : (
          <BaseEnter
            {...{
              props: {
                use: this.layout.use,
              },
              attrs: {
                uses: this.uses,
                length: this.uses.length,
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
