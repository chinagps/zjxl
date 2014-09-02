/**
 * 
 */
$(document).ready(function() {//添加用户页面初始化
	//	 $("#addCorpInfoForm").validate();
	//var org =new organization();
	//org.addCorpInfoValidate();//用户添加表单验证
	var center = getHeightAndWidth();
	$("#addCorpInfoForm").height(center.height-75);
});