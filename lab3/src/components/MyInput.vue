<template>
    <div class="input">
        <input type="text" class="header-font" :id="inputId" v-model="inputNum" placeholder="0">
        <div class="label header-font"><slot></slot></div>
    </div>
</template>

<script>
export default {
  name: 'MyInput',
  props: {
    inputId: {
      type: String,
      default: 'hour'
    }
  },
  data () {
    return {
      inputNum: ''
    }
  },
  updated: function () {
    this.$emit('update', parseInt(this.inputNum))
  }
}
</script>

<style scoped>
.input {
    background: #FFFFFF;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,0.10);
    width: 70px;
    height: 40px;
    border-radius: 5px;
    margin: 0 20px 0 0;
    display: flex;
}
input {
    background: #FFFFFF;
    width: 18px;
    height: 22px;
    border: 0;
    margin: 9px  0 9px 9px;
    padding: 0;
    color: #AFAFAF;
}
.header-font {
    font-family: PingFangSC-Regular, "PingFang SC", sans-serif;
    font-size: 16px;
    letter-spacing: 0;
    line-height: 22px;
}
.label{
    width: 32px;
    height: 22px;
    margin: 9px;
    padding: 0;
    text-align: right;
    color: #222222;
}
</style>
