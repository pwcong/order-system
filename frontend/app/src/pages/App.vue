<template>
  <!-- <div class="navs">
      <router-link class="nav" to="/">Home</router-link>
      <router-link class="nav" to="/counter">Counter</router-link>
    </div> -->
  <!-- <div class="container">
    <div class="content">
      <router-view></router-view>
    </div>
  </div> -->

  <container>
    <div slot="main" class="main">
      <mt-tab-container v-model="selectedPage">
        <mt-tab-container-item id="discoverPage">
        </mt-tab-container-item>
        <mt-tab-container-item id="orderPage">
        </mt-tab-container-item>
        <mt-tab-container-item id="userPage">
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
    <div slot="footer" class="footer">
      <mt-tabbar v-model="selectedPage">
        <mt-tab-item id="discoverPage">
          <img slot="icon" :src="discoverIcon"> 发现
        </mt-tab-item>
        <mt-tab-item id="orderPage">
          <img slot="icon" :src="orderIcon"> 订单
        </mt-tab-item>
        <mt-tab-item id="userPage">
          <img slot="icon" :src="userIcon"> 我的
        </mt-tab-item>
      </mt-tabbar>
    </div>
  </container>

</template>

<style lang="scss">
.main {
  position: absolute;
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;
  overflow: auto;
  padding-bottom: 55px;
  box-sizing: border-box;
}

.footer {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
}
</style>

<script>
import Container from './layout/Container.vue';

import discoverIcon from '../assets/icons/shop.svg';
import orderIcon from '../assets/icons/order.svg';
import userIcon from '../assets/icons/user.svg';

export default {
  data() {
    return {
      selectedPage: 'discoverPage',
      discoverIcon,
      userIcon,
      orderIcon
    };
  },
  components: {
    Container
  }
};
</script>
