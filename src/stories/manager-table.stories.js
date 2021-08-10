import ManagerTable from "../components/template/ManagerTable";
import { action } from "@storybook/addon-actions";
export default {
  title: "Design System/Template/ManagerTable",
};

const searchForm = [
  {
    label: "名称",
    prop: "name",
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
    name: 1,
    type: 1,
    age: 64,
    sex: 1,
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
    prop: "name",
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
      name: "zyd",
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
    return <ManagerTable config={data} />;
  },
});
const schema = {
  schema: [
    {
      type: "selection",
      width: "55",
    },
    {
      label: "序号",
      type: "index",
    },
    {
      prop: "name",
      label: "名称",
      formUse: "input",
      size: "mini",
    },
    {
      prop: "sex",
      label: "性别",
      formUse: "select",
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
      size: "mini",
      formatter: (row) => {
        return row?.sex === 1 ? "男" : "女";
      },
    },
    {
      prop: "title",
      label: "标题",
      formUse: "input",
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
  searcher: {
    data: {
      name: "zyd",
      title: 1,
      age: 30,
      sex: 1,
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
  render() {
    let handler = {};
    events.forEach((item) => (handler[item] = (...args) => action(item)(args)));
    return (
      <ManagerTable
        config={schema}
        {...{
          on: handler,
        }}
      />
    );
  },
});
