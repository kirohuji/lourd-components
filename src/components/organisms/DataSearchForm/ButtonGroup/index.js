export default {
  props: {
    searchIcon: String,
    save: {
      type: Boolean,
      default: true,
    },
  },
  render() {
    return (
      <div>
        <ElButton type="text" onClick={() => this.$emit("reset")}>
          <i class="iconfont jkd_icon_sync " /> 重置筛选条件
        </ElButton>
        {this.save ? (
          <ElButton
            type="text"
            type="text"
            onClick={() => this.$emit("submit", "saveAndSearch")}
          >
            <i class="iconfont jkd_icon_save" /> 保存并搜索
          </ElButton>
        ) : (
          ""
        )}
        <ElButton
          size="mini"
          type="primary"
          icon={this.searchIcon}
          onClick={() => this.$emit("search")}
        >
          搜索
        </ElButton>
      </div>
    );
  },
};
