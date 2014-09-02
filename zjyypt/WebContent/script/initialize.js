function loadScript(src)
{
	document.write('<' + 'script src="' + src + '"' + ' type="text/javascript" charset="UTF-8"><' + '/script>');
}
function loadCss(src)
{
	document.write('<' + 'link href="' + src + '"' + ' rel="stylesheet" type="text/css" charset="UTF-8"/>');
}
//浏览器检测
function checkBrowser(){
	 var bro=$.browser;
	 //bro.version
	 var rs="";
	 if(bro.msie) {
		 rs="ie8";
		 }
   else if(bro.mozilla) {
		  rs="firefox";
		 }
   else if(bro.safari) {
		  rs="Safari";
		 }
   else if(bro.opera) {
		  rs="Opera";
		 }
//	return rs;
	return "ie8";
}
function initialize()
{
	var browserVersion=checkBrowser();
	
	loadScript("script/plugins/jqueryDownload/downloadr/jqbrowser.js");
	loadScript("script/plugins/jqueryDownload/downloadr/downloadr.js");
	loadScript("script/plugins/jqueryDownload/facebox/facebox.js");
	if(MAP_ENGINE_TYPE=="1"){
		loadScript("http://api.trafficguide.com.cn/js/api_ajax.js");
		loadScript("http://api.trafficguide.com.cn/maps.js");
		loadScript("http://api.trafficguide.com.cn/js/api.js");
		loadScript("http://api.trafficguide.com.cn/place/place_maps.js");
	}else{
		loadScript("http://api.transmap.com.cn/v2/maps.js");
		loadScript("http://api.transmap.com.cn/v2/server.js");
		loadScript("http://api.transmap.com.cn/v2/rich.js");
		loadScript("http://api.transmap.com.cn/v2/route.js");
		loadScript("http://api.transmap.com.cn/v2/traffic.js");
	}
	loadScript("script/util/util.js");
	loadScript("script/util/sha1.js");
	loadScript("script/controller/object.js");
	loadScript("script/controller/kcpt.firstmain.js");
	loadScript("script/controller/kcpt.first.js");
	loadScript("script/controller/kcpt.monitor.js");
	loadScript("script/controller/kcpt.main.js");
	loadScript("script/controller/kcpt.report.js");
	loadScript("script/plugins/json/json2.js");
	loadScript("script/util/tab.js");
	loadScript("script/plugins/ligerUI_V1.1.9/js/core/base.js");
	loadScript("script/plugins/ligerUI/js/plugins/ligerTree.js");
	loadScript("script/plugins/ligerUI_V1.1.9/js/plugins/ligerGrid.js");
	loadScript("script/plugins/ligerUI_V1.1.9/js/plugins/ligerDialog.js");
	loadScript("script/plugins/ligerUI_V1.1.9/js/plugins/ligerDateEditor.js");
	loadScript("script/plugins/ligerUI_V1.1.9/js/plugins/ligerTextBox.js");
	loadScript("script/plugins/ligerUI_V1.1.9/js/plugins/ligerDrag.js");
	loadScript("script/plugins/ligerUI_V1.1.9/js/plugins/ligerResizable.js");
	loadScript("script/plugins/ligerUI_V1.1.9/js/plugins/ligerAccordion.js");
	loadScript("script/util/customReportColumn/customReport.js");
	loadScript("script/ctfoGrid/ctfoGrid.js");
	loadScript("script/ctfoForm/ctfoForm.js");
//	loadScript("script/ctfoTree/js/ctfoTree.js");
	loadScript("script/ctfoTree/js/ctfoSynTree.js");
	
	loadScript("script/ctfoPanel/js/ctfoPanel.js");
	loadScript("script/ctfoFormWithGrid/ctfoFormWithGrid.js");
	
	loadScript("script/plugins/datePicker/WdatePicker.js");
//	loadScript("script/plugins/jquery/jquery-ui-1.8.4.custom.min.js");
	loadScript("script/plugins/loading/jquery.loadmask.js");
//	loadScript("script/plugins/jquery/jquery.ui.progressbar.js");
//	loadScript("script/plugins/jquery/jquery.ui.slider.js");
	loadScript("script/plugins/jquery/jquery.ui.core.js");
	loadScript("script/plugins/jquery/jquery.ui.widget.js");
	loadScript("script/plugins/jquery/jquery.ui.mouse.js");
	loadScript("script/plugins/jquery/jquery.ui.position.js");
	loadScript("script/plugins/jquery/jquery.ui.menu.js");
	loadScript("script/plugins/jquery/jquery.ui.draggable.js");
	loadScript("script/plugins/jquery/jquery.ui.slider.js");
	loadScript("script/plugins/jquery/jquery.ui.autocomplete.js");
	loadScript("script/plugins/jquery/jquery.easing-1.3.js");
	loadScript("script/plugins/jquery/jquery.slide-0.4.3.js");
	loadScript("script/plugins/pagination/jquery.pagination.js");
	loadScript("script/plugins/formvalidator/formValidator.js");
	loadScript("script/plugins/formvalidator/formValidatorRegex.js");
	loadScript("script/plugins/jquery-validation/jquery.validate.min.js");
	loadScript("script/plugins/jquery-validation/jquery.vextend.js");//TODO zhangming扩展验证方法
	loadScript("script/plugins/jquery-validation/jquery.metadata.js");
	loadScript("script/plugins/jquery-validation/messages_cn.js");
	loadScript("script/plugins/supish/js/hoverIntent.js");
	loadScript("script/plugins/jquery/swfobject.js");
	loadScript("script/plugins/mapwindow/mapwindow.js");
	loadScript("script/plugins/times/jquery.times.js");
	loadScript("script/plugins/jquery/jquerycookie.js");
	loadScript("model/operationmanagement/railingsObject.js");
	loadScript("script/fusionchart/FusionCharts.js");
	loadScript("script/util/mapUtil/js/mapUtil.js");
	loadScript("script/util/pagebar.js");
	loadScript("script/dropdown-menu/script.js");
	loadScript("script/monitorTree/js/monitorTree.js");
	loadScript("script/operationmanagement/customctfotree.js");
	if(MAP_ENGINE_TYPE=="1"){
		loadScript("script/map/map.js");
		loadScript("script/map/se_maptool.js");
		loadScript("script/map/spaceconverge.js");
		loadScript("script/map/clustermanager.js");
		loadScript("script/map/se.richlayer.js");
		loadScript("script/map/sectionalview.js");
		loadScript("script/map/rect.js");
		loadScript("script/monitor/monitor.js");
		loadScript("script/monitor/monitorAlarmList.js");
		loadScript("script/monitor/right_vehicleSubfunctions.js");
	}else{
		loadScript("script/tm/map/map.js");
		loadScript("script/tm/map/se_maptool.js");
		loadScript("script/tm/map/spaceconverge.js");
		loadScript("script/tm/map/clustermanager.js");
		loadScript("script/tm/map/se.richlayer.js");
		loadScript("script/tm/map/sectionalview.js");
		loadScript("script/tm/map/rect.js");
		loadScript("script/tm/monitor/monitor.js");
		loadScript("script/tm/monitor/monitorAlarmList.js");
		loadScript("script/tm/monitor/right_vehicleSubfunctions.js");
	}

	////////////////////////////样式表///////////////////////////
	loadCss("css/global/global.css");
	/*lidongxia 2012.12.11	IE限制CSS加载个数*/
	//loadCss("css/global/ctfoPanel.css"); 合并到了css/global/css.css中 
	loadCss("script/plugins/ligerUI_V1.1.9/skins/Aqua/css/ligerui-all.css");
	loadCss("script/plugins/formvalidator/style/validator.css");
	loadCss("script/plugins/loading/jquery.loadmask.css");
	loadCss("script/plugins/webEdit/themes/default/ueditor.css");
	loadCss("script/plugins/jqueryDownload/facebox/facebox.css");
	loadCss("script/util/mapUtil/css/mapwindow.css");
	//loadCss("css/global/kcptWindow.css");
	loadCss("css/unsafeDriving/newCtfoPanel.css");
	loadCss("css/unsafeDriving/mainFrames.css");
//	loadCss("css/jquery/jquery.ui.core.css");
//	loadCss("css/jquery/jquery.ui.theme.css");
//	loadCss("css/jquery/jquery.ui.slider.css");
//	loadCss("css/jquery/jquery.ui.progressbar.css");
	loadCss("css/jquery/jquery-ui.min.css");
	loadCss("css/global/index.css");
	loadCss("css/global/css.css");
	loadCss("css/global/maptool.css");
	loadCss("css/global/monitorAll.css");
	loadCss("css/global/map.css");
	loadCss("css/global/csserji.css");
	loadCss("css/openwindow/decide.css");
	loadCss("css/openwindow/myclasslinevehicle.css");
	loadCss("css/pagination/pagination.css");
	loadCss("css/pagination/content.css");
	loadCss("css/menu/style.css");
	loadCss("css/global/Vehicle_Monitoring_left_menu.css");
	loadCss("css/global/vehicle_details.css");
	loadCss("css/global/lineFence.css");
	loadCss("css/alarmstrategy/popupBox.css");
//	var w = window.screen.width;
//	if (w > 1024 && w < 1281){
//		loadCss("css/global/top-1280.css");
//	}else if(w > 1280 && w < 1367){
//		loadCss("css/global/top-1366.css");
//	}else if(w > 1366 && w < 1441){
//		loadCss("css/global/top-1440.css");
//	}else if(w > 1440 && w < 1681){
//		loadCss("css/global/top-1680.css");
//	}else if(w > 1680 && w < 1921){
//		loadCss("css/global/top-1920.css");
//	}else{//1024
		loadCss("css/global/top.css");
//	}
}
initialize();

