export default {
  name: "Inline",
  props: ["length", "direction", "gutter", "wrap"],
  computed: {
    style() {
      const ret = {};
      if (this.gutter) {
        ret.marginLeft = `-${this.gutter / 2}px`;
        ret.marginRight = ret.marginLeft;
      }

      return ret;
    },
  },
  render() {
    return (
      <div
        class="inline"
        style={{
          display: "flex",
          flexWrap: this.wrap,
          flexDirection: this.direction,
        }}
      >
        {Array.apply(null, { length: this.length }).map((item, index) => (
          <div
            key={index}
            style={{
              marginRight: `${this.gutter}px`,
              marginLeft: `${this.gutter}px`,
            }}
          >
            {(this.$attrs.uses && this.$attrs.uses[index]) || "Col"}
          </div>
        ))}
      </div>
    );
  },
};
