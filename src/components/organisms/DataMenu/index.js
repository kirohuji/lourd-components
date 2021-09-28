import { Menu, Submenu, MenuItemGroup, MenuItem } from "element-ui";
const data = [
  {
    label: "人类",
    value: "human",
    description: "",
    version: "1.0",
    children: [
      {
        label: "1.0",
        value: "1.0",
      },
      {
        label: "1.1",
        value: "1.0",
      },
      {
        label: "1.2",
        value: "1.0",
      },
    ],
  },
];

export default {
  data() {
    return {
      data: data,
    };
  },
  render() {
    return (
      <Menu
        {...{
          props: {
            defaultActive: this.activeIndex,
            uniqueOpened: true,
            // mode: "horizontal",
          },
        }}
      >
        {this.data.map((item) => {
          item.children.length > 0 ? (
            <Submenu index={item.value}>
              <template slot="title">
                {item.label}
                <div style="float: right;margin-right: 16px">
                  <i class="el-icon-edit-outline"></i>
                  <i class="el-icon-document-copy"></i>
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
                {item.children.map((version) => (
                  <MenuItem index={`${item.value}-${version.value}`}>
                    {version.label}
                    <div style="float: right">
                      <i class="el-icon-edit-outline"></i>
                      <i class="el-icon-document-copy"></i>
                      <i class="el-icon-delete"></i>
                    </div>
                  </MenuItem>
                ))}
              </MenuItemGroup>
            </Submenu>
          ) : (
            <MenuItem index={item.value}>
              {item.label}
              <div style="float: right">
                <i class="el-icon-edit-outline"></i>
                <i class="el-icon-document-copy"></i>
                <i class="el-icon-delete"></i>
                <i class="el-icon-plus"></i>
              </div>
            </MenuItem>
          );
        })}
      </Menu>
    );
  },
};
