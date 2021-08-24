import BaseDialog from "../../molecules/BaseDialog";
import DataForm from "../DataForm";
import "./index.scss";
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
            {...{
              props: {
                collector: "dialogForm",
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
          <ElButton type="primary">确定</ElButton>
        </div>
      </BaseDialog>
    );
  },
};
