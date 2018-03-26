<template>
  <div id="app">
    <div style="display: none;">
      <audio id="newOrderVoice">
        <source :src="newOrderVoice" type="audio/mp3">
      </audio>
      <audio id="payOrderVoice">
        <source :src="payOrderVoice" type="audio/mp3">
      </audio>
      <audio id="cancelOrderVoice">
        <source :src="cancelOrderVoice" type="audio/mp3">
      </audio>

    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import newOrderVoice from './assets/media/new_order.mp3';
import payOrderVoice from './assets/media/pay_order.mp3';
import cancelOrderVoice from './assets/media/cancel_order.mp3';

export default {
  name: 'app',
  data() {
    return {
      newOrderVoice,
      payOrderVoice,
      cancelOrderVoice
    };
  }
};
</script>
