<template>
  <transition enter-active-class="animated bounceIn" leave-active-class="animated bounceOut">
    <div class="modal">
        <slot name="modal-main"></slot>
    </div>
  </transition>
</template>
<style lang="scss">
.modal {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  box-sizing: border-box;

  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: flex-start;

  padding: 32px 24px;
}
</style>

<script>
export default {};
</script>

