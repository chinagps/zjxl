function loadScript(src)
{
	document.write('<' + 'script src="' + src + '"' + ' type="text/javascript" charset="UTF-8"><' + '/script>');
}
function loadCss(src)
{
	document.write('<' + 'link href="' + src + '"' + ' rel="stylesheet" type="text/css" charset="UTF-8"/>');
}
function initialize()
{
	if(MAP_ENGINE_TYPE=="1"){
		loadScript("http://api.trafficguide.com.cn/js/api_ajax.js");
		loadScript("http://api.trafficguide.com.cn/maps.js");
		loadScript("http://api.trafficguide.com.cn/js/api.js");
		loadScript("http://api.trafficguide.com.cn/place/place_maps.js");
		loadScript("../../script/map/map.js");
		$.getScript("../../script/alarmHandler/alarmHandler.js");
	}else{
		loadScript("http://api.transmap.com.cn/v2/maps.js");
		loadScript("../../script/tm/map/map.js");
		$.getScript("../../script/tm/alarmHandler/alarmHandler.js");
	}
}
initialize();