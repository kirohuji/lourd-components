import Card from "../../atoms/Card";
import DataCacheSearchForm from "../../organisms/DataCacheSearchForm";
import DataTable from "../../organisms/DataTable";
import Store from "./model/store";
import emitter from "element-ui/src/mixins/emitter";
import { find } from "lodash";
import BaseEnter from "../../molecules/BaseEnter/newIndex";
import DataDialog from "../../organisms/DataDialog";
// import _ from "lodash";
// import BaseDialog from "../../molecules/BaseDialog";
// import DataForm from "../../organisms/DataForm";
import "./index.scss";
// const OperationHeader = {
//   render() {},
// };
export default {
  name: "ManagerTable",
  props: ["config"],
  components: {
    DataCacheSearchForm,
    DataTable,
    BaseEnter,
    DataDialog,
  },
  // watch: {
  //   "operationHeader.select": {
  //     handler(val) {
  //       this.operationHeader.current = _.find(
  //         this.store.searcher.forms,
  //         "prop",
  //         val
  //       );
  //       console.log(this.operationHeader.current);
  //     },
  //   },
  // },
  data() {
    const store = new Store(this.config);
    return {
      hasOperation: true,
      store: store,
      currentRecord: null,
      operationHeader: {
        prop: "operation",
        label: "操作",
        scopedSlots: true,
        select: "",
        value: "",
        current: null,
        renderHeader: () => (
          <div class="operation-header">
            {/* <BaseEnter
              use="select"
              size="mini"
              vModel={this.operationHeader.select}
              children={{
                use: "option",
                options: _.compact(
                  store.table.column.map((item) => {
                    return (
                      item.label && {
                        label: item.label,
                        value: item.prop,
                      }
                    );
                  })
                ),
              }}
            />
            {this.operationHeader.current && (
              <BaseEnter
                use={this.operationHeader.current.formUse}
                vModel={this.operationHeader.value}
                size="mini"
                style="width: 120px;margin-left: 8px"
                items={this.operationHeader.current}
              />
            )} */}
            {/* <ElInput
              placeholder="请输入内容"
              size="mini"
              vModel={this.operationHeader.input}
            >
              <ElSelect
                slot="prepend"
                placeholder="请选择"
                default-first-option
                vModel={this.operationHeader.select}
              >
                {store.table.column.map(
                  (item) =>
                    item.label && (
                      <ElOption label={item.label} value={item.prop} />
                    )
                )}
              </ElSelect>
            </ElInput> */}
            <ElButton
              size="mini"
              type="primary"
              onClick={() =>
                this.handleDialog({
                  mode: "add",
                  form: {
                    ...this.store.forms,
                    data: {},
                  },
                })
              }
            >
              新增
            </ElButton>
            <ElButton
              size="mini"
              type="primary"
              onClick={() =>
                this.handleDialog({
                  mode: "add",
                  form: {
                    ...this.store.forms,
                    data: {},
                  },
                })
              }
            >
              批量导入
            </ElButton>
            {this.currentRecord && this.currentRecord.length > 1 ? (
              <ElButton size="mini" type="danger" style="margin-left: 8px">
                批量删除
              </ElButton>
            ) : (
              ""
            )}
            {/* {this.currentRecord && this.currentRecord.length > 1 ? (
              <ElButton size="mini" style="margin-left: 8px">
                批量复制
              </ElButton>
            ) : (
              ""
            )} */}
          </div>
        ),
      },
    };
  },
  mixins: [emitter],
  created() {
    if (!find(this.store.table.column, ["prop", "operation"])) {
      this.store.table.column.push(this.operationHeader);
      this.hasOperation = true;
    }
  },
  methods: {
    handleDialog(opt) {
      this.$nextTick(() => {
        console.log(opt);
        if (this.$refs.dialog) {
          this.$refs.dialog.open(opt);
        }
      });
    },
    handleSelect(select) {
      this.currentRecord = select;
      console.log(this.currentRecord);
    },
  },
  mounted() {
    console.log("更新");
    this.$forceUpdate();
  },
  render() {
    return (
      <div class="manager-table">
        <DataDialog ref="dialog" />
        <Card class="main-content-header">
          <DataCacheSearchForm
            {...{
              props: this.store.searcher,
              on: this.$listeners,
            }}
          />
        </Card>
        <Card class="main-content-body">
          <DataTable
            {...{
              props: this.store.table,
              on: {
                ...this.$listeners,
                select: this.handleSelect,
                "select-all": this.handleSelect,
              },
              scopedSlots: {
                operation: ({ row }) =>
                  this.hasOperation && (
                    <div class="manager-table-operation">
                      <ElButton
                        size="mini"
                        onClick={() =>
                          this.handleDialog({
                            mode: "edit",
                            form: {
                              ...this.store.forms,
                              data: row,
                            },
                          })
                        }
                      >
                        编辑
                      </ElButton>
                      <ElButton size="mini">查看</ElButton>
                      <ElButton size="mini">复制</ElButton>
                      <ElButton size="mini" type="danger">
                        删除
                      </ElButton>
                    </div>
                  ),
              },
            }}
          ></DataTable>
        </Card>
      </div>
    );
  },
};
