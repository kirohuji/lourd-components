import DataForm from "@/components/organisms/DataForm";
import DataSearchForm from "@/components/organisms/DataSearchForm";
import DataCacheSearchForm from "@/components/organisms/DataCacheSearchForm";
import Inline from "@/components/molecules/Layout/inline";
import { api } from "@/utils/http";
import _ from "lodash";
// import { Button } from "element-ui";
export default {
  title: "Lourd Components/Components/DataForm/基本案例",
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
export const withAttrs = (args) => ({
  render() {
    return (
      <DataForm
        {...{
          props: {
            forms, // 参数配置
            data: { // 初始化的值
              name: "zyd",
              title: 1,
              age: 30,
              sex: "男",
              level: 10,
              position: "测试部",
            },
            layout: { // 布局
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
export const withScopedSlots = (args) => ({
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
    isReal: false,
    children: {
      use: "option",
      options: {
        onAfter: function (data) {
          return data[0].value;
        },
        runner: () => {
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve({
                data: [
                  {
                    node_id: 1111,
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
            }, 6000);
          });
        },
        variables: {},
        immediate: true,
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
    use: "search",
    size: "mini",
  },
];
export const withSearch = () => ({
  data() {
    return {
      data: {
        // name: "zyd",
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
  methods: {
    handleEvent() {
      this.$refs.searcher.isRefresh = false;
    },
  },
  render() {
    return (
      <DataCacheSearchForm
        ref="searcher"
        {...{
          props: {
            forms: searchForm,
            data: this.data,
            searcher: true,
            user: "user",
            scoped: "users",
            request: {
              getItem(model) {
                let cacheid;
                if (typeof model === "string") {
                  const strings = model.split("-");
                  cacheid = strings[strings.length - 1];
                } else {
                  cacheid = model.cacheid || model.name;
                }
                return _.find(
                  this.store.records,
                  (o) => o.cacheid == Number(cacheid) || o.name == cacheid
                );
              },
              // 请求
              removeItem(item) {
                // debugger
                return api.delete(`/searcher/${item.id}`).then(() => true);
              },
              // 请求
              list() {
                return api.get(`/searcher/list/user/users`).then((data) => {
                  // debugger
                  console.log("获取数据", data);
                  return {
                    data: data,
                  };
                });
              },
              setItem(name, payload) {
                return api
                  .post(`/searcher`, {
                    alias: name,
                    user: "user",
                    scoped: "users",
                    label: JSON.stringify(payload),
                  })
                  .then(() => true);
              },
            },
            layout: {
              use: "inline",
            },
          },
          on: {
            events: (data) => this.handleEvent(data),
            "update:data": (data) => (this.data = data),
          },
        }}
      />
    );
  },
});
export const withCacheSearchFormRole = () => ({
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
  methods: {
    handleEvent() {
      this.$refs.searcher.isRefresh = false;
    },
  },
  render() {
    return (
      <DataCacheSearchForm
        ref="searcher"
        {...{
          props: {
            forms: searchForm,
            data: this.data,
            searcher: true,
            user: "user",
            scoped: "roles",
            request: {
              // 请求
              removeItem(item) {
                // debugger
                return api.delete(`/searcher/${item.id}`).then(() => true);
              },
              // 请求
              list() {
                return api.get(`/searcher/list/user/roles`).then((data) => {
                  // debugger
                  console.log("获取数据", data);
                  return {
                    data: data,
                  };
                });
              },
              setItem(name, payload) {
                console.log("角色请求");
                return api
                  .post(`/searcher`, {
                    alias: name,
                    user: "user",
                    scoped: "roles",
                    label: JSON.stringify(payload),
                  })
                  .then(() => true);
              },
            },
            layout: {
              use: "inline",
            },
          },
          on: {
            events: (data) => this.handleEvent(data),
            "update:data": (data) => (this.data = data),
          },
        }}
      />
    );
  },
});
