<%@ page language="java" contentType="text/html; charset=utf-8"	pageEncoding="utf-8"%>


<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>运营统计|维保类别管理|新建类别</title>
</head>
<body>
    <div>
        <div class="content">
            <div class="right_c">
                <div class="right_cs">
                    <div class="right_ct4" style="border-top:#c0d7eb 1px solid;">新建维保类别(<span class="red">*</span>号为必填项)</div>
                    <form id="maintainClassAddForm">
                        <input type="hidden" name="maintainClassInfo.maintainId" />                        
                        <div id="maintainClassAddDiv" style="align-text:center;">
                            <ul class="frame2Add_Page">
                                <li class="padding"> 维保项目：
                                    <input type="text" id="" name="maintainClassInfo.maintainName" maxlength=40
                                        class="srkjl4 {required:true,maxlength:40}" style="width:400px" />
                                    <span class="red">*</span>
                                </li>
                                <li class="padding" style="white-space:nowrap;" > 维保代号：
                                    <input type="text" id="" name="maintainClassInfo.maintainAbbreviationName" maxlength=20
                                        class="srkjl4 {required:true,letterUOrNumber:true}" style="width:400px;" />
                                    <span class="red">*</span>
                                </li>
                                <li class="padding">维保内容：
                                    <textarea style="width:400px;height:120px;" name="maintainClassInfo.maintainContent" class="srkjl4 {maxlength:400}"></textarea>
                                </li>
                                <li class="padding" style="width:460px;">
									<input name="submit" id="maintainClassAddSubmit" type="submit" value="确定" class="bt4" /> 
									<input id="close" name="" type="button" value="取消" class="bt5" />
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
