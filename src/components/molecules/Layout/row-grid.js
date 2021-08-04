import { Row, Col } from "element-ui";
export default {
  name: "RowGrid",
  data() {
    return {
      matrix: [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
      ],
    };
  },
  render() {
    return (
      <div>
        {this.matrix.map((row, rowIndex) => (
          <Row gutter={this.gutter} key={rowIndex}>
            {row.map((col, colIndex) => (
              <Col span={1} key={colIndex}>
                {(this.$attrs.uses && this.$attrs.uses[rowIndex][colIndex]) ||
                  col}
              </Col>
            ))}
          </Row>
        ))}
      </div>
    );
  },
};
