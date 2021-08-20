import BaseDialog from "../../molecules/BaseDialog";
import DataForm from "../DataForm";
export default {
  components: {
    BaseDialog,
  },
  data() {
    return {
      form: null,
      data: {},
      mode: null,
      visible: false,
      width: null,
    };
  },
  methods: {
    open({ form, mode, width = "330px" }) {
      this.form = form;
      this.form.forms = form.forms.map((item) => {
        return {
          ...item,
          disabled: item[mode],
        };
      });
      this.mode = mode;
      this.width = width;
      this.visible = true;
      this.$refs.dialog.open();
    },
    close() {
      this.visible = false;
    },
  },
  render() {
    return (
      <BaseDialog
        width={this.width}
        ref="dialog"
        onClosed={() => this.close()}
        title={this.mode === "edit" ? "编辑" : "新增"}
      >
        {this.visible && (
          <DataForm
            {...{
              props: this.form,
            }}
          />
        )}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <ElButton size="mini" type="primary">
            确定
          </ElButton>
          <ElButton size="mini" onClick={() => this.$refs.dialog.close()}>
            取消
          </ElButton>
        </div>
      </BaseDialog>
    );
  },
};
