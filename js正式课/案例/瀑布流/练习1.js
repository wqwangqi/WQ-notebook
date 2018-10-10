let box = document.getElementById('box');
let uls = box.getElementsByTagName('ul');
uls = utils.toArray(uls);
let data = null;
let minH = null;
let stop = null;
let imgs = box.getElementsByTagName('img');
ajax()
function ajax() {
    let xhr = new XMLHttpRequest();
    xhr.open('get','product.json',false);
    xhr.onreadystatechange = function () {
        if (xhr.readyState==4&&xhr.status==200){
            data = utils.toJSON(xhr.responseText)
            bindHtml(20)
        }
    }
    xhr.send();

}
console.log(data);

function bindHtml(n) {
    for (let i = 0; i <n ; i++) {
        uls.sort(function (a,b) {
            return a.offsetHeight-b.offsetHeight
        })
        let num = utils.getRandom(0,21)
        uls[0].innerHTML+=`
        <li>
            <div style="height: ${data[num].height}px">
                <img data-src="${data[num].img}" alt="">
                
            </div>
            <p>这是第${num+1}张图片</p>
        </li>`;
        minH = uls[0].offsetHeight
    }
}

let winH = utils.win('clientHeight');
window.onscroll = function () {
    let winT = utils.win('scrollTop');
    if (winT+winH>minH){
        stop++;
        if (stop>10){
            alert('没有了')
            window.onscroll = null;
            return
        }
        ajax()
    }
    lazy()
}
lazy()
function lazy() {
    for (let i = 0; i <imgs.length ; i++) {
        lazyImg(imgs[i]);
    }
}

function lazyImg(ele) {
    let imgT = utils.offset(ele).top;
    let imgH = ele.offsetHeight/2;
    let winT = utils.win('scrollTop');
    if (winT+winH>imgT+imgH){
        let newImg = new Image;
        let url = ele.getAttribute('data-src');
        newImg.src = url;
        newImg.onload = function () {
            ele.src = this.src;
            newImg = null;
            ele.load = true;
            ele.parentNode.style.background = 'none';
            fadeIn(ele)
        }
    }
}

function fadeIn(ele) {
    let opacity = utils.css(ele,'opacity');
    ele.timer = setInterval(()=>{
        opacity+=0.3;
        utils.css(ele,'opacity',opacity);
        if (opacity>=1){
            clearInterval(ele.timer);
            utils.css(ele,'opacity',1)
        }
    },17)
}