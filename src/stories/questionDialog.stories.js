import QuestionDialog from "../components/molecules/QuestionDialog";
import { Button } from "element-ui";
export default {
  title: "Design System/Molecules/QuestionDialog",
};
export const withBasic = () => ({
  render() {
    return (
      <div>
        <Button onClick={() => this.$refs.dialog.open()}>打开</Button>
        <QuestionDialog ref="dialog" />
      </div>
    );
  },
});
