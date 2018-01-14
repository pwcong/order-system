<template>

  <div class="container">
    <slot name="header"></slot>
    <slot name="main"></slot>
    <slot name="footer"></slot>
  </div>

</template>
<style lang="scss">
html,
body {
  margin: 0;
  padding: 0;
  position: relative;
  width: 100%;
  height: 100%;
}

.container {
  font-family: 'Microsoft YaHei', sans-serif;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
<script>
export default {};
</script>
