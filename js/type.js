function Typegame(){
	//属性
    this.createScene();
    // this.createLetter();
    this.num=3;
    this.letterObj={};
    this.play();
    this.scor=0;
    this.stage=1;
    this.life=5;
    
}
// width()  innerWidth()  outWidth()

Typegame.prototype={
	//方法
	createScene:function(){
		var that=this;
		$("<div class='scene'></div>").css({
			width:$(window).width(),
			height:$(window).height(),
			background:"url(img/2.jpg) no-repeat 0 -200px",
			backgroundSize:"cover"
		}).appendTo("body");
		$("<div class='scor'></div>").css({
			width:300,height:150,position:"absolute",right:50,top:100,
			fontSize:"20px",fontFamily:"微软雅黑",fontWeight:"blod"
		}).appendTo(".scene");
		$("<div class='bonus'>得分:0</div>").css({
			width:300,height:50,fontSize:"20px",
			fontFamily:"微软雅黑",fontWeight:"blod"
		}).appendTo(".scor");
		$("<div class='stage'>关卡:1</div>").css({
			width:300,height:50
		}).appendTo(".scor");
		$("<div class='life'>生命:5</div>").css({
			width:300,height:50
		}).appendTo(".scor")
		$("<div class='pass'>恭喜过关</div>").css({
			width:200,height:100,background:"pink",
			textAlign:"center",fontSize:"30px",
			position:"absolute",left:0,right:0,
			top:0,bottom:0,margin:"auto",display:"none"
		}).appendTo(".scene")
		$("<div>下一关</div>").css({
            width:80,height:40,textAlign:"center",margin:"5px auto",
            background:"rgba(0,0,0,0.3)",fontSize:"15px",
		}).appendTo(".pass").click(function(){
			$(".pass").fadeOut(300);
			that.stage++;
			$(".stage").html("关卡:"+that.stage);
			that.play();
			that.scor=0;
			$(".bonus").html("得分:"+that.scor);
		})

		$("<div class='fail'>游戏失败</div>").css({
			width:300,height:150,background:"pink",
			textAlign:"center",fontSize:"30px",
			position:"absolute",left:0,right:0,
			top:0,bottom:0,margin:"auto",borderRadius:"10px",display:"none"
		}).appendTo(".scene")
		$("<div>重新开始</div>").css({
            width:80,height:40,textAlign:"center",lineHeight:"40px",
            margin:"50px auto",background:"rgba(0,0,0,0.3)",fontSize:"15px",
		}).appendTo(".fail").click(function(){
			$(".fail").fadeOut(300);
			that.stage=1;
			$(".stage").html("关卡:"+that.stage);
			that.scor=0;
			$(".bonus").html("得分:"+that.scor);
			that.life=5;
			$(".life").html("生命:"+that.life);
			that.num=3;
			that.play();
		})
	},
	createLetter:function(){
		var that=this;
		//65  90
		do{
		var randomNum=Math.round(Math.random()*25+65);
		var randomLetter=String.fromCharCode(randomNum);
	    }while(this.letterObj[randomLetter])
        do{
		var randomLeft=Math.round(Math.random()*800)
	    }while(this.checkLeft[randomLeft])
		var randomTop=Math.round(Math.random()*200)
		var ele=$("<div>"+randomLetter+"</div>").css({
			width:50,height:50,color:"#fff",
			background:"url(img/images/image/"+randomLetter+".png) no-repeat",
			backgroundSize:"contain",
			fontSize:"30px",lineHeight:"50px",textAlign:"center",
			position:"fixed",left:randomLeft,top:-randomTop
		}).appendTo(".scene").animate({
			top:$(window).height()
		},8000,"linear",
		function(){
        that.life--;
        $(".life").html("生命："+that.life)
        that.createLetter()
        if(that.life==0){
        	$.each(that.letterObj,function(index,element){
                 element.el.remove().stop()
            })  
            that.letterObj={}; 
          $(".fail").fadeIn(300)
        }
     })
		this.letterObj[randomLetter]={startLeft:randomLeft-50,
			endLeft:randomLeft+50,el:ele};

	},
	play:function(){
		for (var i=0;i<this.num;i++) {
			this.createLetter();	
		}
		this.keydown();
	},
	checkLeft:function(newleft){
		var flag=false;
		// console.log(this.letterObj)
		//this.letterObj  {A:{starleft:,endleft:}}
       $.each(this.letterObj,function(key,value){
       	if(value.startLeft<newleft&&newleft<value.endLeft){
       		flag=true;
       		return;
       	}
       })
       return flag;
	},
	keydown:function(){
		var that=this;
       $(document).keydown(function(e){
       	var code=e.keyCode;
       	var letter=String.fromCharCode(code);
       	if(that.letterObj[letter]){
       		that.letterObj[letter].el.remove().stop();
       		delete that.letterObj[letter];
       		that.createLetter();
       		that.scor++;
       		$(".bonus").html("得分:"+that.scor)
       		//计算关卡
       		if(that.scor>=that.stage*10){
       			that.num++;
       			$.each(that.letterObj,function(index,element){
       				element.el.remove().stop()
       			})
       			that.letterObj={};   	
                $(".pass").fadeIn(500)
       		}
       	}
       })
	}
}