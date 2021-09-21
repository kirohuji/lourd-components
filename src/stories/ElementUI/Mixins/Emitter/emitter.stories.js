import Parent from "./components/Parent.vue";
export default {
  title: "Element UI/Mixins/Emitter/广播通讯 emitter",
  description: "通过基础的 24 分栏，迅速简便地创建布局。",
  parameters: {
    docs: {
      source: {
        dynamic: true,
      },
    },
  },
};
const Basic = (args) => ({
  components: {
    Parent,
  },
  template: `<Parent />`,
});
export const withBasic = Basic.bind({});
