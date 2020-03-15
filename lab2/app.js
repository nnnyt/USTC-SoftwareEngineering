(function () {
    const COUNT_UP = document.getElementById("countup");
    const COUNT_DOWN = document.getElementById("countdown");
    const TIME = document.getElementById("time");
    const PAUSE = document.getElementById("pause");
    const CLEAR = document.getElementById("clear");
    const RESTART = document.getElementById("restart");
    const HINT = document.getElementById("hint");
    const RESUME = document.getElementById("resume");
    const SPACE = 32;
    const ENTER = 13;
    let direction = "up";
    let totalTime = "";
    let settingTime = 0;
    let time1, start;
    let minutePassed = 0;
    let setIntervalId = null;
    let passed = 0;
    let state = "off";

    document.onkeyup = function () {
        if (event.keyCode === SPACE && state === "on") {
            if (setIntervalId === null) {
                resumeTimer();
            }
            else {
                pauseTimer();
            }
        }
        if (event.keyCode === ENTER && state === "off") {
            countUp();
        }
    };

    function countUp () {
        COUNT_UP.blur();
        state = "on";
        direction = "up";
        const [HOUR, MINUTE, SECOND] = getRightTime();
        totalTime = HOUR + ":" + MINUTE + ":" + SECOND;
        HINT.innerHTML = "正在正计时 " + totalTime;
        HINT.classList.remove("hidden");
        let item;
        for (item of document.getElementsByClassName("input")) {
            item.classList.add("hidden");
        }
        COUNT_UP.classList.add("hidden");
        COUNT_DOWN.classList.add("hidden");
        PAUSE.classList.remove("hidden");
        RESTART.classList.remove("hidden");
        CLEAR.classList.remove("hidden");
        CLEAR.innerHTML = "清空正计时";
        settingTime = parseInt(HOUR) * 3600 + parseInt(MINUTE) * 60 + parseInt(SECOND);
        time1 = Date.now();
        start = time1;
        timer();
    }
    COUNT_UP.onclick = countUp;

    COUNT_DOWN.onclick = function () {
        COUNT_DOWN.blur();
        state = "on";
        direction = "down";
        const [HOUR, MINUTE, SECOND] = getRightTime();
        settingTime = parseInt(HOUR) * 3600 + parseInt(MINUTE) * 60 + parseInt(SECOND);
        totalTime = HOUR + ":" + MINUTE + ":" + SECOND;
        HINT.innerHTML = "正在倒计时 " + totalTime;
        HINT.classList.remove("hidden");
        let item;
        for (item of document.getElementsByClassName("input")) {
            item.classList.add("hidden");
        }
        COUNT_UP.classList.add("hidden");
        COUNT_DOWN.classList.add("hidden");
        PAUSE.classList.remove("hidden");
        RESTART.classList.remove("hidden");
        CLEAR.classList.remove("hidden");
        CLEAR.innerHTML = "清空倒计时";
        TIME.innerHTML = totalTime;
        time1 = Date.now();
        start = time1;
        timer();
    };

    function pauseTimer () {
        PAUSE.blur();
        if (direction === "up") {
            HINT.innerHTML = "暂停正计时 " + totalTime;
        }
        else {
            HINT.innerHTML = "暂停倒计时 " + totalTime;
        }
        PAUSE.classList.add("hidden");
        RESUME.classList.remove("hidden");
        const NOW = Date.now();
        passed = NOW - start + passed;
        minutePassed = NOW - time1;
        clearInterval(setIntervalId);
        setIntervalId = null;
    }
    PAUSE.onclick = pauseTimer;

    function resumeTimer () {
        RESUME.blur();
        if (direction === "up") {
            HINT.innerHTML = "正在正计时 " + totalTime;
        }
        else {
            HINT.innerHTML = "正在倒计时 " + totalTime;
        }
        PAUSE.classList.remove("hidden");
        RESUME.classList.add("hidden");
        start = Date.now();
        time1 = start - minutePassed;
        timer();
    }
    RESUME.onclick = resumeTimer;

    CLEAR.onclick = function () {
        CLEAR.blur();
        state = "off";
        HINT.classList.add("hidden");
        let item;
        for (item of document.getElementsByClassName("input")) {
            item.classList.remove("hidden");
        }
        document.getElementById("hour").value = "";
        document.getElementById("minute").value = "";
        document.getElementById("second").value = "";
        COUNT_UP.classList.remove("hidden");
        COUNT_DOWN.classList.remove("hidden");
        PAUSE.classList.add("hidden");
        RESTART.classList.add("hidden");
        RESUME.classList.add("hidden");
        CLEAR.classList.add("hidden");
        clearInterval(setIntervalId);
        setIntervalId = null;
        totalTime = "";
        settingTime = 0;
        passed = 0;
        minutePassed = 0;
        direction = "up";
        TIME.innerHTML = "00:00:00";
    };

    RESTART.onclick = function () {
        RESTART.blur();
        state = "on";
        passed = 0;
        minutePassed = 0;
        clearInterval(setIntervalId);
        setIntervalId = null;
        if (direction === "up") {
            TIME.innerHTML = "00:00:00";
            HINT.innerHTML = "正在正计时 " + totalTime;
        }
        else {
            TIME.innerHTML = totalTime;
            HINT.innerHTML = "正在倒计时 " + totalTime;
        }
        RESUME.classList.add("hidden");
        PAUSE.classList.remove("hidden");
        time1 = Date.now();
        start = time1;
        timer();
    };

    function getRightTime () {
        let hour = parseInt(document.getElementById("hour").value);
        let minute = parseInt(document.getElementById("minute").value);
        let second = parseInt(document.getElementById("second").value);
        if (hour < 0 || isNaN(hour)) {
            hour = 0;
        }
        if (hour < 10) {
            hour = "0" + hour;
        }
        if (minute < 0 || isNaN(minute)) {
            minute = 0;
        }
        else if (minute > 59) {
            minute = 59;
        }
        if (minute < 10) {
            minute = "0" + minute;
        }
        if (second < 0 || isNaN(second)) {
            second = 0;
        }
        else if (second > 59) {
            second = 59;
        }
        if (second < 10) {
            second = "0" + second;
        }
        return [hour, minute, second];
    }

    function timer () {
        setIntervalId = setInterval( function () {
            if (direction === "up") {
                const TIME2 = Date.now();
                const DIFF = TIME2 - start + passed;
                if (DIFF >= settingTime * 1000) {
                    HINT.innerHTML = '正计时 ' + totalTime + ' 已结束';
                    PAUSE.classList.add("hidden");
                    clearInterval(setIntervalId);
                    setIntervalId = null;
                    TIME.innerHTML = totalTime;
                    state = "off";
                }
                else {
                    if (TIME2 - time1 >= 1000) {
                        time1 = TIME2;
                        let second = (DIFF / 1000) % 60;
                        let minute = (((DIFF / 1000) - second) / 60 ) % 60;
                        let hour = (((DIFF / 1000) - second - 60 * minute) / 3600) % 10;
                        second = parseInt(second);
                        if (hour < 10) {
                            hour = '0' + hour;
                        }
                        if (minute < 10) {
                            minute = '0' + minute;
                        }
                        if (second < 10) {
                            second = '0' + second;
                        }
                        document.getElementById('time').innerHTML = hour + ':' + minute + ':' + second;
                    }
                }
            }
            else {
                const TIME2 = Date.now();
                const DIFF = settingTime * 1000 - (TIME2 - start + passed);
                if (DIFF <= 0) {
                    HINT.innerHTML = '倒计时 ' + totalTime + ' 已结束';
                    PAUSE.classList.add("hidden");
                    clearInterval(setIntervalId);
                    setIntervalId = null;
                    TIME.innerHTML = "00:00:00";
                    state = "off";
                }
                else {
                    if (TIME2 - time1 >= 1000 || time1 === start) {
                        time1 = TIME2;
                        let second = (DIFF / 1000) % 60;
                        let minute = (((DIFF / 1000) - second) / 60 ) % 60;
                        let hour = (((DIFF / 1000) - second - 60 * minute) / 3600) % 10;
                        second = parseInt(second);
                        if (hour < 10) {
                            hour = '0' + hour;
                        }
                        if (minute < 10) {
                            minute = '0' + minute;
                        }
                        if (second < 10) {
                            second = '0' + second;
                        }
                        document.getElementById('time').innerHTML = hour + ':' + minute + ':' + second;
                    }
                }
            }
        }, 1);
    }

})
();