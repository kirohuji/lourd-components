import Card from "../../atoms/Card";
import DataCacheSearchForm from "../../organisms/DataCacheSearchForm";
import DataTable from "../../organisms/DataTable";
import Store from "./model/store";
import emitter from "element-ui/src/mixins/emitter";
import { find } from "lodash";
import BaseEnter from "../../molecules/BaseEnter";
import DataDialog from "../../organisms/DataDialog";
import "./index.scss";
import {
  Divider,
  Breadcrumb,
  BreadcrumbItem,
  Descriptions,
  DescriptionsItem,
} from "element-ui";
export { Store };
export default {
  name: "TreeTable",
  props: ["store"],
  components: {
    DataCacheSearchForm,
    DataTable,
    BaseEnter,
    DataDialog,
    Descriptions,
    DescriptionsItem,
    Breadcrumb,
    BreadcrumbItem,
  },
  data() {
    return {
      hasOperation: true,
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
    handleBreadcrumbClick(row) {
      this.$emit("breadcrumb-click", row);
    },
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
        <Divider />
        <Card class="main-content-body">
          <Breadcrumb separator-class="el-icon-arrow-right">
            {this.store.breadcrumb.map((item) => (
              <BreadcrumbItem
                {...{
                  props: {
                    to: {
                      path: item.label,
                    },
                  },
                  nativeOn: {
                    click: () => this.handleBreadcrumbClick(item),
                  },
                }}
              >
                {item.label}
              </BreadcrumbItem>
            ))}
          </Breadcrumb>
          <DataTable
            {...{
              props: this.store.table,
              attrs: this.store.table,
              on: {
                select: this.handleSelect,
                "select-all": this.handleSelect,
                ...this.$listeners,
              },
              scopedSlots: {
                expand: ({ row }) => (
                  <div class="description">
                    <Descriptions column={5} direction="vertical">
                      {Object.entries(row).map(([key, val]) => {
                        let props = find(this.store.table.column, [
                          "prop",
                          key,
                        ]);
                        return (
                          props && (
                            <DescriptionsItem
                              {...{
                                props: props,
                                on: this.$listeners,
                              }}
                            >
                              {val}
                            </DescriptionsItem>
                          )
                        );
                      })}
                    </Descriptions>
                  </div>
                ),
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
