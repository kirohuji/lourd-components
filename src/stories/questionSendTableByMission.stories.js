import QuestionSendTableByMission from "../components/template/Questionnaire/components/QuestionSendTableByMission";
import { api } from "@/utils/http";
import { QuestionService } from "./service";
import Thenable from "@/components/atoms/Thenable";
const service = new QuestionService();
service.makeUserService({ api });
export default {
  title: "Design System/Template/Questionnaire/QuestionSendTableByMission",
};
export const withBasic = () => ({
  render() {
    return <QuestionSendTableByMission />;
  },
});
export const withThenable = () => ({
  data() {
    return {
      table: {},
    };
  },
  render() {
    return (
      <Thenable
        {...{
          props: {
            runner: [
              service.findForInformation.bind(service),
              {},
              (data) => {
                return data;
              },
            ],
          },
          scopedSlots: {
            default: ({ result: { loading, data } }) => (
              <div>
                {loading ? (
                  <div>加载中</div>
                ) : (
                  <QuestionSendTableByMission data={data.list} />
                )}
              </div>
            ),
          },
        }}
      />
    );
  },
});
