<template>
  <div>
    <div v-if="!$attrs.preview" style="display: flex">
      <div>
        <el-upload
          ref="uploader"
          action="#"
          list-type="picture-card"
          :auto-upload="true"
          :before-upload="handleBeforeUpload"
          :on-change="handleUpload"
          :file-list="fileList"
          :class="{ has_file: hasFile, no_has_file: !hasFile }"
        >
          <i slot="default" class="el-icon-plus" />
          <div slot="file" slot-scope="{ file }">
            <img
              class="el-upload-list__item-thumbnail"
              :src="file.url"
              alt=""
            />
            <span class="el-upload-list__item-actions">
              <span
                class="el-upload-list__item-preview"
                @click="handlePictureCardPreview(file)"
              >
                <i class="el-icon-zoom-in" />
              </span>
              <span
                v-if="!disabled"
                class="el-upload-list__item-delete"
                @click="handleDownload(file)"
              >
                <i class="el-icon-download" />
              </span>
              <span
                v-if="!disabled"
                class="el-upload-list__item-delete"
                @click="handleRemove(file)"
              >
                <i class="el-icon-delete" />
              </span>
            </span>
          </div>
        </el-upload>
        <div style="font-size: 14px; color: #606266">
          （图片上传尺寸750px*422px）
        </div>
      </div>
      <!-- <el-radio-group
        v-if="$attrs.assert"
        v-model="imageList"
        @change="handleImageList"
      >
        <el-radio v-for="n in 3" :key="n" :label="n" class="image-radio">
          <el-image
            style="width: 200px; height: 112px"
            :src="require(`../../assets/${$attrs.assert}/${n}.png`)"
          />
          <div style="font-size: 14px; color: #606266; margin-top: 8px">
            系统封面{{ n }}
          </div>
        </el-radio>
      </el-radio-group> -->
    </div>
    <div v-else>
      <img width="228" height="128" :src="$attrs.value" alt="" />
    </div>
    <el-dialog
      v-loading="loading"
      :visible.sync="dialogVisible"
      append-to-body
      custom-class="image-dialog"
      title="编辑图片"
      element-loading-text="正在上传中"
    >
      <vueCropper
        v-if="dialogVisible"
        ref="cropper"
        :img="dialogImageUrl"
        :output-size="1"
        output-type="png"
        style="width: 100%; height: 422px"
        :full="true"
        :original="true"
        :center-box="true"
        :fixed-box="true"
        :auto-crop="true"
        :auto-crop-width="750"
        :auto-crop-height="422"
        :info-true="true"
        :enlarge="enlarge"
        :can-scale="false"
      />
      <div style="position: relative">
        <span class="size-label" style="left: -8px">缩放</span>
        <el-slider v-model="size" :show-tooltip="false" />
        <span class="size-label" style="right: -8px">放大</span>
      </div>
      <template v-slot:footer>
        <div>
          <!-- <el-button size="large">
            重新上传
          </el-button> -->
          <el-button size="large" @click="dialogVisible = false">
            取消
          </el-button>
          <!-- <el-button type="primary" size="large" @click="uploadFile">
            保存
          </el-button> -->
        </div>
      </template>
    </el-dialog>
    <el-dialog :visible.sync="modal" append-to-body custom-class="image-dialog">
      <img width="100%" :src="modalSrc" alt="" />
    </el-dialog>
  </div>
</template>

<script>
// import { service } from "./service";
import { VueCropper } from "vue-cropper";
export default {
  components: {
    VueCropper,
  },
  data() {
    return {
      imageList: 0,
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
      fileList: [],
      first: true,
      size: 50,
      modal: false,
      modalSrc: "",
      enlarge: 0.2,
      currentFile: {},
      loading: false,
    };
  },
  computed: {
    hasFile() {
      return this.fileList.length >= 1;
    },
  },
  watch: {
    size(newVal, oldVal) {
      this.$refs.cropper.changeScale((newVal - oldVal) * 1.5);
    },
    "$attrs.value": {
      handler(value) {
        if (this.fileList.length === 0 && value.length > 0) {
          this.fileList.push({
            url: value,
          });
        }
      },
      immediate: true,
    },
  },
  methods: {
    // handleImageList(value) {
    //   this.handleRemove();
    //   this.handleUpload({
    //     url: require(`../../assets/${this.$attrs.assert}/${value}.png`),
    //   });
    //   this.dialogVisible = true;
    // },
    finish(type) {
      // 输出
      // var test = window.open('about:blank')
      // test.document.body.innerHTML = '图片生成中..'
      if (type === "blob") {
        this.$refs.cropper.getCropBlob((data) => {
          var img = window.URL.createObjectURL(data);
          this.modal = true;
          this.modalSrc = img;
        });
      } else {
        this.$refs.cropper.getCropData((data) => {
          this.modal = true;
          this.modalSrc = data;
        });
      }
    },
    handleRemove() {
      this.size = 50;
      this.dialogImageUrl = "";
      this.fileList = [];
      this.$refs.uploader.clearFiles();
      this.$emit("input", "");
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.currentFile = {
        url: file.url,
      };
      // console.log(file)
      this.dialogVisible = true;
      this.size = 50;
    },
    handleDownload(file) {
      console.log(file);
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
    handleBeforeUpload() {
      this.dialogVisible = true;
      this.size = 50;
    },
    uploadFile() {
      this.loading = true;
      this.$refs.cropper.getCropData(() => {
        // service
        //   .updatefile({
        //     file: data.split(",")[1],
        //   })
        //   .then((res) => {
        // this.fileList = []
        // this.$emit("input", res.data.url);
        // this.fileList = [res.data];
        // this.loading = false;
        // this.dialogVisible = false;
        // this.imageList = 0;
        return true;
        // })
        // .catch(() => {
        //   this.handleRemove();
        //   return false;
        // });
      });
    },
    handleUpload(file) {
      this.currentFile = file;
      this.dialogImageUrl = file.url;
      return false;
    },
  },
};
</script>
<style lang="scss" scoped>
.el-radio-group {
  display: flex;
  margin-top: -8px;
  // margin-top: -48px;
}
::v-deep .image-radio {
  display: flex;
  text-align: center;
  align-items: center;
}
</style>
<style lang="scss">
.el-upload-list--picture-card {
  display: none;
}
.el-upload--picture-card,
.el-upload-list--picture-card .el-upload-list__item {
  width: 200px;
  height: 112px;
  // margin: 0 8px 24px 0;
}
.el-upload--picture-card i {
  vertical-align: text-bottom;
  line-height: 1.5;
}
.has_file {
  width: 200px;
  height: 112px;
  margin-right: 8px;
  .el-upload.el-upload--picture-card {
    display: none;
  }
  .el-upload-list--picture-card {
    display: inline;
  }
}
.no_has_file {
  margin-right: 8px;
}
.image-dialog {
  width: 900px !important;
  height: 650px !important;
  position: relative;
  padding: 0px 36px;
  .el-dialog__header {
    text-align: center;
    padding: 20px;
    padding-bottom: 10px;
    border-bottom: 1px solid #ccd3d9;
    font-weight: 700;
    font-size: 18px;
  }
  .el-dialog__body {
    height: 500px;
  }
  .el-dialog__footer {
    position: absolute;
    bottom: 0px;
    left: 0px;
    width: 100%;
    display: flex;
    justify-content: center;
  }
  .size-label {
    font-size: 14px;
    position: absolute;
    bottom: -12px;
  }
}
</style>
