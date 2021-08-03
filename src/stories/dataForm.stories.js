import DataForm from "../components/organisms/DataForm";
export default {
  title: "DataForm",
};
const forms = [
  {
    label: "名称",
    prop: "name",
    use: "label",
  },
  {
    label: "标题",
    prop: "title",
    use: "select",
    size: "mini",
    children: {
      use: "option",
      options: [
        { label: "标题一", value: 1 },
        { label: "标题二", value: 2 },
      ],
    },
  },
];

export const withAttrs = () => ({
  render() {
    return (
      <DataForm
        {...{
          props: {
            forms,
            data: {
              name: "zyd",
              title: 1,
            },
          },
        }}
      />
    );
  },
});
