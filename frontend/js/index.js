function getTop(e) {
    var offset = e.offsetTop;
    if (e.offsetParent != null) offset += getTop(e.offsetParent);
    return offset;
}

function getLeft(e) {
    var offset = e.offsetLeft;
    if (e.offsetParent != null) offset += getLeft(e.offsetParent);
    return offset;
}
window.onload = function () {

    var btns = document.querySelectorAll(".add-to-cart"); //所有的购物车按钮
    var ccount = document.getElementById("ccount"); //显示商品总数量的标签节点对象
    //约定好用名称为datas的cookie来存放购物车里的数据信息  datas里所存放的就是一个json字符串
    var listStr = cookieObj.get("datas");
    /*判断一下本地是否有一个购物车（datas），没有的话，创建一个空的购物车，有的话就直接拿来使用*/
    if (!listStr) { //没有购物车     datas  json
        cookieObj.set({
            name: "datas",
            value: "[]"
        });
        listStr = cookieObj.get("datas");
    }
    console.log(listStr);
    var listObj = JSON.parse(listStr); //数组
    console.log(listObj);
    /*循环遍历数组，获取每一个对象中的pCount值相加总和*/
    var totalCount = 0; //默认为0
    for (var i = 0, len = listObj.length; i < len; i++) {
        totalCount = listObj[i].pCount + totalCount;
    }
    ccount.innerHTML = totalCount;


    /*循环为每一个按钮添加点击事件*/
    for (var i = 0, len = btns.length; i < len; i++) {
        btns[i].onclick = addtocart;
    }



    var goodsList = this.document.querySelectorAll('.goods');
    for (let i = 0; i < goodsList.length; i++) {
        var add_button = goodsList[i].querySelector('.add-to-cart');
        add_button.addEventListener("click", function (ev) {
            var cart = document.querySelector('.shopping-cart');
            var imgToDrag = goodsList[i].querySelector("img");
            let imgClone = document.createElement("img");
            imgClone.src = "../image/wumingnvlang.jpg";
            imgClone.style.top = getTop(imgToDrag) + "px";
            imgClone.style.left = getLeft(imgToDrag) + "px";
            imgClone.className = "add-animate";
            document.querySelector('body').appendChild(imgClone);

            let destinationTop = getTop(cart);
            let destinationLeft = getLeft(cart);
            let deltaTop = (destinationTop - getTop(imgToDrag)) / 50;
            let deltaLeft = (destinationLeft - getLeft(imgToDrag)) / 50;
            let nowTop = getTop(imgToDrag);
            let nowLeft = getLeft(imgToDrag);
            let count = 0;

            let deltaWidth = (imgClone.width - 0.2 * imgClone.width) / 50;
            let deltaHeight = (imgClone.height - 0.2 * imgClone.height) / 50;
            let nowWidth = imgClone.width;
            let nowHeight = imgClone.height;

            let move = setInterval(function () {
                count++;
                nowTop += deltaTop;
                nowLeft += deltaLeft;

                nowWidth -= deltaWidth;
                nowHeight -= deltaHeight;

                imgClone.style.top = parseInt(nowTop) + 'px';
                imgClone.style.left = parseInt(nowLeft) + 'px';

                imgClone.style.width = parseInt(nowWidth) + 'px';
                imgClone.style.height = parseInt(nowHeight) + 'px';


                if (count === 50) {
                    clearInterval(move);
                    document.querySelector('body').removeChild(imgClone);
                }

            }, 10);
        });

    }
}

function addtocart() {
    var ccount = document.getElementById("ccount"); //显示商品总数量的标签节点对象
    //约定好用名称为datas的cookie来存放购物车里的数据信息  datas里所存放的就是一个json字符串
    var listStr = cookieObj.get("datas");
    /*判断一下本地是否有一个购物车（datas），没有的话，创建一个空的购物车，有的话就直接拿来使用*/
    if (!listStr) { //没有购物车     datas  json
        cookieObj.set({
            name: "datas",
            value: "[]"
        });
        listStr = cookieObj.get("datas");
    }
    console.log(listStr);
    var listObj = JSON.parse(listStr); //数组
    console.log(listObj);

    var dl = this.parentNode.parentNode.parentNode.parentNode;
    var pid = dl.getAttribute("pid"); //获取自定义属性
    var arrs1 = dl.firstElementChild.childNodes;
    var arrs2 = dl.firstElementChild.getElementsByClassName("info"); //获取所有子节点
    var info=arrs2[0].childNodes;
    console.log(info);
    if (checkObjByPid(pid)) {
        listObj = updateObjById(pid, 1)
    } else {
        var imgSrc = arrs1[1].src;
        var pName = info[1].innerHTML;
        var pDesc = info[3].innerHTML;
        var price = info[5].firstElementChild.firstElementChild.innerHTML;
        var obj = {
            pid: pid,
            pImg: imgSrc,
            pName: pName,
            pDesc: pDesc,
            price: price,
            pCount: 1
        };
        listObj.push(obj)
        listObj = updateData(listObj);
    }
    ccount.innerHTML = getTotalCount();
}