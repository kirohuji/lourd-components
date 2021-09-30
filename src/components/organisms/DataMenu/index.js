import { Menu, Submenu, MenuItemGroup, MenuItem, Button } from "element-ui";
import { groupBy } from "lodash";
// const data = [
//   {
//     label: "人类",
//     value: "human",
//     description: "",
//     children: [
//       {
//         group: "已选版本",
//         label: "1.0",
//         value: "1.0",
//       },
//       {
//         label: "1.1",
//         value: "1.1",
//       },
//       {
//         label: "1.2",
//         value: "1.2",
//       },
//     ],
//   },
//   {
//     label: "性别",
//     value: "human",
//     description: "",
//   },
// ];

export default {
  componentName: "DataMenu",
  name: "DataMenu",
  props: {
    data: {
      type: Array,
      default: () => [],
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
  },
  mounted() {},
  render() {
    return (
      <div>
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
          >
            新增组
          </Button>
        </div>
        <Menu
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
                    <i class="el-icon-edit-outline"></i>
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
                            <i class="el-icon-edit-outline"></i>
                            <i class="el-icon-document-copy"></i>
                            <i class="el-icon-delete"></i>
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
                <div style="float: right;margin-right: 16px">
                  <i class="el-icon-edit-outline"></i>
                  <i class="el-icon-document-copy"></i>
                  <i class="el-icon-delete"></i>
                  {this.plus && <i class="el-icon-plus"></i>}
                </div>
              </MenuItem>
            )
          )}
        </Menu>
      </div>
    );
  },
};
