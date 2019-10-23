$(function(){
//    显示游戏规
$(".rules").click(function(){
// $(".rule").css({"display":"block"});
$(".rule").fadeIn();
stoptWolfAnimation();

});
$("#colse").click(function(){
    $(".rule").fadeOut();
    startWolfAnimation();
    });
    

    // 开始游戏
    $(".begin>button").click(function(){
        $(".begin").fadeOut(500);
        star();
        startWolfAnimation();
        $("h1").text(0);
    });
    // 重新开始
    $(".over>button").click(function(){
        $(".pro").css("width","180px");
        $(".over").fadeOut(500);
        star();
        startWolfAnimation();
        $("h1").text(0);
    });

// 开始
function startWolfAnimation(){
    var wolf_1=['./images/h0.png','./images/h1.png','./images/h2.png','./images/h3.png','./images/h4.png','./images/h5.png','./images/h6.png','./images/h7.png','./images/h8.png','./images/h9.png'];
        var wolf_2=['./images/x0.png','./images/x1.png','./images/x2.png','./images/x3.png','./images/x4.png','./images/x5.png','./images/x6.png','./images/x7.png','./images/x8.png','./images/x9.png'];
        // 2.定义一个数组保存所有可能出现的位置
        var arrPos = [
            {left:"100px",top:"115px"},
            {left:"20px",top:"160px"},
            {left:"190px",top:"142px"},
            {left:"105px",top:"193px"},
            {left:"19px",top:"221px"},
            {left:"202px",top:"212px"},
            {left:"120px",top:"275px"},
            {left:"30px",top:"295px"},
            {left:"209px",top:"297px"}
        ];

       
        var $img=$("<img src=''>");
        // // 出现位置
        var posIndex=Math.round(Math.random()*8);        
        $img.css({
            position: "absolute",
            left:arrPos[posIndex].left,
            top:arrPos[posIndex].top
        });

        // // 出现角色
        var bb=Math.round(Math.random());
        var aa=bb? wolf_1:wolf_2;
        window. a=0;
        window. b=5;
        timer2=setInterval(function(){            
            $img.attr("src",aa[a]); 
            
            if(a>b){
                a=0;
                $img.remove();
                clearInterval(timer2);
                startWolfAnimation();
            }
            a++;
        }, 300);
        $(".content").append($img);
        gameRules($img);
}

// 结束
function stoptWolfAnimation(){
    $("img").remove(); 
clearInterval(timer2);
}

function gameRules(img){
    img.one("click",function(){
        a=6;
        b=9;
        var z=img.attr("src");
        z=z.indexOf("h")>=0;
        if(z){
            $("h1").text(parseInt($("h1").text())+10);
        }else{
            $("h1").text(parseInt($("h1").text())-10);
        }
        
        console.log($("h1").text());
    });
    
    
}



// 进度条器
var timer=null;
var timer2=null;
function star(){
    clearInterval(timer);
    timer=setInterval(function(){
        $(".pro").css("width","-=1");
        if($(".pro").width()<=0){
            $(".over").css("display","block");
            stoptWolfAnimation();
            
        }
        // console.log($(".pro").width()-1);
    }, 200);
}


})