import BaseMonacoEditor from "@/components/molecules/BaseMonacoEditor";
BaseMonacoEditor.install = function (Vue) {
  Vue.component(BaseMonacoEditor.name, BaseMonacoEditor);
};
export default BaseMonacoEditor;
