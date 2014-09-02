<%@ page language="java" contentType="text/html; charset=utf-8"	pageEncoding="utf-8"%>


<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<script type="text/javascript" src="script/corpinfo/addcorpinfo.js"></script> 
<title>业务支撑-编辑企业</title>
<style>
.frame2Add_Page {
	width:100%;
	padding-top:20px;
	margin:0;
}
.frame2Add_Page li {
	margin-left:15%;
	line-height: 36px;
	width:800px;
}
</style>
</head>
<body>
<div>
<div class="content">
  <div class="right_c">
    <div class="right_cs">
    	<div class="right_ct4">车队信息(<span class="red">*</span>号为必填项)</div>
    	<form  id="addCorpInfoForm" style="overflow-x:hidden;overflow-y:auto;">
        <div class="text2"><h1>所属组织：
        <span id="parentOrgNameAdd"></span>
        <input name="viewOrgCorp.parentId" value="" id="parentOrgIdAdd" type="hidden" class="{required:true}"/>
        <input name="viewOrgCorp.entId" value="" id="updateEntId" type="hidden" />
        </h1>
        </div>
        <div  id="addCorpInfoDiv">
        <ul class="frame2Add_Page" style="width:90%">
        	<li><span class="LAdd_Page">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;企业编码：<input name="viewOrgCorp.corpCode"  id="disabledCorpCode" readonly="readonly" type="text" class="{required:true,specialchars:true,maxlength:10}" style="width:150px;"/><span class="red">*</span></span>
        	<span class="RAdd_Page" >企业名称：<input name="viewOrgCorp.entName" id="entNameAdd" onblur="orgWin.orgUnique();" type="text" class="{required:true,specialchars:true,maxlength:50}" style="width:150px;"/><span class="red">*</span></span></li>
            <li><span class="LAdd_Page">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;企业简称：<input name="viewOrgCorp.orgShortname" type="text" class="{required:true,specialchars:true,maxlength:20}" style="width:150px;"/><span class="red">*</span></span>
            <span class="RAdd_Page" >组织类型：<select name="viewOrgCorp.entType" id="selectEntType"class="{required:true}" style="width:153px;height:19px;">
             <option value="">请选择</option>
            <option value="1">企业</option>
            <option value="2">车队</option>
            </select><span class="red">*</span></span></li>
            <li><span class="LAdd_Page">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;网址：<input name="viewOrgCorp.url" type="text" class="{url:true,maxlength:50}" style="width:150px;"/></span>
                <span class="RAdd_Page" >企业地址：<input name="viewOrgCorp.orgAddress" type="text" class="{specialchars:true,maxlength:40}" style="width:150px;"/></span>
            </li>
            <li>
            <span class="LAdd_Page">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;所属省：<select id="corpProvince" name="viewOrgCorp.corpProvince" class="{required:true}" style="width:153px;height:19px;">
            <option value="">请选择</option>
            </select><span class="red">*</span></span>
          <span class="RAdd_Page" >&nbsp;&nbsp;所属市：<select id="corpCity" name="viewOrgCorp.corpCity" class="{required:true}" style="width:153px;height:19px;">
            <option value="">请选择</option>
            </select><span class="red">*</span></span>
            </li>
            <li><span class="LAdd_Page">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Email：<input name="viewOrgCorp.orgCmail" type="text" class="{emailExtend:true,maxlength:40}" style="width:150px;"/></span>
            <span class="RAdd_Page" >&nbsp;&nbsp;&nbsp;&nbsp;邮编：<input name="viewOrgCorp.orgCzip" type="text" class="{zipcode:true}" style="width:150px;"/></span></li>
            <li><span class="LAdd_Page">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;企业性质：<select id="corpQuale" name="viewOrgCorp.corpQuale"  class="{required:true}" style="width:153px;height:19px;">
            <option value="">请选择</option>
            </select><span class="red">*</span></span>
            <span class="RAdd_Page" >企业级别：<select id="corpLevel" name="viewOrgCorp.corpLevel" class="{required:true}" style="width:153px;height:19px;">
            <option value="">请选择</option>
            </select><span class="red">*</span></span></li>
             <li><span class="LAdd_Page">企业经营许可证：<input name="viewOrgCorp.businessLicense" type="text" class="{maxlength:15}" style="width:150px;"/></span>
            <span class="RAdd_Page">&nbsp;&nbsp;联系人：<input name="viewOrgCorp.orgCname" type="text" class="{maxlength:10}" style="width:150px;"/></span>
           </li>
            <li>

            <span class="LAdd_Page">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;传真：<input name="viewOrgCorp.orgCfax" type="text" class="{phonenumber:true}" style="width:150px;"/></span>
            <span class="RAdd_Page">联系电话：<input name="viewOrgCorp.orgCphone" type="text" class="{mobilePhoneNum:true,maxlength:20}" style="width:150px;"/></span>
            </li>

            <li  class="padding" style="width:80%;" >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;企业简介：<textarea style="width:400px;" name="viewOrgCorp.orgMem" cols="" rows="5" class="{maxlength:100}"></textarea></li>
        	<li>
        		<div class="button4" style="padding:0"><input name="submit" id="addCorpInfoFormsubmit" type="submit" value="确定" class="bt4" />
		        	<input id="corpinfoMngClose"  name="" type="button" value="取消" class="bt5" />
		        </div>
        	</li>
        </ul>
        </div>
          </form>
    </div>
   </div>
   </div>
</div>
</body>
</html>
