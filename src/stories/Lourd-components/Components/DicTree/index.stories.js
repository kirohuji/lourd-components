import DataTree from "@/components/organisms/DataTree";
import DataMenu from "@/components/organisms/DataMenu";
import { Col, Row } from "element-ui";
import "./style.scss";
export default {
  title: "Lourd Components/Components/DicTree/字典数据结构 DicTree",
};
const data = [
  {
    label: "男",
    value: "male",
  },
  {
    label: "女",
    value: "female",
  },
];
export const withBasic = () => ({
  render() {
    return (
      <Row>
        <Col span={6}>
          <DataMenu data={data} />
        </Col>
        <Col span={18} style="border-left: solid 1px #e6e6e6;height: 100%;">
          <DataTree data={data} />
        </Col>
      </Row>
    );
  },
});
