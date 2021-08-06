import Card from "../../atoms/Card";
import DataSearchForm from "../../organisms/DataSearchForm";
import DataTable from "../../organisms/DataTable";
import Store from "./model/store";
import emitter from "element-ui/src/mixins/emitter";
// import BaseDialog from "../../molecules/BaseDialog";
// import DataForm from "../../organisms/DataForm";
import "./index.scss";
export default {
  name: "managerTable",
  props: ["config"],
  components: {
    DataSearchForm,
    DataTable,
  },
  data() {
    const store = new Store(this.config);
    return {
      store: store,
      currentRecord: null,
    };
  },
  mixins: [emitter],
  render() {
    return (
      <div class="manager-table">
        <Card class="main-content-header">
          <DataSearchForm
            {...{
              props: this.store.searcher,
            }}
          />
        </Card>
        <Card class="main-content-body">
          <DataTable
            {...{
              props: this.store.table,
            }}
          />
        </Card>
      </div>
    );
  },
};
