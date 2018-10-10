var banner = (function () {
    //1.获取元素
    let outer = document.getElementById('outer');
    let swiper = document.getElementById('swiper');
    let focus = document.getElementById('focus');
    let left = outer.getElementsByTagName('a')[0];
    let right = outer.getElementsByTagName('a')[1];
    let imgs = swiper.getElementsByTagName('img');
    let lis = focus.getElementsByTagName('li');
    let data = null;
    let step = 0;
    let timer = null;
    let isClick = true;

//2.请求数据
    function ajax() {
        let xhr = new XMLHttpRequest();
        xhr.open('get', 'data.json', false);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                data = JSON.parse(xhr.responseText)
                bindHtml();
            }
        };
        xhr.send();
        console.log(data);
    }

//3.绑定页面
    function bindHtml() {
        var imgStr = ``, lisStr = ``;
        for (let i = 0; i < data.length; i++) {
            imgStr += `<div><img data-src="img/img/${data[i].src}" alt=""></div>`;
            lisStr += `<li class="${i === 0 ? 'selected' : ''}"></li>`
        }
        imgStr += `<div><img data-src="img/img/${data[0].src}" alt=""></div>`;
        swiper.innerHTML = imgStr;
        focus.innerHTML = lisStr;
        utils.css(swiper, 'width', 1000 * (data.length + 1));
        lazyImg()
    }

//4.延迟加载
    function lazyImg() {
        for (let i = 0; i < imgs.length; i++) {
            let cur = imgs[i];
            var newImg = new Image;
            let url = cur.getAttribute('data-src');
            newImg.src = url;
            newImg.onload = function () {
                cur.src = this.src;
                newImg = null;
                animate(cur, {opacity: 1}, 300)
            }
        }
    }

//5.开始轮播
    function auto() {
        timer = setInterval(autoMove, 2000);
    }

    function autoMove() {
        if (step >= data.length) {
            step = 0;
            utils.css(swiper, 'left', 0)
        }
        step++;
        //animate中设置的动画事件必须比setInterval中的间隔时间小
        animate(swiper, {left: step * -1000}, 1000, function () {
            isClick = true;
        });
        focusTip()
    }

//6.小圆点滚动
    function focusTip() {
        for (let i = 0; i < lis.length; i++) {
            if (step === i) {
                lis[i].classList.add('selected');
            } else {
                lis[i].classList.remove('selected')
            }
            if (step === data.length) {
                lis[0].classList.add('selected')
            }
        }
    }

//7.划入停止 滑出继续
    function mousemove() {
        outer.onmouseover = function () {
            clearInterval(timer);
            utils.css(left, 'display', 'block');
            utils.css(right, 'display', 'block');
        }
        outer.onmouseout = function () {
            timer = setInterval(autoMove, 2000);
            utils.css(left, 'display', 'none');
            utils.css(right, 'display', 'none');
        }
    }


//8.左右按钮的点击
    function click() {
        right.onclick = function () {
            if (isClick) {
                isClick = false;
                autoMove()
            }
        };
        left.onclick = function () {
            if (isClick) {
                isClick = false;
                if (step <= 0) {
                    step = data.length;
                    utils.css(swiper, 'left', step * -1000)
                }
                step--;
                animate(swiper, {left: -1000 * step}, 1000, function () {
                    isClick = true;
                });
                focusTip()
            }

        };
    }

//9.点击小圆点
    function focusClick() {
        for (let i = 0; i < lis.length; i++) {
            lis[i].onclick = function () {
                if (isClick) {
                    isClick = false;
                    step = i - 1;
                    autoMove();
                }
            }
        }
    }

   document.onvisibilitychange = function () {
        if (document.visibilityState == "hidden") {
            clearInterval(timer);
        } else {
            timer = setInterval(autoMove, 2000);
        }
    }
    return {
        init: function () {
            ajax();
            auto();
            mousemove();
            click();
            focusClick();
        }
    }
})();










































