import { Menu, Submenu, MenuItemGroup, MenuItem, Button } from "element-ui";
import { groupBy } from "lodash";
import DataFormDialog from "../DataFormDialog";
const forms = [
  {
    label: "名称",
    prop: "label",
    use: "input",
    size: "small",
    row: 1,
    span: 8,
    question: true,
  },
];
export default {
  componentName: "DataMenu",
  name: "DataMenu",
  props: {
    create: {
      type: Boolean,
      default: true,
    },
    operation: {
      type: Boolean,
      default: true,
    },
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
    plus: {
      type: Boolean,
      default: false,
    },
    defaultGroup: {
      type: String,
      default: "未分组",
    },
  },
  methods: {
    handleGroup(item) {
      console.log("groupBy", groupBy(item, "group"));
    },
    insert() {
      this.form.data = {};
      this.dialog.title = "新增";
      this.dialog.mode = "insert";
      this.dialog.width = "40%";
      this.dialog.visible = true;
    },
    remove(data) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$emit("remove", data);
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
  },
  data() {
    return {
      activeIndex: "",
      dialog: {
        visible: false,
        title: "测试",
        mode: "edit",
        width: "30%",
      },
    };
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
              submit: (val) => this.$emit("submit", val),
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
        {this.create && (
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              borderBottom: "solid 1px #e6e6e6",
            }}
          >
            <Button
              plain
              size="small"
              type="primary"
              style="width: 80%; margin: 8px"
              onClick={() => this.insert()}
            >
              新增
            </Button>
          </div>
        )}
        <Menu
          onSelect={(index) => this.$emit("select", index)}
          {...{
            props: {
              defaultActive: this.activeIndex,
              uniqueOpened: true,
              // mode: "horizontal",
            },
          }}
        >
          {this.data.map((item) =>
            item.children && item.children.length > 0 ? (
              <Submenu index={item.value}>
                <template slot="title">
                  {item.label}
                  <div style="float: right;margin-right: 16px">
                    <i
                      class="el-icon-edit-outline"
                      onClick={() => this.update(item)}
                    ></i>
                    <i class="el-icon-document-copy"></i>
                    <i class="el-icon-delete"></i>
                    {this.plus && <i class="el-icon-plus"></i>}
                  </div>
                </template>
                {this.handleGroup(item.children)}
                {Object.values(groupBy(item.children, "group")).map((group) => {
                  console.log("group", group);
                  return (
                    <MenuItemGroup>
                      <template slot="title">
                        {group[0].group || this.defaultGroup}
                      </template>
                      {group.map((child) => (
                        <MenuItem index={`${item.value}-${child.value}`}>
                          {child.label}
                          <div style="float: right;margin-right: 20px">
                            <i
                              class="el-icon-edit-outline"
                              onClick={() => this.update(item)}
                            ></i>
                            <i class="el-icon-document-copy"></i>
                            <i
                              class="el-icon-delete"
                              onClick={() => this.remove(item)}
                            ></i>
                          </div>
                        </MenuItem>
                      ))}
                    </MenuItemGroup>
                  );
                })}
              </Submenu>
            ) : (
              <MenuItem index={item.value}>
                {item.label}
                {this.operation && (
                  <div style="float: right;margin-right: 16px">
                    {item.value !== "" && (
                      <i
                        class="el-icon-edit-outline"
                        onClick={() => this.update(item)}
                      ></i>
                    )}
                    {/* <i class="el-icon-document-copy"></i> */}
                    {item.value !== "" && (
                      <i
                        class="el-icon-delete"
                        onClick={() => this.remove(item)}
                      ></i>
                    )}
                    {this.plus && <i class="el-icon-plus"></i>}
                  </div>
                )}
              </MenuItem>
            )
          )}
        </Menu>
      </div>
    );
  },
};
