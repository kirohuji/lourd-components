import _ from "lodash";
import BaseFormItem from "../../molecules/BaseFormItem";
import BaseEnter from "../../molecules/BaseEnter";
import "./style.scss";
export default {
  name: "DataForm",
  inheritAttrs: false,
  props: ["forms", "layout", "data"],
  provider() {
    return {
      form: this,
      model: this.model,
    };
  },
  data() {
    return {
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
      this.model = Object.assign(this.model, data);
    },
    search() {
      this.$emit("search", this.model);
    },
    transform() {
      this.model = {};
      this.$set(
        this,
        "model",
        _.zipObject(
          this.forms.map((n) => n.prop),
          this.forms.map((n) => _.defaultTo(n.default, ""))
        )
      );
    },
  },
  render() {
    const uses = this.forms.map((item, index) =>
      Array.isArray(item) ? (
        item.map((rowItem) => (
          <BaseFormItem
            key={index}
            item={rowItem}
            value={this.model[rowItem.prop]}
            {...{
              on: this.$listeners,
            }}
          />
        ))
      ) : (
        <BaseFormItem
          key={index}
          item={item}
          value={this.model[item.prop]}
          {...{
            on: this.$listeners,
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
