var box = document.getElementById('box');
var uls = box.getElementsByTagName('ul');
var imgs = box.getElementsByTagName('img');
uls = utils.toArray(uls);
var data = null;
var minH = null;
var stop = null;

ajax();
function ajax() {
    var xhr = new XMLHttpRequest();
    xhr.open('get','product.json',false);
    xhr.onreadystatechange = function () {
        if (xhr.readyState==4&&xhr.status==200){
            data = utils.toJSON(xhr.responseText);
        bindHtml(16)
        }
    };
    xhr.send()
}

//console.log(data);

function bindHtml(n) {
    for (var i = 0; i <n ; i++) {
        uls.sort(function (a,b) {
            return a.offsetHeight-b.offsetHeight
        })
        let num = utils.getRandom(0,17);
        uls[0].innerHTML +=`
        <li>
            <div style="height: ${data[num].height}px">
                <img src="${data[num].img}" alt="">    
            </div>
            <p>这是第${num+1}张图片</p>
        </li>`;
        minH = uls[0].offsetHeight;
    }
}

let winH = utils.win('clientHeight');
window.onscroll = function () {
    let winT = utils.win('scrollTop');
    if (winT+winH>minH){
        stop++
        if (stop>3){
            alert('到底了')
            window.onscroll = null
            return
        }
        ajax()
    }
    lazy()
}
lazy()
function lazy() {
    for (var i = 0; i <imgs.length ; i++) {
        lazyImg(imgs[i]);
    }
}

function lazyImg(ele) {
    if(ele.load)return;
    //计算每一张图片距离body顶部的偏移量
    let imgT = utils.offset(ele).top;
    //计算每一张图片自身的高度
    let imgH = ele.offsetHeight/2;
    //计算一下屏幕卷出去的高度
    let winT = utils.win('scrollTop');
    //判断浏览器的高度+浏览器卷上去的高度>图片自身的高度+图片距离body的上偏移量
    if (winT + winH > imgH + imgT) {
        //创建一个新的图片
        let newImg = new Image;
        //获取行内样式中的data-src上的真实图片
        let url = ele.getAttribute('data-src');
        //获取到赋值给新图片的src属性
        newImg.src = url;
        //尝试让newImg加载，如果加载成功，把这个地址还给真实img图片
        newImg.onload = function () {
            ele.src = this.src;
            //可以进行一些性能优化
            newImg = null;
            ele.load = true; //给图片一个自定义属性，下次再碰到这张图片的时候，直接不要再继续加载了
            ele.parentNode.style.background = 'none'  //图片已经有了就不需要loading图了，直接去掉它就可以了
            fadeIn(ele);
        }
    }
}

//6.让图片进行渐隐渐现显示
function fadeIn(ele) {
    //现获取真实图片的透明度
    let opacity = utils.css(ele, 'opacity');
    //设定时器让图片逐渐显示
    ele.timer = setInterval(() => {
        opacity += 0.04;
        //透明度加完之后还给ele图片标签
        utils.css(ele, 'opacity', opacity);
        //当图片透明度大于等于1的时候让定时器停止
        if (opacity >= 1) {
            clearInterval(ele.timer);
            utils.css(ele, 'opacity', 1)
        }

    },13)

}



