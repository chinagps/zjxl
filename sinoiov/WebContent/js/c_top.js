var topNewsClassID = null;
var topURL = null;
$(document).ready(function(){
	//初始化首页新闻列表：
	if($(".cdContent") != null){
		$(".cdContent").load("customdoc/p_news.html");
	}
	//绑定事件
	$("a[id^='i']").click(function(){
		var info = $(this).attr("id");
		//$.post("xinwendongtai.html",{"htmlurl":info});
		if(info == ''){
			return;
		}
		var hr = "news.html";
		hr = getHtmlName(info.split("_")[1] );
		location.href=hr+"?htmlurl="+info;
	});

	$.post("vcback/domainInfo?m=getPics",{},function(data){
		var pics = "";
		var newsUrl = "";
		if(data != null ){
			for(var i=0 ;i<data.length;i++){
				var hr = data[i].pictureNewsUrl;
				var r_html = "";
				r_html = getTopHtml(hr.split("_")[1]);
				if(i==0){
					newsUrl = r_html+"?htmlurl="+trim(data[i].pictureNewsUrl);
					pics = data[i].pictureUrl.substring(3);
				}else{
					newsUrl = newsUrl +"|"+ r_html+"?htmlurl="+trim(data[i].pictureNewsUrl);
					pics = pics +"|"+ data[i].pictureUrl.substring(3);
				}
			}
		}else{
			pics = "images/pic1.jpg|images/pic2.jpg|images/pic3.jpg";
		}
		$(".video").html("<EMBED height=255 type=application/x-shockwave-flash pluginspage=http://www.macromedia.com/go/getflashplayer/ width=330 src=images/focus.swf wmode=\"opaque\" FlashVars=\"pics="+pics+"&amp;links="+newsUrl+"&amp;texts=1|2|3|4|5&amp;pic_width=330&amp;pic_height=255&amp;show_text=1&amp;button_pos=1&amp;stop_time=5000\" quality=\"high\" allowScriptAccess=\"sameDomain\" />");
	},'json');

});

function getTopHtml(variter){
	var hr = "news.html";
	if(variter == '1'){
		hr = "news.html";
	}
	if(variter == '5'){
		hr ="media.html";
	}
	return hr;
}
/**
 * 获得js所在文件页面
 * @returns
 */
function pageName(){
    var a = location.href;
    var b = a.split("/");
    var c = b.slice(b.length-1, b.length).toString(String).split(".");
    return c.slice(0, 1);
}

/**
 * 去掉空格
 * @param str
 * @returns
 */
function trim(str){
    str = str.replace(/^(\s|\u00A0)+/,'');
    for(var i=str.length-1; i>=0; i--){
        if(/\S/.test(str.charAt(i))){
            str = str.substring(0, i+1);
            break;
        }
    }
    return str;
}