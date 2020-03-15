# counter

> A counter based on Vue.js.

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## Usage

### function
countup, countdown, restart, pause, resume, clear and keyboard control   

### How to use
Input the time that you want, and choose to count up or count down.   

During counting, you can pause the counter, clear the counter and restart the counter. When the counter is paused, you can resume the counter, clear the counter and restart the counter. The counter will stop automatically when the time is up.   

Keyboard control is also supported. Before timing, you can press ENTER to start the counter, and the default is to count up. During timing, you can press SPACE to pause the counter. When the counter is paused, SPACE can also be used to resume the counter.    

The counter will automatically correct your input. If the minutes or seconds that you input are more than 59, they will beautomatically corrected to 59.   
