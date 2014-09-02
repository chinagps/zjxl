$(function(){
	setBannerImg();
	//根据传来的资讯类别的code值获取对应的name
	getMessageNameBycode(type);
	//根据资讯类别查询资讯的列表信息
	queryMenuCommonList(type);
});
//设置banner区域图片
function setBannerImg(){
	var src;
//	var imgCode = "5";
	if(imageExist != "exist"){
		if(type =="6003"){
//		imgCode = "5";
			src= root+"/images/home_new/banner/banner1.jpg";
		}else if(type =="9001"){
//		imgCode = "6";
			src= root+"/images/home_new/banner/banner2.jpg";
		}else if(type =="3101"){
//		imgCode = "7";
			src= root+"/images/home_new/banner/banner3.jpg";
		}else if(type =="8001"){
//		imgCode = "8";
			src= root+"/images/home_new/banner/banner5.jpg";
		}else{
			src= root+"/images/home_new/img39.jpg";
		}
	}
//	$.ajax({
//		url:root +"/portalJson/front/queryImage.action",
//		data:{
//			"requestParam.equal.imagesType" : imgCode
//		},
//		dataType:"json",
//		error: function(){
//			$("#bannerImg").attr("src", src);
//		},
//		success: function(data){
//			if(data && data.path){
//				src = data.path;
//			}
//			$("#bannerImg").attr("src", src);
//		}
//	});
	$("#bannerImg").attr("src", src);
}

//根据资讯code获取对应的name
function getMessageNameBycode(type){
	$.ajax({
		url:root + "/codeJson/getBaseCodeList.action",
		data:{
			"requestParam.equal.typeCode" : '1024', //1024代表编码是资讯
			"requestParam.equal.code" : type,
			"requestParam.page" : '1',
			"requestParam.rows" : '1'
		},
		type:"post",
		dataType:'json',
		error:function(data){
		},
		success:function(data){
			if(data && data.Rows != null){
				var typeName = data.Rows[0].name;
				if(typeName && typeName.length > 10){ typeName = typeName.substring(0,10) + '...';}
				$("#leftTopTitle").html(typeName);
				$("#hrefTitle").html(typeName);
			}
		}
	});
}


//根据资讯类别查询资讯列表
function queryMenuCommonList(_code){
		var that = this;
		$("#dynamicUL").html('<div style="padding:10px 10px;"><img src="'+root+'/images/loading2.gif" alt="加载资讯信息"/></div>');
		$.ajax({
			url:root + "/portal/front/queryCtAdvisoryList.action",
			data:{
				"requestParam.equal.type":_code,
				"requestParam.equal.auditStatus":"0"
			},
			type:"post",
			dataType:"json",
			error:function(){
				$("#dynamicUL").html('<li><a href="javascript:void(0)">加载资讯信息失败！</a></li>');
			},
			success:function(data){
				var content = '';
				if(data && data.records && data.records.length>0){
					var id = data.records[0].id;
					$(data.records).each(function(i,n){
						if($.trim(messageTitle) == getValid(n.advisoryKeys)){
							id = n.id;
						}
						var title = getValid(n.title); // 标题
						if(title && title.length > 16){ title = title.substring(0,16) + '...';}
						content += "<div class='mainSubpage_leftContent'><li><a href='javascript:showMessageContent(\""+n.id+ "\")' >"+title+"</a></li></div>";
					});
					showMessageContent(id);
				}else{
					content = '<li><a href="javascript:void(0)">暂无相关资讯信息！</a></li>';
				}
				$("#dynamicUL").html(content);
			}
		}); 
}
//根据资讯信息的id查询资讯信息
function showMessageContent(id){
	$.ajax({
		url:root + "/portal/front/getAdvisoryByAjax.action",
		data:{
			"requestParam.equal.id":id
		},
		type:"post",
		dataType:"json",
		error:function(){
			$("#oilsServiceItemContent").html('<li><a href="javascript:void(0)">加载资讯信息失败！</a></li>');
		},
		success:function(data){
			if(data){
				$("#aboutOilsItem").html("&gt;" + data.title);
				$("#contentTitle").html(data.title);
				$("#aboutOilsItemContent").html(data.contentUrl);
			}
			else
				$("#oilsServiceItemContent").html('<li><a href="javascript:void(0)">暂无相关资讯信息！</a></li>');
		}
	});
}

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