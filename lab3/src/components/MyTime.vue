<template>
    <div class="rectangle">
        <div class="time time-font" id="time" :hour="hour" :minute='minute' :second='second'>{{mytime}}</div>
    </div>
</template>

<script>
export default {
  name: 'MyTime',
  props: {
    hour: {
      type: Number,
      default: 0
    },
    minute: {
      type: Number,
      default: 0
    },
    second: {
      type: Number,
      default: 0
    }
  },
  computed: {
    mytime: function () {
      let hourStr, minuteStr, secondStr
      if (this.hour < 10) {
        hourStr = '0' + this.hour.toString()
      } else {
        hourStr = this.hour.toString()
      }
      if (this.minute < 10) {
        minuteStr = '0' + this.minute.toString()
      } else {
        minuteStr = this.minute.toString()
      }
      if (this.second < 10) {
        secondStr = '0' + this.second.toString()
      } else {
        secondStr = this.second.toString()
      }
      return hourStr + ':' + minuteStr + ':' + secondStr
    }
  }
}
</script>

<style scoped>
.rectangle {
    width: 1140px;
    height: 440px;
    padding: 0 40px;
    background: #F2F4F7;
}
.time {
    width: 960px;
    height: 200px;
    padding: 127px 90px 113px 91px;
}
.time-font {
    font-family: PTMono-Bold, "PT Mono", monospace;
    font-weight: 700;
    color: #333333;
    font-size: 200px;
    letter-spacing: 0;
    line-height: 200px;
}
</style>
