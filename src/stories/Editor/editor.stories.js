import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import Delimiter from "@editorjs/delimiter";
import Paragraph from "@editorjs/paragraph";
import Quote from "@editorjs/quote";
import Warning from "@editorjs/warning";
import Alignment from "editorjs-paragraph-with-alignment";
import Marker from "@editorjs/marker";
// import { SimpleImage, MarkerTool } from "./simple-image";
export default {
  title: "Editor.js",
};
export const witchBasic = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  data() {
    return {
      editor: undefined,
      holder: "holder",
    };
  },
  methods: {
    handleSave() {
      this.editor
        .save()
        .then((outputData) => {
          console.log("Article data: ", outputData);
        })
        .catch((error) => {
          console.log("Saving failed: ", error);
        });
    },
  },
  mounted() {
    this.editor = new EditorJS({
      holder: this.holder,
      inlineToolbar: true,
      tools: {
        header: Header,
        delimiter: Delimiter,
        paragraph: Paragraph,
        quote: Quote,
        warning: Warning,
        alignment: Alignment,
        marker: Marker,
        // image: SimpleImage,
        // marker: {
        //   class: MarkerTool,
        //   inlineToolbar: true,
        // },
      },
      ...this.$props,
    });
  },
  render() {
    return (
      <div>
        <el-button onClick={() => this.handleSave()}>保存</el-button>
        <div id={this.holder}></div>
      </div>
    );
  },
});
witchBasic.args = {
  autofocus: true,
  placeholder: "Let`s write an awesome story!",
};
