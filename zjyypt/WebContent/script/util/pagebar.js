
var pageBarObj = function() {
	
};
pageBarObj.prototype = {
 pagebarFun : function(searchfun, currentPage, total, size){
	 if (typeof currentPage == 'undefined') {
			currentPage = 1;
		}
	// var pageSize = total%size==0?total/size:(((total % size) < 0 ? 1 :
	// 0)+1);//总页数
	var pageSize = parseInt(total / size) + ((total % size) > 0 ? 1 : 0);// 总页数
	var pageBarHtml = '<div class="opti_page">';
	
	
	// 处理首页
	pageBarHtml += '<div><span class="opti_first" onclick="' + searchfun + '(1);"></span></div>';
	// 处理上一页
	if (currentPage > 1 && pageSize > 1) {
		pageBarHtml += '<div><span class="opti_previous" onclick="' + searchfun + '(' + (currentPage - 1) + ');"></span></div>';
	} else {
		pageBarHtml += '<div><span class="opti_previous"></span></div>';
	}

	pageBarHtml += '<div><span class="opti_center">第'+currentPage+'页&nbsp;/&nbsp;共'+pageSize+'页</span></div>';
	// 处理下一页
	if (currentPage < pageSize) {
		pageBarHtml += '<div><span class="opti_next" onclick="'+ searchfun+ '('+ (parseInt(currentPage) + 1)+ ');"></span></div>';
	} else {
		pageBarHtml += '<div><span class="opti_next"></span></div>';
	}
	// 处理末页
	pageBarHtml += '<div><span class="opti_last" onclick="'+ searchfun + '(' + pageSize + ');"></span></div>';
	pageBarHtml += '</div>';
	$("#pageBarDiv").html(pageBarHtml);
}
};