<%@ page language="java" contentType="text/html; charset=utf-8"	pageEncoding="utf-8"%>


<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>终端远程升级--选择车辆</title>
<script type="text/javascript" src="script/machinemanagement/vehicleanalysis/chooseVehicleSon.js"></script>
</head>
<body>
<div class="kcptWindow_vehicleChoice">
    	<div class="kcptWindow_top">
        	<div class="kcptWindow_top_img"><img src="images/global/chooseVehicle/car.png" /></div>
			<div id="selectVehiclePopClose" class="kcptWindow_top_close"><img src="images/global/topRightClose.png" onmouseover="this.src='images/global/topRightCloseHover.png'" onmouseout="this.src='images/global/topRightClose.png'" /></div>
        	<div class="kcptWindow_top_text">车辆选择</div>
        </div>
    	<div class="kcptWindow_main_vehicleChoice">
        	<div class="kcptWindow_main_left">
        		<div id="accordionCvs1">
				 	<div title="按车队查询">
				         	<div class="panelInner">
				                <ul id="panelConCvs2">
				                </ul>
				         	</div>
				    </div>
				 </div>
            </div>
        	<div class="kcptWindow_main_right">
        		<div class="kcptWindow_main_right_1" style="border-top:#69aac8 1px solid;">
					<div class="kcptWindow_main_right_1_title">已选择车辆</div>
					<div class="kcptWindow_main_right_1_con" id="selectVehicleDiv" style="height: 150px;">
                    </div>
					<div class="kcptWindow_main_right_1_btn">
						<input id="reselectedVehicle" name="reselectedVehicle" type="submit" class="btn_blue" onmouseover="this.style.backgroundPosition='0px -50px'" onmouseout="this.style.backgroundPosition='0px 0px'" value="清空" />
                        <input id="validationSelectedVehicel" name="validationSelectedVehicel" type="submit" class="btn_green" onmouseover="this.style.backgroundPosition='-100px -50px'" onmouseout="this.style.backgroundPosition='-100px 0px'" value="保存" />
						<input id="closePage" name="closePage" type="submit" class="btn_red" onmouseover="this.style.backgroundPosition='-200px -50px'" onmouseout="this.style.backgroundPosition='-200px 0px'" value="取消" />
                    </div>
                </div>
                <form id="selectVehicleSearchForm" method="post">
                <input id="selectedVehicleVid" type="hidden"  name="requestParam.equal.selectedVehicleVid"/>
                <input type="hidden" name="requestParam.equal.entId" id="entIdForSelectVehicles" value=""></input>
        		<div class="kcptWindow_main_right_2" style="border-top:#69aac8 1px solid;">
        			<div class="kcptWindow_main_right_2_search">
                    	车牌号：<input style="width:120px;" name="requestParam.equal.vehicleNo" id="vehicleNoSon" type="text" />
                        <input id="serchVeBtn" type="submit" style="margin-left:183px;" class="btn_inquires" onmouseover="this.style.backgroundPosition='0px -200px'" onmouseout="this.style.backgroundPosition='0px -150px'" value="" />
                    </div>
        			<div id="vehicleInfoTableDiv"></div>
                </div>
                </form>
            </div>
        </div>
        
    	<div class="kcptWindow_bottom">
        	<div class="kcptWindow_bottom_middle"></div>
        </div>
    
    </div>
</body>
</html>