import Card from "../../atoms/Card";
import DataSearchForm from "../../organisms/DataSearchForm";
import collector from "../../organisms/DataForm/collector";
import DataTable from "../../organisms/DataTable";
import DataDialog from "../../organisms/DataDialog";
import Store from "./model/store";
import emitter from "element-ui/src/mixins/emitter";
import { find } from "lodash";
export default {
  name: "EditTable",
  props: ["config"],
  inject: {
    page: {
      from: "page",
      default: {},
    },
  },
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
      hasOperation: false,
      currentState: {
        dataSearchForm: {},
      },
    };
  },
  methods: {
    dialogClose() {
      this.$refs.dialog.close();
    },
    handleSubmit(payload) {
      this.$emit("events", {
        name: "submit",
        componentName: "DataDialog",
        data: payload,
      });
    },
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
    refresh() {
      const collectors = this.collect();
      return {
        dataSearchForm: collectors.dataSearchForm.currentData(),
        dataTable: collectors.dataTable.pagination,
      };
    },
  },
  created() {
    if (
      !find(this.store.table.column, ["prop", "operation"]) &&
      !this.hasOperation
    ) {
      this.store.table.column.push({
        prop: "operation",
        label: "操作",
        scopedSlots: true,
        select: "",
        value: "",
        width: "100px",
        current: null,
      });
      this.hasOperation = true;
    }
  },
  render() {
    return (
      <div style="background: rgb(255, 255, 255);padding: 0px 14px 14px;">
        <DataDialog
          ref="dialog"
          onSubmit={(payload) => this.handleSubmit(payload)}
        />
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
                collector: "dataTable",
                ...this.store.table,
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
