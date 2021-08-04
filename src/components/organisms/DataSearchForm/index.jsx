import DataForm from "../DataForm/index.jsx";
export default {
  props: ["forms", "layout", "data"],
  render() {
    return (
      <div style="display: flex;align-items: end">
        <DataForm
          {...{
            props: this._props,
          }}
        />
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
