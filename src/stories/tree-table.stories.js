import TreeTable, { Store } from "../components/template/TreeTable";
export default {
  title: "Design System/Template/TreeTable",
};

const searchForm = [
  {
    label: "名称",
    prop: "label",
    use: "input",
    size: "mini",
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
const tableData = [
  {
    key: 1,
    label: 1,
    type: 1,
    age: 64,
    sex: 1,
    title: "test",
    children: [
      {
        label: "child 1",
        type: 1,
        age: 64,
        sex: 2,
        title: "test",
      },
      {
        label: "child 2",
        type: 1,
        age: 64,
        sex: 2,
        title: "test",
      },
      {
        label: 2,
        type: 1,
        age: 64,
        sex: 2,
        title: "test",
      },
    ],
  },
  {
    label: 2,
    type: 1,
    age: 64,
    sex: 2,
    title: "test",
  },
  {
    label: 2,
    type: 1,
    age: 64,
    sex: 2,
    title: "test",
  },
  {
    label: 2,
    type: 1,
    age: 64,
    sex: 2,
    title: "test",
  },
];
const column = [
  {
    type: "selection",
    width: "55",
  },
  {
    label: "序号",
    type: "index",
  },
  {
    prop: "label",
    label: "名称",
  },
  {
    prop: "sex",
    label: "年龄",
  },
  {
    prop: "title",
    label: "标题",
  },
  {
    prop: "type",
    label: "分类",
    "show-overflow-tooltip": true,
  },
];
const data = {
  table: {
    data: tableData,
    column: column,
  },
  searcher: {
    forms: searchForm,
    data: {
      label: "zyd",
      title: 1,
      age: 30,
      sex: "男",
    },
    layout: {
      use: "inline",
    },
  },
};
export const withBasic = () => ({
  render() {
    return <TreeTable config={data} />;
  },
});
const schema = {
  schema: [
    {
      type: "selection",
      width: "55",
    },
    {
      type: "expand",
      width: "55",
      prop: "expand",
      scopedSlots: true,
    },
    {
      label: "序号",
      type: "index",
    },
    {
      prop: "label",
      label: "名称",
      searcher: {
        use: "input",
      },
      forms: {
        use: "input",
      },
      size: "mini",
      edit: false,
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
      searcher: {
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
    data: [],
    total: 0,
    "highlight-current-row": true,
    page: {
      layout: `total, sizes, prev, pager, next, jumper`,
      currentPage: 1,
      pageSizes: [10, 15, 30, 100],
      pageSize: 10,
      background: false,
    },
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
    filter: true,
    searcher: true,
    data: {
      label: "zyd",
      title: 1,
      age: 30,
      sex: 2,
    },
    layout: {
      use: "inline",
    },
  },
};
const events = [
  "search",
  "select",
  "select-all",
  // "selection-change",
  // "cell-mouse-enter",
  // "cell-mouse-leave",
  "cell-click",
  "cell-dblclick",
  "row-click",
  "row-contextmenu",
  "row-dblclick",
  "header-click",
  "header-contextmenu",
  "sort-change",
  "filter-change",
  "current-change",
  "header-dragend",
  "expand-change",
];
export const withSchema = () => ({
  data() {
    schema.table.data = tableData;
    schema.table.total = tableData.length;
    const store = new Store(schema);
    return {
      store,
    };
  },
  methods: {
    handleRowClick(row) {
      console.log(row);
      if (row.children) {
        this.store.breadcrumb.push(row);
        this.store.table.data = row.children;
        this.store.table.total = row.children.length;
      }
    },
  },
  render() {
    return (
      <TreeTable
        store={this.store}
        {...{
          on: {
            "row-click": this.handleRowClick,
            "breadcrumb-click": () => {
              console.log("更新");
              this.store.table.data = tableData;
              this.store.table.total = tableData.length;
            },
          },
        }}
      />
    );
  },
});
