import { Menu, Submenu, MenuItem, MenuItemGroup } from "element-ui";
import "./style.scss";
export default {
  title: "Element UI/组件/Data/NavMenu/导航菜单 NavMenu",
};
export const withBasic = () => ({
  data() {
    return {
      activeIndex: "1",
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
  },
  render() {
    return (
      <Menu
        {...{
          props: {
            defaultActive: this.activeIndex,
            // mode: "horizontal",
          },
          on: {
            select: this.handleSelect,
          },
        }}
      >
        <Submenu index="1">
          <template slot="title">性别集</template>
          <MenuItemGroup>
            <template slot="title">已经选择版本</template>
            <MenuItem index="1-1">版本一</MenuItem>
          </MenuItemGroup>
          <MenuItemGroup>
            <template slot="title">可选版本</template>
            <MenuItem index="1-1">版本一</MenuItem>
            <MenuItem index="1-1">版本二</MenuItem>
          </MenuItemGroup>
        </Submenu>
        <Submenu index="2">
          <template slot="title">组织</template>
          <MenuItem index="2-1">选项一</MenuItem>
        </Submenu>
      </Menu>
    );
  },
});
export const withExampleOne = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  data() {
    return {
      activeIndex: "1",
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
  },
  render() {
    return (
      <Menu
        {...{
          props: {
            defaultActive: this.activeIndex,
          },
          on: {
            select: this.handleSelect,
          },
        }}
      >
        <MenuItem index="1">
          <i class="el-icon-location"></i>处理中心
        </MenuItem>
        <Submenu index="2">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>导航一</span>
          </template>
          <MenuItem index="2-1">选项一</MenuItem>
          <MenuItemGroup>
            <template slot="title">分组一</template>
            <MenuItem index="1-1">选项1</MenuItem>
            <MenuItem index="1-2">选项2</MenuItem>
          </MenuItemGroup>
        </Submenu>
      </Menu>
    );
  },
});
