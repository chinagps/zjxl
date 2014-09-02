<%@ page language="java" contentType="text/html; charset=utf-8"	pageEncoding="utf-8"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>业务支撑-媒体信息管理</title>
<script type="text/javascript" src="script/mediaInfo/mediainfoMng.js"></script>
<script type="text/javascript" src="script/mediaInfo/jquery.dd.js"></script>
</head>
<style>
.jgd-dropdown.jgd-countries .flag a {
height:18px; line-height:18px;
}
</style>
<body>
	<div id="mediainfonmg">
		<div class="content">
			<div class="right_c" >
				<div class="right_cs">

					<div id="mediaInfo_tabBox" class="mediaInfo_tabBox" style="border-bottom:none;">
						<ul class="mediaInfoTab_all">
							<li><a class="mediaInfoTab_back">本地多媒体</a></li>
							<li><a>远程多媒体</a></li>
						</ul>
					</div>

					<div class="right_cc" style="width:100%">

						<form id="searchform">
							<div class="Backstage2" style="border-top:#c0d7eb 1px solid;">
								<ul class="QueryListCondition">
									<li>


										<div>
											媒体类型:<select id="local_mediaType" style="width: 140px;" name="requestParam.equal.mediaType" class="srkjl4 w_yy_3">
												<option value="">全部</option>
												<option value="0">图片</option>
												<option value="1">音频</option>
											</select>
										</div>

										<div style="width: 210px;">
											<span>是否超载:</span><select id="isOverload" style="width: 140px;" name="requestParam.equal.isOverload" class="srkjl4 w_yy_3">
												<option value="">请选择</option>
												<option value="1">是</option>
												<option value="0">否</option>
											</select>
										</div></li>
									<li>


										<div>
											开始时间:<input id="media_local_startTime" class="srkjl4 w_yy_1 Wdate" style="width: 140px;" onfocus="javascript:WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss',isShowClear:true,readOnly:true})" />
										</div>

										<div style="width: 210px;">

											结束时间:<input id="media_local_endTime" class="srkjl4 w_yy_1 Wdate" style="width: 140px;" onfocus="javascript:WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss',isShowClear:true,readOnly:true})" />
										</div></li>
									<li>
										<div>
											<input type="button" id="findMedia" class="btn_inquires" onmouseover="this.style.backgroundPosition='0px -200px'" onmouseout="this.style.backgroundPosition='0px -150px'" value="&nbsp;" />
										</div>
									</li>

								</ul>
							</div>

						</form>

						<!-- 
      <div class="R"><select id="mediaInfo_vehicleNoList0"><option>全部</option></select></div>
       -->

						<!--<div class="right_cdc2">多媒体信息——图片浏览</div>-->
						<div id="viewImgDiv" style="height: 315px; ">
							<ul id="Searchresult" class="gallery" style="margin-top: 0px; background-color: white; border-color: white"></ul>
						</div>
						<div style="clear: both;"></div>
						<div id="Pagination" class="pagination" style="margin-left: 15px;"></div>
					</div>


					<div class="right_cc hidden">

						<form id="remote_searchform">
							<div class="Backstage2" style="border-top:#c0d7eb 1px solid;">
								<ul class="QueryListCondition">
									<li>
									
																			<div style="width: 210px;">
											开始时间:<input id="media_remote_startTime" class="srkjl4 w_yy_1 Wdate" style="width: 140px;" onfocus="javascript:WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss',isShowClear:true,readOnly:true})" />
										</div>

										<div style="width: 210px;">
											结束时间:<input id="media_remote_endTime" class="srkjl4 w_yy_1 Wdate" style="width: 140px;" onfocus="javascript:WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss',isShowClear:true,readOnly:true})" />
										</div>
									</li>
									<li>
										<div>
											媒体类型:<select id="rmeote_mediaType" style="width: 140px;" name="requestParam.equal.mediaType" class="srkjl4 w_yy_3">
												<option value="">全部</option>
												<option value="0">图片</option>
												<option value="1">音频</option>
											</select>
										</div>
									</li>
									<li>
										<div>
											<input type="button" id="remote_findMedia" class="btn_inquires" onmouseover="this.style.backgroundPosition='0px -200px'" onmouseout="this.style.backgroundPosition='0px -150px'" value="&nbsp;" />
<!--											<input id="remote_findMedia" type="button" value="" class="bt_yy" />-->
										</div>
									</li>

								</ul>
							</div>

						</form>

						<div class="L" style="width: 100%; display: none;" id="remoteMediaInfo_condition">
							<table>
								<tr>
									<td>&nbsp;&nbsp;&nbsp;排序方式:</td>
									<td><select id="mediaInfo_remote_orderSel" style="width: 140px;">
											<option value="desc" selected="selected">排序方式</option>
											<option value="desc">按照时间逆序</option>
											<option value="asc">按照时间顺序</option>
									</select></td>
									<td>车牌号码:</td>
									<td><select id="mediaInfo_vehicleNoList1"><option>全部</option>
									</select></td>
								</tr>
							</table>
						</div>



						<div id="mediaInfo_remoteListBox" style="height: 365px;">
							<ul class="gallery" id="mediaInfo_remote_searchResult" style="margin-top: 0px; background-color: white; border-color: white"></ul>
						</div>
						<div style="clear: both;"></div>
						<div id="mediaInfo_remotePagination" class="pagination" style="margin-left: 15px;margin-top: 10px; "></div>
					</div>


				</div>
			</div>
		</div>
		<div class="content" style="display: none;"></div>
	</div>
</body>
</html>
