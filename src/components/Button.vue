<template>
  <button>1</button>
</template>

<script>
export default {
  props: {
    /**
     * ボタン内に表示するテキスト
     */
    text: {
      type: String,
      default: "",
      required: true,
    },
  },
};
</script>

<style></style>
