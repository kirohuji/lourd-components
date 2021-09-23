import DataFormDialog from "../components/organisms/DataFormDialog";
export default {
  title: "Design System/Organisms/DataFormDialog",
};
const forms = [
  {
    label: "名称",
    prop: "name",
    use: "input",
    row: 1,
    span: 8,
    question: true,
  },
  {
    label: "年龄",
    prop: "age",
    use: "label",
    row: 1,
    span: 16,
  },
  {
    label: "性别",
    prop: "sex",
    use: "label",
    row: 2,
  },
  {
    label: "等级",
    prop: "level",
    use: "label",
    row: 2,
  },
  {
    label: "部门",
    prop: "position",
    use: "label",
    row: 3,
  },
  {
    label: "标题",
    prop: "title",
    use: "select",
    size: "mini",
    row: 3,
    children: {
      use: "option",
      options: [
        { label: "标题一", value: 1 },
        { label: "标题二", value: 2 },
      ],
    },
  },
];
const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  data() {
    return {
      innerVisible: false,
    };
  },
  watch: {
    visible(val) {
      this.innerVisible = val;
    },
  },
  render() {
    return (
      <DataFormDialog
        {...{
          props: {
            ...this.$props,
            visible: this.innerVisible,
          },
          on: {
            submit: (val) => console.log(val),
            "update:visible": (val) => (this.innerVisible = val),
          },
          scopedSlots: {
            footer: (cancel, submit) => (
              <div>
                <button onClick={() => cancel()}>取消</button>
                <button onClick={() => submit()}>提交</button>
              </div>
            ),
          },
        }}
      />
    );
  },
});
export const withOne = Template.bind({});
withOne.args = {
  visible: false,
  title: "测试",
  mode: "edit",
  width: "30%",
  form: {
    forms,
    data: {
      name: "zyd",
      title: 1,
      age: 30,
      sex: "男",
      level: 10,
      position: "测试部",
    },
    layout: {
      use: "inline",
      gutter: 20,
      direction: "column",
    },
  },
};
