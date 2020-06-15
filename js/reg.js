// 封装一个正则验证
function regular(reg,val){
    var bool=reg.test(val);
    return bool;
}
function arr(t,n){
    t.title=t.arr[n];
}
function arr1(t,n){
    t.title=t.arr1[n];
}
// vue
var vm=new Vue({
    el:"#app",
    data:{
        arr:["用户名不能为空","密码不能为空","确认密码不能为空","姓名不能为空","邮箱不能为空","手机不能为空","注册成功,三秒后自动为你跳转到首页"],
        arr1:["用户名6~10位","密码6~12为","密码不一致","邮箱格式错误","手机输入错误"],
        title:"",
        yz:"",
        spanimg1:"",
        spanimg2:"",
        spanimg3:"",
        spanimg4:"",
        spanimg5:"",
    },
    methods:{
        btns(){
            $("div.alert").addClass("lin");
            if($("#inp input")[0].value==""){
                arr(this,0);
                return;
            }else if($("#inp input")[1].value==""){
                arr(this,1);
                return;
            }else if($("#inp input")[2].value==""){
                arr(this,2);
                return;
            }else if($("#inp input")[3].value==""){
                arr(this,3);
                return;
            }else if($("#inp input")[4].value==""){
                arr(this,4);
                return;
            }else if($("#inp input")[5].value==""){
                arr(this,5);
                return;
            }else if(!regular((/^[a-z0-9]{6,10}$/),$("#inp input")[0].value)){
                arr1(this,0);
                this.spanimg1="";
                return;
            }else if(!regular((/^[a-z0-9]{6,12}$/),$("#inp input")[1].value)){
                arr1(this,1);
                this.spanimg2="";
                return;
            }else if($("#inp input")[1].value!=$("#inp input")[2].value){
                arr1(this,2);
                this.spanimg3="";
                return;
            }else if(!regular(/^[0-9a-zA-Z]+@[a-zA-Z0-9-]+(.[a-zA-Z0-9-]+)*.[A-Za-z0-9]{2,6}$/,$("#inp input")[4].value)){
                arr1(this,3);
                this.spanimg5="";
                return;
            }else if(!regular((/^1[3-9]\d{9}$/),$("#inp input")[5].value)){
                arr1(this,4);
                this.yz="";
                return;
            }else{
                $("div.alert").addClass("bg");
                arr(this,6);
                this.spanimg1="";
                this.spanimg2="";
                this.spanimg3="";
                this.spanimg4="";
                this.spanimg5="";
                this.yz="";
                setTimeout(() => {
                    window.location.href="index.html";
                }, 3000);
                return;
            }
        },
        spanx(){
            $("div.fade").removeClass("lin");
        },
        espan(e){
            var ip=document.getElementById("inp");
            if(e.target.nodeName=="IMG"){
                if(e.target==ip.getElementsByTagName("img")[0]){
                    this.spanimg1="";
                }else if(e.target==ip.getElementsByTagName("img")[1]){
                    this.spanimg2="";
                }else if(e.target==ip.getElementsByTagName("img")[2]){
                    this.spanimg3="";
                }else if(e.target==ip.getElementsByTagName("img")[3]){
                    this.spanimg4="";
                }else if(e.target==ip.getElementsByTagName("img")[4]){
                    this.spanimg5="";
                }
            }
        }
    },
    watch:{
        yz(){
            this.yz=this.yz.replace(/[A-Za-z]/ig,"");
        },
        spanimg1(){
            var img=document.getElementsByTagName("img")[0]
            if(this.spanimg1.length>0){
               img.className="";
            }else{
                img.className="nones"
            }
        },
        spanimg2(){
            var img=document.getElementsByTagName("img")[1]
            if(this.spanimg2.length>0){
               img.className="";
            }else{
                img.className="nones"
            }
        },
        spanimg3(){
            var img=document.getElementsByTagName("img")[2]
            if(this.spanimg3.length>0){
                img.className="";
            }else{
                img.className="nones"
            }
        },
        spanimg4(){
            var img=document.getElementsByTagName("img")[3]
            if(this.spanimg4.length>0){
               img.className="";
            }else{
                img.className="nones"
            }
        },
        spanimg5(){
            var img=document.getElementsByTagName("img")[4]
            if(this.spanimg5.length>0){
               img.className="";
            }else{
                img.className="nones"
            }
        }
    }
})