import { Tree } from "element-ui";
import { action } from "@storybook/addon-actions";
import "./style.scss";
import minimongo from "minimongo";
import DataDialog from "../../../../components/organisms/DataDialog";
let LocalDb = minimongo.IndexedDb;
console.log(LocalDb);
let db = new LocalDb({ namespace: "lourd" });
db.addCollection("trees");
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
const forms = [
  {
    label: "数据项",
    prop: "label",
    use: "input",
    row: 1,
  },
  {
    label: "数据值",
    prop: "value",
    use: "input",
    row: 2,
  },
];
export const withBasic = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  data() {
    return {
      data: data,
      form: {
        forms,
        data: {
          name: "zyd",
          title: 1,
          age: 30,
          sex: "男",
          level: 10,
          position: "测试部",
        },
        layout: {
          use: "inline",
          gutter: 20,
          direction: "column",
        },
      },
    };
  },
  mounted() {},
  methods: {
    toJson() {
      db.trees.upsert(
        {
          _id: "exmaple-1",
          data: this.$refs.tree.store.data,
        },
        {
          _id: "exmaple-1",
        },
        () => {
          console.log("来来来");
        }
      );
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
        <DataDialog
          {...{
            props: {
              title: "新增",
              mode: "edit",
              form: this.form,
            },
          }}
        />
        <el-button
          size="mini"
          style="margin: 8px"
          onClick={() => this.toJson()}
        >
          查看json
        </el-button>
        <Divider style="margin-top: 0">
          <i class="el-icon-edit"></i>
        </Divider>
        <Tree
          ref="tree"
          data={this.data}
          {...{
            props: this.$props,
            // on: handler,
            scopedSlots: {
              default: ({ node, data }) => {
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
        <Divider style="margin-top: 0">
          <i class="el-icon-s-platform"></i>
        </Divider>
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
