(function () {
    //utils这个方法
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
    //匀速直线运动
    let linear = function (time, duration, change, begin) {
        return time / duration * change + begin
    };
    //参数1：当前元素  参数2：元素运动的终点   参数3：花费的时间  参数4：callback 动画完成之后的回调函数
    window.animate = function (ele, target = {}, duration, callback) {
        //如果没有给时间，但是设置了回调函数
        if (typeof duration === 'function') {
            //就让形参callback等于设置的那个函数
            callback = duration;
            //时间给一个默认值  2000
            duration = 2000;
        }
        //开始给change进行设置
        let change = {}, timer = 0, begin = {};
        //需要循环target里面的每一项
        for (var key in target) {
            //拿到begin这个对象中的属性键值对，就是元素一开始身上原有的属性值
            begin[key] = utils.css(ele, key);
            //计算change【要改变的属性】，通过让终点的值 - 起点的值  求出change中的每一个值
            change[key] = target[key] - begin[key];
        }
        //在元素的自定义属性上添加一个定时器
        ele.timer = setInterval(() => {
            //定时器执行的时候，让timer每一次都加17
            timer += 17;
            //当timer时间大于我们设置的终点时间时，清除定时器
            if (timer>=duration){
                //清除定时器
                clearInterval(ele.timer);
                //把元素设置为终点的值
                utils.css(ele,target);
                //判断回调函数存在，让回调函数执行，让回调函数中的this变成当前的元素
                callback&&callback.call(ele);
                //加return不再让下面的代码执行
                return
            }
            //要让元素发生动画，需要循环change
            for (var key in change){
                //求出每一项要改变的值，通过元素直线运动公式
                var cur = linear(timer,duration,change[key],begin[key]);
                //通过utils给元素设置上
                utils.css(ele,key,cur);
            }
        },17)
    }

})();

