let $outer = $('#outer');
let $swiper = $('.swiper');
let $focus = $('.focus');
let $left = $('.left');
let $right = $('.right');
let step = 0;
let timer = null;
let data = null;

$.ajax({
    url:'data.json',
    method:'get',
    async:false,
    dataType:'json',
    success:function (n) {
        data = n;
        bindHtml()
    }
});
console.log(data);

function bindHtml() {
    var imgStr = ``,lisStr = ``;
    $.each(data,function (index,item) {
        imgStr += `<img data-src="${this.img}" alt="">`;
        lisStr += `<li class="${index===0?'selected':''}"></li>`
    })
    $swiper.html(imgStr);
    $focus.html(lisStr);
    lazyImg()
}
function lazyImg() {
    $('.swiper img').each(function (index) {
        let that = this;
        let newImg = new Image();
        let url = $(this).attr('data-src');
        newImg.src = url;
        $(newImg).load(function () {
            $(that).attr('src',this.src);
            newImg = null;
            index ===0?$(that).fadeIn(500):null;
        })
    })
}
timer = setInterval(autoMove,2000);
function autoMove() {
    step++;
    if (step>=data.length){
        step = 0;
    }
    $('.swiper img').eq(step).fadeIn(500).siblings().fadeOut();
    $('.focus li').eq(step).addClass('selected').siblings().removeClass('selected');
}
$('.outer').hover(function () {
    clearInterval(timer);
    $('#outer .left,#outer .right').fadeIn()
},function () {
    timer = setInterval(autoMove,2000);
    $('#outer .left,#outer .right').fadeOut()
})

$right.click(function () {
    autoMove()
})
$left.click(function () {
    step-=2;
    if (step<-1){
        step = data.length-2
    }
    autoMove()
});
$('.focus li').hover(function () {
    step = $(this).index()-1;
    autoMove()
})





































