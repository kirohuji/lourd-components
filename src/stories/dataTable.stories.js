import DataTable from "../components/organisms/DataTable";
import * as TableStories from "./table.stories";
import * as events from "./events";
import { action } from "@storybook/addon-actions";
const data = [
  {
    name: "郑勇达",
    type: "开发者",
  },
  {
    name: "zyd",
    type: "开发者",
  },
  {
    name: "lourd",
    type: "开发者",
  },
  {
    name: "hjkl",
    type: "开发者",
  },
  {
    name: "郑勇达1",
    type: "开发者",
  },
  {
    name: "zyd1",
    type: "开发者",
  },
  {
    name: "lourd1",
    type: "开发者",
  },
];
export default {
  title: "Design System/Organisms/DataTable",
  actions: { argTypesRegex: "^on[A-Z].*" },
  argTypes: {
    currentRowKey: {
      options: Object.keys(data[0]),
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
const event = [
  ...events.tableEvents,
  "size-change",
  "current-change",
  "prev-click",
  "next-click",
];
const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  render() {
    let handler = {};
    event.forEach((item) => (handler[item] = (...args) => action(item)(args)));
    return (
      <DataTable
        column={column}
        data={data}
        idKey="name"
        selectData={[1, 2]}
        {...{
          attrs: this.$props,
          on: handler,
        }}
      />
    );
  },
});
export const withDataTable = Template.bind({});
withDataTable.args = {
  ...TableStories.withTable.args,
  noPage: false,
};
