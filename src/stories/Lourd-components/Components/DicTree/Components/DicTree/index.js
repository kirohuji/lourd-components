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
export default {
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
                <template slot="title">已经选择版本</template>
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
        <Col span={18} style="border-left: solid 1px #e6e6e6;">
          <Button type="primary" size="small" style="margin: 8px">
            保存
          </Button>
          <Button size="small" style="margin: 8px">
            取消
          </Button>
          <Divider style="margin-top: 0">
            <i class="el-icon-edit"></i>
          </Divider>
          <Tree
            ref="tree"
            data={this.data}
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
        </Col>
      </Row>
    );
  },
};
