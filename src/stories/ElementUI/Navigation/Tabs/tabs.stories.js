import { Tabs, TabPane } from "element-ui";

export default {
  title: "Element UI/组件/Navigation/Tabs/标签页 Tabs",
  argTypes: {
    type: {
      options: ["card", "border-card"],
      control: { type: "radio" },
    },
    tabPosition: {
      options: ["left", "right", "top", "bottom"],
      control: { type: "radio" },
    },
  },
};
const data = [
  {
    label: "用户管理",
    name: "first",
  },
  {
    label: "配置管理",
    name: "second",
  },
  {
    label: "角色管理",
    name: "third",
  },
  {
    label: "定时任务补偿",
    name: "fourth",
  },
];
const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  data: () => ({
    activeName: "second",
  }),
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
  },
  render() {
    return (
      <Tabs
        {...{
          props: this.$props,
        }}
        vModel={this.activeName}
        onTabClick={(tab, event) => this.handleClick(tab, event)}
      >
        {data.map((item) => (
          <TabPane {...{ props: item }} />
        ))}
      </Tabs>
    );
  },
});
export const withBasic = Template.bind({});
withBasic.storyName = "基本用法";
withBasic.args = {};
export const withStyle = Template.bind({});
withStyle.storyName = "选项卡样式/卡片化";
withStyle.args = {
  type: "card",
};
export const withPosition = Template.bind({});
withPosition.storyName = "位置";
withPosition.args = {
  tabPosition: "left",
};
