import DataTable from "../../../organisms/DataTable";
import DataSearchForm from "../../../organisms/DataSearchForm";
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
    prop: "type",
    label: "问题类型",
  },
];
export default {
  render() {
    return (
      <div>
        <DataSearchForm
          {...{
            props: {
              forms: [
                {
                  prop: "title",
                  order: 2,
                  use: "search",
                  size: "small",
                  placeholder: "检索问题名称关键词",
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
            scopedSlots: {
              right: () => (
                <el-button type="primary" size="small">
                  新建问题
                </el-button>
              ),
            },
          }}
        ></DataSearchForm>
        <DataTable column={column} data={data} />
      </div>
    );
  },
};
