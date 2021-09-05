import { Steps, Step } from "element-ui";
export default {
  title: "Element UI/Steps",
  argTypes: {
    direction: {
      options: ["vertical", "horizontal"],
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
      active: 0,
    };
  },
  methods: {
    next() {
      if (this.active++ > data.length - 1) this.active = 0;
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
        <el-button style="margin-top: 12px;" onClick={() => this.next()}>
          下一步
        </el-button>
      </div>
    );
  },
});
export const withBasic = Template.bind({});
withBasic.args = {
  "finish-status": "success",
  space: 200,
  "align-center": true,
};
export const withVertical = Template.bind({});
withVertical.args = {
  "finish-status": "success",
  space: 200,
  "align-center": true,
  direction: "vertical",
};
export const withSimple = Template.bind({});
withSimple.args = {
  "finish-status": "success",
  space: 200,
  "align-center": true,
  direction: "vertical",
  simple: true,
};
