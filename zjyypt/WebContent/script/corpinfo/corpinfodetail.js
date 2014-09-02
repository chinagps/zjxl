$(function() {
	// 根据vid 查询车辆详细信息
	var entTypeMap={"1":"企业","2":"车队"};
	//var corpInfoEntId = $("#corpInfoEntId").val();
	if(corpInfoDetailEntId != null){
	JAjax("operationmanagement/findOrgById.action",{"orgId":corpInfoDetailEntId}, "json", function(data){
		// 对返回json数据处理
		var infodetail = eval(data);
		// 查询出错，弹出"错误信息"；成功，则显示详情页
		if(infodetail.error){
			$.ligerDialog.warn("获取详情失败：" + infodetail.error[0].errorMessage);
		} else{
			 	$("#parentName").append(infodetail.parentName);
				$("#corpCode").append(infodetail.corpCode);
				//$("#entName").append(KCPT.CodeManager.getNameByCode("SYS_VCL_PLATECOLOR" , infodetail.entName));
				$("#entName").append(infodetail.entName);
				$("#orgShortname").append(infodetail.orgShortname);
				$("#entType").append(entTypeMap[infodetail.entType]);
				$("#url").append(infodetail.url);
				$("#orgAddress").append(infodetail.orgAddress);
				$("#orgCmail").append(infodetail.orgCmail);
				$("#orgCzip").append(infodetail.orgCzip);
				$("#businessLicense").append(infodetail.businessLicense);
				$("#orgCname").append(infodetail.orgCname);
				$("#orgCfax").append(infodetail.orgCfax);
				$("#orgCphone").append(infodetail.orgCphone);
				$("#orgMem").append(infodetail.orgMem);
				$("#corpQualeDetail").append(KCPT.CodeManager.getNameByCode("SYS_CORP_BUSINESS_SCOPE" , infodetail.corpQuale));//企业性质
				$("#corpLevelDetail").append(KCPT.CodeManager.getNameByCode("SYS_CORP_LEVEL" , infodetail.corpLevel));//企业级别
				$("#corpProvinceDetail").append(KCPT.CodeManager.getNameByCode("SYS_AREA_INFO",infodetail.corpProvince));
				$("#corpCityDetail").append(KCPT.CodeManager.getCityProvcodeNameByCode("SYS_AREA_INFO",infodetail.corpProvince,infodetail.corpCity));
		}
	}, null, true);
	}else{
		$.ligerDialog.warn("参数为空！");	
	}	
	$("#mainWorkArea").show_A_Window({});//加载完成页面后要执行展示方法
});