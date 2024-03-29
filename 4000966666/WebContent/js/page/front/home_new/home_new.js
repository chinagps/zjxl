/**
 * @description: 门户首页2 JS文件,依赖于jQuery
 * @author: shen_chengjie
 * @email: 15576810155@163.com
 * @time: 2013-02-21
 */
//保证数据有效性
function getValid(data){
	if(data){
		if(typeof data == 'string'){
			var d = $.trim(data.toLowerCase());
			if(d!='null' && d!='undefined'){
				return data;
			}
		}else{
			return data;
		}
	}
	return "";
};
var HomeManager = function(){
	this.queryPromotionUrl = root + "/portalJson/front/getPromotionsForHome.action"; // 查询优惠信息URL
	this.queryDynamicUrl = root + "/portal/front/queryCtAdvisoryList.action"; // 查询中交动态URL
	this.queryUnionMerUrl = root + "/portalJson/front/queryUnionMers.action"; // 查询联盟商家URL
};
HomeManager.prototype = {
	/** 初始化相关操作 */
	init : function(){
		// 快速充值
		$(".quickRecharge").click(function(){
			window.open(root + '/portal/portalCard/jumpRapidRecharge.action');
		});
		// 图片轮播初始化
		if($("#focus001").size()>0){
			$.focus("#focus001");
		}
		this.queryDynamics();
		this.queryVeryHotInfo();
		this.queryHotInfo();
	},
	/** 查询中交动态 */
	queryDynamics : function(){
		var that = this;
		$("#dynamicUL").html('<div style="padding:10px 10px;"><img src="'+root+'/images/loading2.gif" alt="加载中交动态"/></div>');
		$.ajax({
			url:that.queryDynamicUrl,
			data:{"requestParam.equal.type":"2001",
				  "requestParam.equal.auditStatus":"0",
				  "requestParam.page" : '1',
				  "requestParam.rows" : '8'
				  },
			type:"post",
			dataType:"json",
			error:function(){
				$("#dynamicUL").html('<li><a href="javascript:void(0)">加载中交动态信息失败！</a></li>');
			},
			success:function(data){
				var content = '';
				if(data && data.records && data.records.length>0){
					$(data.records).each(function(i,n){
						// 只显示8条数据
						if(i<8){
							var title = getValid(n.title); // 标题
							var url = root + "/news.html?id=" + n.id;
							if(title && title.length > 20){ title = title.substring(0,20) + '...';}
							content += '<li><img src="' +root + '/images/home_new/icon04.png" />'
								+'<a target="_blank" href="'+ url + '" >'+ title +'</a></li>';
						}
					});
				}else{
					content = '<li><a href="javascript:void(0)">暂无相关中交动态信息！</a></li>';
				}
				$("#dynamicUL").html(content);
			}
		});
	},
	/** 查询超热点推荐新闻 */
	queryVeryHotInfo : function(){
		var that = this;
		$("#hot_mess_big").html('<div style="padding:10px 10px;"><img src="'+root+'/images/loading2.gif" alt="加载热点推荐新闻"/></div>');
		$.ajax({
			url:that.queryDynamicUrl,
			data:{"requestParam.equal.type":"6011",
				"requestParam.equal.auditStatus":"0",
				"requestParam.page" : '1',
				"requestParam.rows" : '2'
				},
			type:"post",
			dataType:"json",
			error:function(){
				$("#hot_mess_big").html('<li><a href="javascript:void(0)">加载热点推荐新闻失败！</a></li>');
			},
			success:function(data){
				var content = '';
				if(data && data.records && data.records.length>0){
					$(data.records).each(function(i,n){
						// 只显示2条数据
						if(i<2){
							var title = getValid(n.title); // 标题
							if(title && title.length > 20){ title = title.substring(0,20) + '...';}
							var contentDesc = getValid(n.contentDesc); // 资讯简介
							var url = root + "/news.html?id=" + n.id;
							if(contentDesc && contentDesc.length > 96){ contentDesc = contentDesc.substring(0,96) + '...';}
							content += '<div class="chehoufuwu"><div class="chfw">'
							+ '<a href="' + url + '" >'
							+ '<img class="chehoufuwu_bigImage" src= ' + getValid(n.imgUrl)
							+ ' /></a> </div> <div class="chfwFont"> <ul> <br/><li><h2>'
							+ title + '</h2> </li> <li><a href=" ' 
							+ url + '">'
							+ contentDesc 
							+' </a> </li> <li><p> <a href="'
							+ url + '">>>详细内容</a></p></li> </ul> </div> </div>';
						}
					});
				}else{
					content = '<li><a href="javascript:void(0)">暂无相关热点推荐新闻信息！</a></li>';
				}
				$("#hot_mess_big").html(content);
			}
		});
	},
	/** 查询热点推荐新闻 */
	queryHotInfo : function(){
		var that = this;
		$("#hot_mess_small").html('<div style="padding:10px 10px;"><img src="'+root+'/images/loading2.gif" alt="加载热点推荐新闻"/></div>');
		$.ajax({
			url:that.queryDynamicUrl,
			data:{"requestParam.equal.type":"6012",
				"requestParam.equal.auditStatus":"0",
				"requestParam.page" : '1',
				"requestParam.rows" : '3'
				},
			type:"post",
			dataType:"json",
			error:function(){
				$("#hot_mess_small").html('<li><a href="javascript:void(0)">加载热点推荐新闻失败！</a></li>');
			},
			success:function(data){
				var content = '';
				if(data && data.records && data.records.length>0){
					$(data.records).each(function(i,n){
						// 只显示3条数据
						if(i<3){
							var title = getValid(n.title); // 标题
							if(title && title.length > 20){ title = title.substring(0,20) + '...';}
							var contentDesc = getValid(n.contentDesc); // 简介
							var url = root + "/news.html?id=" + n.id;
							if(contentDesc && contentDesc.length > 76){ contentDesc = contentDesc.substring(0,76) + '...';}
							content += '<div class="chrBottom"><div class="chrImg">'
							+ '<a href="' + url + '" >'
							+ '<img class="chehoufuwu_smallImage" src= ' + getValid(n.imgUrl)
							+ ' /> </a></div> <div class="chrFont"> <ul> <li><h2>'
							+ title + '</h2> </li> <li><a href=" ' 
							+ url + '">'
							+ contentDesc 
							+' </a> </li></ul> </div> </div>';
						}
					});
				}else{
					content = '<li><a href="javascript:void(0)">暂无相关热点推荐新闻信息！</a></li>';
				}
				$("#hot_mess_small").html(content);
			}
		});
	}
};
 
$(function() {
	var homeManager = new HomeManager();
	window.homeManager = homeManager;
	homeManager.init();
});