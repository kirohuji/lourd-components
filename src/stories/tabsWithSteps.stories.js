import { Tabs, TabPane, Step, Steps } from "element-ui";
import "./tabsWithSteps.stories.scss";
export default {
  title: "Element UI/组件/Tests/Steps和Tabs联动",
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
  { title: "步骤一", description: "描述步骤一" },
  { title: "步骤二", description: "描述步骤二" },
  { title: "步骤三", description: "描述步骤三" },
];
const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  data() {
    return {
      active: 1,
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    next() {
      if (this.active++ > data.length - 1) this.active = 1;
    },
  },
  render() {
    return (
      <div>
        <Steps
          {...{
            props: {
              active: this.active,
              ...this.$props,
            },
          }}
        >
          {data.map((item) => (
            <Step {...{ props: item }} />
          ))}
        </Steps>
        <Tabs
          {...{
            props: this.$props,
          }}
          vModel={this.active}
          onTabClick={(tab, event) => this.handleClick(tab, event)}
        >
          {data.map((item, index) => (
            <TabPane
              {...{
                props: {
                  name: index + 1,
                  label: item.title,
                },
              }}
            >
              {item.title}
            </TabPane>
          ))}
        </Tabs>
        <el-button style="margin-top: 12px;" onClick={() => this.next()}>
          放弃新增
        </el-button>
        <el-button style="margin-top: 12px;" onClick={() => this.next()}>
          下一步
        </el-button>
      </div>
    );
  },
});
export const withBasic = Template.bind({});
withBasic.args = {
  tabPosition: "top",
};
