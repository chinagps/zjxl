<%@ page language="java" contentType="text/html; charset=utf-8"	pageEncoding="utf-8"%>


<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>更多路况</title>
<script type="text/javascript">
$(document).ready( function() {	
	$("#mainWorkArea").show_A_Window({});//加载完成页面后要执行展示方法
});
</script>
</head>
<body>
	<div class="kcptWindow_qyzx">
		<div class="kcptWindow_top">
			<div class="kcptWindow_top_img"><img src="images/global/roadTip.png" /></div>
        	<div class="kcptWindow_top_close" id="entMoreCloseRoad"><img src="images/global/topRightClose.png" onmouseover="this.src='images/global/topRightCloseHover.png'" onmouseout="this.src='images/global/topRightClose.png'" /></div>
        	<div class="kcptWindow_top_text" id="entMoreTopRoad"></div>
        </div>
        
        <div class="kcptWindow_main">
            <div class="kcptWindow_main_table" id="entMoreTableRoad" style="height:300px;padding:20px 1px 0 1px;">
            </div>
            <div id="pageBarDiv">             
            </div>
        </div>
        
    	<div class="kcptWindow_bottom">
        	<div class="kcptWindow_bottom_middle"></div>
        </div>
    
    
        
	</div>
</body>
</html>
