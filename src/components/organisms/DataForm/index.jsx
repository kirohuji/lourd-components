import _ from "lodash";
import BaseFormItem from "../../molecules/BaseFormItem";
import Inline from "../../molecules/Layout/inline";
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
    console.log(this.model);
    const uses = this.forms.map((item, index) => (
      <BaseFormItem
        key={index}
        item={item}
        value={this.model[item.prop]}
        {...{
          on: this.$listeners,
        }}
      />
    ))
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
        <Inline
          length={uses.length}
          gutter={20}
          direction="column"
          uses={uses}
        />
      </ElForm>
    );
  },
};
