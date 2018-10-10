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
    let linear = function (time, duration, change, begin) {
        return time / duration * change + begin;
    };

    function animate(ele, target = {}, duration, callback) {
        //duration 有值的话进不去if
        if (typeof duration === 'function') {
            callback = duration;
            duration = 2000;
        }
        let begin = {}, change = {}, time = 0;
        for (var key in target) {
            //我们可以拿到元素最开始的值，赋值给begin
            begin[key] = utils.css(ele, key)
            change[key] = target[key] - begin[key];   //求出元素要改变的距离
        }
        //在下一个进行设置的定时器，我们需要把上一个定时器进行清除
        clearInterval(ele.timer);
        ele.timer = setInterval(() => {
            time += 17;
            //如果时间到达之后，清除定时器
            if (time>=duration){
                clearInterval(ele.timer);
                utils.css(ele,target);
                //检测回调函数是否是一个函数，如果是的话，让回调函数执行，并且改变回调函数中的this，让this等于当前操作的元素
                if (typeof callback === 'function'){
                    callback.call(ele);
                }
                return;
            }
            for (var key in change){
                //循环change中的每一项，拿到我们要设置的值，cur会根据time的不同，不断地进行更新
                var cur = linear(time,duration,change[key],begin[key]);
                //拿到每次更新的值，设置给操作的元素
                utils.css(ele,key,cur);
            }
        },17)
    }
    //通过给全局变量赋值，我们可以在外面进行调用
    window.animate = animate;
    window.utils = utils;
})();