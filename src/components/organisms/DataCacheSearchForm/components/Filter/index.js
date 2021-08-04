import _ from "lodash";
export default {
  name: "SearchFilter",
  props: {
    closable: {
      type: Boolean,
      default: true,
    },
    list: {
      type: Array,
      default: () => [],
    },
  },
  data: () => ({
    currentDelInd: null,
    currentId: -1,
  }),
  methods: {
    refresh(model) {
      if (model) {
        this.$nextTick(() => {
          this.currentId = _.findIndex(
            this.list,
            (o) => o.cacheid === model.cacheid || o.name === model.name
          );
        });
      }
    },
    reset() {
      this.currentDelInd = null;
      this.currentId = -1;
    },
    // 点击tag的x
    handleClose(index, tag) {
      this.currentDelInd = index;
      this.$confirm("此操作将永久删除该搜索器, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // this.$emit('delete', this.list[this.currentDelInd].cacheid);
          this.$emit("delete", { index, tag });
        })
        .catch(() => {});
    },
    // 选中时
    handleSelect(index, tag) {
      this.$set(this, "currentId", index);
      this.$emit("changeCurrent", { index, tag });
    },
  },
  render() {
    return (
      <div class="search-filter">
        <span
          style={{
            fontSize: "14px",
            marginRight: "6px",
            color: "rgba(96, 98, 102, 1)",
          }}
        >
          搜索器:
        </span>
        {this.list.map((tag, index) => (
          <ElTag
            key={index}
            closable={this.closable}
            disable-transitions={false}
            class={this.currentId === index && "search"}
            size="small"
            onClose={() => this.handleClose(index, tag)}
            onClick={() => this.handleSelect(index, tag)}
          >
            {tag.name}
          </ElTag>
        ))}
      </div>
    );
  },
};
