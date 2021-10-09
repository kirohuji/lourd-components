import "vue-croppa/dist/vue-croppa.css";

export default {
  title: "Croppa(主要用于移动端)",
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  data: {
    myCroppa: {},
  },
  methods: {
    onFileTypeMismatch(file) {
      alert("Invalid file type. Please choose a jpeg or png file.");
    },
    onFileSizeExceed(file) {
      alert("File size exceeds. Please choose a file smaller than 100kb.");
    },
    uploadCroppedImage() {
      this.myCroppa.generateBlob(
        (blob) => {
          // write code to upload the cropped image file (a file is a blob)
        },
        "image/jpeg",
        0.8
      ); // 80% compressed jpeg file
    },
  },
  render() {
    return (
      <croppa
        {...{
          props: this.$props,
          on: {
            "file-type-mismatch": (file) => this.onFileTypeMismatch(file),
            "file-size-exceed": (file) => this.onFileSizeExceed(file),
          },
        }}
        vModel={this.myCroppa}
      />
    );
  },
});
export const withExampleOne = Template.bind({});
withExampleOne.args = {
  width: 350,
  height: 630,
  placeholder: "Yes, you can modify the text here",
  placeholderColor: "#000",
  placeholderFontSize: 18,
  canvasColor: "transparent",
  showRemoveButton: true,
  removeButtonColor: "black",
  removeButtonSize: 18,
  showLoading: true,
  loadingSize: 50,
  loadingColor: "#606060",
};
withExampleOne.storyName = "显示调整";

export const withExampleTwo = Template.bind({});
withExampleTwo.args = {
  crossOrigin: "anonymous",
  initialImage: "https://zhanziyang.github.io/vue-croppa/static/500.jpeg",
};
withExampleTwo.storyName = "初始化图片";

export const withExampleThree = Template.bind({});
withExampleThree.args = {
  initialImage: "https://zhanziyang.github.io/vue-croppa/static/500.jpeg",
  width: 250,
  height: 250,
  quality: 2,
};
withExampleThree.storyName = "修改图片尺寸";


export const withExampleFour = Template.bind({});
withExampleFour.args = {
  initialImage: "https://zhanziyang.github.io/vue-croppa/static/500.jpeg",
  width: 250,
  height: 250,
  quality: 2,
  fileSizeLimit: 102400
};
withExampleFour.storyName = "限制图片的属性";


export const withExampleFive = Template.bind({});
withExampleFive.args = {
  initialImage: "https://zhanziyang.github.io/vue-croppa/static/500.jpeg",
  disabled: false,
  disableClickToChoose: false,
  disableDragAndDrop: false,
  disableDragToMove: false,
  disableScrollToZoom: false,
  disablePinchToZoom: false,
  disableRotation: false
};
withExampleFive.storyName = "限制组件的功能";
