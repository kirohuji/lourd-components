import Card from "../../atoms/Card";
import DataSearchForm from "../../organisms/DataSearchForm";
import collector from "../../organisms/DataForm/collector";
import DataTable from "../../organisms/DataTable";
import DataDialog from "../../organisms/DataDialog";
import Store from "./model/store";
import emitter from "element-ui/src/mixins/emitter";
export default {
  name: "EditTable",
  props: ["config"],
  inject: ["page"],
  provide() {
    return {
      template: this,
    };
  },
  components: { Card, DataDialog },
  mixins: [emitter, collector],
  data() {
    const store = new Store(this.config);
    return {
      store,
      currentState: {
        dataSearchForm: {},
      },
    };
  },
  methods: {
    handleDataTableChange(payload) {
      this.$emit("events", {
        name: "change",
        componentName: "DataTable",
        data: payload,
      });
    },
    handleDialog(opt) {
      this.$nextTick(() => {
        this.currentState.dataSearchForm =
          this.collect().dataSearchForm.currentData();
        if (this.$refs.dialog) {
          this.$refs.dialog.open(opt);
        }
      });
    },
  },
  created() {
    if (!find(this.store.table.column, ["prop", "operation"])) {
      this.store.table.column.push({
        prop: "operation",
        label: "操作",
        scopedSlots: true,
        select: "",
        value: "",
        width: "100px",
        current: null,
      });
    }
  },
  render() {
    return (
      <div>
        <DataDialog ref="dialog" />
        <Card style="padding: 14px;padding-bottom: 0">
          <DataSearchForm
            {...{
              props: this.store.searcher,
              on: this.$listeners,
              scopedSlots: {
                right:
                  this.store.searcher.create &&
                  (() => (
                    <el-button
                      type="primary"
                      size="small"
                      onClick={() =>
                        this.handleDialog({
                          mode: "add",
                          title: this.store.dialog.create,
                          form: {
                            ...this.store.forms,
                            data: {},
                          },
                        })
                      }
                    >
                      {this.store.searcher.create}
                    </el-button>
                  )),
              },
            }}
          ></DataSearchForm>
        </Card>
        <Card style="pading: 14px;padding-top: 0">
          <DataTable
            {...{
              props: {
                ...this.store.table,
                data: this.page.tableData || [],
              },
              on: {
                change: this.handleDataTableChange,
                ...this.$listeners,
              },
              scopedSlots: {
                operation: ({ row }) => (
                  <div
                    class="operation"
                    style="display: flex;justify-content: space-between;"
                  >
                    <el-link
                      type="primary"
                      disabled={row.disabled == 1 ? true : false}
                      onClick={() =>
                        this.handleDialog({
                          mode: "edit",
                          title: this.store.dialog.create,
                          form: {
                            ...this.store.forms,
                            data: row,
                          },
                        })
                      }
                    >
                      编辑
                    </el-link>

                    <el-link
                      type="primary"
                      disabled={row.disabled == 1 ? true : false}
                    >
                      开启
                    </el-link>
                  </div>
                ),
                ...this.$scopedSlots,
              },
            }}
          />
        </Card>
      </div>
    );
  },
};
