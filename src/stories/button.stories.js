import Button from "@/components/Button.vue";
export default {
  component: Button,
  title: "button",
};
const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  render() {
    return <Button text="1"></Button>;
  },
});
export const withBasic = Template.bind({});
withBasic.args = {};
