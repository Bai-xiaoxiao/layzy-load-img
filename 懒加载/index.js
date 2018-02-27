var lazyLoad = (function(){
	var clock;
	
	function init(){
		$(window).on("scroll", function(){
			if (clock) {
				clearTimeout(clock);
			}
			clock = setTimeout(function(){
				checkShow();
			}, 200);
		})
		checkShow();
	}
	
	function checkShow(){
		$(".lazyload img").each(function(){
			var $cur =$(this);
			if($cur.attr('isLoaded')){
        		return;
      		}
			if(shouldShow($cur)){
				showImg($cur);
			}
		})
	}
	//判断图片是否在视图中
	function shouldShow($node){
		//滚动条到顶部的距离
		var scrollH = $(window).scrollTop(),
		//浏览器视图高度
			winH = $(window).height(),
			//当前元素距离顶部的高度
			top = $node.offset().top;
		console.log(winH,scrollH,top);
		if(top < winH + scrollH){
	  		return true;
	  	}else{
	  		return false;
	  	}
	}
	//切换图片的src
	function showImg($node){
    	$node.attr('src', $node.attr('data-img'));
    	//修改之后加上标注，防止再次加载
    	$node.attr('isLoaded', true);
	}

	return {
		init: init
	}
})()


lazyLoad.init();