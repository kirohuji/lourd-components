export default {
  name: "Card",
  render() {
    return (
      <div
        style={{
          background: "#fff",
        }}
      >
        {this.$scopedSlots.default && this.$scopedSlots.default()}
      </div>
    );
  },
};
