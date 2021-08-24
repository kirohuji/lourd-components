import EditTable from "../components/template/EditTable";
import { cascaderOption, radioBorderGroup } from "./config";
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
      forms: {
        size: "small",
        order: 2,
        placeholder: "请输入内容",
        use: "input",
      },
    },
    {
      prop: "node_name",
      label: "所属机构",
      width: "450",
      add: true,
      order: 1,
      use: "cascader",
      size: "small",
      expandTrigger: "hover",
      "collapse-tags": true,
      options: cascaderOption,
      props: {
        value: "node_id",
        label: "name",
        checkStrictly: false,
      },
      searcher: {},
      forms: {
        default: function () {
          return this.template.currentState.dataSearchForm.node_name;
        },
      },
      isHide: () => {
        return localStorage.getItem("selectedTab") === "1";
      },
    },
    {
      prop: "r_name",
      label: "所属角色",
      width: "435",
      size: "small",
      isHide: () => {
        return localStorage.getItem("selectedTab") === "1";
      },
      forms: {
        use: "radio-group",
        class: "radio-border-group",
        children: () => {
          return {
            use: "radio",
            cache: "r_name",
            options: () =>
              radioBorderGroup.map((item) => {
                return {
                  label: item.name,
                  value: item.r_id,
                };
              }),
          };
        },
      },
    },
    {
      prop: "remark",
      label: "备注",
      size: "small",
      forms: {
        class: "textarea-435",
        use: "input",
        type: "textarea",
        placeholder: "请输入备注",
      },
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
      size: "small",
      formatter: (row) => {
        return row?.sex === 1 ? "男" : "女";
      },
      isHide: () => true,
    },
    {
      prop: "type",
      label: "分类",
      isHide: () => true,
      "show-overflow-tooltip": true,
    },
  ],
  table: {
    data: [],
  },
  dialog: {
    layout: {
      use: "inline",
    },
    create: "新建用户",
  },
  forms: {
    forms: [
      {
        prop: "phone",
        label: "手机号",
        width: "150",
        size: "small",
        order: 3,
        placeholder: "请输入手机号",
        use: "input",
      },
    ],
    data: {},
    layout: {
      use: "inline",
      gutter: 20,
      direction: "column",
    },
  },
  searcher: {
    forms: [
      {
        prop: "title",
        label: "用户搜索",
        order: 2,
        use: "search",
        size: "small",
      },
    ],
    filter: false,
    searcher: false,
    actual: true,
    create: "新建用户",
    data: {},
    layout: {
      use: "inline",
    },
  },
};
export const withSchema = () => ({
  modules: ["service1", "service2"],
  provide() {
    return {
      page: this,
    };
  },
  data() {
    return {
      tableData: [
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
      ],
    };
  },
  methods: {
    show(payload) {
      console.log(payload);
      this.tableData.push({
        name: 1,
        type: 1,
        age: 64,
        sex: 1,
        status: "allow",
        title: "test",
      });
    },
  },
  render() {
    return (
      <EditTable config={schema} onEvents={(payload) => this.show(payload)} />
    );
  },
});
