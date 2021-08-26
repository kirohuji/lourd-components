const runner = () =>
  new Promise((resolve) => {
    console.log("开始请求拉");
    setTimeout(() => {
      console.log("请求结束");
      resolve({
        data: [
          {
            label: "1",
            showLabel: "2",
            name: "3",
            value: "4",
          },
        ],
      });
    }, 1000);
  });
export default {
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
      options: () => {
        return {
          runner: runner,
        };
      },
      props: {
        value: "node_id",
        label: "name",
        checkStrictly: false,
      },
      searcher: {
        default: 51,
      },
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
        children: function () {
          return {
            use: "base-radio",
            options: {
              runner: runner,
            },
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
    column: [
      {
        prop: "operation",
        label: "操作",
        width: "100",
        scopedSlots: true,
      },
    ],
    data: [
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
        isReal: true,
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
