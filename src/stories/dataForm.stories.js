import DataForm from "../components/organisms/DataForm";
import Inline from "../components/molecules/Layout/inline";
export default {
  title: "DataForm",
};
const forms = [
  {
    label: "名称",
    prop: "name",
    use: "label",
    row: 1,
    span: 8,
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
        }}
      />
    );
  },
});
export const withScopedSlots = () => ({
  render() {
    return (
      <DataForm
        {...{
          props: {
            forms,
            data: {
              name: "zyd",
              title: 1,
              age: 30,
              sex: "男",
              level: 10,
              position: "测试部",
            },
          },
          scopedSlots: {
            default: ({ uses }) => {
              return (
                <Inline
                  length={uses.length}
                  gutter={20}
                  direction="column"
                  uses={uses}
                />
              );
            },
          },
        }}
      />
    );
  },
});
export const withTemplate = () => ({
  components: { DataForm, Inline },
  data() {
    return {
      forms: forms,
      data: {
        name: "zyd",
        title: 1,
        age: 30,
        sex: "男",
        level: 10,
        position: "测试部",
      },
    };
  },
  template: `
    <DataForm :forms="forms" :data="data">
      <template v-slot:default="{uses}">
        <Inline
          :length="uses.length"
          :gutter="20"
          direction="column"
          :uses="uses"
        />
      </template>
    </DataForm>
  `,
});

const formsRowGrid = [
  [
    {
      label: "名称",
      prop: "name",
      use: "label",
      span: 8,
    },
    {
      label: "年龄",
      prop: "age",
      use: "label",
      span: 16,
    },
  ],
  [
    {
      label: "性别",
      prop: "sex",
      use: "label",
    },
    {
      label: "等级",
      prop: "level",
      use: "label",
    },
  ],
  [
    {
      label: "部门",
      prop: "position",
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
  ],
];

export const withAttrsRowGrid = () => ({
  render() {
    return (
      <DataForm
        {...{
          props: {
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
              use: "row-grid",
            },
          },
        }}
      />
    );
  },
});
export const withAttrsFormRowGrid = () => ({
  render() {
    return (
      <DataForm
        {...{
          props: {
            forms: formsRowGrid,
            data: {
              name: "zyd",
              title: 1,
              age: 30,
              sex: "男",
              level: 10,
              position: "测试部",
            },
            layout: {
              use: "row-grid",
            },
          },
        }}
      />
    );
  },
});
