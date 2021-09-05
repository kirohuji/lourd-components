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
    label: "宣教名称",
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
        <DataTable column={column} data={data} />
      </div>
    );
  },
};
