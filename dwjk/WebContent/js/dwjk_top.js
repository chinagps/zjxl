/**
 * 初始化 dwjk/index.html
 */
$(document).ready(function(){
	//更新最新动态：
	//获得dwjk_p_index.html

	if($("#dwywContent") != null){
		$("#dwywContent").load("../customdoc/dwjk_p_news.html",{"i":Math.random()},function(data){
			$("a[id^='i']").each(function(i){
				var line = $(this).html();
				var l_length = line.length;
				if(l_length >= 22) line = line.substr(0,22)+"...";
				$(this).html(line);
			});
		});
	}
});