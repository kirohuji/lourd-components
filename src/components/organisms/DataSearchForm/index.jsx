import _ from "lodash";
import BaseFormItem from "../../molecules/BaseFormItem";
import "./style.scss";
export default {
  name: "DataSearchForm",
  inheritAttrs: false,
  props: ["forms", "buttons"],
  component: {
    BaseFormItem,
  },
  data() {
    return {
      model: {},
    };
  },
  computed: {
    row() {
      return this.forms.col > 0
        ? Math.round(this.forms.fields.length / this.forms.col)
        : 0;
    },
    span() {
      return this.forms.col > 0 ? Math.round(24 / this.forms.col) : 0;
    },
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
    search() {
      this.$emit("search", this.model);
    },
    transform() {
      this.$set(
        this,
        "model",
        _.zipObject(
          this.forms.fields.map((n) => n.prop),
          this.forms.fields.map((n) => {
            return (
              typeof n.default !== "function" && _.defaultTo(n.default, "")
            );
          })
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
        {...{
          props: {
            model: this.model,
            ...this.$attrs,
          },
        }}
      >
        <div style="display: flex">
          {this.$scopedSlots.left && this.$scopedSlots.left()}
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
