<template>
    <div class="hint hint-font" id="hint"><slot></slot></div>
</template>

<script>
export default {
  name: 'Hint'
}
</script>

<style scoped>
.hint-font {
    font-family: PingFangSC-Regular, "PingFang SC", sans-serif;
    color: #FFFFFF;
    font-size: 16px;
    letter-spacing: 0;
    line-height: 22px;
}
.hint {
    padding: 9px 0;
    height: 22px;
    margin-right: 20px;
}
</style>
