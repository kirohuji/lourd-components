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
  data: [
    {
      label: "人类",
      value: "human",
      description: "",
      // children: [
      //   {
      //     group: "已选版本",
      //     label: "1.0",
      //     value: "1.0",
      //   },
      //   {
      //     label: "1.1",
      //     value: "1.1",
      //   },
      //   {
      //     label: "1.2",
      //     value: "1.2",
      //   },
      // ],
    },
    {
      label: "性别",
      value: "gender",
      description: "",
    },
  ],
};
