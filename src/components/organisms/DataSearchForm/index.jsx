import DataForm from "../DataForm/index.jsx";
import ButtonGroup from "./ButtonGroup/index.js";
import "./style.scss";
export default {
  name: "DataSearchForm",
  props: ["forms", "layout", "data", "searcher"],
  methods: {
    search() {
      this.$emit("search", this.$refs.dataForm.model);
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
      this.$refs.dataForm.initData(data);
    },
  },
  render() {
    return (
      <div style="display: flex;align-items: end" class="data-search-form">
        <DataForm
          ref="dataForm"
          class="data-form"
          {...{
            props: this._props,
          }}
        />
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
            {!this.searcher && (
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
