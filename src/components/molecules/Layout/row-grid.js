import { Row, Col } from "element-ui";
import _ from "lodash";
export default {
  inheritAttrs: false,
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
  methods: {
    transform() {
      if (this.$attrs.uses) {
        if (Array.isArray(this.$attrs.uses[0])) {
          this.matrix = this.$attrs.uses;
        } else {
          let group = _.groupBy(
            this.$attrs.uses,
            "componentOptions.propsData.item.row"
          );
          this.matrix = Object.keys(group).map((item) => group[item]);
        }
      }
    },
    span(item) {
      if (item.componentOptions)
        return item.componentOptions.propsData.item.span;
      return 1;
    },
  },
  render() {
    this.transform();
    return (
      <div style="width:100%">
        {this.matrix.map((row, rowIndex) => (
          <Row gutter={this.gutter} key={rowIndex}>
            {row.map((col, colIndex) => (
              <Col span={this.span(col) || 24 / row.length} key={colIndex}>
                {col}
              </Col>
            ))}
          </Row>
        ))}
      </div>
    );
  },
};
