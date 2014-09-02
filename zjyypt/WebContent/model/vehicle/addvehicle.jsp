<%@ page language="java" contentType="text/html; charset=utf-8"	pageEncoding="utf-8"%>



<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>业务支撑-新增车辆</title>
<script type="text/javascript" src="script/vehicle/addvehicle.js"></script>

</head>
<body>
	<div class="content">
    <div class="right_c">
     <div class="right_cs">
	  	<div class="right_ct4">车辆信息(<span class="red">*</span>号为必填项)</div>
		  <form id="addVehicleForm">
        <input id="tbVehicleVid" name="tbVehicle.vid" type="hidden" value=""></input>
        <div class="text2"><h1>所属组织：<span id="vehicleOrgNameAdd"></span>
        <input id="vehicleOrgIdAdd" name="tbVehicle.entId" type="hidden" class="{required:true}"/>
        </h1>
        </div>
        <div id="addVehicleInfoDiv" style="overflow:auto;overflow-x: hidden;">
        <ul class="frame2" style="width: 800px;">
        <!-- 
        , remote:{url:'operationSupport/isUniqueForVehicleNoAndPlateColor.action',type:'post',dataType:'json', data:{'tbVehicle.vid':function(){return $('#tbVehicleVid').val();},'tbVehicle.plateColor':function(){return $('#plateColorId').val();}}},messages:{remote:'车牌号与车牌颜色已存在！'}
        , remote:{url:'operationSupport/isUniqueForVehicleNoAndPlateColor.action',type:'post',dataType:'json', data:{'tbVehicle.vid':function(){return $('#tbVehicleVid').val();},'tbVehicle.vehicleNo':function(){return $('#vehicleNoId').val();}}},messages:{remote:'车牌号与车牌颜色已存在！'}
         -->
        	<li ><span class="L" style="width: 400px;">车牌号：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input id="vehicleNoId" name="tbVehicle.vehicleNo" type="text" value="" style="width:150px;" class="{required:true,specialchars : true, maxlength:20}"/><span class="red">*</span>
	        	</span>
	        	<span class="R Rwidth" style="width:400px;">
	        	车牌颜色：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<select id="plateColorId" name="tbVehicle.plateColor" style="width:150px;" class="{ required: true}">
	        				<option value="">请选择</option>
	        			</select><span class="red">*</span>
	        	</span>
	        </li>
	        <li>
	        	<span class="L" style="width: 400px;">车工号：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input name="tbVehicle.autoSn" type="text" value="" style="width:150px;" class="{ required: false,noChinese:false,specialchars : false, maxlength:20}"/></span>
	            <span class="R Rwidth" style="width:400px;">车辆VIN：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input name="tbVehicle.vinCode" type="text" value="" style="width:150px;" class="{ required: true,noChinese:true,specialchars : true, maxlength:19, remote:{url:'operationmanagement/isUniqueForVehicleVinCode.action',type:'post',dataType:'json', data:{'tbVehicle.vid':function(){return $('#tbVehicleVid').val();}}},messages:{remote:'VIN号已存在！'}}"/><span class="red">*</span></span>
	        </li>
	        <li><span class="L" style="width: 400px;">车辆品牌：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<select id="vbrandCodeId" name="tbVehicle.vbrandCode" style="width:150px;"  class="{ required: true}">
	            								<option value="">请选择</option>
	            							</select><span class="red">*</span></span>
	            <span class="R Rwidth" style="width:400px;">车型：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<select id="prodCodeId" name="tbVehicle.prodCode" style="width:150px;" class="{ required: true}">
	            								<option value="">请选择</option>
	            								<option value="SZKL001"></option>
	            							</select><span class="red">*</span>
           		</span>
	        </li>
	        <li><span class="L" style="width: 400px;">所属省：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<select id="tbVehicleAreaCode" name="tbVehicle.areaCode" class="{required:true}" style="width:150px;">
            <option value="">请选择</option>
            </select><span class="red">*</span></span>
            <span class="R Rwidth" style="width:400px;">所属市：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<select id="tbVehicleCityId" name="tbVehicle.cityId"class="{required:true}"  style="width:150px;">
             <option value="">请选择</option>
            </select><span class="red">*</span></span></li>
	        	<li>
					<span class="L" style="width: 400px;">
	            					电压：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<select name="tbVehicle.voltage" style="width:150px;" class="{ required: true}">
	            							<option value="">请选择</option>
	            							<option value="12V">12V</option>
	            							<option value="24V">24V</option>
	            						</select><span class="red">*</span>
	            	</span>
	            	<span class="R Rwidth" style="width:400px;">
	            					车辆类型：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<select id="vehicleTypeId" name="tbVehicle.vehicleType" style="width:150px;" class="{ required: false}">
           								<option value="">请选择</option>
           							</select>
	            	</span>
	            </li>
	            <li >
	            	<span class="L" style="width: 400px;">证照类别：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<select id="certificateTypeId" name="tbVehicle.certificateType" style="width:150px;">
	            								<option value="">请选择</option>
	            							</select>
	            	</span>
	            	<span class="R Rwidth" style="width:400px;">证照状态：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<select id="certificateStateId" name="tbVehicle.certificateState" style="width:150px;">
	            								<option value="">请选择</option>
	            								<option value="1">有效</option>
	            								<option value="0">无效</option>
	            							</select>&nbsp;
	            	</span>
	            </li>
	            <li>
	            	<span class="L" style="width: 400px;">道路运输证号：&nbsp;&nbsp;&nbsp;&nbsp;<input name="tbVehicle.roadTransport" type="text" value="" style="width:150px;" class="{ required: false,noChinese:true,specialchars : true, maxlength:12}"/>
