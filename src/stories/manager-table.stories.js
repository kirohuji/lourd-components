import ManagerTable from "../components/template/ManagerTable";

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
  },
  {
    name: 2,
    type: 1,
  },
  {
    name: 3,
    type: 1,
  },
  {
    name: 4,
    type: 1,
  },
  {
    name: 5,
    type: 1,
  },
  {
    name: 6,
    type: 1,
  },
  {
    name: 7,
    type: 1,
  },
  {
    name: 8,
    type: 1,
  },
  {
    name: 9,
    type: 1,
  },
  {
    name: 10,
    type: 1,
  },
  {
    name: 11,
    type: 1,
  },
  {
    name: 12,
    type: 1,
  },
];
const column = [
  {
    type: "selection",
    width: "55",
  },
  {
    prop: "index",
    label: "序号",
    type: "index",
  },
  {
    prop: "name",
    label: "名称",
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
