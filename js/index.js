//用jQuery实现指定删除class和指定添加class
$(function(){
    $(".programme-v").mouseover(function(){
        $(".programme-v").removeClass("mouse");
        $(this).addClass("mouse");
    })
})
//创建VUE
var vm=new Vue({
    el:"#app",
    data:{
      i:0,
      n:1,
      d:0,
      mright:{
        mright:false
      }
    },
    methods:{
        mouse(e){
          var n=parseInt(e.target.getAttribute("data-i"))
          if(n){
              this.n=n;
          }
        },
        shiyan(){
            this.mright.mright=true;
        },
        shiyan1(){
            this.mright.mright=false;
        }
    }
})
var i=vm.i;//通过vue里面的i来动态控制轮播图里面的内容显示或隐藏 现在是0
var LIWIDTH=2000;//每个li的国定宽度
var DURATION=500;//每次轮播动画持续的时间
var LICOUNT=2;//li的总个数
//要移动的ul
var ulImgs=document.getElementById("ul-imgs");
//包含小圆点列表的ul
var ulIdxs=document.getElementById("ul-idxs");
//小圆点的元素列表
var lis=ulIdxs.children;
//从当前位置移动到任意一个范围内的位置
function moveTo(to){
    //如果用户没点击第几张图的时候，默认到第二张
    if(to==undefined){
        to=i+1;
    }
    if(i==0){//如果滚动从头开始，再重新加上transition
        if(to>i){//如果要看当前位置右边的图片，是不会出问题的
            ulImgs.className="transition";
        }else{//只有i=0在开头，且还要看左边的图片时，才会出问题
            //为了避免用户再次看到偷梁换柱的效果，先把transition，class去掉
            ulImgs.className="";
            //将ulImgs拉取到最左侧
            ulImgs.style.marginLeft=-LIWIDTH*LICOUNT-200+"px";
            //定时器是为了将偷梁换柱操作和加回transition属性的操作强行隔离开
            setTimeout(function(){
                moveTo(LICOUNT-1);
            },100);
            return;
        }
    }
    i=to;//先将标示第几张图片的变量i变为目标位置
    //再用i计算ulimgs的marginLeft距离
    ulImgs.style.marginLeft=-i*LIWIDTH-200+"px";
    for(var li of lis){
        //先删除所有小圆点的class
        li.className=""
    }
    if(i==LICOUNT){
        i=0;
        //当transition动画播放完之后，才
        setTimeout(function(){
            ulImgs.className="";//清除transition属性
            ulImgs.style.marginLeft=0;//将ulImgs拉回0位置
        },DURATION)
    }
    lis[i].className="active";
    vm.i=i;
}

//找到左边的小按钮
var btnLeft=document.getElementById("btn-left");
//找到右边的小按钮
var btnRight=document.getElementById("btn-right");
//用开关，控制，上一次动画没有播放完，下次动画不能开始！
var canClick=true;
btnRight.onclick=function(){
    //调用两个按钮共用的移动方法，参数1表示移动到i+1的位置，相当于左移一个
    move(1)
}
//两个按钮共用的移动函数，n传入1时，移动到i+1位置，左移。n传入-1时，移动到i-1位置，右移
function move(n){
    if(canClick){//只有可以单击是
        moveTo(i+n);//才调用真正移动ul的方法
        canClick=false;//马上把开关关上，禁止再次点击
        //只有本次transition动画播放完，才能自动打开开关，点击按钮才有反应
        setTimeout(function(){
            canClick=true;
        },DURATION+100)
    }
}
btnLeft.onclick=function(){
    move(-1);//往右边移动一个
}

//自动播放轮播图
var interval=3000;//每隔三秒播放
var timer=setInterval(function(){
    moveTo()
},interval);
var banner=document.getElementById("banner");
banner.onmouseover=function(){//鼠标悬停就停止定时器，鼠标移进事件
    clearInterval(timer);
}
banner.onmouseout=function(){//鼠标移出悬停就执行定时器，鼠标移出事件
    timer=setInterval(function(){
        moveTo()
    },interval);
}

//小圆点
var canClick=true;
ulIdxs.onclick=function(e){
    if(canClick){
        var li=e.target;
        if(li.nodeName=="LI"){
            if(li.className!=="active"){
                for(var i=0;i<lis.length;i++){
                    if(lis[i]==li){
                        break;
                    }
                }
                moveTo(i);
                setTimeout(function(){
                    canClick=true;
                },DURATION);
            }
        }
    }
}
window.onload=function(){
    setTimeout(() => {
        $("#n").addClass("nav-hover");
    }, 100);
}