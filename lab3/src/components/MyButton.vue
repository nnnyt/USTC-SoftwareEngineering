<template>
    <button :class="[btnColor, btnPos, 'header-font']" :id="buttonId" @click="$event.target.blur();$emit('click')"><slot></slot></button>
</template>

<script>
export default {
  name: 'MyButton',
  props: {
    buttonId: {
      type: String,
      default: 'countup'
    },
    btnColor: {
      type: String,
      default: 'blue'
    },
    btnPos: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped>
.header-font {
    font-family: PingFangSC-Regular, "PingFang SC", sans-serif;
    font-size: 16px;
    letter-spacing: 0;
    line-height: 22px;
}
button {
    width: 98px;
    height: 40px;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,0.10);
    border-radius: 5px;
    border: 0;
    margin: 0 20px 0 0;
    color: #FFFFFF;
}
.blue {
    background: #2188E9;
}
.red {
    background: #DD2E1D;
}
.yellow {
    background: #FFB020;
}
.clear {
    margin-left: auto;
    margin-right: 20px;
}
.restart {
    align-self: flex-end;
}
</style>
