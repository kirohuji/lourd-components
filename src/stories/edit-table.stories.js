import EditTable from "../components/template/EditTable";
import { cascaderOption } from "./config";
export default {
  title: "Design System/Template/EditTable",
};
const tableData = [
  {
    name: 1,
    type: 1,
    age: 64,
    sex: 1,
    status: "allow",
    title: "test",
  },
  {
    name: 2,
    type: 1,
    age: 64,
    sex: 2,
    title: "test",
  },
  {
    name: 2,
    type: 1,
    age: 64,
    sex: 2,
    title: "test",
  },
  {
    name: 2,
    type: 1,
    age: 64,
    sex: 2,
    title: "test",
  },
];
const schema = {
  schema: [
    {
      prop: "name",
      label: "姓名",
      width: "150",
    },
    {
      prop: "node_name",
      label: "所属机构",
      width: "450",
      searcher: {
        order: 2,
        use: "cascader",
        size: "mini",
        expandTrigger: "hover",
        "collapse-tags": true,
        options: cascaderOption,
        props: {
          value: "node_id",
          label: "name",
          checkStrictly: false,
        },
      },
      isHide: () => {
        return localStorage.getItem("selectedTab") === "1";
      },
    },
    {
      prop: "r_name",
      label: "所属角色",
      width: "250",
      isHide: () => {
        return localStorage.getItem("selectedTab") === "1";
      },
    },
    {
      prop: "remark",
      label: "备注",
    },
    {
      prop: "status",
      label: "状态",
      formatter: (row) => {
        switch (row.status) {
          case "allow":
            return "在用";
          case "ban":
            return "禁用";
        }
      },
    },
    {
      prop: "sex",
      label: "性别",
      forms: {
        use: "select",
        children: () => {
          return {
            use: "option",
            options: [
              {
                label: "男",
                value: 1,
              },
              {
                label: "女",
                value: 2,
              },
            ],
          };
        },
      },
      size: "mini",
      formatter: (row) => {
        return row?.sex === 1 ? "男" : "女";
      },
    },
    {
      prop: "title",
      label: "标题",
      searcher: {
        order: 1,
        use: "input",
      },
      forms: {
        edit: false,
        use: "input",
      },
      size: "mini",
    },
    {
      prop: "type",
      label: "分类",
      isHide: () => true,
      "show-overflow-tooltip": true,
    },
  ],
  table: {
    data: tableData,
  },
  dialog: {
    layout: {
      use: "inline",
    },
  },
  forms: {
    data: {},
    layout: {
      use: "inline",
      gutter: 20,
      direction: "column",
    },
  },
  searcher: {
    filter: false,
    searcher: false,
    data: {
      name: "zyd",
      title: 1,
      age: 30,
      sex: 2,
    },
    layout: {
      use: "inline",
    },
  },
};
export const withSchema = () => ({
  render() {
    return <EditTable config={schema} />;
  },
});
