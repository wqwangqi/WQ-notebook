var utils = (function () {
    function win(key, value) {
        if (value == undefined) {
            return document.documentElement[key] || document.body[key];
        }
        document.documentElement[key] = value;
        document.body[key] = value;
    }

    function offset(ele) {
        let l = ele.offsetLeft;
        let t = ele.offsetTop;
        let p = ele.offsetParent;
        while (p.tagName !== 'BODY') {
            l += p.clientLeft + p.offsetLeft;
            t += p.clientTop + p.offsetTop;
            p = p.offsetParent;
        }
        return {left: l, top: t}
    }

    function toArray(likeAry) {
        try {
            return [].slice.call(likeAry)
        } catch (e) {
            let newAry = [];
            for (let i = 0; i < likeAry.length; i++) {
                newAry[likeAry.length] = likeAry[i];
            }
        }
    }

    function toJSON(str) {
        try {
            return JSON.parse(str)
        } catch (e) {
            return eval('(' + str + ')')
        }
    }

    function getRandom(n, m) {
        n = Number(n);
        m = Number(m);
        if (n > m) {
            [n, m] = [m, n]
        }
        return Math.round(Math.random() * (m - n) + n)
    }

    function getCss(ele, attr) {
        var value = window.getComputedStyle(ele)[attr];
        var reg = /^-?(\d|[1-9]\d)(\.\d+)?(px|pt|rem|em)?$/i;
        if (reg.test(value)) {
            value = parseFloat(value)
        }
        return value;
    }

    function setCss(ele, attr, value) {
        var reg = /^width|height|fontSize|(margin|padding)?(left|top|right|bottom)|(margin|padding)$/i;
        if (reg.test(attr)){
            /px/.test(value.toString())?null:value+='px'
        }
        ele.style[attr] = value;
    }

    function setGroupCss(ele,obj={}) {
        if (obj instanceof Object){
            for (var key in  obj){
                if (obj.hasOwnProperty(key)){
                    setCss(ele,key,obj[key]);
                }
            }
        }
    }

    function css(...arg) {
        if (arg.length ===3){
            setCss(...arg);
        } else if (arg.length ===2){
            if (arg[1] instanceof Object){
                setGroupCss(...arg);
            } else {
                return getCss(...arg);
            }
        }
    }
    return{
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