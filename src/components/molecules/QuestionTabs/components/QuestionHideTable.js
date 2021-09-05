import DataTable from "../../../organisms/DataTable";
import { Radio, RadioGroup } from "element-ui";
const data = [
  {
    name: "郑勇达",
    type: "开发者",
  },
];
const column = [
  {
    prop: "index",
    label: "序号",
    type: "index",
  },
  {
    prop: "name",
    label: "问题名称",
  },
  {
    prop: "operation",
    label: "后续问题显示",
  },
];
export default {
  render() {
    return (
      <DataTable
        column={column}
        data={data}
        {...{
          scopedSlots: {
            operation: () => (
              <RadioGroup>
                <Radio label="1">显示</Radio>
                <Radio label="2">不显示</Radio>
              </RadioGroup>
            ),
          },
        }}
      />
    );
  },
};
