<%@ page language="java" contentType="text/html; charset=utf-8"	pageEncoding="utf-8"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>企业标识设置</title>
<script type="text/javascript" src="script/sysparam/uploadPreview.js"></script>
<script src="script/sysparam/uploadlogo.js" type="text/javascript"></script>
</head>
<body>
    <div class="right_cs4 cha_sysleft" id="logomng">
      <div class="right_ct" id="logomngcontent">
        <h1>企业标识设置</h1>
      </div>
      <div class="right_cc">
        <div class="right_cdtb_sysright" align="center">
        <iframe id="baseInfo_iframe" name="baseInfo_iframe" style="display: none;" frameborder="0" src=""></iframe>
        <form action="#" id="form1" enctype="multipart/form-data" method="post" onsubmit="uploadmng.submitForm('form1');return false;" >
         <table border="0" cellspacing="0" cellpadding="0" class="newtable2_sysright" style="width: 740px;">
            <tr>
              <td>当前标识</td>
              <td>替换标识</td>
            </tr>
             <tr>
              <td>
              <div style="display: none;" id="defaultDivId">
              <img id="defaultImgId" width= "350px" height= "69 px" /></div>
              <div id="updateImgDiv" style="display: none" ></div>
              </td>
              <td>
              <div style="">
                  <div id="imgDiv">
                  </div>
                  </div>
                  <div id="defaultImg" style="display: none;" ><img width="350px" height="69px" id="backDefaultId"></img></div>
              </td>
            </tr>
          <tr>
              <td class="seven7 maptext_csform">标识图片大小为365*69像素，格式为jpg或png(不要有透明)。</td>
              <td>
               <input type="file" id="imgId" name="imgFile" class="srkjl23"  />
               <input type="hidden" id="imageType" name="imageType" />
              </td>
            </tr>
            <tr class="b">
              <td colspan="2">
              	<input type="submit" name="addbutton" class="btn_blue" onmouseover="this.style.backgroundPosition='0px -50px'" onmouseout="this.style.backgroundPosition='0px 0px'" value="设置" />
              	<input type="button" name="button2" class="btn_green" onclick="uploadmng.defaultBut()" onmouseover="this.style.backgroundPosition='-100px -50px'" onmouseout="this.style.backgroundPosition='-100px 0px'" value="恢复默认" />
                </td>
            </tr>
          </table>
          </form>
        </div>
      </div>
    </div>
    
    
    
    
    
</body>
</html>