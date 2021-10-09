<template>
  <div
    :class="{ fullscreen: fullscreen }"
    class="tinymce-container"
    :style="{ width: containerWidth }"
  >
    <textarea :id="tinymceId" class="tinymce-textarea" />
    <!-- <div class="editor-custom-btn-container">
      <editorImage color="#1890ff" class="editor-upload-btn" @successCBK="imageSuccessCBK" />
    </div> -->
  </div>
</template>

<script>
/**
 * docs:
 * https://panjiachen.github.io/vue-element-admin-site/feature/component/rich-editor.html#tinymce
 */
// import editorImage from './components/EditorImage'
import plugins from "./plugins";
import toolbar from "./toolbar";
import load from "./dynamicLoadScript";

// why use this cdn, detail see https://github.com/PanJiaChen/tinymce-all-in-one
const tinymceCDN =
  "https://cdn.jsdelivr.net/npm/tinymce-all-in-one@4.9.3/tinymce.min.js";
// import { service } from './service'
export default {
  name: "Tinymce",
  // components: { editorImage },
  props: {
    id: {
      type: String,
      default: function () {
        return (
          "vue-tinymce-" +
          +new Date() +
          ((Math.random() * 1000).toFixed(0) + "")
        );
      },
    },
    value: {
      type: String,
      default: "",
    },
    toolbar: {
      type: Array,
      required: false,
      default() {
        return [];
      },
    },
    menubar: {
      type: String,
      default: "file edit insert view format table",
    },
    height: {
      type: [Number, String],
      required: false,
      default: 360,
    },
    width: {
      type: [Number, String],
      required: false,
      default: "auto",
    },
  },
  data() {
    return {
      hasChange: false,
      hasInit: false,
      tinymceId: this.id,
      fullscreen: false,
      languageTypeList: {
        en: "en",
        zh: "zh_CN",
        es: "es_MX",
        ja: "ja",
      },
    };
  },
  computed: {
    containerWidth() {
      const width = this.width;
      if (/^[\d]+(\.[\d]+)?$/.test(width)) {
        // matches `100`, `'100'`
        return `${width}px`;
      }
      return width;
    },
  },
  watch: {
    value(val) {
      if (!this.hasChange && this.hasInit) {
        this.$nextTick(() =>
          window.tinymce.get(this.tinymceId).setContent(val || "")
        );
      }
    },
  },
  mounted() {
    this.init();
  },
  activated() {
    if (window.tinymce) {
      this.initTinymce();
    }
  },
  deactivated() {
    this.destroyTinymce();
  },
  destroyed() {
    this.destroyTinymce();
  },
  methods: {
    init() {
      // dynamic load tinymce from cdn
      load(tinymceCDN, (err) => {
        if (err) {
          this.$message.error(err.message);
          return;
        }
        this.initTinymce();
      });
    },
    urlToBase64(url) {
      return new Promise((resolve, reject) => {
        const image = new Image();
        image.onload = function () {
          const canvas = document.createElement("canvas");
          canvas.width = this.naturalWidth;
          canvas.height = this.naturalHeight;
          // 将图片插入画布并开始绘制
          canvas.getContext("2d").drawImage(image, 0, 0);
          // result
          const result = canvas.toDataURL("image/png");
          resolve(result);
        };
        // CORS 策略，会存在跨域问题https://stackoverflow.com/questions/20424279/canvas-todataurl-securityerror
        image.setAttribute("crossOrigin", "Anonymous");
        image.src = url;
        // 图片加载失败的错误处理
        image.onerror = () => {
          reject(new Error("转换失败"));
        };
      });
    },
    initTinymce() {
      const _this = this;
      window.tinymce.init({
        selector: `#${this.tinymceId}`,
        language: this.languageTypeList["zh"],
        height: this.height,
        body_class: "panel-body ",
        object_resizing: false,
        toolbar: this.toolbar.length > 0 ? this.toolbar : toolbar,
        menubar: this.menubar,
        plugins: plugins,
        end_container_on_empty_block: true,
        powerpaste_word_import: "clean",
        paste_data_images: true,
        images_file_types: "jpeg,jpg,png,gif,bmp,webp",
        code_dialog_height: 450,
        code_dialog_width: 1000,
        advlist_bullet_styles: "square",
        advlist_number_styles: "default",
        imagetools_cors_hosts: ["www.tinymce.com", "codepen.io"],
        default_link_target: "_blank",
        link_title: false,
        save: true,
        images_upload_url: "/demo/upimg.php",
        images_upload_base_path: "/demo",
        // eslint-disable-next-line no-unused-vars
        images_upload_handler(blobInfo, success, failure, progress) {
          console.log("123");
          _this
            .urlToBase64(window.URL.createObjectURL(blobInfo.blob()))
            .then(() => {
              // service
              //   .updatefile({
              //     file: res.split(',')[1]
              //   })
              //   .then((res) => {
              //     success(res.data.url)
              //   })
              //   .catch(() => {
              //     failure('文件上传失败，请重新上传，或者联系程序员')
              //   })
            });
          // service
          //   .updatefile({
          //     file: window.URL.createObjectURL(blobInfo.blob())
          //   })
          //   .then((res) => {
          //     success(res.data.url)
          //   })
          //   .catch(() => {
          //     failure('文件上传失败，请重新上传，或者联系程序员')
          //   })
          // progress(0)
          // window.tinymce.get(_this.tinymceId).insertContent(`<img class="wscnph" src="${blobInfo.blobUri()}" >`)
          // progress(100)
          // success(blobInfo.blobUri())
          // const token = _this.$store.getters.token
          // getToken(token)
          //   .then((response) => {
          //     const url = response.data.qiniu_url
          //     const formData = new FormData()
          //     formData.append('token', response.data.qiniu_token)
          //     formData.append('key', response.data.qiniu_key)
          //     formData.append('file', blobInfo.blob(), url)
          //     upload(formData).then(() => {
          //       success(url)
          //       progress(100)
          //     })
          //   })
          //   .catch((err) => {
          //     failure('出现未知问题，刷新页面，或者联系程序员')
          //     console.log(err)
          //   })
        },
        nonbreaking_force_tab: true, // inserting nonbreaking space &nbsp; need Nonbreaking Space Plugin
        init_instance_callback: (editor) => {
          if (_this.value) {
            editor.setContent(_this.value);
          }
          _this.hasInit = true;
          editor.on("NodeChange Change KeyUp SetContent", () => {
            this.hasChange = true;
            this.$emit("input", editor.getContent());
          });
        },
        setup(editor) {
          editor.on("FullscreenStateChanged", (e) => {
            _this.fullscreen = e.state;
          });
          // console.log('零零零零', _this)
        },
        convert_urls: true,
      });
    },
    destroyTinymce() {
      const tinymce = window.tinymce.get(this.tinymceId);
      if (this.fullscreen) {
        tinymce.execCommand("mceFullScreen");
      }

      if (tinymce) {
        tinymce.destroy();
      }
    },
    setContent(value) {
      window.tinymce.get(this.tinymceId).setContent(value);
    },
    getContent() {
      window.tinymce.get(this.tinymceId).getContent();
    },
    imageSuccessCBK(arr) {
      arr.forEach((v) =>
        window.tinymce
          .get(this.tinymceId)
          .insertContent(`<img class="wscnph" src="${v.url}" >`)
      );
    },
  },
};
</script>

<style lang="scss">
.tinymce-container {
  position: relative;
  line-height: normal;
}

.tinymce-container {
  .mce-fullscreen {
    z-index: 10000;
  }
  .mce-panel {
    border: none;
  }
  .mce-btn-group * {
    display: flex;
    flex-wrap: wrap;
  }
}

.tinymce-textarea {
  visibility: hidden;
  z-index: -1;
}

.editor-custom-btn-container {
  position: absolute;
  right: 4px;
  top: 4px;
  /*z-index: 2005;*/
}

.fullscreen .editor-custom-btn-container {
  z-index: 10000;
  position: fixed;
}

.editor-upload-btn {
  display: inline-block;
}
</style>
