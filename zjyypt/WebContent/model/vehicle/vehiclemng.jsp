<%@ page language="java" contentType="text/html; charset=utf-8"	pageEncoding="utf-8"%>


<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>运营管理-基础数据管理-车辆管理</title>
<script type="text/javascript" src="script/vehicle/vehiclemng.js"></script>
</head>
<body>
    <div id="vehiclemng">
        <div id="vehiclemngcontent" class="content">
            <div class="content">
                <div class="right_cs">
                    <form id="vehicleSearchForm">
                        <div class="Backstage2">
                            <ul class="QueryListTitle">
                                <li>所属组织：
                                    <span id="vehicleOrgName"></span>
                                    <input id="vehicleOrgId" name="requestParam.equal.entIds" type="hidden" class="srkjl4 w_yy_1" />
                                </li>
                            </ul>
                            <ul class="QueryListCondition">
                                <li>
                                    <div>车辆VIN：
                                        <input name="requestParam.like.vinCode" type="text" maxlength="19" class="srkjl4 w_yy_1" />
                                    </div>
                                    <div style="width:100%">&nbsp;驾驶员：
                                        <input name="requestParam.like.staffName" type="text" maxlength="19" class="srkjl4 w_yy_1" />
                                    </div>
                                </li>
                                <li>
                                    <div>&nbsp;&nbsp;&nbsp;&nbsp;车牌号码：
                                        <input name="requestParam.like.vehicleNo" type="text" maxlength="20" class="srkjl4 w_yy_1" />
                                    </div>
                                    <div style="width:100%">车辆运营状态：
                                        <select id="queryVehicleOperationStateId" name="requestParam.like.vehicleOperationState" style="height:20px;width:130px;">
                                            <option value="">请选择</option>
                                        </select>
                                    </div>
                                </li>
                                <li>
                                    <input type="submit" class="btn_inquires" onmouseover="this.style.backgroundPosition='0px -200px'" onmouseout="this.style.backgroundPosition='0px -150px'" value="&nbsp;" />
                                </li>
                            </ul>
                        </div>
                    </form>
                    <div class="right_cc">
                        <div class="right_cdc2">
                            <span class="R">
                                <a id="vehicleInfoChangeOrg" style="cursor: hand;">
                                    <img title="车辆过户" src="images/global/structure_clzz.png" />
                                </a>
                                <a id="vehicleInfoExportExcel" style="cursor: hand;">
                                    <img title="导出信息" src="images/global/xiahao.png" />
                                </a>
                            </span>
                        </div>
                        <div id="vehicleGrid"></div>
                    </div>
                </div>
            </div>
        </div>
        <div id="vehicleSearchAddform" class="content" style="display: none;"></div>
    </div>
</body>
</html>