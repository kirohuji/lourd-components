import Basic from "./components/Basic.vue";
import GutterAndSpan from "./components/GutterAndSpan.vue";
export default {
  title: "Element UI/组件/Basic/Layout 布局",
  description: "通过基础的 24 分栏，迅速简便地创建布局。",
  decorators: [
    () => ({ template: '<div style="margin: 3em;"><story/></div>' }),
  ],
};
const BasicTemplate = (args, { argTypes }) => ({
  extends: Basic,
  props: Object.keys(argTypes),
});
export const withBasic = BasicTemplate.bind({});
withBasic.args = {};
withBasic.storyName = "基础用法";
withBasic.parameters = {
  docs: {
    source: {
      dynamic: true,
    },
  },
};
const GutterAndSpanTemplate = (args, { argTypes }) => ({
  extends: GutterAndSpan,
  props: Object.keys(argTypes),
});

export const withGutterAndSpanTemplate = GutterAndSpanTemplate.bind({});
withGutterAndSpanTemplate.args = {};
withGutterAndSpanTemplate.storyName = "分栏间隔";
withGutterAndSpanTemplate.parameters = {
  docs: {
    source: {
      dynamic: true,
    },
  },
};
