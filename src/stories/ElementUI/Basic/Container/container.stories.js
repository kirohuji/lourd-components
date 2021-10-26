import Common from "./components/Common.vue";
export default {
  title: "Element UI/组件/Basic/Container/_hidden_布局容器 Container",
  description: "用于布局的容器组件，方便快速搭建页面的基本结构："
};

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
  template: Common,
};
