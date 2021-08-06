import { Table, TableColumn } from "element-ui";
import { action } from "@storybook/addon-actions";
// import _ from "lodash";
const tableData = [
  {
    date: "2016-05-02",
    name: "王小虎",
    address: "上海市普陀区金沙江路 1518 弄",
  },
  {
    date: "2016-05-04",
    name: "王小虎",
    address: "上海市普陀区金沙江路 1517 弄",
  },
  {
    date: "2016-05-01",
    name: "王小虎",
    address: "上海市普陀区金沙江路 1519 弄",
  },
  {
    date: "2016-05-03",
    name: "王小虎",
    address: "上海市普陀区金沙江路 1516 弄",
  },
  {
    date: "2016-05-02",
    name: "王小虎",
    address: "上海市普陀区金沙江路 1518 弄",
  },
  {
    date: "2016-05-04",
    name: "王小虎",
    address: "上海市普陀区金沙江路 1517 弄",
  },
  {
    date: "2016-05-01",
    name: "王小虎",
    address: "上海市普陀区金沙江路 1519 弄",
  },
  {
    date: "2016-05-03",
    name: "王小虎",
    address: "上海市普陀区金沙江路 1516 弄",
  },
];
export default {
  title: "Element UI/Table",
  actions: { argTypesRegex: "^on[A-Z].*" },
  argTypes: {
    currentRowKey: {
      options: Object.keys(tableData[0]),
      control: { type: "radio" },
    },
    size: {
      options: ["medium", "small", "mini"],
      control: { type: "radio" },
    },
    tooltipEffect: {
      options: ["dark", "light"],
      control: { type: "radio" },
    },
  },
};
const events = [
  "select",
  "select-all",
  "selection-change",
  //   "cell-mouse-enter",
  //   "cell-mouse-leave",
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
const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  render() {
    let handler = {};
    events.forEach((item) => (handler[item] = (...args) => action(item)(args)));
    return (
      <Table
        data={tableData}
        {...{
          props: this.$props,
          on: handler,
        }}
      >
        <TableColumn width="55" type="selection" />
        <TableColumn prop="date" label="日期" />
        <TableColumn prop="name" label="姓名" />
        <TableColumn prop="address" label="地址" />
      </Table>
    );
  },
});
export const withTable = Template.bind({});
withTable.args = {
  height: 500,
  stripe: true,
  border: false,
  size: "mini",
  fit: true,
  showHeader: true,
  highlightCurrentRow: true,
  currentRowKey: "date",
  tooltipEffect: "dark",
  showSummary: true,
  sumText: "total",
  selectOnIndeterminate: true,
};
