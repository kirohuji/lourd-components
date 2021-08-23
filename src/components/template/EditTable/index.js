import Card from "../../atoms/Card";
import DataSearchForm from "../../organisms/DataSearchForm";
import DataTable from "../../organisms/DataTable";
import Store from "./model/store";
import emitter from "element-ui/src/mixins/emitter";
export default {
  name: "EditTable",
  props: ["config"],
  components: { Card },
  mixins: [emitter],
  data() {
    const store = new Store(this.config);
    return {
      store,
    };
  },
  render() {
    return (
      <div>
        <Card style="padding: 14px;padding-bottom: 0">
          <DataSearchForm
            {...{
              props: this.store.searcher,
              on: this.$listeners,
            }}
          />
        </Card>
        <Card style="pading: 14px;padding-top: 0">
          <DataTable
            {...{
              props: this.store.table,
              on: {
                ...this.$listeners,
              },
              scopedSlots: this.$scopedSlots,
            }}
          />
        </Card>
      </div>
    );
  },
};
