import { Tree, Button, Divider } from "element-ui";
// import "./style.scss";
import VueJsonPretty from "vue-json-pretty";
import "vue-json-pretty/lib/styles.css";
import Clipboard from "clipboard";
import DataFormDialog from "../DataFormDialog";
let id = 1000;
const forms = [
  {
    label: "数据项名",
    prop: "label",
    use: "input",
    size: "small",
    insert: true,
    question: true,
  },
  {
    label: "数据项value",
    prop: "label",
    use: "input",
    size: "small",
    insert: true,
    question: true,
  },
  {
    label: "数据项描述",
    prop: "label",
    use: "input",
    size: "small",
    type: "textarea",
    insert: true,
    question: true,
  },
];
export default {
  componentName: "DataTree",
  name: "DataTree",
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    form: {
      type: Object,
      default: () => {
        return {
          forms: forms,
          data: {},
          layout: {
            use: "inline",
            gutter: 20,
            direction: "column",
          },
        };
      },
    },
  },
  components: {
    VueJsonPretty,
  },
  data() {
    return {
      activeIndex: "1",
      current: {},
      dialog: {
        visible: false,
        title: "测试",
        mode: "edit",
        width: "30%",
      },
    };
  },
  methods: {
    handSubmit(data) {
      switch (data.mode) {
        case "insert":
          // debugger;
          if (Array.isArray(this.current.data)) {
            if (data.data.type) {
              this.current.data.push({
                id: id++,
                ...data.data.type,
                children: [],
              });
            } else {
              this.current.data.push({
                id: id++,
                ...data.data,
                children: [],
              });
            }
            this.$emit("updated:data", this.current.data);
            // this.$set(this, "data", this.current.data);
            this.dialog.visible = false;
            break;
          } else {
            if (!this.current.data.children) {
              this.$set(this.current.data, "children", []);
            }
            if (data.data.type) {
              this.current.data.children.push({
                id: id++,
                ...data.data.type,
                children: [],
              });
            } else {
              this.current.data.children.push({
                id: id++,
                ...data.data,
                children: [],
              });
            }
            this.dialog.visible = false;
            break;
          }
      }
    },
    append(data) {
      // debugger;
      this.current.data = data;
      this.form.data = {};
      this.dialog.title = "新增";
      this.dialog.mode = "insert";
      this.dialog.width = "40%";
      this.dialog.visible = true;
    },
    remove(node, data) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          const parent = node.parent;
          const children = parent.data.children || parent.data;
          const index = children.findIndex((d) => d.id === data.id);
          children.splice(index, 1);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    update(data) {
      this.form.data = data;
      this.dialog.title = "编辑";
      this.dialog.mode = "update";
      this.dialog.width = "40%";
      this.dialog.visible = true;
    },
    insert() {
      this.form.data = {};
      this.dialog.title = "新增";
      this.dialog.mode = "insert";
      this.dialog.width = "40%";
      this.dialog.visible = true;
    },
    handleCopy() {
      const clipboard = new Clipboard("#tag-copy");
      clipboard.on("success", () => {
        this.$message({ type: "success", message: "复制成功" });
        clipboard.destroy();
      });
      clipboard.on("error", () => {
        this.$message({ type: "waning", message: "该浏览器不支持自动复制" });
        clipboard.destroy();
      });
    },
    toJson() {
      // this.json = this.$refs.tree.store.data;
      this.json = JSON.stringify(this.data);
    },
    save() {
      this.toJson();
      this.$emit("save", this.json);
    },
  },
  render() {
    return (
      <div>
        <DataFormDialog
          {...{
            props: {
              ...this.dialog,
              form: this.form,
              visible: this.dialog.visible,
            },
            on: {
              submit: (val) => this.handSubmit(val),
              "update:visible": (val) => (this.dialog.visible = val),
            },
            // scopedSlots: {
            //   footer: (cancel, submit) => (
            //     <div>
            //       <button onClick={() => cancel()}>取消</button>
            //       <button onClick={() => submit()}>提交</button>
            //     </div>
            //   ),
            // },
          }}
        />
        <div style="display:flex;justify-content: space-between;align-items: center;">
          <div style="margin: 0px 8px;">
            <span style="font-size: 14px;line-height: 8px;color: #606266">
              当前选择：
            </span>
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item>性别集</el-breadcrumb-item>
              <el-breadcrumb-item>
                <el-dropdown>
                  <el-link underline={false} type="primary">
                    版本一
                  </el-link>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>版本一</el-dropdown-item>
                    <el-dropdown-item>版本二</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </el-breadcrumb-item>
            </el-breadcrumb>
          </div>
          <div>
            <Button
              size="small"
              type="primary"
              style="margin: 8px"
              onClick={() => this.save()}
            >
              保存
            </Button>
            {/* <Button size="small" style="margin: 8px">
              取消
            </Button> */}
          </div>
        </div>
        <Divider style="margin-top: 0">
          <i class="el-icon-s-platform"></i>
        </Divider>
        <el-button
          type="text"
          size="mini"
          onClick={() => this.append(this.data)}
          style="margin: 0 8px"
        >
          添加根节点
        </el-button>
        <div style="display:flex;justify-content: space-between;height: calc(100% - 73px);position: relative">
          <Tree
            ref="tree"
            data={this.data}
            style="width: 48%"
            {...{
              props: {
                defaultProps: {
                  children: "children",
                  label: "label",
                },
                draggable: true,
              },
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
                          onClick={() => this.remove(node, data)}
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
          <Divider direction="vertical" />
          <vue-json-pretty
            data={this.data}
            showLine={false}
            selectableType="selectableType"
            style="width: 48%;overflow-y: auto;"
          />
          <div style="position: absolute; top: -9px;right: 0;">
            <Button
              size="small"
              onClick={() => this.handleCopy()}
              id="tag-copy"
              data-clipboard-text={JSON.stringify(this.data)}
            >
              Copy
            </Button>
          </div>
        </div>
      </div>
    );
  },
};
