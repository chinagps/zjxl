<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
<title>多边形电子围栏</title>
</head>

<body>
<div id="" class="fenceManagement_polygons">
	
	<div class="fenceManagement_polygons_top">
		
		<div class="fenceManagement_polygons_top_left"><img class="imgtype" style="margin:7px;" src="images/area/area-icon07.png" /></div>
		<div class="fenceManagement_polygons_top_right" id="areaPolygonCloseBtn"><img src="images/global/topRightClose.png" onmouseover="this.src='images/global/topRightCloseHover.png'" onmouseout="this.src='images/global/topRightClose.png'" /></div>
		<div class="fenceManagement_polygons_top_text">多边形电子围栏</div>
		
	</div>
		
	<div class="fenceManagement_polygons_main">
		<div>
		 <ul class="mt10 ml30">
		    <li style="margin-top:5px;"><span style="width:90px;">围栏名称：&nbsp;&nbsp;&nbsp;&nbsp;</span><input type="text" name="textfield" style="width:100px;" maxlength='20'/></li>
		    <li style="margin-top:5px;"><span style="width:90px;">最高速度：&nbsp;&nbsp;&nbsp;&nbsp;</span><input type="text" name="textfield" style="width:100px;" onkeyup="this.value=this.value.replace(/\D/g,'')"/>&nbsp;&nbsp;Km/h</li>
		    <li style="margin-top:5px;"><span style="width:90px;">超速持续时间：</span><input type="text" name="textfield" style="width:100px;" onkeyup="this.value=this.value.replace(/\D/g,'')"/>&nbsp;&nbsp;秒</li>
		 	<li style="margin-top:5px;"><span style="width:90px;">最低速度：&nbsp;&nbsp;&nbsp;&nbsp;</span><input type="text" name="textfield" value='0' style="width:100px;" onkeyup="this.value=this.value.replace(/\D/g,'')"/>&nbsp;&nbsp;Km/h</li>
		    <li style="margin-top:5px;"><span style="width:90px;">低速持续时间：</span><input type="text" name="textfield" value='0' style="width:100px;" onkeyup="this.value=this.value.replace(/\D/g,'')"/>&nbsp;&nbsp;秒</li>
		 </ul>
		</div>
		<div style="text-align:center;margin-top:20px;margin-bottom:20px;">	           
			<input type="button" value="提交" class="btn_green" onmouseover="this.style.backgroundPosition='-100px -50px'" onmouseout="this.style.backgroundPosition='-100px 0px'"/>	
		</div>
	</div>	
	    		  
</div>
</body>
</html>
