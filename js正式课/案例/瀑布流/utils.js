var utils = (function () {
    let flag = 'getComputedStyle' in window;

    /*
    * 获取当前浏览器可视窗口的宽度
    * */
    function win(key, value) {
        if (value == undefined) {
            //获取一个属性值
            return document.documentElement[key] || document.body[key];
        }
        document.documentElement[key] = value;
        document.body[key] = value;
    }

    /*
    * 获取当前元素距离body的距离
    * */
    function offset(ele) {
        let l = ele.offsetLeft;
        let t = ele.offsetTop;
        let p = ele.offsetParent;
        while (p.tagName !== 'BODY') {
            l += p.clientLeft + p.offsetLeft;
            t += p.clientTop + p.offsetTop;
            //需要不断的去更新父级参照物
            p = p.offsetParent;
        }
        return {left: l, top: t};
    }

    /*
    * 封装了一个类数组转数组的方法
    * */
    function toArray(likeAry) {
        try {
            //标准浏览器
            return [].slice.call(likeAry);
        } catch (e) {
            //证明当前浏览器是ie6-8
            let newAry = [];
            for (var i = 0; i < likeAry.length; i++) {
                newAry[newAry.length] = likeAry[i];
            }
        }
    }

    /*
    * JSON字符串转JSON对象
    * */
    function toJSON(str) {
        try {
            return JSON.parse(str);
        } catch (e) {
            return eval('({' + str + '})')  //eval  将字符串转成js代码
        }
    }

    /*
    * 获取n到m之间的一个随机数
    * Math.round(Math.random()*(m-n)+n);
    *
    * */
    function getRandom(n, m) {
        //防止n和m是字符串形式，通过Number改为数字形式
        n = Number(n);
        m = Number(m);
        //防止n>m，如果是，通过解构赋值调换
        if (n > m) {
            [n, m] = [m, n];
        }
        return Math.round(Math.random() * (m - n) + n);
    }

    /*
    * 获取当前元素的样式
    *
    * 拿到我们内嵌式里面的样式用以下方法
    * 参数1：当前的元素， 参数2：元素上的伪类【默认不写】
    * window.getComputedStyle  获取当前元素计算后的样式，在内嵌中   （标准浏览器）
    * window.currentStyle        （ie6-8）
    *
    * 拿到行内式的样式用以下方法
    * ele.style.width
    * */
    function getCss(ele, attr) {
        var value = window.getComputedStyle(ele)[attr];
        //'200px'       attr=>background-color   'red'
        var reg = /^-?(\d|[1-9]\d+)(\.\d+)?(px|pt|em|rem)?$/i;
        //验证是否是带单位的值，如果带的话，去掉单位转成数字
        if (reg.test(value)) {
            value = parseFloat(value);
        }
        //不带单位直接返回
        return value;
    }

    /*
    * 设置当前元素的样式
    * ele.style.xxx = xxx
    * */
    function setCss (ele,attr,value){
        // box width 100
        // box opacity 0.5
        // width height fontSize margin padding left right top bottom
        var reg = /^width|height|fontSize|(margin|padding)?(left|top|right|bottom)|(margin|padding)$/i;
        // 判断传进来的属性是否正则匹配的属性，如果匹配，判断一下要设置的属性值是否带有单位，决定是否给其添加单位
        if(reg.test(attr)){
            debugger
            /px/.test(value.toString())?null:value+='px'
        }
        ele.style[attr]=value;
    }

    /*
    * 批量给元素设置样式
    *
    * */
    function setGroupCss(ele,obj = {}) {
        if (obj instanceof Object){
            for (var key in obj) {
                //for in  循环会便利obj这个对象上所有的可枚举属性
                //可枚举属性：obj上的私有属性和手动给obj设置的公有属性
                //obj天生自带的公有属性，属于obj的不可枚举属性
                if (obj.hasOwnProperty(key)){
                    //我们只需要obj上的私有属性，通过hasOwnProperty这个属性拿到它的私有属性进行循环设置
                    setCss(ele,key,obj[key]);
                }
            }
        }
    }

    /*
    * 将getCss和setCss和setGroupCss绑定在一起，封装成一个方法 css
    * */
    function css(...arg) {
        //判断传入的参数的个数，如果个数为三个的时候，那么我们使用setCss
        if (arg.length === 3){
            setCss(...arg)
        } else {
            //如果传入的第二个参数为一个对象的时候，我们调用setGroupCss这个方法进行批量设置样式
            if (Object.prototype.toString.call(arg[1]) === '[object Object]') {
                setGroupCss(...arg);
            }else {
                //否则属于获取到的当前元素的属性
                return getCss(...arg);
            }
        }
    }


    return {
        //属性名和属性值一样时，可以省略一个,如下
        win,
        offset,
        toArray,
        toJSON,
        getRandom,
        getCss,
        setCss,
        setGroupCss,
        css,
    }
})();


//debugger;   断点，主要是用于调试js代码用的
//debugger写在哪一行JS运行到那一行就会暂停，除非JS代码根本没有加载到这一行，debugger不会让浏览器暂停正在运行的JS代码
//F8 跳转到下一个debugger
//F10跳转到下一行
//F11 会逐行进行调试【包括进入到函数中】