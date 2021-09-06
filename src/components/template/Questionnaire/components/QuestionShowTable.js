import DataTable from "../../../organisms/DataTable";
import DataSearchForm from "../../../organisms/DataSearchForm";
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
    prop: "type",
    label: "问题类型",
    formatter: (row) => {
      switch (row.s_type) {
        case 1:
          return "单选题";
        case 2:
          return "多选题";
        case 3:
          return "评分题 5星制";
        case 4:
          return "评分题 8分制";
        case 5:
          return "评分题 10分制";
        case 6:
          return "填空题";
        case 7:
          return "问答题";
      }
    },
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
        <DataTable column={column} data={this.data} />
      </div>
    );
  },
};
