import {
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Tree,
  Col,
  Row,
  Button,
  Divider,
} from "element-ui";
import "./style.scss";
import VueJsonPretty from "vue-json-pretty";
import "vue-json-pretty/lib/styles.css";
import Clipboard from "clipboard";
const data = [
  {
    label: "男",
    value: "male",
  },
  {
    label: "女",
    value: "female",
  },
];
let id = 1000;
export default {
  components: {
    VueJsonPretty,
  },
  data() {
    return {
      data: data,
      activeIndex: "1",
    };
  },
  methods: {
    append(data) {
      // debugger;
      const newChild = { id: id++, label: "testtest", children: [] };
      if (!data.children) {
        this.$set(data, "children", []);
      }
      data.children.push(newChild);
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
      this.json = this.$refs.tree.store.data;
    },
    remove(node, data) {
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex((d) => d.id === data.id);
      children.splice(index, 1);
    },
  },
  render() {
    return (
      <Row>
        <Col span={6}>
          <Menu
            {...{
              props: {
                defaultActive: this.activeIndex,
                uniqueOpened: true,
                // mode: "horizontal",
              },
            }}
          >
            <Submenu index="1">
              <template slot="title">
                性别集
                <div style="float: right;margin-right: 16px">
                  <i class="el-icon-edit-outline"></i>
                  <i class="el-icon-delete"></i>
                  <i class="el-icon-plus"></i>
                </div>
              </template>
              <MenuItemGroup>
                <template slot="title">已选版本</template>
                <MenuItem index="1-1">版本一</MenuItem>
              </MenuItemGroup>
              <MenuItemGroup>
                <template slot="title">可选版本</template>
                <MenuItem index="1-1">
                  版本一
                  <div style="float: right">
                    <i class="el-icon-edit-outline"></i>
                    <i class="el-icon-document-copy"></i>
                    <i class="el-icon-delete"></i>
                  </div>
                </MenuItem>
                <MenuItem index="1-1">
                  版本二
                  <div style="float: right">
                    <i class="el-icon-edit-outline"></i>
                    <i class="el-icon-document-copy"></i>
                    <i class="el-icon-delete"></i>
                  </div>
                </MenuItem>
              </MenuItemGroup>
            </Submenu>
          </Menu>
        </Col>
        <Col span={18} style="border-left: solid 1px #e6e6e6;height: 100%;">
          {/* <Button
            type="primary"
            size="small"
            style="margin: 8px"
            onClick={() => this.toJson()}
          >
            查看JSON格式
          </Button> */}
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
              <Button size="small" type="primary" style="margin: 8px">
                保存
              </Button>
              <Button size="small" style="margin: 8px">
                取消
              </Button>
            </div>
          </div>
          <Divider style="margin-top: 0">
            <i class="el-icon-s-platform"></i>
          </Divider>
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
        </Col>
      </Row>
    );
  },
};
