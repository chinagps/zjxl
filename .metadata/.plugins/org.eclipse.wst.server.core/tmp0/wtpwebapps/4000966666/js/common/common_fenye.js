/**
 * @description: 拼接分页页码通用JS文件，接受一个pageView对象的JSON格式的数据，返回HTML页码字符串
 * @author: shen_chengjie
 * @email: 15576810155@163.com
 * @time: 2012-10-29
 */
(function() {
	// 生成HTML页码字符串
	generatPortalPages = function(pageView,formObj){
		// 分页数据HTML代码
		var pageHtml = "";
		// 分页页码拼接逻辑
		if(pageView && pageView.totalpage > 0){
			// 当前页码、总页码数、页码中间部分起始页码和结束页码
			var currentPage = pageView.currentpage, totalPage = pageView.totalpage;
			var beginIndex = pageView.pageindex.startindex ,endIndex = pageView.pageindex.endindex;
			var formId = $(formObj).attr('id');
			pageHtml += "<div class=\"chehouPage "+formId+"\">";
			pageHtml += "<div class=\"chehouPageFont\"><samp>&nbsp;共</samp><span>"+pageView.totalrecord+"</span><samp>条&nbsp;</samp><samp>每页</samp><span>"+pageView.maxresult+"</span><samp>条&nbsp;</samp></div>";
			pageHtml += "<a href=\"javascript:goPage("+totalPage+",'pre','"+formId+"')\">上一页</a>";
			if(currentPage == 1){
				pageHtml += "<span class=\"current\">1</span>";
			}else if(currentPage != 1){
				pageHtml += "<a href=\"javascript:topage('1','"+formId+"')\">1</a>";
			}
			if(beginIndex > 2){
				pageHtml += "&nbsp;…&nbsp;";
			}
			for(var pno = beginIndex; pno <= endIndex; pno++){
				if(pno > 1 && pno < totalPage){
					if(currentPage==pno){
						pageHtml += "<span class=\"current\">"+pno+"</span>";
					}else if(currentPage!=pno && pno!=0){
						pageHtml += "<a href=\"javascript:topage('"+pno+"','"+formId+"')\">"+pno+"</a>";
					}
				}
			}
			if(endIndex < (totalPage-1)){
				pageHtml += "&nbsp;…&nbsp;";
			}
			if(totalPage > 1){
				if(currentPage==totalPage){
					pageHtml += "<span class=\"current\">"+totalPage+"</span>";
				}else if(currentPage!=totalPage){
					pageHtml += "<a href=\"javascript:topage('"+totalPage+"','"+formId+"')\">"+totalPage+"</a>";
				}
			}
			pageHtml += "<a href=\"javascript:goPage("+totalPage+",'next','"+formId+"')\">下一页</a>";
			pageHtml += "</div>";
		}
		return pageHtml;
	};
	goPage = function(lastPage,flag,formObj){
		if(flag){
			var pageValue = parseInt($("."+formObj+" .current").text());
			if('pre'==flag){
				if(pageValue==1){return;}
				pageValue = pageValue - 1;
			}else if('next'==flag){
				if(pageValue==lastPage){return;}
				pageValue = pageValue + 1;
			}
			if(pageValue<=1){pageValue = 1;}else if(pageValue > lastPage){pageValue = lastPage;}
			topage(pageValue,formObj);/*引用该页面的JSP需要实现topage方法*/
		}
	};
	topage = function(pageNo,formObjId){
		var $formObj = $("#"+formObjId);
		if($formObj.size()<=0){ $formObj = $(document.forms[0]);}
		if($formObj.size()>0){
			$formObj.find("input[name='pageNo']").val(pageNo);
			$formObj.submit();
		}
	};
})();