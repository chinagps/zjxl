<%@ page language="java" contentType="text/html; charset=utf-8"	pageEncoding="utf-8"%>
<html>
    <head>
        <script type="text/javascript" src="script/tm/area/areaLine.js">
        </script>
        <script type="text/javascript" src="script/tm/area/areaMain.js">
        </script>
        <script type="text/javascript" src="script/tm/area/areaPolygon.js">
        </script>
        <script type="text/javascript" src="script/tm/area/bindCar.js">
        </script>
        <script type="text/javascript" src="script/tm/area/point.js">
        </script>
        <script type="text/javascript" src="script/tm/area/areaUtil.js">
        </script>
        <script type="text/javascript">
            $(document).ready(function(){
                var areaMap = null;
                var area = new areaMain();
             	// 加载组织树
            	area.orgTree();
             	
                var line = new areaLine();
                var polygon = new areaPolygon();
                var bindCar = new areaBindCar();
                window.bindCar = bindCar;
                window.line = line;
                window.area = area;
                window.polygon = polygon;
                /*var tree= KCPT.root.leftTree;
                 tree.hideTabs();
                 tree.hidengrid();
                 tree.triggerShowObj = area;
                 tree.show();
                 tree.onReSize();*/
                //area.show();
                //operatorManager.addChildList(area);
                //operatorManager.showObj = area;
                KCPT.onresizeObj = area;
            });
        </script>
    </head>
    <body>
        <div class="" id="areaMainPanel">
        	<table>
        	<tr>
        	<td>
           	<!-- 左侧管理列表start -->
            <div id="areaLeftPanel" class="areaLeftPanel">
              <div class="fenceManagement_inquires">
                <div class="fenceManagement_inquires_2">
                  <form id="alarmManagerform" name="alarmManagerform">
                    <input type="hidden" class="area_entIdHiddenInput" name="requestParam.equal.entId" />
                      <table border="0" cellspacing="0" cellpadding="0">
                        <tr>
                          <td width="65" height="38">
                          	围栏名称：
                          </td>
                          <td width="115">
                          	<input type="text" style="width:100px;" name="requestParam.like.areaName" />
                          </td>
                          <td width="65">
                                                                           围栏类型：
                          </td>
                          <td width="115">
                            <select name="requestParam.equal.areaShape">
                               <option value="">请选择</option>
                               <option value="2">多边形</option>
                               <option value="5">矩形</option>
                            </select>
                           </td>
                           <td>
                               <input type="submit" value="" id="areaListSearchBtn" class="btn_inquires" 
                               onmouseover="this.style.backgroundPosition='0px -200px'" onmouseout="this.style.backgroundPosition='0px -150px'">
                           </td>
                        </tr>
                       </table>
                	</form>
                </div>
                </div>
                <div id="areaListGrid">
                </div>
                <ul class="areaTab_all">
                    <li>
                        <a class="areaTab_back" onmouseover="this.style.backgroundPosition='0 -50px'" onmouseout="this.style.backgroundPosition='0 0'">绑定车辆</a>
                    </li>
                    <li>
                        <a onmouseover="this.style.backgroundPosition='0 -50px'" onmouseout="this.style.backgroundPosition='0 0'">发送不成功车辆</a>
                    </li>
                </ul>
                <div class="tabListBody cl">
                    <div class="lineManagement_main_2_inquires">
                        <form id="areaSearchBindCarsForm" name="areaSearchBindCarsForm">
                            <input type="hidden" class="area_entIdHiddenInput" name="requestParam.equal.entId" />
                            <table class="areaSearchCondation">
                                <tr>
                                    <td width="70">
                                        	围栏名称：
                                    </td>
                                    <td width="115">
                                    	<input type="text"name="requestParam.like.areaName" style="width:100px;"/>
                                    </td>
                                    <td width="70">
                                        	围栏类型：
                                    </td>
                                    <td width="115">
                                        <select name="requestParam.equal.areaShape">
                                            <option value="">请选择</option>
                                            <option value="2">多边形</option>
                                            <option value="5">矩形</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td>车牌号码：</td>
                                    <td>
                                    	<input type="text" name="requestParam.like.vehicleNo" style="width:100px;"/>
                                    </td>
                                    <td>
                                        <input type="submit" value="" class="btn_inquires" id="AreaBindCarsBtn" 
                                        onmouseover="this.style.backgroundPosition='0px -200px'" onmouseout="this.style.backgroundPosition='0px -150px'">
                                    </td>
                                </tr>
                            </table>
                        </form>
                    </div>
                    <div class="lineManagement_main_2_inquires" style="display: none;">
                        <form id=areaSearchBindCarsFaildForm name="areaSearchBindCarsFaildForm">
                            <input type="hidden" class="area_entIdHiddenInput" name="requestParam.equal.entId" />
                            <table class="areaSearchCondation">
                                <tr>
                                    <td width="70">围栏名称：</td>
                                    <td width="115">
                                    	<input type="text" name="requestParam.like.areaName" style="width:100px;"/>
                                    </td>
                                    <td width="70">围栏类型：</td>
                                    <td colspan="2" width="115">
                                        <select name="requestParam.equal.areaShape" style="width:100px;">
                                            <option value="">请选择</option>
                                            <option value="2">多边形</option>
                                            <option value="5">矩形</option>
                                        </select>
                                    </td>                                
                                </tr>
                                <tr>
                                    <td>车牌号码：</td>
                                    <td>
                                    	<input type="text" name="requestParam.like.vehicleNo" style="width:100px;"/>
                                    </td>
                                    <td>操作类型：</td>
                                    <td>
                                        <select name="requestParam.equal.areaStatus">
                                            <option value="">请选择</option>
                                            <option value="1">新增</option>
                                            <option value="2">修改</option>
                                            <option value="3">删除</option>
                                        </select>
                                    </td>
                                    <td>
                                        <input type="submit" value="" class="btn_inquires" id="areaBindCarsFailBtn" 
                                        onmouseover="this.style.backgroundPosition='0px -200px'" onmouseout="this.style.backgroundPosition='0px -150px'">
                                    </td>
                                </tr>
                            </table>
                        </form>
                    </div>
                </div>
                <div id="AreaBindCarsGrid" class="mt5">
                </div>
                <div id="AreaBindCarsFailGrid" style="display:none;" class="mt5">
                </div>
                <table id="bindCarListTable" class="mt5">
                </table>
            </div>
            </td>
            <!-- 左侧管理列表end-->
            <!--area maptool start -->
            <td>
            <div id="areaMapToolPanel" class="fenceManagement_top" style="padding:0px;margin: 4px 2px 4px 0px;">
            	<span style="float:right; margin-right:20px;"><a id="polygonId1" class="hand"><img style="float:left; margin:11px 3px 0 0; border:none;" src="images/area/area-icon07.png" />多边形电子围栏</a></span>
            	<span style="float:right; margin-right:50px;"><a id="polygonId2" class="hand"><img style="float:left; margin:11px 3px 0 0; border:none;" src="images/area/area-icon08.png" />矩形电子围栏</a></span>
            	<span><font style="float:left;">快速定位：</font><input id="vehicleNoEqual" style="float:left; margin:8px 5px 0 2px; padding-top:2px; width:100px;" type="text" value="车牌号"/><a id="markpostion" class="hand">定位</a></span>
           	</div>
           	<!--area maptool end -->
            <!-- area map start -->
            <div id="areaMapPanel" class="areaMapPanel" style="margin:0 2px 4px 3px;border: 1px solid #69AAC8;">
            </div>
            </td>
            <!-- area map end -->
            </tr>
            </table>
        </div>
    </body>
</html>
