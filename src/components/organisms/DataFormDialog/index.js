// import BaseDialog from "../../molecules/BaseDialog";
import DataForm from "../DataForm";
import { Dialog } from "element-ui";
import "./style.scss";
export default {
  name: "DataFormDialog",
  componentName: "DataFormDialog",
  components: {
    // BaseDialog,
    DataForm,
  },
  inheritAttrs: false,
  props: {
    ...Dialog.props,
    form: {
      type: Object,
      default: () => {
        return {
          forms: [],
          data: {},
          layout: {
            use: "inline",
            gutter: 20,
            direction: "column",
          },
        };
      },
    },
    mode: String,
    visible: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    visible(val) {
      if (val) {
        this.form.forms = this.form.forms.map((item) => {
          return {
            ...item,
            disabled: item[this.mode],
          };
        });
      }
    },
  },
  render() {
    console.log(Dialog);
    return (
      <Dialog
        ref="dialog"
        {...{
          props: this.$props,
          on: {
            closed: (val) => this.$emit("update:visible", val),
            "update:visible": (val) => this.$emit("update:visible", val),
          },
        }}
      >
        <DataForm
          ref="dataForm"
          {...{
            props: this.form,
            attrs: this.form,
          }}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <ElButton onClick={() => this.$emit("update:visible", false)}>
            取消
          </ElButton>
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
      </Dialog>
    );
  },
};
