import BaseDialog from "../../molecules/BaseDialog";
import DataForm from "../DataForm";
import "./index.scss";
export default {
  name: "DataDialog",
  componentName: "DataDialog",
  components: {
    BaseDialog,
  },
  props: {
    title: String,
    form: Object,
    width: String | Number,
    mode: String,
  },
  data() {
    return {
      form: null,
      data: {},
      mode: null,
      visible: false,
      width: null,
      title: "",
    };
  },
  methods: {
    open({ form, mode, title, width = "50%" }) {
      this.form = form;
      this.form.forms = form.forms.map((item) => {
        return {
          ...item,
          disabled: item[mode],
        };
      });
      this.mode = mode;
      this.title = title;
      this.width = width;
      this.visible = true;
      this.$refs.dialog.open();
    },
    close() {
      this.visible = false;
    },
    innerDialogClose() {
      this.$refs.dialog.close();
    },
  },
  render() {
    // debugger
    return (
      <BaseDialog
        width={this.width}
        ref="dialog"
        custom-class="data-dialog"
        onClosed={() => this.close()}
        scopedSlots={{
          title: () => (
            <div style="position: relative;">
              <div class="title">{this.title}</div>
            </div>
          ),
        }}
      >
        {this.visible && (
          <DataForm
            ref="dataForm"
            {...{
              props: {
                ...this.form,
              },
            }}
          />
        )}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <ElButton onClick={() => this.$refs.dialog.close()}>取消</ElButton>
          <ElButton
            type="primary"
            onClick={() =>
              this.$emit("submit", {
                ref: this.$refs.dataForm.refs(),
                validate: this.$refs.dataForm.refs().validate,
                data: this.$refs.dataForm.currentData(),
                mode: this.mode,
              })
            }
          >
            确定
          </ElButton>
        </div>
      </BaseDialog>
    );
  },
};
