import "./style.scss";
import multipleSelect from "./multipleSelect";
export default {
  name: 'DataTable',
  props: ["column", "data", "total", "idKey", "selectData"],
  mixins: [multipleSelect],
  data: () => ({
    table: {},
    page: {
      layout: `total, sizes, prev, pager, next, jumper`,
      total: 0,
      "page-sizes": [10, 15, 30, 100],
      "page-size": 10,
      background: false,
    },
  }),
  computed: {
    pagination() {
      return {
        limit: this.$refs.pagination?.internalPageSize,
        page: this.$refs.pagination?.internalCurrentPage,
        total: this.page.total,
      };
    },
  },
  watch: {
    data: {
      handler() {
        this.page.total = this.total || this.data.length;
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    handleSizeChange() {
      this.$emit("change");
    },
    handleCurrentChange() {
      this.$emit("change");
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
              props: this.page,
              on: {
                "size-change": this.handleSizeChange,
                "current-change": this.handleCurrentChange,
                ...this.$listeners,
              },
            }}
          ></ElPagination>
        )}
      </div>
    );
  },
};
