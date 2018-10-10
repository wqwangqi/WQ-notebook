//1.获取元素
var header = document.getElementById('header');
var buttons = header.getElementsByTagName('a');
var shopList = document.getElementById('shopList');
var data = null;

//2.请求数据
var xhr = new XMLHttpRequest();
xhr.open('get','data/product.json',false);
xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200){
        data = JSON.parse(xhr.responseText)
    }
};
xhr.send();
console.log(data);

//3.将数据绑定到页面当中
function bindHtml() {
    var str = ``;
    data.forEach(function (item,index) {
        str += ` <li>
            <img src="${item.img}" alt="">
            <p>${item.title}</p>
            <p class="hot">热度 ${item.hot}</p>
            <del>￥9999</del>
            <span>￥${item.price}</span>
            <p class="time">上架时间:${item.time}</p>
        </li>`
    });
    shopList.innerHTML = str;
}
bindHtml();

//4.给每一个按钮添加点击事件实现排序
for (var i = 0; i < buttons.length ; i++) {
    buttons[i].index = -1;  //1 -1  1
    buttons[i].onclick = function () {
        this.index *= -1;
        var value = this.getAttribute('attrName');
        productSort.call(this,value);
        changeArrow.call(this);
    }
}
function productSort(value) {
   /* if (value === 'hot'){
        data.sort(function (a,b) {
            return a.hot - b.hot
        })
    }else  if (value === 'price') {
        data.sort(function (a, b) {
            return a.price - b.price
        })
    } else  if (value === 'time') {
        data.sort(function (a, b) {
            return new Date(a.time) - new Date(b.time)
        })
    }    */
   var _this = this
    if (value === 'time') {
        //如果点击的是时间的话，我们需要将时间转换成毫秒数来进行相减
        data.sort(function (a, b) {
            return (new Date(a.time) - new Date(b.time))*_this.index
         })
    }else {
        //如果不是时间直接相减
        data.sort(function (a,b) {
            //我们可以在对象后面加一个[变量]
            return (a[value] - b[value])*_this.index
        })
    }
    bindHtml(data)
}

//5.点击的时候让箭头显示
function changeArrow() {
    this.index //1 升序  -1 降序
    var down = this.children[1];
    var up = this.children[0]
    if (this.index < 0) {
        //down.className = 'bg down';
        down.classList.add('bg')
        up.classList.remove('bg')
    }else {
        down.classList.remove('bg')
        up.classList.add('bg')
    }
}












