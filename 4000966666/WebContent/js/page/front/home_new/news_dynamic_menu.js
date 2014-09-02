$(function(){
	// 获取公司动态
	$("#newsDynamicItem").html("公司动态");
	$("#contentTitle").html("公司动态");
	if(id != "null") {
		showPageNewsItemInfo(id);
	}else{
		queryInfos('2001', 'newsDynamicContent', '1', '#dynamicsForm');
	}
	//重写topage方法,方法在common_fenye.js里面被使用到
	window.topage = function(pageNo,formObj){
		var type = $('#'+formObj).attr("name");
		if(type){
			if(type=='2001'){
				queryInfos(type, 'newsDynamicContent', pageNo,'#dynamicsForm');
			}else if(type=='2011'){
				queryInfos(type, 'newsDynamicContent', pageNo, '#newsForm');
			}
		}
	};
});
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

function pasMenuClick(_name){
	// 加载数据
	if(_name == '2001'){
		//获取公司动态
		$("#newsDynamicItem").html("公司动态");
		$("#contentTitle").html("公司动态");
		queryInfos(_name, 'newsDynamicContent', '1', '#dynamicsForm');
	}else if(_name == '2011'){
		//获取行业新闻
		$("#newsDynamicItem").html("行业新闻");
		$("#contentTitle").html("行业新闻");
		queryInfos('2011', 'newsDynamicContent', '1', '#newsForm');
	}
};

//查询新闻动态和行业新闻列表
function queryInfos(type, eleId, pageNo,formObj){
	pageNo = pageNo || 1;
	var pageSize = $('#pageSize').val() || 10;
	var that = this;
	$("#"+eleId).html('<div style="text-align: center;padding:10px 10px;"><img src="'+root+'/images/loading2.gif" alt="加载资讯信息"/></div>');
	$.ajax({
		url:root + "/portal/front/queryCtAdvisoryList.action",
		data:{"requestParam.equal.type":type,
			  "requestParam.equal.auditStatus":"0",
			  "pageNo":pageNo,
			  "pageSize":pageSize},
		type:"post",
		dataType:"json" || "html",
		error:function(){
			$("#"+eleId).html("抱歉，加载数据失败！");
		},
		success:function(pageView){
			var content = '';
			if(pageView && pageView.records && pageView.records.length>0){
				content += '<ul>';
				$(pageView.records).each(function(i,n){
					var title = getValid(n.title);
					if(title && title.length>50){ title = title.substring(0,50)+"...";}
					content += '<li><span class="icon"><img src="../../images/home_new/icon05.png" /></span><a href="#0" onclick="javascript:showPageNewsItemInfo(\''+n.id+'\')">'+title+'</a></li>';
				});
				content += '</ul>';
				content += '<div style="border:none;height:40px;line-height:40px;">';
				content += generatPortalPages(pageView,formObj); // 分页信息
				content += '</div>';
			}else{
				content = '<div style="text-align: center;padding:10px 10px;">抱歉，暂无相关新闻动态信息！</div>';
			}
			$("#"+eleId).html(content);
		}
	});
}

//根据资讯id查询资讯信息
function showPageNewsItemInfo(id){
	$.ajax({
		url:root + "/portal/front/getAdvisoryByAjax.action",
		data:{
			"requestParam.equal.id":id
		},
		type:"post",
		dataType:"json",
		error:function(){
			$("#newsDynamicContent").html('<li><a href="javascript:void(0)">加载新闻动态信息失败！</a></li>');
		},
		success:function(data){
			if(data){
				$("#contentTitle").html(data.title);
				$("#newsDynamicContent").html(data.contentUrl);
			}
			else
				$("#newsDynamicContent").html('<li><a href="javascript:void(0)">暂无相关新闻动态信息！</a></li>');
		}
	});
}