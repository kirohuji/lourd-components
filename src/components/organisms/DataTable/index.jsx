import "./style.scss";
import multipleSelect from "./multipleSelect";
export default {
  name: "DataTable",
  componentName: "DataTable",
  props: [
    "column",
    "total",
    "data",
    "idKey",
    "selectData",
    "collector",
    "page",
  ],
  mixins: [multipleSelect],
  data: () => ({
    table: {},
    innerPage: {
      layout: `total, sizes, prev, pager, next, jumper`,
      total: 0,
      currentPage: 1,
      "page-sizes": [10, 15, 30, 100],
      pageSize: 10,
      background: false,
    },
  }),
  computed: {
    pagination() {
      return {
        limit: this.$refs.pagination?.internalPageSize,
        page: this.$refs.pagination?.internalCurrentPage,
        total: this.total,
      };
    },
  },
  // watch: {
  //   data: {
  //     handler() {
  //       this.page.total = this.total || this.data.length;
  //     },
  //     immediate: true,
  //     deep: true,
  //   },
  // },
  methods: {
    update(val) {
      console.log(val);
    },
    handleSizeChange() {
      this.$emit("change", this.pagination);
    },
    handleCurrentChange() {
      this.$emit("change", this.pagination);
    },
  },
  render() {
    return (
      <div class="data-table">
        <ElTable
          ref="table"
          data={this.data}
          {...{
            props: {
              ...this.$attrs,
              ...this.table,
            },
            on: {
              "selection-change": this.handleSelectionChange,
              ...this.$listeners,
            },
          }}
        >
          {this.column.map((item) => {
            if (item.isHide) {
              return (
                !item.isHide() && (
                  <ElTableColumn
                    {...{
                      props: item,
                      scopedSlots: {
                        default: this.$scopedSlots[item.prop],
                      },
                    }}
                  />
                )
              );
            } else {
              return (
                <ElTableColumn
                  {...{
                    props: item,
                    scopedSlots: {
                      default: this.$scopedSlots[item.prop],
                    },
                  }}
                />
              );
            }
          })}
        </ElTable>
        {!(this.$attrs["no-page"] || this.$attrs.noPage) && (
          <ElPagination
            class="pagination"
            ref="pagination"
            {...{
              props: {
                ...this.page,
                total: this.total,
              },
              on: {
                "size-change": this.handleSizeChange,
                "current-change": this.handleCurrentChange,
                "update:currentPage": (val) => (this.page.currentPage = val),
                "update:pageSize": (val) => (this.page.pageSize = val),
                ...this.$listeners,
              },
            }}
          ></ElPagination>
        )}
      </div>
    );
  },
};
