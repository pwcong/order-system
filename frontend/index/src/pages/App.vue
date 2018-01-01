<template>
    <div class="container" :style="{
        'background-image': `url(${bg})`
        }">

        <div class="content">

            <div class="entries">

                <a href="#" class="entry" style="background-color: #F64561">
                    <div>我是店家</div>
                </a>
                <a href="#" class="entry" style="background-color: #3EBCC8">
                    <div>我是客户</div>
                </a>
                <a href="#" class="entry" style="background-color: #744E37">
                    <div>我是企业</div>
                </a>

            </div>

            <div class="tips">
                没有账户？
                <button type="button" @click="showRegisterModal">注册</button>一个吧~
            </div>

        </div>

        <div class="footer">
            @ 2017-{{new Date().getUTCFullYear()}} 平板点餐系统 POWERED BY Pwcong
        </div>

        <modal :visible="registerModalVisible">
            <div class="register" slot="modal-main">
                <div class="register-title">注册新账户</div>
                <div class="register-form">

                    <label class="register-form-row register-form-input">
                        <span>用户：</span>
                        <input type="text" placeholder="请输入用户名" v-model="username">
                    </label>
                    <label class="register-form-row register-form-input">
                        <span>密码：</span>
                        <input type="password" placeholder="请输入密码" v-model="password1">
                    </label>
                    <label class="register-form-row register-form-input">
                        <span></span>
                        <input type="password" placeholder="请再次输入密码" v-model="password2">
                    </label>
                    <label class="register-form-row register-form-input">
                        <span>手机：</span>
                        <input type="text" placeholder="请输入手机号" v-model="phone">
                    </label>

                    <div class="register-form-row register-form-radio" style="margin: 32px 0">
                        <label>
                            客户 <input type="radio" name="type" value="1">
                        </label>
                        <label>
                            店家 <input type="radio" name="type" value="2">
                        </label>
                        <label>
                            企业 <input type="radio" name="type" value="3">
                        </label>

                    </div>

                </div>
                <div class="register-tools">
                    <button @click="toRegister" type="button" class="register-btn register-btn-submit">注册</button>
                    <button @click="hideRegisterModal" type="button" class="register-btn register-btn-cancel">取消</button>
                </div>
            </div>
        </modal>

    </div>
</template>

<style lang="scss">
html,
body {
  position: relative;
  width: 100%;
  height: 100%;

  margin: 0;
  padding: 0;

  font-family: 'Microsoft YaHei', sans-serif;

  overflow: hidden;
}

.container {
  position: relative;

  width: 100%;
  height: 100%;

  background-color: #333;
  background-size: cover;

  overflow: auto;

  .content {
    width: 100%;
    padding: 80px 20px;
    box-sizing: border-box;

    .entries {
      width: 100%;
      display: flex;
      flex-flow: row wrap;
      justify-content: center;

      .entry {
        display: flex;
        margin: 16px;
        max-width: 300px;
        min-width: 200px;
        height: 200px;
        flex: 1;
        background-color: white;

        text-decoration: none;
        color: white;

        box-sizing: border-box;
        padding: 16px;

        align-items: center;
        justify-content: center;

        transform: scale(0.9);

        font-size: 28px;

        transition: box-shadow 0.2s, transform 0.2s;

        &:hover {
          transform: scale(1);
        }
      }
    }

    .tips {
      margin-top: 32px;

      display: flex;
      align-items: center;
      justify-content: center;

      font-size: 18px;
      color: #ccc;

      button {
        background-color: white;
        border: 1px solid white;
        margin: 0 8px;
        padding: 8px 16px;
        border-radius: 16px;
        cursor: pointer;

        outline: none;

        transition: background-color 0.2s, color 0.2s;

        &:hover {
          background-color: transparent;
          color: white;
        }
      }
    }
  }

  .footer {
    margin-top: 80px;
    text-align: center;
    padding: 20px;
    color: #aaa;
    font-size: 14px;
    box-sizing: border-box;
  }

  .register {
    width: 360px;
    background-color: white;
    box-sizing: border-box;
    padding: 16px 32px;

    .register-title {
      font-size: 24px;
      text-align: center;
    }
    .register-form {
      margin-top: 24px;
      .register-form-row {
        display: block;
        width: 100%;

        margin: 8px 0;

        &.register-form-input {
          box-sizing: border-box;
          padding-left: 24px;

          display: flex;
          flex-flow: row nowrap;
          align-items: center;

          span {
            width: 64px;
            font-size: 18px;
          }

          input {
            flex: 1;
            border: none;
            outline: none;
            border-bottom: 1px solid #ccc;

            transition: border 0.2s;

            font-size: 18px;
            padding: 4px;

            &:focus {
              border-bottom: 1px solid #333;
            }
          }
        }

        &.register-form-radio {
          display: flex;
          flex-flow: row nowrap;
          justify-content: space-around;
          align-items: center;
        }
      }
    }

    .register-tools {
      text-align: center;

      button {
        margin: 0 8px;
        cursor: pointer;
        border: none;
        font-size: 14px;
        padding: 8px 16px;

        color: white;

        &.register-btn-submit {
          background-color: #6bc233;
        }
        &.register-btn-cancel {
          background-color: #aaa;
        }
      }
    }
  }
}
</style>

<script>
import Modal from '../components/Modal.vue';

import bg from '../assets/imgs/bg.jpg';

export default {
  data() {
    return {
      bg,
      swiperOption: {
        autoplay: 5000
      },
      registerModalVisible: true,
      username: '',
      password1: '',
      password2: '',
      phone: ''
    };
  },
  components: {
    Modal
  },
  methods: {
    showRegisterModal(e) {
      this.registerModalVisible = true;
    },
    hideRegisterModal(e) {
      this.resetRegisterForm();
      this.registerModalVisible = false;
    },
    toRegister(e) {
      this.resetRegisterForm();
      this.registerModalVisible = false;
    },
    resetRegisterForm() {
      this.username = '';
      this.password1 = '';
      this.password2 = '';
      this.phone = '';
    }
  }
};
</script>
