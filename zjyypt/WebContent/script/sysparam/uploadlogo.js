var uploadlogo = function(){
	//重复提交判断
	var afterFlag = false;
};
uploadlogo.prototype = {
	 //初始化
	init : function(){
		KCPT.SYSPARAMPAGE = 1;
		var obj = this;
		var center = getHeightAndWidth();
		var height1 = center.height-45;
		var width = center.width;
		$("#logomng").height(height1);
		$("#logomng").width(width-280);
		$("#imgId").click(function(){
			obj.afterFlag = false;
			//替换标识DIV
			 $("#imgDiv").empty();
			 $("#defaultImg").css("display","none");
			 $("#imgDiv").attr("style","");
//			 $("#imgDiv").css("display","none");
			 document.getElementById("form1").reset();
			  //建议在#imgDiv的父元素上加个overflow:hidden;的css样式
			 var options = {
		                width: 365,
		                height: 69,
		                imgDiv: "#imgDiv",
		                imgType: ["jpg", "png"]
			 };
	         $("input").uploadPreview1(options);
		});
	},
	onResize : function(){
		var center = getHeightAndWidth();
		var height1 = center.height-45;
		var width = center.width;
		$("#logomng").height(height1);
		$("#logomng").width(width-280);
	},
	//异步提交表单
	submitForm : function(form1){
		var obj = this;
		var imageType = $("#imageType").val();
		var flag = imageType == "png" || imageType == "jpg";
		if(flag){
		var options = {
				url : "systemmng/addCorpLogoAction.action",
				dataType: 'json',
				type : "post", 
				resetForm : true,
				success : function(data){
					var datajson = eval('('+data+')');
					    if(datajson.flagLogo=='true'){
					 		var oldLogoSrc = $("#backDefaultId").attr("src");
							var newLogoSrc = datajson.logoUrl;
							$("#defaultImgId").attr("src",newLogoSrc);
							$("#defaultDivId").show();
					    	 
							$.ligerDialog.success("设置企业标识LOGO成功！");
							obj.afterFlag = true;
							$("#imageType").val("");
					    }else if(datajson.flagLogo=='false'){
					    	$.ligerDialog.error("设置企业标识LOGO失败！");
					    }
				},
				error : function(data){
						$.ligerDialog.error("设置企业标识LOGO失败！");
				}
		};
		$('#'+form1).ajaxSubmit(options);
		}else{
			flag = false;
			if(obj.afterFlag){
				$.ligerDialog.error("当前图片已经替换！");
			}else{
				$.ligerDialog.error("请选择图片！");
			}
		}
	},
	//设置成功后执行的方法
	afterSuccess : function(){
		var defaultImg = $("#defaultImg");
		if(!defaultImg.is(":hidden")){
			var oldLogoSrc = $("#backDefaultId").attr("src");
			$("#defaultImgId").attr("src",oldLogoSrc);
			$("#updateImgDiv").hide();
			$("#defaultDivId").show();
		}else{
			$("#defaultDivId").css("display","none");
			$("#updateImgDiv").show();
		}
	},
	//恢复默认
	defaultBut : function(){
		var obj = this;
		document.getElementById("form1").reset();
		obj.afterFlag = false;
		JAjax("systemmng/defaultImg.action"
				, null, "html", obj.defaultHandler,null, true);
	},
	//恢复默认LOGO回调函数
	defaultHandler : function(data){
		if(data!="" && data != null && data!=undefined){
			$("#backDefaultId").attr("src",data);
			$("#defaultImg").show();
			var file = $("#imgId");
//			file.select();
//			debugger;
//			document.selection.clear();
			$("#imgDiv").css("display","none");
			$("#imageType").val("png");
		}
	},
	//初始化当前企业的LOGO
	initOnTimeLogo : function(){
		var obj = this;
		JAjax("systemmng/findCorpLogo.action"
				, null, "json", obj.logoHandler,null, true);
	},
	//处理回调函数
	logoHandler : function(data){
		if(data!="" && data !=null && data!=undefined){
		var dataObj = eval(data);
		var oldLogoSrc = $("#backDefaultId").attr("src");
		var newLogoSrc = dataObj.orgLogo;
		$("#defaultImgId").attr("src",newLogoSrc);
		$("#defaultDivId").show();
		}
	}
};
$(document).ready(function(){
	var uploadlogo1 = new uploadlogo();
	window.uploadmng =  uploadlogo1;
    uploadmng.init();
    uploadmng.initOnTimeLogo();
    sysparammng.showObj = uploadlogo1;
});