<template>
  <div class="container flex-center">
    <img :src="imgUrl" alt="" class="img" />
    <p class="title">{{ bottomWords }}</p>
    <p class="sub-title">{{ bottomSubWords }}</p>
  </div>
</template>

<script>
export default {
  name: "NoContentShow",
  props: {
    imgUrl: {
      type: String,
      default: require("@/assets/nodata/index.png"),
    },
    bottomWords: {
      type: String,
      default: "暂无数据",
    },
    bottomSubWords: {
      type: String,
      default: "",
    },
  },
  data() {
    return {};
  },
  methods: {},
};
</script>
<style scoped lang="scss">
.container {
  flex-direction: column;
  height: 100%;
  width: 100%;
  font-size: 18px;
  font-weight: 500;
  color: #33404d;
  .title {
    margin-top: 18px;
  }
  .sub-title {
    margin-top: 12px;
    font-size: 14px;
    color: rgba(51, 64, 77, 0.45);
    font-weight: normal;
  }
  .img {
    width: 333px;
    height: 216px;
  }
}
</style>
