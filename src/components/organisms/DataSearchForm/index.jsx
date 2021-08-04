import DataForm from "../DataForm/index.jsx";
export default {
  props: ["forms", "layout", "data", "searcher"],
  methods: {
    search() {
      this.$emit("search", this.$refs.dataForm.model);
    },
  },
  render() {
    return (
      <div style="display: flex;align-items: end">
        <DataForm
          ref="dataForm"
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
            <ElButton type="primary" size="mini" onClick={() => this.search()}>
              搜索
            </ElButton>
            <ElButton size="mini">导出</ElButton>
          </div>
        )}
      </div>
    );
  },
};
