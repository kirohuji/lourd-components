import DataForm from "../DataForm/index.jsx";
import ButtonGroup from "./ButtonGroup/index.js";
import "./style.scss";
import emitter from "element-ui/src/mixins/emitter";
export default {
  name: "DataSearchForm",
  componentName: "DataSearchForm",
  props: ["forms", "layout", "data", "searcher", "actual"],
  mixins: [emitter],
  methods: {
    search() {
      let data = this.$refs.dataForm.currentData();
      // this.data = {
      //   ...data,
      // };
      this.$emit("update:data", data);
      this.$emit("events", {
        name: "search",
        componentName: "DataSearchForm",
        data: data,
      });
    },
    submit(payload) {
      this.$emit("submit", {
        mode: payload,
        data: this.$refs.dataForm.model,
      });
    },
    reset() {
      this.$emit("reset");
    },
    setModel(data) {
      this.$refs.dataForm.onAfter(data);
    },
    resetFields() {
      this.$refs.dataForm.resetFields();
    },
    clearFields() {
      this.$refs.dataForm.clearFields();
    },
  },
  mounted() {
    this.$on("search", () => {
      this.search();
    });
  },
  render() {
    return (
      <div
        style="display: flex;align-items: end;justify-content: space-between;"
        class="data-search-form"
      >
        <DataForm
          ref="dataForm"
          class="data-form"
          {...{
            props: {
              collector: "dataSearchForm",
              ...this.$props,
            },
          }}
        />
        {this.searcher && (
          <ButtonGroup
            ref="buttonGroup"
            class="search-button"
            onReset={() => this.reset()}
            onSubmit={(payload) => this.submit(payload)}
            onSearch={() => this.search()}
          />
        )}
        {this.$scopedSlots.right ? (
          <div class="buttons">{this.$scopedSlots.right()}</div>
        ) : (
          <div class="buttons">
            {!this.searcher && !this.actual && (
              <ElButton
                type="primary"
                size="mini"
                onClick={() => this.search()}
              >
                搜索
              </ElButton>
            )}
            {this.$attrs.export && <ElButton size="mini">导出</ElButton>}
          </div>
        )}
      </div>
    );
  },
};
