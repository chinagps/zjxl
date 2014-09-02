<%@ page language="java" contentType="text/html; charset=utf-8"	pageEncoding="utf-8"%>



<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>调度信息</title>
<script type="text/javascript" src="script/predefinedMsg/addpredefinedmsg.js"></script>
</head>
<body>
<div id="content">
	<div class="content">
  <div class="right_c">
    <div class="right_cs">
    <form id="addPredefinedmsgForm">
    	<div class="right_ct4">调度信息(<span class="red">*</span>号为必填项)
    	</div>
    	<input name="tbPredefinedMsg.msgId" type="hidden" value=""></input>
        
        <ul class="frame2Add_Page">
        	<li>
        		<span class="LAdd_Page">信息类型：<select id="businessIdSearch" name="tbPredefinedMsg.msgType" style="width:150px;" class="{ required: true}" class="srkjl4 w_yy_3">
										<option value="">请选择</option>
										<option value="1">文本信息</option>
										<option value="2">事件信息</option>
									</select><span class="red">*</span>
        		</span>
        		<span class="RAdd_Page" >是否共享：<select id="test_tbPredefinedMsg_isShared" name="tbPredefinedMsg.isShared" style="width:150px;" class="{ required: true, digits:false, maxlength:30}">
	            								<option value="">请选择</option>
	            								<option value="1">共享</option>
	            								<option value="0">不共享</option>
            								</select><span class="red">*</span>
        		</span>
        	</li>
            <li>
            	<span class="LAdd_Page" style="height:60px;">消息标题：<input id="msgIdx" name="tbPredefinedMsg.msgIdx" type="text" value="" style="width:150px;" class="{required: true, specialchars:true, maxlength:10}" /><span class="red">*</span>
            	</span>
            	<span class="RAdd_Page" >消息内容：<textarea id="msgBody" name="tbPredefinedMsg.msgBody" style="width:150px;height: 60px;" cols="" rows="" class="{required: true, digits:false, maxlength:250}"></textarea><span class="red">*</span>
            	</span>
            </li>
          	<li class="button4">
	        	<input name="" type="button" value="确定" class="bt4" id="addPredefinedmsgFormsubmitMe"/>
	        	<input id="close" name="" type="reset" value="取消" class="bt5" />
        	</li>
        </ul>
        
    </form>
    </div>
   </div>
   </div>
</div>
</body>
</html>
