$(document).ready(function(){

	var urld = location.search;
	urld = urld.split("=")[1];
	//第一次进入定位于监控新闻页面
	var htmlName = 'left-menu-12.html';
	//1: 引入左侧菜单栏。
	$(".left").load("../customdoc/menu/"+htmlName,{"i":Math.random()},function(data){
		//由左侧栏目录超连接跳转指定目录的新闻列表：
		 $("a[id^='l']").click(function(){
			 var b =$(this).attr("id");
			$(".right").load("../customdoc/newslist/"+b+".html");
		 });

		if(urld!=null && ''!=urld){
			$(".right").load("../customdoc/newsinfo/"+urld);
			return;
		}
		//2: 引入第一个新闻类别的新闻列表
		var $v = $("a[id^='l']:eq(0)");
		//引入初始化页面
		//如果是首页过来的超连接：?htmlurl=xxxxxx.html 仅支持单参数
		var newslistid = $v.attr('id');
		$(".right").load("../customdoc/newslist/"+newslistid+".html");

	});
});


function getHtmlName(){
	 var a = location.href;
	 var b = a.split("/");
	 var c = b.slice(b.length-1, b.length).toString(String).split(".");
	 return c.slice(0, 1);
}