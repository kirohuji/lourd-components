<template>
  <Tinymce ref="editor" v-bind="$attrs" :height="400" menubar="" />
</template>

<script>
import Tinymce from "./Tinymce";

export default {
  name: "CreateArticle",
  components: { Tinymce },
};
</script>

<style></style>