<!--	            								<select name="tbVehicle.roadTransport" style="width:150px;" class="{ required: false, maxlength:10}">-->
<!--	            									<option value="">请选择</option>-->
<!--	            								</select>-->
	            	</span>
	            	<span class="R Rwidth" style="width:400px;">
	            					年度审验状态：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<select id="reviewStateId" name="tbVehicle.reviewState" style="width:150px;" class="">
	            									<option value="">请选择</option>
	            							  </select>&nbsp;
	            	</span>
	            </li>
	            <li>
	            	<span class="L" style="width: 400px;">
	            				二级维护状态：&nbsp;&nbsp;&nbsp;&nbsp;<select id="maintenanceStateId" name="tbVehicle.maintenanceState" style="width:150px;">
	            									<option value="">请选择</option>
	            							  </select>
	            	</span>
	           		<span class="R Rwidth" style="width:400px;">
	            					行业类别：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<select id="transtypeCodeId" name="tbVehicle.transtypeCode" style="width:150px;" class="{ required: false}">
	            								<option value="">请选择</option>
	            							</select>
	            	</span>
	            </li>
	            <li>
	            	<span class="L" style="width: 400px;">车辆运营状态：&nbsp;&nbsp;&nbsp;&nbsp;<select id="vehicleOperationStateId" name="tbVehicle.vehicleOperationState" style="width:150px;">
	            									<option value="">请选择</option>
	            								</select>
	            	</span>
	            	<span class="R Rwidth" style="width:400px;">
	            					投保状态：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<select id="insuranceStateId" name="tbVehicle.insuranceState" style="width:150px;">
								             		<option value="">请选择</option>
											</select>&nbsp;
					</span>
				</li>
	            <li>
	            	<span class="L" style="width: 400px;">客车等级：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<select id="coachLevelId" name="tbVehicle.coachLevel" style="width:150px;" class="{ required: false}">
	             								<option value="">请选择</option>
	             							</select>
	             	</span>
	             	<span class="R Rwidth" style="width:400px;">燃油类型：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<select id="oiltypeId" name="tbVehicle.oiltypeId" style="width:150px;" class="{ required: true}">
	            								<option value="">请选择</option>
	            							</select><span class="red">*</span>
	            	</span>
	            </li>
	             
	            <li>
	            	<span class="L" style="width: 400px;">载客限员：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input name="tbVehicle.vehicleMennum" type="text" value="" style="width:150px;" class="{ required: false, digits:true, max:1000}"/>
	            	</span>
	            	<span class="R Rwidth" style="width:400px;">
	            					自重(吨)：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input name="tbVehicle.vehicleTon" type="text" value="" style="width:150px;" class="{ required: false, number:true, max:1000000000}"/>&nbsp;
	            	</span>
	            </li>
	            
	            <li>
	            	<span class="L" style="width: 400px;">轮胎滚动半径(米)：<input name="tbVehicle.tyreR" type="text" value="" style="width:150px;" class="{ required: false, number:true,rangelength:[0,5], max:1000000000}"/></span>
	            	<span class="R Rwidth" style="width:400px;">
	            					后桥速比：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input name="tbVehicle.rearAxleRate" type="text" value="" style="width:150px;" class="{ required: false, number:true, max:1000000000}"/>
	            	</span>
	            </li>
	            <li>
	            	<span class="L" style="width: 400px;">车辆来源：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<select id="originCodeId" name="tbVehicle.originCode" style="width:150px;" class="{ required: true}">
	             								<option value="">请选择</option>
	             							</select><span class="red">*</span>
	             	</span>
	             	<span class="R Rwidth" style="width:400px;">内部编号：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input name="tbVehicle.innerCode" type="text" style="width:150px;" class="{ required: false,noChinese:true,specialchars : true, maxlength:30}"/></span>
	            </li>
	            
	            
	            <li>
	            	<span class="L" style="width: 400px;">发动机号：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input name="tbVehicle.engineNo" type="text" value="" style="width:150px;" class="{ required: false,noChinese:true,specialchars : true, maxlength:20}"/>
	             	</span>
	             	<span class="R Rwidth" style="width:400px;">发动机品牌：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<select id="ebrandCodeId" name="tbVehicle.ebrandCode" style="width:150px;" class="">
	             								<option value="">请选择</option>
	             							</select></span>
	            </li>
	            <li>
	            	<span class="L" style="width: 400px;">发动机标准转速：&nbsp;&nbsp;<input name="tbVehicle.standardRotate" type="text" value="" style="width:150px;" class="{ required: false,digits: true, max:1000000000}"/>
	             	</span>
	             	<span class="R Rwidth" style="width:400px;">发动机型号：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<select id="emodelCodeId" name="tbVehicle.emodelCode" style="width:150px;" class="">
	             								<option value="">请选择</option>
	             							</select></span>
	            </li>
	            
	            <li>
         			<span class="L" style="width: 400px;">车辆状态参考值：&nbsp;&nbsp;<select id="vsRefIdId" name="tbVehicle.vsRefId" style="width:150px;" class="{ required: true}">
          								<option value="">请选择</option>
          							</select><span class="red">*</span>
          			</span>
        			<span class="R Rwidth" style="width: 400px;">车厢(长*宽*高)：&nbsp;&nbsp;&nbsp;
						<input name="tbVehicle.bodySize" type="text" value="" style="width: 150px;" class="{maxlength:10}" />
					</span>
				</li>
                <li>
	                <span class="L" style="width: 400px;">额定载重(吨)：&nbsp;&nbsp;&nbsp;
						<input name="tbVehicle.loadTon" type="text" value="" style="width: 150px;" class="{digits:true,maxlength:4}" />
					</span>
					<span class="R Rwidth" style="width: 400px;">产权人身份证号：&nbsp;&nbsp;&nbsp;
						<input name="tbVehicle.propertyIdentityNo" type="text" value="" style="width: 150px;" class="{isidcardno:true}" />
					</span>
				</li>
				<li>
                    <span class="L" style="width: 400px;">产权单位名称：&nbsp;&nbsp;&nbsp;
                        <input name="tbVehicle.propertyUnitName" type="text" value="" style="width: 150px;" class="{specialchars:true,maxlength:18}" />
                    </span>
                    <span class="R Rwidth" style="width: 400px;">产权单位营业执照号：<input 
                    	name="tbVehicle.propertyLicenseNo" type="text" value="" style="width: 150px;"  class="{specialchars:true,maxlength:18}" />
                    </span>
				</li>
                <li>
                    <span class="L" style="width: 400px;">车辆出厂时间：&nbsp;&nbsp;&nbsp;
                        <input id="outfactorytime" name="outFactoryTime" type="text" value="" style="width: 150px;height:17px;" class="Wdate" onclick="WdatePicker();" />
                        <input id="outfactorytimeh" name="tbVehicle.outFactoryTime" type="hidden" value="" />
                    </span>
                    <span class="R Rwidth" style="width: 400px;">车辆购置方式：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <select id="purchaseTypeId" name="tbVehicle.purchaseType" style="width: 150px;" class="">
                            <option value="">请选择</option>
                            <option value="1">分期付款</option>
                            <option value="2">一次性付清</option>
                        </select>
                    </span>
                </li>
                <li>
                    <span class="L">车辆保险种类：&nbsp;&nbsp;&nbsp;
                    	<input id="tinsuranceType1" name="tbVehicle.insuranceType" type="checkbox" class="checkbox" value="1"  />交强险&nbsp;
                    	<input id="tinsuranceType2" name="tbVehicle.insuranceType" type="checkbox" class="checkbox" value="2"  />盗抢险&nbsp;
                    	<input id="tinsuranceType3" name="tbVehicle.insuranceType" type="checkbox" class="checkbox" value="3"  />三者&nbsp;
                    	<input id="tinsuranceType4" name="tbVehicle.insuranceType" type="checkbox" class="checkbox" value="4"  />车损险&nbsp;
                    	<input id="tinsuranceType5" name="tbVehicle.insuranceType" type="checkbox" class="checkbox" value="5"  />车上人员险&nbsp;
                    	<input id="tinsuranceType6" name="tbVehicle.insuranceType" type="checkbox" class="checkbox" value="6"  />货物运输险&nbsp;
                    	<input type="checkbox" class="checkbox" id="otherCheckIType" />其它
                        <input name="tbVehicle.insuranceTypeOther" type="text" id="otherCheckInsuranceType" value="" style="width: 150px;display: none;" class="{specialchars:true,maxlength:50}" />
                    </span>
                </li>
                <li>
                    <span class="L">车辆保险到期时间：<input id="insuranceexpiratetime" name="insuranceExpirateTime" type="text" value="" style="width: 150px;height:17px;" class="Wdate" onclick="WdatePicker({dateFmt:'yyyy-MM-dd',maxDate:'2099-12-31'});" />
                         <input id="insuranceexpiratetimeh" name="tbVehicle.insuranceExpirateTime" type="hidden" value="" />
                    </span>
                    <span class="R Rwidth" style="width: 400px;">车身颜色:
                       <input name="tbVehicle.vehicleColor" type="text" value="" style="width: 150px;" class="{maxlength:10}" />
                    </span>
                </li>
        </ul>
        </div>
        <div class="button4">
        	<input name="submit" type="button" value="确定" class="bt4" id="addVehicleFormsubmitMe"/>
        	<input name="cancel" type="button" value="取消" class="bt5" id="close"/>
        </div>
        </form>
    </div>
    </div>
   </div>
</body>
</html>
