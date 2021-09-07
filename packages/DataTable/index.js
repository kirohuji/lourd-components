import DataTable from "@/components/organisms/DataTable";
DataTable.install = function (Vue) {
  Vue.component(DataTable.name, DataTable);
};
export default DataTable;
