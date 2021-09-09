import BaseDialog from "@/components/molecules/BaseDialog";
BaseDialog.install = function (Vue) {
  Vue.component(BaseDialog.name, BaseDialog);
};
export default BaseDialog;
