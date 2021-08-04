import _ from "lodash";
import BaseEnter from "../../molecules/BaseEnter";
import ButtonGroup from "./ButtonGroup";
// import './style.scss'
const FormItem = {
  name: "FormItem",
  props: ["item", "value"],
  render() {
    return (
      <ElFormItem
        {...{
          props: this.item,
        }}
      >
        <BaseEnter
          {...{
            props: { model: this.value },
            attrs: this.item,
          }}
        />
      </ElFormItem>
    );
  },
};
export default {
  /**
   * 表单的加载事件
   */
  props: ["forms", "buttons", "searcher"],
  component: {
    BaseEnter,
  },
  data() {
    return {
      model: {},
    };
  },
  computed: {
    row() {
      return Math.round(this.forms.fields.length / this.forms.col);
    },
    span() {
      return Math.round(24 / this.forms.col);
    },
  },
  created() {
    this.transform();
  },
  methods: {
    setModel(model) {
      this.$set(this, "model", model);
    },
    search() {
      this.$emit("search", this.model);
    },
    reset() {
      this.$refs.form.resetFields();
      this.transform();
      this.$emit("reset");
    },
    submit(payload) {
      this.$emit("submit", {
        mode: payload,
        data: {
          ...this.model,
        },
      });
      // switch (payload) {
      //   case "search":
      //     this.$emit("search", this.model);
      //     break;
      //   case "saveAndSearch":
      //     this.$emit("saveAndSearch", this.model);
      //     break;
      // }
    },
    transform() {
      this.$set(
        this,
        "model",
        _.zipObject(
          this.forms.fields.map((n) => n.prop),
          this.forms.fields.map((n) => _.defaultTo(n.default, ""))
        )
      );
    },
    has(rIndex, cIndex) {
      return (
        cIndex + 1 > rIndex * this.forms.col &&
        cIndex + 1 <= (rIndex + 1) * this.forms.col
      );
    },
  },
  render(h) {
    return (
      <ElForm
        inline
        class="data-search-form"
        ref="form"
        {...{
          props: {
            model: this.model,
            ...this.$attrs,
          },
        }}
      >
        <div style="width: 100%;">
          {this.forms.col === 0
            ? this.forms.fields.map((item) => (
                <FormItem
                  item={item}
                  value={this.model}
                  {...{
                    on: this.$listeners,
                  }}
                />
              ))
            : Array.apply(null, { length: this.row }).map((r, rIndex) => (
                <ElRow>
                  {this.forms.fields.map(
                    (item, index) =>
                      this.has(rIndex, index) && (
                        <ElCol span={this.span}>
                          <FormItem
                            item={item}
                            value={this.model}
                            {...{
                              on: this.$listeners,
                            }}
                          />
                        </ElCol>
                      )
                  )}
                </ElRow>
              ))}
        </div>
        {this.searcher && (
          <ButtonGroup
            ref="buttonGroup"
            class="search-button"
            onReset={() => this.reset()}
            onSubmit={(payload) => this.submit(payload)}
          />
        )}
        {this.$scopedSlots.right ? (
          <div class="buttons">{this.$scopedSlots.right()}</div>
        ) : (
          <div class="buttons">
            <ElButton type="primary" size="small" onClick={() => this.search()}>
              搜索
            </ElButton>
            <ElButton size="small" basic>
              导出
            </ElButton>
          </div>
        )}
      </ElForm>
    );
  },
};
