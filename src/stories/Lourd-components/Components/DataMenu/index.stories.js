import DataMenu from "@/components/organisms/DataMenu";
export default {
  title: "Lourd Components/Components/DataMenu/数据菜单 DataMenu",
};
export const withBasic = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  render() {
    return (
      <DataMenu
        {...{
          props: this.$props,
        }}
      />
    );
  },
});
withBasic.args = {
  plus: true,
  defaultGroup: "可用版本",
};
