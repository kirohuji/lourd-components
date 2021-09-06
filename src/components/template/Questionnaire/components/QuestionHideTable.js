import DataTable from "../../../organisms/DataTable";
import { Radio, RadioGroup } from "element-ui";
const column = [
  {
    prop: "index",
    label: "序号",
    type: "index",
  },
  {
    prop: "title",
    label: "问题名称",
  },
  {
    prop: "operation",
    label: "后续问题显示",
  },
];
export default {
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },
  render() {
    return (
      <DataTable
        column={column}
        data={this.data}
        {...{
          scopedSlots: {
            operation: ({ row }) => (
              <RadioGroup vModel={row.show}>
                <Radio label={1}>显示</Radio>
                <Radio label={2}>不显示</Radio>
              </RadioGroup>
            ),
          },
        }}
      />
    );
  },
};
