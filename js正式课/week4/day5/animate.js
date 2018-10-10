(function () {
    let utils = (function () {
        function getCss(ele, attr) {
            let value = window.getComputedStyle(ele)[attr];
            var reg = /^-?(\d|[1-9]\d+)(\.\d+)?(px|pt|em|rem)?$/i;
            if (reg.test(value)) {
                value = parseFloat(value)
            }
            return value
        }

        function setCss(ele, attr, value) {
            var reg = /^width|height|fontSize|(margin|padding)?(left|top|right|bottom)|(margin|padding)$/i;
            if (reg.test(attr)) {
                /px/.test(value.toString()) ? null : value += 'px'
            }
            ele.style[attr] = value;
        }

        function setGroupCss(ele, obj = {}) {
            if (obj instanceof Object) {
                for (var key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        setCss(ele, key, obj[key])
                    }
                }
            }
        }

        function css(...arg) {
            if (arg.length === 3) {
                setCss(...arg)
            } else {
                if (Object.prototype.toString.call(arg[1]) === '[object Object]') {
                    setGroupCss(...arg)
                } else {
                    return getCss(...arg)
                }
            }
        }

        return {css}
    })();
    let linear = function (time,duration,change,begin) {
        return time/duration*change+begin;
    };
    window.animate = function (ele,target={},duration,callback) {
        if (duration==='function'){
            callback = duration;
            duration = 2000;
        }
        let change = {},time = 0,begin = {};
        for (var key in target){
            begin[key] = utils.css(ele,key);
            change[key] = target[key]-begin[key];
        }
        clearInterval(ele.timer);
        ele.timer = setInterval(()=>{
            timer+=17;
            if (timer>=duration){
                clearInterval(ele.timer);
                utils.css(ele,target);
                callback&&callback.call(ele);
                return
            }
            for (var key in change){
                var cur = linear(timer,duration,change[key],begin[key]);
                utils.css(ele,key,cur)
            }
        },17)
    };
    window.utils = utils;
    window.animate = animate;
})();