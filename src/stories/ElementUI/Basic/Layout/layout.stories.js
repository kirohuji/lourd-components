import BasicLayout from "./components/Basic.vue";
import "./style.css";
import GutterAndSpanLayout from "./components/GutterAndSpan.vue";
import MixLayout from "./components/Mix.vue";
import OffsetLayout from "./components/Offset.vue";
import AlignLayout from "./components/Align.vue";
import ResponsiveLayout from "./components/Responsive.vue";
import { Row, Col } from "element-ui";
export default {
  component: Row,
  subcomponents: { Col },
  title: "Element UI/组件/Basic/Layout/_hidden_布局 Layout",
  description: "通过基础的 24 分栏，迅速简便地创建布局。",
  argTypes: {
    template: {
      table: {
        disable: true,
      },
    },
  },
  parameters: {
    docs: {
      page: null,
      source: {
        dynamic: true,
      },
    },
  },
  decorators: [
    () => ({ template: '<div style="margin: 3em;"><story/></div>' }),
  ],
};
const Basic = (args) => ({
  template: `
    <div>
      <el-row>
        <el-col :span="24">24格子</el-col>
        <el-col :span="16">16格子</el-col>
        <el-col :span="8">8格子</el-col>
        <el-col :span="8">8格子</el-col>
        <el-col :span="8">8格子</el-col>
        <el-col :span="4">4格子</el-col>
        <el-col :span="4">4格子</el-col>
      </el-row>
    </div>
  `,
});
export const withBasic = Basic.bind({});

const Template = (args, { argTypes }) => ({
  extends: args.template,
  data() {
    return {
      test: 1,
    };
  },
  props: Object.keys(argTypes),
});
export const withOne = Template.bind({});
withOne.args = {
  template: BasicLayout,
};
withOne.storyName = "基础用法";

export const withTwo = Template.bind({});
withTwo.args = {
  template: GutterAndSpanLayout,
};
withTwo.storyName = "分栏间隔";

export const withThree = Template.bind({});
withThree.args = {
  template: MixLayout,
};
withThree.storyName = "混合布局";

export const withFour = Template.bind({});
withFour.args = {
  template: OffsetLayout,
};
withFour.storyName = "混合布局";

export const withFive = Template.bind({});
withFive.args = {
  template: AlignLayout,
};
withFive.storyName = "对齐方式";

export const withSix = Template.bind({});
withSix.args = {
  template: ResponsiveLayout,
};
withSix.storyName = "响应式布局";
