import { Button } from "element-ui";
import BaseDialog from "../components/molecules/BaseDialog";

export default {
  title: "Design System/Molecules/BaseDialog",
};

export const withButton = () => ({
  render() {
    return (
      <div>
        <Button onClick={() => this.$refs.dialog.open()}>打开</Button>
        <BaseDialog ref="dialog" />
      </div>
    );
  },
});
