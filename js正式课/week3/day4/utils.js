var utils = (function () {
    /*
    * offset方法：求出当前元素距离body的偏移量
    * */
    function offset(ele) {
        let l = ele.offsetLeft;
        let t = ele.offsetTop;
        //如果元素的父级有定位，那么元素距离body的偏移量就不真实
        let p = ele.offsetParent;
        while (p.tagName !== 'BODY') {//直到parent为null【当parent上一次循环为body的时候】，才进不来这个循环
            l += p.offsetLeft + p.clientLeft;
            t += p.offsetTop + p.clientTop;
            //需要不断的去更新parent,让parent重新赋值，等于父级的父级参照物
            p = p.offsetParent;
        }
        return {left: l, top: t};
    }

    /*
    * 封装浏览器盒子模型属性
    * 想要求出浏览器的盒子模型属性  就用win方法
    * */
    function win(attr, value) {
        //判断第二个参数有没有传入，如果有传证明我是要设置，如果没有传只是来求值
        if (value == undefined) {
            return document.documentElement[attr] || document.body[attr];
        } else {
            document.documentElement[attr] = value;
            document.body[attr] = value;
        }

    }

    /*
    * 类数组转属组
    * */
    function toArray(likeAry) {
        try {
            //通过改变slice中的this，克隆一份像likeAry一样的数组
            return [].slice.call(likeAry)
        } catch (e) {
            var newAry = [];
            for (var i = 0; i < likeAry.length; i++) {
                newAry.push(likeAry[i]);
            }
            return newAry
        }
    }

    /*
    * getCss  想要获取某一个元素上的样式属性
    * */
    function getCss(ele, attr) {
        let value = window.getComputedStyle(ele)[attr];
        //获取到的value  是一个字符串
        //而且我们需要拿到这个值进行计算，带有单位的值，需要去掉单位
        var reg = /^-?(\d|[1-9]\d+)(\.\d+)?(px|pt|em|rem|%)?$/i;
        if (reg.test(value)) {
            value = parseFloat(value);
        }
        return value;
    }

    /*
    * setCss  给一个元素设置相对应的样式
    * */
    function setCss(ele, attr, value) {
        //需要给能够添加像素单位的属性名进行过滤
        var reg = /^(width|height|fontSize|(margin|padding)|(margin|padding)?(left|top|bottom|right))$/i;
        if (reg.test(attr)) {
            /px/.test(value.toString()) ? null : value += 'px';
        }
        ele.style[attr] = value;
    }

    /*
    * setGroupCss  批量给元素设置样式
    * */
    function setGroupCss(ele, obj = {}) {
        if (obj instanceof Object) {
            for (var key in obj) {
                //for in 循环是循环对象上的额可枚举属性【对象的私有属性+给对象设置的公有属性】，天生自带的公有属性是不包括的
                if (obj.hasOwnProperty(key)){  //判断obj中的值是否是私有的
                    setCss(ele,key,obj[key]);
                }
            }
        }
    }

    /*
    * css 把三个属性合成到一个调用
    * */
    function css(...arg) {
        if (arg.length===3){
            setCss(...arg);
        } else if (arg.length ==2){
            if (arg[1] instanceof Object) {
                setGroupCss(...arg);
            }else {
                return getCss(...arg);
            }
        }

    }

    return {
        offset: offset,
        win: win,
        toArray: toArray,
        getCss: getCss,
        setCss: setCss,
        setGroupCss:setGroupCss,
        css:css,
    }
})();