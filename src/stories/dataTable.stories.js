import DataTable from "../components/organisms/DataTable";

export default {
  title: "organisms/DataTable",
};
const column = [
  {
    type: "selection",
    width: "55",
  },
  {
    prop: "index",
    label: "序号",
    type: "index",
    width: "100",
  },
  {
    prop: "name",
    label: "名称",
    width: "100",
  },
  {
    prop: "type",
    label: "分类",
    width: "150",
    "show-overflow-tooltip": true,
  },
];
const data = [
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
export const withDataTable = () => ({
  render() {
    return (
      <DataTable column={column} data={data} idKey="name" selectData={[1, 2]} />
    );
  },
});
