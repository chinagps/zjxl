<%@ page language="java" contentType="text/html; charset=utf-8"	pageEncoding="utf-8"%>

<html>
<head>
<!-- 
<script type="text/javascript" src="script/map/map.js"></script>
<script type="text/javascript" src="script/map/se_maptool.js"></script>

<script type="text/javascript" src="script/map/clustermanager.js"></script>
<script type="text/javascript" src="script/map/spaceconverge.js"></script>
<script type="text/javascript" src="script/map/se.richlayer.js"></script>
<script type="text/javascript" src="script/map/sectionalview.js"></script>
<script type="text/javascript" src="script/map/rect.js"></script>
<script type="text/javascript" src="script/monitor/monitor.js"></script>
<script type="text/javascript" src="script/monitor/vehicleSubfunctions.js"></script>
 -->
<script type="text/javascript">
$(document).ready(function() {
	KCPT.monitorC = new KCPT.monitor({
		id : "monitorDiv",
		name : "车辆监控",
		containerDiv : 'monitorDiv',
		ready : {
			data : "load....",
			cbfun : function(t, data) {
				t.onReSize();
			}
		}
	});
});
</script>
</head>
<body>
<div id="monitorContent">
	<div class="content">
	  	<div class="left_c_monitor">
	   		<div id="monitorTree" class="monitorTree"></div>
		</div>
		<div class="monitor_right_c">
  				<div class="leftShrink L"><img src="images/global/leftShrink.png" style="width: 8px"/></div>
 				<div class="monitorMapTool" id="monitorMapTool"></div>
 				<div class="monitorMap" id="monitorMap"></div>
   				<div class="monitor_bottom_c">
				    <div class="udShrink">
				    	<img src="images/global/upshrink.png" /><img src="images/global/downshrink.png" /> 
				    </div>
				</div>
				<div id="monitor_vehiclePopWindow" style="overflow-y:auto;" class="vehiclePopWindow vehicle_details_main" ></div>
				<div class="miniVehiclePopWindow vehicle_details_top_back">
				    <div class="vehicle_details_back"><a href="javascript:void(0);" onfocus="javascript:this.blur();">&nbsp;</a></div>
				    <div class="vehicle_details_close"><a href="javascript:void(0);" onfocus="javascript:this.blur();">&nbsp;</a></div>
				    <div class="vehicle_details_cp"></div>
				</div>
		</div>
		<div class="poiSearchResultContainer  hidden">
		<div class="diwu_list_title">
			<div class="searchClose"><a href="javascript:void(0);">&nbsp;</a></div>
			<div class="diwu_list_title_text">地图视野范围内地物列表</div>
		</div>
		<div class="poiSearchResult diwu_list_table_2" style="border-top: #d1d1d1 2px solid;width:239px"></div>
		<div class="poiSearchResultPage">
			<div class="paginations">	
			<ul>
	            <li class="pagination_last"><a href="javascript:void(0);">&nbsp;</a></li>
	            <li class="pagination_selected pageNum" aid="1"><a href="javascript:void(0);">1</a></li>
	            <li class="pagination_blank pageNum" aid="2"><a href="javascript:void(0);">2</a></li>
	            <li class="pagination_blank pageNum" aid="3"><a href="javascript:void(0);">3</a></li>
	            <li class="pagination_blank jumpPage"><a href="javascript:void(0);">...</a></li>
	            <li class="pagination_next"><a href="javascript:void(0);">&nbsp;</a></li>
	        </ul>
			</div>
		</div>
	</div>
	</div>
	
	<div class="bottomShadow hidden" id="bottomShadow"></div>
	<div class="dragDiv"></div>
	</div>
</body>
</html>