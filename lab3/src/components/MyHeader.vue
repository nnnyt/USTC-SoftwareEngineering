<template>
    <div class="header" id="header" timerEnd="timerEnd">
      <my-input @update="getHour" v-show="state === 'counter'">时</my-input>
      <my-input input-id="minute" @update="getMinute" v-show = "state === 'counter'">分</my-input>
      <my-input input-id="second" @update="getSecond" v-show = "state === 'counter'">秒</my-input>
      <hint v-show = "state !== 'counter'">{{ hintText }}</hint>
      <my-button @click="countUp" v-show = "state === 'counter'">开始正计时</my-button>
      <my-button button-id="countdown" @click="countDown" v-show = "state === 'counter'">开始倒计时</my-button>
      <my-button button-id="resume" @click="resumeTimer" v-show = "state === 'paused'">恢复计时器</my-button>
      <my-button button-id="pause" @click="pauseTimer" v-show = "state === 'counting'">暂停计时器</my-button>
      <my-button button-id="clear" @click="clearTimer" btn-pos="clear" btn-color="red" v-show = "state === 'paused' || state === 'counting' || state === 'counted'">{{ clearText }}</my-button>
      <my-button button-id="restart" @click="restartTimer" btn-pos="restart" btn-color="yellow" v-show = "state === 'paused' || state === 'counting' || state === 'counted'">重新再计时</my-button>
    </div>
</template>

<script>
import MyInput from './MyInput.vue'
import MyButton from './MyButton.vue'
import Hint from './Hint.vue'
export default {
  name: 'MyHeader',
  components: {
    MyInput,
    MyButton,
    Hint
  },
  data () {
    return {
      hour: 0,
      minute: 0,
      second: 0,
      state: 'counter',
      hintText: '',
      direction: 'up'
    }
  },
  props: {
    timerEnd: false
  },
  created: function () {
    const THAT = this
    window.onkeyup = function (e) {
      let keycode = e.keyCode
      if (keycode === 13) {
        if (THAT.state === 'counter') {
          THAT.countUp()
        }
      } else if (keycode === 32) {
        if (THAT.state === 'counting') {
          THAT.pauseTimer()
        } else if (THAT.state === 'paused') {
          THAT.resumeTimer()
        }
      }
    }
  },
  methods: {
    timeText () {
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
    },
    countUp () {
      this.state = 'counting'
      this.hintText = '正在正计时 ' + this.timeText()
      this.$emit('countup', this.hour, this.minute, this.second)
    },
    countDown () {
      this.state = 'counting'
      this.hintText = '正在倒计时 ' + this.timeText()
      this.direction = 'down'
      this.$emit('countdown', this.hour, this.minute, this.second)
    },
    resumeTimer () {
      this.state = 'counting'
      if (this.direction === 'up') {
        this.hintText = '正在正计时 ' + this.timeText()
      } else {
        this.hintText = '正在倒计时 ' + this.timeText()
      }
      this.$emit('resume')
    },
    pauseTimer () {
      this.state = 'paused'
      if (this.direction === 'up') {
        this.hintText = '暂停正计时 ' + this.timeText()
      } else {
        this.hintText = '暂停倒计时 ' + this.timeText()
      }
      this.$emit('pause')
    },
    clearTimer () {
      this.state = 'counter'
      this.direction = 'up'
      this.hint = ''
      this.hour = 0
      this.minute = 0
      this.second = 0
      this.$emit('clear')
    },
    restartTimer () {
      this.state = 'counting'
      if (this.direction === 'up') {
        this.hintText = '正在正计时 ' + this.timeText()
      } else {
        this.hintText = '正在倒计时 ' + this.timeText()
      }
      this.$emit('restart')
    },
    getHour (var1) {
      if (var1 < 0 || isNaN(var1)) {
        this.hour = 0
      } else {
        this.hour = var1
      }
    },
    getMinute (var1) {
      if (var1 < 0 || isNaN(var1)) {
        this.minute = 0
      } else if (var1 > 59) {
        this.minute = 59
      } else {
        this.minute = var1
      }
    },
    getSecond (var1) {
      if (var1 < 0 || isNaN(var1)) {
        this.second = 0
      } else if (var1 > 59) {
        this.second = 59
      } else {
        this.second = var1
      }
    }
  },
  computed: {
    clearText: function () {
      if (this.direction === 'up') {
        return '清空正计时'
      } else {
        return '清空倒计时'
      }
    }
  },
  watch: {
    timerEnd: function (val) {
      if (val === true) {
        if (this.direction === 'up') {
          this.hintText = '正计时 ' + this.timeText() + ' 已结束'
        } else {
          this.hintText = '倒计时 ' + this.timeText() + ' 已结束'
        }
        this.state = 'counted'
      }
    }
  }
}
</script>

<style scoped>
.header {
    width: 1140px;
    height: 40px;
    background: #97A5BC;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,0.10);
    padding: 15px 40px;
    display: flex;
    position: relative;
    z-index: 100;
}
</style>
