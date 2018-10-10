//系统事件的绑定  => 订阅发布模式
//什么叫事件？ 简单来说这么一件事
//当这件事情发生时，做什么事情(绑定的行为)
//事件类型  click mousedown mouseup mousemove
//自定义事件  (事件类型是自己随便起的)
//on  把事件计划好   订阅
//fire 把计划好的事情执行   发布
//off  把计划好的事情去掉   取消订阅


//自定义事件库
function on(ele, type, fn) {
    //事件池，把它作为ele的属性
    if (!ele['my' + type]) {
        ele['my' + type] = [];
    }
    let a = ele['my' + type];
    for (let i = 0; i <a.length ; i++) {
        if (a[i] === fn){
            return
        }
    }
    a.push(fn);
}


function fire(type,e) {  //把绑定的行为都执行
    let a = this['my' + type];
    if (a && a.length > 0) {
        for (let i = 0; i < a.length; i++) {
            if (typeof a[i] === 'function') {
                a[i].call(this,e);  //把绑定的方法执行，同时把行为中的this改成绑定的元素
            }else {
                a.splice(i,1);
                i--;
            }
        }
    }

}
function off(ele, type, fn) {//把fn这个行为从事件池中移除
    let a = ele['my' + type];
    if (a && a.length > 0) {
        for (let i = 0; i < a.length; i++) {
            if (a[i] === fn) {
                a[i] = null   //[null,fn,fn]
            }
        }
    }
}