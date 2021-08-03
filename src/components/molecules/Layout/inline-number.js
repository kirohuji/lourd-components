import { Row, Col } from "element-ui";
export default {
  name: "InlineNumber",
  props: ["col", "length", "gutter", "use"],
  computed: {
    row() {
      return Math.round(this.length / this.col);
    },
    span() {
      return Math.round(24 / this.col);
    },
  },
  methods: {
    has(rIndex, cIndex) {
      return (
        cIndex + 1 > rIndex * this.col && cIndex + 1 <= (rIndex + 1) * this.col
      );
    },
  },
  render() {
    return (
      <div class="inline-number">
        {this.col === 0 ? (
          <Row gutter={this.gutter}>
            {Array.apply(null, { length: this.length }).map((item, index) => (
              <Col span={1} key={index}>
                Col
              </Col>
            ))}
          </Row>
        ) : (
          Array.apply(null, { length: this.row }).map((r, rIndex) => (
            <Row gutter={this.gutter}>
              {Array.apply(null, { length: this.length }).map(
                (item, index) =>
                  this.has(rIndex, index) && <Col span={this.span}>Col</Col>
              )}
            </Row>
          ))
        )}
      </div>
    );
  },
};
