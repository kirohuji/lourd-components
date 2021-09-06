import DataTable from "../../../organisms/DataTable";
import DataSearchForm from "../../../organisms/DataSearchForm";
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
    prop: "title",
    label: "宣教名称",
  },
  {
    prop: "c_name",
    label: "问题类型",
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
      <div>
        <DataSearchForm
          {...{
            props: {
              forms: [
                {
                  prop: "title",
                  order: 1,
                  use: "search",
                  size: "small",
                  placeholder: "检索问题名称关键词",
                },
                {
                  prop: "type",
                  order: 2,
                  use: "select",
                  size: "small",
                },
              ],
              filter: false,
              searcher: false,
              actual: true,
              create: "新建问题",
              data: {},
              layout: {
                use: "inline",
              },
            },
            on: this.$listeners,
          }}
        ></DataSearchForm>
        <DataTable column={column} data={this.data} />
      </div>
    );
  },
};
