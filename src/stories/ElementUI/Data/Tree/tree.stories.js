import { Tree } from "element-ui";
import { action } from "@storybook/addon-actions";
import "./style.scss";
export default {
  title: "Element UI/组件/Data/Tree/树 Tree",
};
const events = [
  // "node-click",
  // "node-contextmenu	",
  // "check-change",
  // "check",
  // "current-change",
  // "node-expand",
  // "node-collapse",
  "node-drag-start",
  "node-drag-enter",
  "node-drag-leave",
  "node-drag-over",
  "node-drag-end",
  "node-drop",
];
const data = [
  {
    label: "性别",
    children: [
      {
        label: "男",
        value: "male",
      },
      {
        label: "女",
        value: "female",
      },
    ],
  },
];
let id = 1000;
export const withBasic = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  data() {
    return {
      data: data,
    };
  },
  methods: {
    toJson() {
      console.log(JSON.stringify(this.$refs.tree.store.data));
    },
    append(data) {
      // debugger;
      const newChild = { id: id++, label: "testtest", children: [] };
      if (!data.children) {
        this.$set(data, "children", []);
      }
      data.children.push(newChild);
    },
    remove(node, data) {
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex((d) => d.id === data.id);
      children.splice(index, 1);
    },
  },
  render() {
    let handler = {};
    events.forEach((item) => (handler[item] = (...args) => action(item)(args)));
    return (
      <div>
        <el-button
          size="mini"
          style="margin: 8px"
          onClick={() => this.toJson()}
        >
          查看json
        </el-button>
        <Tree
          ref="tree"
          data={this.data}
          {...{
            props: this.$props,
            // on: handler,
            scopedSlots: {
              default: ({ node }) => {
                return (
                  <span class="custom-tree-node">
                    <span>{node.label}</span>
                    <span>
                      <el-button
                        type="text"
                        size="mini"
                        onClick={() => this.append(data)}
                      >
                        添加
                      </el-button>
                      {node.previousSibling && (
                        <el-button type="text" size="mini">
                          上移
                        </el-button>
                      )}
                      {node.nextSibling && (
                        <el-button type="text" size="mini">
                          下移
                        </el-button>
                      )}
                      <el-button
                        type="text"
                        size="mini"
                        onClick={() => this.remove(data)}
                      >
                        删除
                      </el-button>
                    </span>
                  </span>
                );
              },
            },
          }}
        />
      </div>
    );
  },
});
withBasic.args = {
  defaultProps: {
    children: "children",
    label: "label",
  },
  draggable: true,
};
