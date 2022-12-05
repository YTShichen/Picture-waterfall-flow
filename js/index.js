// ## 初始化
// 图片数据
urls = [
    "./img/0.jpg",
    "./img/1.jpg",
    "./img/2.jpg",
    "./img/3.jpg",
    "./img/4.jpg",
    "./img/5.jpg",
    "./img/6.jpg",
    "./img/7.jpg",
    "./img/8.jpg",
    "./img/9.jpg",
    "./img/10.jpg",
    "./img/11.jpg",
    "./img/12.jpg",
    "./img/13.jpg",
    "./img/14.jpg",
    "./img/15.jpg",
    "./img/16.jpg",
    "./img/17.jpg",
    "./img/18.jpg",
    "./img/19.jpg",
    "./img/20.jpg",
    "./img/21.jpg",
    "./img/22.jpg",
    "./img/23.jpg",
    "./img/24.jpg",
    "./img/25.jpg",
    "./img/26.jpg",
    "./img/27.jpg",
    "./img/28.jpg",
    "./img/29.jpg",
    "./img/30.jpg",
    "./img/31.jpg",
    "./img/32.jpg",
    "./img/33.jpg",
    "./img/34.jpg",
    "./img/35.jpg",
    "./img/36.jpg",
    "./img/37.jpg",
    "./img/38.jpg",
    "./img/39.jpg",
    "./img/40.jpg",
]

//封装document.querySelector();
function $(selector) {
    return document.querySelector(selector);
}

// 1. 获取容器
var positionBox = $(".position-box");

// 初始函数
var init = function () {
    //创建li加入图片
    function _createDiv(i) {
        var div = document.createElement("div");
        div.innerHTML = "<img src=" + i + " alt=''>";
        positionBox.appendChild(div);
    }
    //循环所有图片
    for (var i = 0; i < urls.length; i++) {
        //放入图片
        _createDiv(urls[i]);
    }

    /* console.log($(".position-box > div").offsetWidth); => 0;
    div获取不到宽度是因为图片没有加载完成，并且div有positionabsolut，所以宽度只能是0。
    注释掉div元素的position:absolute后，因为是常规流，块盒默认宽度是100%， 所以获取到了。 img元素宽度还是没加载出来所以获取到img 还是0 
    */

    
}
init();

// 2. 图片加载完成后
window.addEventListener("load", calculation);
//图片加载完成后
function calculation(){
    //获取图片宽度
    var imgW = $(".position-box > div > img").clientWidth
    // 没有间隙的列数 = 宽度 / 图片宽度
    var cols = Math.floor(positionBox.clientWidth / imgW);
    // 剩下的间隙 = 宽度 - 图片宽度 * 没有间隙的列数
    var gaps = positionBox.clientWidth - imgW * cols;
    // 每个间隙的宽度 = 剩下间隙宽度 / (列数 - 1);
    var gap = gaps / (cols - 1);
    //获取子元素
    var divLen = positionBox.children;
    //空数组
    var rowsArr = new Array(cols);
    rowsArr.fill(0);
    //计数器变量
    var count = 0;
    //高度最小下标
    var newCount = 0;
    //总高度
    var height = 0;
    //位置
    var left,top;
    // 3. 创建一个数组，循环列数， 往数组里存现在每个列的高度。
    for(let i = 0; i < urls.length; i++){
        //比较列的最小高度
        for(var j = 0; j < cols; j++){
            if(rowsArr[j] < rowsArr[newCount]){
                newCount = j;
            }
        }

        //计算left
        left = newCount * imgW + newCount * gap;
        //计算top
        top = rowsArr[newCount];
        //设置位置
        divLen[i].style.top = top + "px";
        divLen[i].style.left = left + "px";

        //更新添加的数组列
        rowsArr[newCount] += divLen[i].offsetHeight + gap - 1;

        //总高度
        //比较列的最大高度
        var max = rowsArr[0];
        for(var k = 0; k < cols; k++){
            if(rowsArr[k] > max){
                max = rowsArr[k];
            }
        }
        height = max;
        //设置高度
        positionBox.style.height = height + "px";
        
        //debugger;

        //计数器
        if(count === cols - 1){
            count = 0;
        }else{
            count++;
        }
    }
}

//防抖
var timeId = null;
window.onresize = function(){
    if(timeId){
        clearTimeout(timeId);
    }
    timeId = setTimeout(function(){
        calculation();
    }, 500)
}


// 3. 创建一个数组，循环列数， 往数组里存现在每个列的高度。
// 4. 放入第一张图片，然后更新数组的值。
// 5. 第一行放完图片后，查找数组的最小值，图片放到最小值里。
// 6. 这一行新的高度 = 这一列的高度 + 间隙 + 新的图片高度。
// 7. left = i * (图片宽度 + 间隙);