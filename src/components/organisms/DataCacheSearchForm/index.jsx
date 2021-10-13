import _ from "lodash";
import SearchFilter from "./components/Filter/index";
import Card from "../../atoms/Card";
import DataSearchForm from "../DataSearchForm";
import Store from "./localstorage";
// import Store from './localstorage';
const reg =
  /^((?:[\u3400-\u4DB5\u4E00-\u9FEA\uFA0E\uFA0F\uFA11\uFA13\uFA14\uFA1F\uFA21\uFA23\uFA24\uFA27-\uFA29]|[\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0])|(\d)|[a-zA-Z]){1,30}$/;

const MainLayout = {
  render() {
    return (
      <main>{this.$scopedSlots.default && this.$scopedSlots.default()}</main>
    );
  },
};
const BottomLayout = {
  render() {
    return (
      <div
        class="bottom"
        style={{
          marginTop: "1px",
        }}
      >
        {this.$scopedSlots.default && this.$scopedSlots.default()}
      </div>
    );
  },
};

export default {
  name: "DataCacheSearchForm",
  // props: ["filter", "forms", "layout", "data", "searcher"],
  props: {
    filter: {
      type: Boolean,
      default: true,
    },
    request: Object,
    forms: Array,
    layout: Object,
    data: Object,
    searcher: Boolean,
  },
  computed: {
    filters() {
      if (this.store?.records) {
        return this.store.records;
      } else {
        return [];
      }
    },
    isLoading() {
      if (this.store) {
        return this.store.isLoading;
      } else {
        return false;
      }
    },
  },
  watch: {
    isLoading(value) {
      if (value) {
        // 搜索器初始化
        // 搜索器初始化成功
        this.$nextTick(() => {
          if (!this.isNotDefaultLoad) {
            this.refresh();
          }
          this.isNotDefaultLoad = false;
          if (this.filter) {
            this.$refs.searchFilter.refresh(this.store.current());
          }
        });
      }
    },
  },
  data: () => ({
    isNotDefaultLoad: false,
    isRefresh: false,
    isLoadedOptions: false,
    store: null,
    removeModel: null,
    currentSelected: {},
  }),
  created() {
    // this.isNotDefaultLoad = this.hasNotDefaultLoad;
    this.isLoadedOptions = true;
    if (this.fetchCurrent) {
      this.store.fetchCurrent(this.fetchCurrent);
      this.refresh();
    }
    this.store = Store(this.author || "lourd", this.id, this.request);
    // debugger;
  },
  methods: {
    refresh() {
      const model = this.store.current();
      const removeModel = _.cloneDeep(this.removeModel);
      this.removeModel = null;
      if (!removeModel || (removeModel && removeModel.name === model.name)) {
        if (model) {
          this.$nextTick(() => {
            this.$refs.searchForm?.setModel(model.data);
            // this.search(model);
            this.currentSelected = model;
            this.$emit("events", {
              name: "search",
              payload: model,
            });
          });
        } else {
          this.$emit("events", {
            name: "search",
            payload: {
              data: {},
            },
          });
        }
      }
    },
    // 清除表单
    handleReset() {
      if (this.filter) {
        this.$refs.searchFilter.reset();
        this.store.clearSelected();
        this.search();
      }
    },
    handleResetCurrentFilterId() {
      this.$refs.searchFilter.reset();
    },
    hasFilterCacheid(payload) {
      if (!this.hasFilter) {
        delete payload.data.cacheid;
      }
    },
    handleSubmit(payload) {
      switch (payload.mode) {
        case "saveAndSearch":
          if (this.store.records.length < 100) {
            this.$prompt("", "搜索器名称", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              inputValidator: (value) => {
                if (!value) {
                  return "搜索器名称不能为空";
                } else if (reg.test(value)) {
                  if (
                    this.store.records.filter((item) => item.name === value)
                      .length > 0
                  ) {
                    return "搜索器名称重复";
                  }
                } else {
                  return "支持中文、英文、数字输入，长度最大为30个字符";
                }
              },
              inputPlaceholder: "支持中文、英文、数字输入，长度最大为30个字符",
            })
              .then(({ value }) => {
                const model = _.cloneDeep({ name: value, data: payload.data });
                this.store.create(model);
              })
              .catch(console.log);
          } else {
            this.$message.error("最多只能添加8个搜索器");
          }
          break;
        case "search":
          if (this.hasFilter) {
            // 重置当前搜索器
            this.handleResetCurrentFilterId();
            // 判断是否开启过滤器
            this.hasFilterCacheid(payload);
          }
          // 搜索
          this.search(_.cloneDeep({ name: "null", data: payload.data }));
          break;
      }
    },
    // 删除搜索器
    handleDelSearcher(payload) {
      this.deleteId = payload.index;
      this.removeModel = payload.tag;
      this.store.destroy(payload.tag).then(() => {
        this.store.refresh();
      });
    },
    // 当一个搜索器被选中切换
    handleChangeCurrent(payload) {
      // debugger
      if (payload.index != -1) {
        const form = this.store.select(payload.tag);
        this.$refs.searchForm.setModel(form.data);
        this.isRefresh = true;
        this.$emit("events", {
          name: "search",
          payload: payload.tag,
        });
      }
    },
    // 搜索
    search(payload = { name: "无", data: {} }) {
      this.isRefresh = true;
      this.currentSelected = payload;
      this.store.select(payload);
      this.$emit("events", {
        name: "search",
        payload,
      });
    },
  },
  render() {
    return (
      <Card
        v-loading={!this.isLoading || !this.isLoadedOptions || this.isRefresh}
      >
        <MainLayout>
          {this.isLoadedOptions && (
            <DataSearchForm
              ref="searchForm"
              {...{
                props: {
                  ...this.$attrs,
                  ...this._props,
                },
                on: {
                  submit: (model) => this.handleSubmit(model),
                  reset: () => this.handleReset(),
                  ...this.$listeners,
                },
                scopedSlots: this.$scopedSlots,
              }}
            />
          )}
        </MainLayout>
        {this.filter && this.store ? (
          <BottomLayout>
            <SearchFilter
              ref="searchFilter"
              list={this.store.records}
              onDelete={(payload) => this.handleDelSearcher(payload)}
              onChangeCurrent={(payload) => this.handleChangeCurrent(payload)}
            />
          </BottomLayout>
        ) : (
          ""
        )}
      </Card>
    );
  },
};
