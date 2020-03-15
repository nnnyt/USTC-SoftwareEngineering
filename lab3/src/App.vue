<template>
  <div id="app">
    <my-header @countup="countUp" @countdown="countDown" @pause="pause" @resume="resume" @clear="clear" @restart="restart" :timer-end="timerEnd"></my-header>
    <my-time :hour=this.hour :minute=this.minute :second=this.second></my-time>
  </div>
</template>

<script>
import MyHeader from './components/MyHeader.vue'
import MyTime from './components/MyTime.vue'
export default {
  name: 'App',
  components: {
    MyHeader,
    MyTime
  },
  data () {
    return {
      hour: 0,
      minute: 0,
      second: 0,
      state: 'off',
      direction: 'up',
      settingTime: 0,
      time1: 0,
      start: 0,
      setIntervalId: null,
      passed: 0,
      timerEnd: false,
      minutePassed: 0
    }
  },
  methods: {
    countUp (hour, minute, second) {
      this.state = 'on'
      this.settingTime = hour * 3600 + minute * 60 + second
      this.time1 = Date.now()
      this.start = this.time1
      this.timer()
    },
    countDown (hour, minute, second) {
      this.state = 'on'
      this.direction = 'down'
      this.settingTime = hour * 3600 + minute * 60 + second
      this.time1 = Date.now()
      this.start = this.time1
      this.timer()
    },
    pause () {
      const NOW = Date.now()
      this.passed = NOW - this.start + this.passed
      this.minutePassed = NOW - this.time1
      clearInterval(this.setIntervalId)
      this.setIntervalId = null
    },
    resume () {
      this.start = Date.now()
      this.time1 = this.start - this.minutePassed
      this.timer()
    },
    clear () {
      this.timerEnd = false
      this.state = 'off'
      clearInterval(this.setIntervalId)
      this.setIntervalId = null
      this.settingTime = 0
      this.passed = 0
      this.minutePassed = 0
      this.direction = 'up'
      this.hour = 0
      this.minute = 0
      this.second = 0
    },
    restart () {
      this.timerEnd = false
      this.state = 'on'
      this.passed = 0
      this.minutePassed = 0
      clearInterval(this.setIntervalId)
      this.setIntervalId = null
      this.time1 = Date.now()
      this.start = this.time1
      this.timer()
    },
    timer () {
      const THAT = this
      this.setIntervalId = setInterval(function () {
        if (THAT.direction === 'up') {
          const TIME2 = Date.now()
          const DIFF = TIME2 - THAT.start + THAT.passed
          if (DIFF >= THAT.settingTime * 1000) {
            THAT.timerEnd = true
            clearInterval(THAT.setIntervalId)
            THAT.setIntervalId = null
            THAT.state = 'off'
            let second = (DIFF / 1000) % 60
            let minute = (((DIFF / 1000) - second) / 60) % 60
            let hour = (((DIFF / 1000) - second - 60 * minute) / 3600) % 10
            second = parseInt(second)
            THAT.hour = hour
            THAT.minute = minute
            THAT.second = second
          } else {
            if (TIME2 - THAT.time1 >= 1000 || THAT.time1 === THAT.start) {
              THAT.time1 = TIME2
              let second = (DIFF / 1000) % 60
              let minute = (((DIFF / 1000) - second) / 60) % 60
              let hour = (((DIFF / 1000) - second - 60 * minute) / 3600) % 10
              second = parseInt(second)
              THAT.hour = hour
              THAT.minute = minute
              THAT.second = second
            }
          }
        } else {
          const TIME2 = Date.now()
          const DIFF = THAT.settingTime * 1000 - (TIME2 - THAT.start + THAT.passed)
          if (DIFF <= 0) {
            THAT.timerEnd = true
            clearInterval(THAT.setIntervalId)
            THAT.setIntervalId = null
            THAT.hour = 0
            THAT.minute = 0
            THAT.second = 0
            THAT.state = 'off'
          } else {
            if (TIME2 - THAT.time1 >= 1000 || THAT.time1 === THAT.start) {
              THAT.time1 = TIME2
              let second = (DIFF / 1000) % 60
              let minute = (((DIFF / 1000) - second) / 60) % 60
              let hour = (((DIFF / 1000) - second - 60 * minute) / 3600) % 10
              second = parseInt(second)
              THAT.hour = hour
              THAT.minute = minute
              THAT.second = second
            }
          }
        }
      }
        , 1)
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0;
}
body {
  margin: 0;
}
</style>
