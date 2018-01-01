<template>
  <div :class="{modal: true, active: visible}">
    <slot name="modal-main"></slot>
  </div>
</template>
<style lang="scss">
.modal {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background-color: rgba(0, 0, 0, 0.8);

  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: flex-start;

  padding: 32px 24px;

  visibility: hidden;
  opacity: 0;

  transition: opacity 0.2s;

  &.active {
    visibility: visible;
    opacity: 1;
  }
}
</style>

<script>
export default {
  props: {
    visible: {
      default: false,
      type: Boolean
    }
  }
};
</script>

