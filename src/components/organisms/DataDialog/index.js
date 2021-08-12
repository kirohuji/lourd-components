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
    };
  },
  methods: {
    open({ form, mode }) {
      this.form = form;
      this.form.forms = form.forms.map((item) => {
        return {
          ...item,
          disabled: item[mode],
        };
      });
      this.mode = mode;
      this.visible = true;
      this.$refs.dialog.open();
    },
    close() {
      this.visible = false;
    },
  },
  render() {
    return (
      <BaseDialog ref="dialog" onClosed={() => this.close()} title="编辑">
        {this.visible && (
          <DataForm
            {...{
              props: this.form,
            }}
          />
        )}
      </BaseDialog>
    );
  },
};
