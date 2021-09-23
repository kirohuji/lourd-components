import DataForm from "../components/organisms/DataForm";
import DataSearchForm from "../components/organisms/DataSearchForm";
import DataCacheSearchForm from "../components/organisms/DataCacheSearchForm";
import Inline from "../components/molecules/Layout/inline";
// import { Button } from "element-ui";
export default {
  title: "Design System/Organisms/DataForm",
};
const forms = [
  {
    label: "名称",
    prop: "name",
    use: "label",
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
export const withAttrs = () => ({
  render() {
    return (
      <DataForm
        {...{
          props: {
            question: true,
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
      span: 12,
    },
    {
      label: "年龄",
      prop: "age",
      use: "label",
      span: 12,
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

const searchForm = [
  {
    label: "名称",
    prop: "name",
    use: "select",
    size: "mini",
    isReal: true,
    children: {
      use: "option",
      options: {
        runner: () => {
          return Promise.resolve({
            data: [
              {
                node_id: 1,
              },
              {
                node_id: 2,
              },
              {
                node_id: 3,
              },
              {
                node_id: 4,
              },
            ],
          });
        },
        variables: {},
        immediate: true,
        initData: function (data) {
          return data.length && [data[0].value];
        },
        callback: (data) => {
          return data.map((item) => {
            return {
              label: item.node_id,
              value: item.node_id,
            };
          });
        },
      },
    },
  },
  {
    label: "年龄",
    prop: "age",
    use: "input",
    size: "mini",
  },
  {
    label: "性别",
    prop: "sex",
    use: "input",
    size: "mini",
  },
  {
    label: "标题",
    prop: "title",
    use: "input",
    size: "mini",
  },
];
export const withSearch = () => ({
  data() {
    return {
      data: {
        name: "zyd",
        title: 1,
        age: 30,
        sex: "男",
      },
    };
  },
  render() {
    return (
      <DataSearchForm
        {...{
          props: {
            forms: searchForm,
            data: this.data,
            layout: {
              use: "inline",
            },
          },
          on: {
            "update:data": (data) => (this.data = data),
          },
        }}
      />
    );
  },
});
export const withCacheSearchForm = () => ({
  data() {
    return {
      data: {
        name: "zyd",
        title: 1,
        age: 30,
        sex: "男",
      },
    };
  },
  render() {
    return (
      <DataCacheSearchForm
        {...{
          props: {
            forms: searchForm,
            data: this.data,
            layout: {
              use: "inline",
            },
          },
          on: {
            "update:data": (data) => (this.data = data),
          },
        }}
      />
    );
  },
});
