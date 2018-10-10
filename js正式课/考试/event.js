function on(ele,type,fn) {
    if (!ele['my'+type]){
        ele['my'+type] = [];
    }
    let a = ele['my'+type];
    for (let i = 0; i <a.length ; i++) {
        if (a[i]===fn){
            return
        }
    }
    ele.push(fn)
}

function fire(ele,e) {
    let a  = this['my'+type];
    if (a&&a.length>0){
        for (let i = 0; i <a.length ; i++) {
            if (typeof a[i] ==='function'){
                a[i].call(this,e)
            } else {
                a.splice(i,1);
                i--;
            }
        }
    }
}
function off(ele,type,fn) {
    let a = ele['my'+type];
    if (a&&a.length>0){
        for (let i = 0; i <a.length ; i++) {
            if (a[i]===fn){
                a[i] = null;
            }
        }
    }
}