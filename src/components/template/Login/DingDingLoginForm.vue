<template>
  <div id="dingding_login_form">
    <div class="title">扫码登录</div>
    <div class="main">
      <div class="rq-code">
        <div class="rq-code-border" />
        <div id="login_container" />
      </div>
      <div>
        <div @click="() => onRefresh()">刷新</div>
      </div>
      <div class="tip">
        <div>
          <span>打开</span>
          <span>手机钉钉</span>
        </div>
        <span>在[消息]页面顶部打开扫一扫</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      handleMessage: (event) => {
        const origin = event.origin;
        if (origin === "https://login.dingtalk.com") {
          // eslint-disable-next-line no-unused-vars
          const loginTmpCode = event.data;
          console.log("执行", loginTmpCode);
          // debugger
          // debugger
          this.gotoByHref(loginTmpCode);
        }
        // let loginTmpCode = event.data;
      },
      login: {
        property: {
          id: "login_container",
          style: "border:none;background-color:#FFFFFF;",
          width: "210",
          height: "250",
        },
        target: "",
      },
    };
  },
  computed: {
    url() {
      return encodeURIComponent(process.env.VUE_APP_REDIRECT_URI);
    },
    goto() {
      return encodeURIComponent(
        `https://oapi.dingtalk.com/connect/oauth2/sns_authorize?appid=${process.env.VUE_APP_APPID}&response_type=code&scope=snsapi_login&state=STATE&redirect_uri=${this.url}`
      );
    },
  },
  destroyed() {
    window.removeEventListener("message", this.handleMessage, true);
    window.detachEvent("onmessage", this.handleMessage, true);
  },
  mounted() {
    this.onRefresh();
  },
  methods: {
    gotoByHref(loginTmpCode) {
      window.location.href = `https://oapi.dingtalk.com/connect/oauth2/sns_authorize?appid=${process.env.VUE_APP_APPID}&response_type=code&scope=snsapi_login&state=STATE&redirect_uri=${this.url}&loginTmpCode=${loginTmpCode}`;
    },
    onRefresh() {
      // eslint-disable-next-line no-undef
      this.login.target = DDLogin({
        goto: this.goto,
        ...this.login.property,
      });
      if (typeof window.addEventListener !== "undefined") {
        window.addEventListener("message", this.handleMessage, true);
      } else if (typeof window.attachEvent !== "undefined") {
        window.attachEvent("onmessage", this.handleMessage, true);
      }
    },
  },
};
</script>

<style lang="scss">
#dingding_login_form {
  text-align: center;
  position: relative;
  .title {
    z-index: 2;
    position: relative;
    font-size: 20px;
    line-height: 27px;
    color: #333333;
  }
  .main {
    margin-top: 19px;
    .rq-code {
      height: 250px;
      position: relative;
      // margin-left: 50px;
      .rq-code-border {
        width: 9px;
        height: 210px;
        background: #597ef7;
        opacity: 1;
        border-radius: 8px;
        position: absolute;
      }
      #login_container {
        position: absolute;
        z-index: 1;
        top: -41px;
        left: 30px;
      }
    }
  }
}
</style>
