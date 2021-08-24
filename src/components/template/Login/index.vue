<template>
  <div id="login_wrapper">
    <section class="intro">
      <header>
        <div class="top" />
        <div class="left" />
      </header>
      <div class="content">
        <main>
          <div class="header">运营管理平台</div>
          <DingDingLoginForm />
          <div class="footer" />
        </main>
      </div>
    </section>
  </div>
</template>

<script>
import DingDingLoginForm from "./DingDingLoginForm";
export default {
  components: {
    DingDingLoginForm,
  },
};
</script>

<style scoped lang="scss">
#login_wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 0;
  background: #ffffff;
  .intro {
    display: grid;
    grid-template-areas: "header content";
    grid-template-rows: 1fr;
    grid-template-columns: 60% 40%;
    height: 100%;
    width: 100%;
    position: absolute;
    header {
      height: 100%;
      width: 100%;
      grid-area: header;
      position: relative;
      &::before {
        background-image: url("../../assets/login/41@2x.png");
        background-repeat: no-repeat;
        background-size: contain;
        background-position: center;
        content: "";
        height: 100%;
        width: 100%;
        position: absolute;
      }
      .top {
        background-image: url("../../assets/login/10@2x.png");
        background-repeat: no-repeat;
        background-size: contain;
        content: "";
        height: 20%;
        width: 20%;
        position: absolute;
        top: -11%;
        left: 10%;
      }
      .left {
        background-image: url("../../assets/login/20@2x.png");
        background-repeat: no-repeat;
        background-size: contain;
        background-position: center;
        content: "";
        height: 20%;
        width: 20%;
        position: absolute;
        left: -8%;
        bottom: 0;
      }
    }
    .content {
      grid-area: content;
      height: 100%;
      width: 100%;
      position: relative;
      display: flex;
      // 登录界面的样式
      main {
        margin: auto;
        .header {
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 38px;
          font-weight: 500;
          line-height: 52px;
          position: relative;
          padding-left: 30px;
          &::before {
            background-image: url("../../assets/login/3@2x.png");
            background-repeat: no-repeat;
            background-size: contain;
            content: "";
            height: 45px;
            width: 45px;
            position: absolute;
            left: -36px;
          }
        }
      }
    }
  }
}
</style>
