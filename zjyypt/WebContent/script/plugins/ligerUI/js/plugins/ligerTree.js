/**
* jQuery ligerUI 1.0.2
*
* Author leoxie [ gd_star@163.com ]
*
*/
if(typeof (LigerUIManagers) == "undefined") LigerUIManagers = {};
(function ($)
{
    ///	<param name="$" type="jQuery"></param>

    $.fn.ligerGetTreeManager = function ()
    {
        return LigerUIManagers[this[0].id + "_Tree"];
    };
    $.ligerDefaults = $.ligerDefaults || {};
    $.ligerDefaults.Tree = {
            url: null,
            data: null,
            checkbox: true,
            autoCheckboxEven : true,
            parentIcon: 'folder',
            childIcon: 'leaf',
            textFieldName: 'text',
            attribute : ['id','url'],
            treeLine : true,        //是否显示line
            nodeWidth: 90,
            statusName : '__status',
            isLeaf : null, //是否子节点的判断函数
            onBeforeExpand : null,
            onContextmenu : null,
            onExpand : null,
            onBeforeCollapse: null,
            onCollapse : null,
            onBeforeSelect :null,
            onSelect :null,
            onBeforeCancelSelect :null,
            onCancelselect :null,
            onCheck :null,
//            onHover:null,
            onSuccess:null,
            onError:null,
            onClick:null,
            idFieldName : null,
            parentIDFieldName:null,
            topParentIDValue : 0,
            isCheckAll : true,
            isLoading : true,
            //根节点是否默认展开
            isRootExpand:false
    };


    $.fn.ligerTree = function (p)
    {
        this.each(function ()
        {
            p = $.extend({},$.ligerDefaults.Tree, p || {});
            if (this.usedTree) return;
            if ($(this).hasClass('l-hidden')) { return; }
            //public Object
            var g = {
                getData :function()
                {
                    return g.data;
                },
                //是否包含子节点
                hasChildren: function (treenodedata)
                {
                	if(p.isLeaf) return p.isLeaf(treenodedata);
                    if(treenodedata[p.childrenListName ? p.childrenListName : "childrenList"]&&treenodedata[p.childrenListName ? p.childrenListName : "childrenList"]!="null"){
                    	return treenodedata[p.childrenListName ? p.childrenListName : "childrenList"] ? true: false;
                    }else{
                    	return false;
                    }
                },
                //获取父节点
                getParentTreeItem: function (treenode, level)
                {
                    var treeitem = $(treenode);
                    if (treeitem.parent().hasClass("l-tree"))
                        return null;
                    if (level == undefined)
                    {
                        if (treeitem.parent().parent("li").length == 0)
                            return null;
                        return treeitem.parent().parent("li")[0];
                    }
                    var currentLevel = parseInt(treeitem.attr("outlinelevel"));
                    var currenttreeitem = treeitem;
                    for (var i = currentLevel - 1; i >= level; i--)
                    {
                        currenttreeitem = currenttreeitem.parent().parent("li");
                    }
                    return currenttreeitem[0];
                },
                //add by fanshine in 2012.5.15
                getIncompleteNodeLeaves: function(){
                	if (!p.checkbox) return null;
                	var checkedArr = [];
                	$(".l-checkbox-incomplete", g.tree).parent().parent("li").each(function (e, item)
                    {
                		$(".l-checkbox-checked", item).each(function(i, n){
                			var pdi = parseInt($(this).parent().parent("li").attr("treedataindex"));
                			var pd = po.getDataNodeByTreeDataIndex(g.data,pdi);
    						if(pd) checkedArr.push(pd.i);
//                			checkedArr.push($(this).attr("id").split("_")[0]);
                		});
                    });
                	return checkedArr;
                },
                //
                getNoteData: function (treenode)
                {
	                var pdi =  parseInt($(treenode).attr("treedataindex"));
					var pd = po.getDataNodeByTreeDataIndex(g.data,pdi);
					if(!pd) return null;
					var pc = $(treenode).find(".l-checkbox:first");
	
					if(pc.hasClass("l-checkbox-checked")){
						pd["status"] = "1";
						pd["cid"] = pd.i+"_checkbox_tree";
						return pd;
					}else if(pc.hasClass("l-checkbox-incomplete")){
						pd["status"] = "0";
						pd["cid"] = pd.i+"_checkbox_tree";
						return pd;
					}else{
						pd["status"] = "2";
						pd["cid"] = pd.i+"_checkbox_tree";
						return pd;
					}
					return null;
                },
                getChecked: function ()
                { 
                    if (!p.checkbox) return null;
                    var nodes = [];
                    $(".l-checkbox-checked", g.tree).parent().parent("li").each(function ()
                    {
                        var treedataindex = parseInt($(this).attr("treedataindex"));
                        var cid = $(this).find(".l-checkbox-checked:first").attr("id");

                        nodes.push({ target: this,data:po.getDataNodeByTreeDataIndex(g.data,treedataindex),status:1,cid:cid });
                    });
                    $(".l-checkbox-incomplete", g.tree).parent().parent("li").each(function ()
                    {
                        var treedataindex = parseInt($(this).attr("treedataindex"));
                        var cid = $(this).find(".l-checkbox-incomplete:first").attr("id");

                        nodes.push({ target: this,data:po.getDataNodeByTreeDataIndex(g.data,treedataindex),status:0,cid:cid });
                    });
                    return nodes;
                },
                getSelected: function ()
                {
                    var node = {};
                    node.target = $(".l-selected", g.tree).parent("li")[0];
                    if (node.target)
                    {
                        var treedataindex = parseInt($(node.target).attr("treedataindex"));
                        node.data = po.getDataNodeByTreeDataIndex(g.data,treedataindex);
                        return node;
                    }
                    return null;
                },
                //升级为父节点级别
                upgrade: function (treeNode)
                {
                    $(".l-note", treeNode).each(function ()
                    {
                        $(this).removeClass("l-note").addClass("l-expandable-open");
                    });
                    $(".l-note-last", treeNode).each(function ()
                    {
                        $(this).removeClass("l-note-last").addClass("l-expandable-open");
                    });
                    $("." + po.getChildNodeClassName(), treeNode).each(function ()
                    {
                        $(this)
                        .removeClass(po.getChildNodeClassName())
                        .addClass(po.getParentNodeClassName(true));
                    });
                },
                //降级为叶节点级别
                demotion: function (treeNode)
                {
                    if (!treeNode && treeNode[0].tagName.toLowerCase() != 'li') return;
                    var islast = $(treeNode).hasClass("l-last");
                    $(".l-expandable-open", treeNode).each(function ()
                    {
                        $(this).removeClass("l-expandable-open")
                        .addClass(islast ? "l-note-last" : "l-note");
                    });
                    $(".l-expandable-close", treeNode).each(function ()
                    {
                        $(this).removeClass("l-expandable-close")
                        .addClass(islast ? "l-note-last" : "l-note");
                    });
                    $("." + po.getParentNodeClassName(true), treeNode).each(function ()
                    {
                        $(this)
                        .removeClass(po.getParentNodeClassName(true))
                        .addClass(po.getChildNodeClassName());
                    });
                },
                collapseAll: function ()
                {
                    $(".l-expandable-open", g.tree).click();
                },
                expandAll: function ()
                {
                    $(".l-expandable-close", g.tree).click();
                },
                expandRootNode: function(index){
                	$(".l-expandable-close", g.tree).eq(index).click();
                },
//                expandLeavesByNode: function(node){
//                	$(".l-expandable-close", node).click();
//                },
                expandLeavesByNode: function(id){
                	$(".l-box", g.tree).each(function(){
                		if($(this).attr("id").split("_")[0] == id){
                			$(this).siblings(".l-expandable-close").click();
                			return false;
                		}
                	});
                },
                loadData: function (node, url, param)
                {	
                	if(p.isLoading){
                		g.loading.show();
                	}
                    //param = param || {};
                    //请求服务器
                    $.ajax({
                        type: 'post',
                        url: url,
                        data: param||{},
                        dataType: 'json',
                        success: function (data)
                        {
                        	if(p.isLoading){
                        		g.loading.hide();
                        	}
                            if(node && g.hasChildren(node)){
                            	return false;
                            }
                            g.append(node, data);
                            if (p.onSuccess) p.onSuccess(data,node,param);
                        }  ,
                        error: function (XMLHttpRequest, textStatus, errorThrown)
                        {
                            try
                            {
                            	if(p.isLoading){
                            		g.loading.hide();
                            	}
                                if (p.onError)
                                    p.onError(XMLHttpRequest, textStatus, errorThrown);
                            }
                            catch (e)
                            {

                            }
                        }
                    });
                },
                success: function(data,node,param){
                	if (p.onSuccess) p.onSuccess(data,node,param);
                },
                //清空
                clear: function ()
                {
                    g.tree.html("");
//                    $("> li",g.tree).each(function(){
//                    	g.remove(this);
//
//                    });
                },
                //刷新
                flash:function(node, url,param){
                	 g.clear();
                	 g.loadData(null, url,param);
                },
                remove: function (treeNode)
                {
                    var treedataindex = parseInt($(treeNode).attr("treedataindex"));
                    var treenodedata = po.getDataNodeByTreeDataIndex(g.data,treedataindex);
                    if(treenodedata) po.setTreeDataStatus([treenodedata],'delete');
                    var parentNode = g.getParentTreeItem(treeNode);
                    //复选框处理
                    if (p.checkbox)
                    {
                        $(".l-checkbox", treeNode).remove();
                        po.setParentCheckboxStatus($(treeNode));
                    }
                    $(treeNode).remove();
                    if (parentNode == null) //代表顶级节点
                    {
                        parentNode = g.tree.parent();
                    }
                    //set parent
                    var treeitemlength = $("> ul > li", parentNode).length;
                    if (treeitemlength > 0)
                    {
                        //遍历设置子节点
                        $("> ul > li", parentNode).each(function (i, item)
                        {
                            if (i == 0 && !$(this).hasClass("l-first"))
                                $(this).addClass("l-first");
                            if (i == treeitemlength - 1 && !$(this).hasClass("l-last"))
                                $(this).addClass("l-last");
                            if (i == 0 && i == treeitemlength - 1 && !$(this).hasClass("l-onlychild"))
                                $(this).addClass("l-onlychild");
                            $("> div .l-note,> div .l-note-last", this)
                           .removeClass("l-note l-note-last")
                           .addClass(i == treeitemlength - 1 ? "l-note-last" : "l-note");
                            po.setTreeItem(this, { isLast: i == treeitemlength - 1 });
                        });
                    }

                },
                //增加节点集合
                append: function (parentNode, newdata, clear)
                {
                    if (!newdata || !newdata.length) return false;
                    if(p.idFieldName && p.parentIDFieldName)
                        newdata = po.convertData(newdata);
                    po.addTreeDataIndexToData(newdata);
                    po.setTreeDataStatus(newdata,'add');
                    po.appendData(parentNode,newdata,clear);
                    if (!parentNode)//增加到根节点
                    {
                        //remove last node class
                        if ($("> li:last", g.tree).length > 0)
                            po.setTreeItem($("> li:last", g.tree)[0], { isLast: false });

                        var gridhtmlarr = po.getTreeHTMLByData(newdata,1,[],true);
                        gridhtmlarr[gridhtmlarr.length-1] = gridhtmlarr[0] = "";
                        g.tree.append(gridhtmlarr.join(''));

                        $(".l-body", g.tree).hover(function ()
                        {
                            $(this).addClass("l-over");
                            if(p.onHoverIn){
	                        	p.onHoverIn(this);
	                        }
                        }, function ()
                        {
                            $(this).removeClass("l-over");
                            if(p.onHoverOut){
	                        	p.onHoverOut(this);
	                        }
                        });

//                        po.upadteTreeWidth();
                        return;
                    }
                    var treeitem = $(parentNode);
                    var outlineLevel = parseInt(treeitem.attr("outlinelevel"));

                    var hasChildren = $("> ul", treeitem).length > 0;
                    if (!hasChildren)
                    {
                        treeitem.append("<ul class='l-children'></ul>");
                        //设置为父节点
                        g.upgrade(parentNode);

                    }
                    //remove last node class
                    if ($("> .l-children > li:last", treeitem).length > 0)
                        po.setTreeItem($("> .l-children > li:last", treeitem)[0], { isLast: false });

                    var isLast = [];
                    for (var i = 1; i <= outlineLevel - 1; i++)
                    {
                        var currentParentTreeItem = $(g.getParentTreeItem(parentNode, i));
                        isLast.push(currentParentTreeItem.hasClass("l-last"));
                    }
                    isLast.push(treeitem.hasClass("l-last"));
                    var gridhtmlarr = po.getTreeHTMLByData(newdata,outlineLevel+1,isLast,true);
                    gridhtmlarr[gridhtmlarr.length-1] = gridhtmlarr[0] = "";
                    $(">.l-children",parentNode).append(gridhtmlarr.join(''));

//                    po.upadteTreeWidth();

                    $(">.l-children .l-body", parentNode).hover(function ()
                    {
                        $(this).addClass("l-over");
                        if(p.onHoverIn){
                        	p.onHoverIn(this);
                        }
                    }, function ()
                    {
                        $(this).removeClass("l-over");
                        if(p.onHoverOut){
                        	p.onHoverOut(this);
                        }
                    });
                }
            };
            //private Object
            var po = {
                //根据数据索引获取数据
                getDataNodeByTreeDataIndex:function(data,treedataindex)
                {
                    for(var i =0;i<data.length;i++)
                    {
                        if(data[i].treedataindex == treedataindex)
                            return data[i];
                        if(data[i][p.childrenListName ? p.childrenListName : "childrenList"])
                        {
                            var targetData= po.getDataNodeByTreeDataIndex(data[i][p.childrenListName ? p.childrenListName : "childrenList"],treedataindex);
                            if(targetData) return targetData;
                        }
                    }
                    return null;
                },
                //设置数据状态
                setTreeDataStatus : function(data,status)
                {
                    $(data).each(function ()
                    {
                        this[p.statusName] = status;
                        if(this.childrenListList)
                        {
                            po.setTreeDataStatus(this[p.childrenListName ? p.childrenListName : "childrenList"],status);
                        }
                    });
                },
                //设置data 索引
                addTreeDataIndexToData : function(data)
                {
                    $(data).each(function ()
                    {
                        if(this.treedataindex != undefined) return;
                        this.treedataindex = g.treedataindex++;
                        if(this[p.childrenListName ? p.childrenListName : "childrenList"])
                        {
                            po.addTreeDataIndexToData(this[p.childrenListName ? p.childrenListName : "childrenList"]);
                        }
                    });
                },
                //添加项到g.data
                appendData: function (treeNode,data,clear)
                {
                    var treedataindex = parseInt($(treeNode).attr("treedataindex"));
                    var treenodedata = po.getDataNodeByTreeDataIndex(g.data,treedataindex);
                    if(g.treedataindex == undefined) g.treedataindex = 0;
                    if(treenodedata && treenodedata[p.childrenListName ? p.childrenListName : "childrenList"] == undefined) treenodedata[p.childrenListName ? p.childrenListName : "childrenList"] =[];
                    if(clear){
                    	g.data = [];
                    }
                    $(data).each(function (i,item)
                    {
                        if(treenodedata){
                            treenodedata[p.childrenListName ? p.childrenListName : "childrenList"][treenodedata[p.childrenListName ? p.childrenListName : "childrenList"].length] = $.extend({},item);}
                        else{
                        	if(g.data.length > 0){
                        		var alength = g.data.length;
                        		var isHave = false;
                        		for(var w = 0; w < alength; w++){
                        			var childRen = g.data[w][p.childrenListName ? p.childrenListName : "childrenList"];
                        			if(childRen){
	                            		var childLength = childRen.length;
	                            		for(var m = 0; m < childLength; m++){
	                            			if(childRen[m] == item){
	                            				isHave = true;
	                            				break;
	                            			}
	                            		}
                        			}
                        			if(g.data[w] == item){
                        				isHave = true;
                        				break;
                        			}
                        		}

                        		if(!isHave){
                        			g.data[g.data.length] =  $.extend({},item);
                        		}
                        	}else{
                        		g.data[g.data.length] =  $.extend({},item);
                        	}
                        }
                    });

                },
                setTreeItem: function (treeNode, options)
                {
                    if (!options) return;
                    var treeItem = $(treeNode);
                    var outlineLevel = parseInt(treeItem.attr("outlinelevel"));
                    if (options.isLast != undefined)
                    {
                        if (options.isLast == true)
                        {
                            treeItem.removeClass("l-last").addClass("l-last");
                            $("> div .l-note", treeItem).removeClass("l-note").addClass("l-note-last");
                            $(".l-children li", treeItem)
                            .find(".l-box:eq(" + (outlineLevel - 1) + ")")
                            .removeClass("l-line");
                        }
                        else if (options.isLast == false)
                        {
                            treeItem.removeClass("l-last");
                            $("> div .l-note-last", treeItem).removeClass("l-note-last").addClass("l-note");

                            $(".l-children li", treeItem)
                            .find(".l-box:eq(" + (outlineLevel - 1) + ")")
                            .removeClass("l-line")
                            .addClass("l-line");
                        }
                    }
                },
                upadteTreeWidth: function ()
                {
                    var treeWidth = g.maxOutlineLevel * 22;
                    if (p.checkbox) treeWidth += 22;
                    if (p.parentIcon || p.childIcon) treeWidth += 22;
                    treeWidth += p.nodeWidth;
                    g.tree.width(treeWidth);
                },
                getChildNodeClassName: function ()
                {
                    return 'l-tree-icon-' + p.childIcon;
                },
                getParentNodeClassName: function (isOpen)
                {
                    var nodeclassname = 'l-tree-icon-' + p.parentIcon;
                    if (isOpen) nodeclassname += '-open';
                    return nodeclassname;
                },
                //根据data生成最终完整的tree html
                getTreeHTMLByData: function(data, outlineLevel ,isLast, isExpand)
                {
                    if (g.maxOutlineLevel < outlineLevel)
                        g.maxOutlineLevel = outlineLevel;
                    isLast = isLast || [];
                    outlineLevel = outlineLevel || 1;
                    var treehtmlarr = [];
                    if(!isExpand){
                    	if(p.isRootExpand){
                    		treehtmlarr.push('<ul class="l-children " >');
                    	}else{
                    		treehtmlarr.push('<ul class="l-children " style="display:none">');
                    	}
                    }
                    else treehtmlarr.push("<ul class='l-children'>");
                    for (var i = 0; i < data.length; i++)
                    {
                        var isFirst = i==0;
                        var isLastCurrent = i==data.length-1;
                        var isExpandCurrent = true;
                        if(data[i].isexpand==false || data[i].isexpand == "false") isExpandCurrent = false;

                        treehtmlarr.push('<li ');
                        if(data[i].treedataindex!=undefined)
                            treehtmlarr.push('treedataindex="'+data[i].treedataindex+'" ');
                        if(isExpandCurrent)
                            treehtmlarr.push('isexpand='+data[i].isexpand +' ');
                        treehtmlarr.push('outlinelevel='+outlineLevel +' ');
                        //增加属性支持
                        for(var j=0;j<g.sysAttribute.length;j++)
                        {
                            if($(this).attr(g.sysAttribute[j]))
                                data[dataindex][g.sysAttribute[j]] = $(this).attr(g.sysAttribute[j]);
                        }
                        for(var j=0;j<p.attribute.length;j++)
                        {
                            if(data[i][p.attribute[j]])
                                treehtmlarr.push(p.attribute[j] + '="'+data[i][p.attribute[j]]+'" ');
                        }

                        //css class
                        treehtmlarr.push('class="');
                        isFirst && treehtmlarr.push('l-first ');
                        isLastCurrent && treehtmlarr.push('l-last ');
                        isFirst && isLastCurrent && treehtmlarr.push('l-onlychild ');
                        treehtmlarr.push('"');
                        treehtmlarr.push('>');
                        treehtmlarr.push('<div class="l-body">');
                        for (var k = 0; k <= outlineLevel - 2; k++)
                        {
                            if(isLast[k]) treehtmlarr.push('<div class="l-box"></div>');
                            else treehtmlarr.push('<div class="l-box l-line"></div>');
                        }
                        //这里修改为根据后台传回来的参数确定级别
                        var haveChild  = false;
                        if(p.hasChild){
                        	if(data[i][p.hasChild]=="1"||data[i][p.hasChild]=="2"){
                        		haveChild = true;
                        		isExpandCurrent = false;
                        	}
                        }else{
	                        if(p.childType){
	                        	//李骐 2012-05-24  组织树过滤内容(组织节点下没有子节点，该节点改为叶子节点)
	                        	//生成Tree时，增加的属性。treeFilter：true
	                        	if(p.treeFilter){
		                        	if(data[i][p.childType]=="1" && data[i].childrenList != ""){
		                        		haveChild = true;
		                        	}
	                        	}else{
	                        		/*  原代码 */
	                        		if(data[i][p.childType]=="1"){
		                        		haveChild = true;
		                        	}
	                        	}
	                        }else {
	                        	haveChild = g.hasChildren(data[i]);
	                        }
                        }
                        /////////////////////////////////////
                        if (haveChild)
                        {
                            if(isExpandCurrent) treehtmlarr.push('<div class="l-box l-expandable-open"></div>');
                            else treehtmlarr.push('<div class="l-box l-expandable-close"></div>');
                            if(p.checkbox)
                            {
	                            if(p.hasChild){
                           			var chec = false;
//                            		if(p.loadCheckedData){
//                            			chec = p.loadCheckedData(data[i]);
//                            		}
                            		if(data[i].t < 3 && (data[i].s > 200 || data[i].s < 1) && !p.isCheckAll ){
                            			treehtmlarr.push('<div id=\"'+(data[i].i||data[i].id||data[i].vid||"4_")+'_checkbox_tree\" class="l-box l-uncheckbox l-uncheckbox-checked"></div>');
                            		}else{
//                                		if(chec){
//                                			treehtmlarr.push('<div id=\"'+(data[i].i||data[i].id||data[i].vid||"4_")+'_checkbox_tree\" class="l-box l-checkbox l-checkbox-checked"></div>');
//                                		}else{
                                			 treehtmlarr.push('<div id=\"'+(data[i].i||data[i].id||data[i].vid||"4_")+'_checkbox_tree\"  class="l-box l-checkbox l-checkbox-unchecked"></div>');
//                                		}
                            		}
	                           	 }else {
	                            	 if(data[i].ischecked)
	                                     treehtmlarr.push('<div class="l-box l-checkbox l-checkbox-checked"></div>');
	                                 else
	                                     treehtmlarr.push('<div class="l-box l-checkbox l-checkbox-unchecked"></div>');
	                           	 }
                            }

                            p.parentIcon && !isExpandCurrent &&  treehtmlarr.push('<div class="l-box ' + po.getParentNodeClassName() + '"></div>');
                            p.parentIcon && isExpandCurrent &&  treehtmlarr.push('<div class="l-box ' + po.getParentNodeClassName(true) + '"></div>');
                        } else {
                            if(isLastCurrent) treehtmlarr.push('<div class="l-box l-note-last"></div>');
                            else treehtmlarr.push('<div class="l-box l-note"></div>');
                            if(p.checkbox)
                            {
                            	 if(p.hasChild){
//                        			var chec = false;
//                             		if(p.loadCheckedData){
//                             			chec = p.loadCheckedData(data[i]);
//                             		}
//                             		if(chec){
//                             			treehtmlarr.push('<div id=\"'+(data[i].i||data[i].id||data[i].vid||"4_")+'_checkbox_tree_leaf\"  class="l-box l-checkbox l-checkbox-checked"></div>');
//                             		}else{
                             			treehtmlarr.push('<div id=\"'+(data[i].i||data[i].id||data[i].vid||"4_")+'_checkbox_tree_leaf\"  class="l-box l-checkbox l-checkbox-unchecked"></div>');
//                             		}
                            	 }else {
	                            	 if(data[i].ischecked)
	                                     treehtmlarr.push('<div class="l-box l-checkbox l-checkbox-checked"></div>');
	                                 else
	                                     treehtmlarr.push('<div class="l-box l-checkbox l-checkbox-unchecked"></div>');
                            	 }
                             }

                            p.childIcon && treehtmlarr.push('<div class="l-box ' + po.getChildNodeClassName() + '"></div>');
                        }
                        var text = data[i][p.textFieldName];
                        var span = '<span title="'+text+'" class="vehicleNoText">' + text + '</span></div>';

                        if(p.appendText){
                        	span = p.appendText(data[i]);
                        }
                        treehtmlarr.push(span);
                        if (g.hasChildren(data[i]))
                        {
                            var isLastNew = [];
                            for(var k=0;k<isLast.length;k++)
                            {
                                isLastNew.push(isLast[k]);
                            }
                            isLastNew.push(isLastCurrent);
                            treehtmlarr.push(po.getTreeHTMLByData(data[i][p.childrenListName ? p.childrenListName : "childrenList"],outlineLevel+1,isLastNew,isExpandCurrent).join(''));
                        }
                        treehtmlarr.push('</li>');
                    }
                    treehtmlarr.push("</ul>");
                    return treehtmlarr;

                },
                //根据简洁的html获取data
                getDataByTreeHTML : function(treeDom)
                {
                    var data = [];
                    $("> li", treeDom).each(function (i, item)
                    {
                        var dataindex = data.length;
                        data[dataindex] =
                        {
                            treedataindex:g.treedataindex++
                        };
                        data[dataindex][p.textFieldName] = $("> span,> a",this).html();
                        for(var j=0;j<g.sysAttribute.length;j++)
                        {
                            if($(this).attr(g.sysAttribute[j]))
                                data[dataindex][g.sysAttribute[j]] = $(this).attr(g.sysAttribute[j]);
                        }
                        for(var j=0;j<p.attribute.length;j++)
                        {
                            if($(this).attr(p.attribute[j]))
                                data[dataindex][p.attribute[j]] = $(this).attr(p.attribute[j]);
                        }
                        if($("> ul",this).length>0)
                        {
                            data[dataindex][p.childrenListName ? p.childrenListName : "childrenList"] = po.getDataByTreeHTML($("> ul",this));
                        }
                    });
                    return data;
                },
                applyTree: function ()
                {
                    g.data = po.getDataByTreeHTML(g.tree);
                    var gridhtmlarr = po.getTreeHTMLByData(g.data,1,[],true);
                    gridhtmlarr[gridhtmlarr.length-1] = gridhtmlarr[0] = "";
                    g.tree.html(gridhtmlarr.join(''));
//                    po.upadteTreeWidth();
                    $(".l-body", g.tree).hover(function ()
                    {
                        $(this).addClass("l-over");
                    }, function ()
                    {
                        $(this).removeClass("l-over");
                    });
                },
                applyTreeEven: function (treeNode)
                {
                    $("> .l-body", treeNode).hover(function ()
                    {
                        $(this).addClass("l-over");
                    }, function ()
                    {
                        $(this).removeClass("l-over");
                    });
                },
                setTreeEven : function()
                {
                    p.onContextmenu && g.tree.bind("contextmenu",function(e){
                        var obj = (e.target || e.srcElement);
                        var treeitem = null;
                        if(obj.tagName.toLowerCase() == "a" || obj.tagName.toLowerCase()=="span" || $(obj).hasClass("l-box"))
                            treeitem = $(obj).parent().parent();
                        else if($(obj).hasClass("l-body"))
                            treeitem = $(obj).parent();
                        else if(obj.tagName.toLowerCase() == "li")
                            treeitem = $(obj);
                        if(!treeitem) return;
                        var treedataindex = parseInt(treeitem.attr("treedataindex"));
                        var treenodedata = po.getDataNodeByTreeDataIndex(g.data,treedataindex);
                        return p.onContextmenu({data:treenodedata,target:treeitem[0]},e);
                    });
                    g.tree.click(function (e)
                    {
                    	var obj = (e.target || e.srcElement);
                        var treeitem = null;
//                        var realItem = null;
                        if(obj.tagName.toLowerCase() == "a" || obj.tagName.toLowerCase()=="span" || $(obj).hasClass("l-box"))
                            treeitem = $(obj).parent().parent();
                        else if($(obj).hasClass("l-body"))
                            treeitem = $(obj).parent();
                        else if($(obj).parent().parent().parent().parent("li").attr("treedataindex"))
                        	treeitem = $(obj).parent().parent().parent().parent("li");
                        else{
                            treeitem = $(obj);
                        }
                        var isRoot = false;
                        if(treeitem.parent().hasClass("l-tree")) isRoot = true;
                        
                        if(!treeitem) return;

                        realItem = treeitem;
                        if(treeitem.attr("treedataindex")){

                        }else{
                        	if(p.isMonitorTree){
                            	treeitem = $(obj).parent().parent().parent().parent().parent();
                            }
                        }

                        var treedataindex = parseInt(treeitem.attr("treedataindex"));
//                        var possable = $(obj).parent().parent().parent().parent("li");
//                        if(!treedataindex && possable) treedataindex = possable.attr("treedataindex");
                        var treenodedata = po.getDataNodeByTreeDataIndex(g.data,treedataindex);
                        var treeitembtn = $(".l-body:first .l-expandable-open:first,.l-body:first .l-expandable-close:first",treeitem);
                        if(!$(obj).hasClass("l-checkbox"))
                        {
                           if ($(">div:first",treeitem).hasClass("l-selected"))
                            {
                                if(p.onBeforeCancelSelect
                                && p.onBeforeCancelSelect({data:treenodedata,target:treeitem[0]}) == false)
                                    return false;
                                $(">div:first",treeitem).removeClass("l-selected");
                                p.onCancelSelect && p.onCancelSelect({data:treenodedata,target:treeitem[0]});
                            }
                            else
                            {
                                if(p.onBeforeSelect
                                && p.onBeforeSelect({data:treenodedata,target:treeitem[0]}) == false)
                                    return false;
                                $(".l-body", g.tree).removeClass("l-selected");
                                $(">div:first",treeitem).addClass("l-selected");
                                    p.onSelect && p.onSelect({data:treenodedata,target:treeitem[0]});
                            }
                        }
                        //chekcbox even
                        if ($(obj).hasClass("l-checkbox"))
                        {
                            if(p.autoCheckboxEven)
                            {

                                //状态：未选中
                                if ($(obj).hasClass("l-checkbox-unchecked"))
                                {
                                	if(p.onBeforeCheck && !p.onBeforeCheck({data:treenodedata,target:treeitem[0]},true)){
                                		return false;
                                	}
                                	$(obj).removeClass("l-checkbox-unchecked").addClass("l-checkbox-checked");
                                    $(".l-children .l-checkbox", treeitem)
                                    .removeClass("l-checkbox-incomplete l-checkbox-unchecked")
                                    .addClass("l-checkbox-checked");
                                    po.setParentCheckboxStatus(treeitem);
                                    p.onCheck && p.onCheck({data:treenodedata,target:treeitem[0]},true);
                                }
                                //状态：选中
                                else if ($(obj).hasClass("l-checkbox-checked"))
                                {
                                	$(obj).removeClass("l-checkbox-checked").addClass("l-checkbox-unchecked");
                                    $(".l-children .l-checkbox", treeitem)
                                    .removeClass("l-checkbox-incomplete l-checkbox-checked")
                                    .addClass("l-checkbox-unchecked");
                                    po.setParentCheckboxStatus(treeitem);
                                    p.onCheck && p.onCheck({data:treenodedata,target:treeitem[0]},false);
                                }
                                //状态：未完全选中
                                else if ($(obj).hasClass("l-checkbox-incomplete"))
                                {
                                	if(p.onBeforeCheck && !p.onBeforeCheck({data:treenodedata,target:treeitem[0]},true)){
                                		return false;
                                	}
                                	$(obj).removeClass("l-checkbox-incomplete").addClass("l-checkbox-checked");
                                    $(".l-children .l-checkbox", treeitem)
                                    .removeClass("l-checkbox-incomplete l-checkbox-unchecked")
                                    .addClass("l-checkbox-checked");
                                    po.setParentCheckboxStatus(treeitem);
                                    p.onCheck && p.onCheck({data:treenodedata,target:treeitem[0]},true);
                                }

                            }
                        }else if($(obj).hasClass("l-box")){
                        	  //状态：已经张开
                            if (treeitembtn.hasClass("l-expandable-open"))
                            {
                                if(p.onBeforeCollapse && p.onBeforeCollapse({data:treenodedata,target:treeitem[0]}) == false)
                                    return false;
                                treeitembtn.removeClass("l-expandable-open").addClass("l-expandable-close");
                                $("> .l-children", treeitem).slideToggle('fast');
                                $("> div ." + po.getParentNodeClassName(true), treeitem)
	                                .removeClass(po.getParentNodeClassName(true))
	                                .addClass(po.getParentNodeClassName());

                                p.onCollapse && p.onCollapse({data:treenodedata,target:treeitem[0]});
                            }
                            //状态：没有张开
                            else if (treeitembtn.hasClass("l-expandable-close"))
                            {
                            	if(p.onBeforeExpand && p.onBeforeExpand({data:treenodedata,target:treeitem[0]}, isRoot) == false)
                            		return false;
                                treeitembtn.removeClass("l-expandable-close").addClass("l-expandable-open");
                                $("> .l-children", treeitem).slideToggle('fast',function(){
                                    p.onExpand && p.onExpand({data:treenodedata,target:treeitem[0]});
                                });
                                $("> div ." + po.getParentNodeClassName(), treeitem)
	                                .removeClass(po.getParentNodeClassName())
	                                .addClass(po.getParentNodeClassName(true));
                            }
                        }
                        if( p.onClick && !$(obj).hasClass("l-box")){
                             if(p.data){
                            	 treenodedata = $.extend(treenodedata,p.data);
                             }
                        	 p.onClick.call(this,{data:treenodedata,target:realItem[0]},p.clickScope);//realItem
                        }
                    });
                },
                //递归设置父节点的状态
                setParentCheckboxStatus: function (treeitem)
                {	
                    //当前同级别或低级别的节点是否都选中了
                    var isCheckedComplete = $(".l-checkbox-unchecked", treeitem.parent()).length == 0;
                    //当前同级别或低级别的节点是否都没有选中
                    var isCheckedNull = $(".l-checkbox-checked", treeitem.parent()).length == 0;
                    if (isCheckedComplete)
                    {
                        treeitem.parent().prev().find(".l-checkbox")
                                    .removeClass("l-checkbox-unchecked l-checkbox-incomplete")
                                    .addClass("l-checkbox-checked");
                    }
                    else if (isCheckedNull)
                    {
                        treeitem.parent().prev().find("> .l-checkbox")
                                    .removeClass("l-checkbox-checked l-checkbox-incomplete")
                                    .addClass("l-checkbox-unchecked");
                    }
                    else
                    {
                        treeitem.parent().prev().find("> .l-checkbox")
                                    .removeClass("l-checkbox-unchecked l-checkbox-checked")
                                    .addClass("l-checkbox-incomplete");
                    }
                    if (treeitem.parent().parent("li").length > 0)
                        po.setParentCheckboxStatus(treeitem.parent().parent("li"));
                },
                convertData:function(data)      //将ID、ParentID这种数据格式转换为树格式
                {
                    if(!data || !data.length) return [];
                    var isolate = function(pid)//根据ParentID判断是否孤立
                    {
                        if(pid == p.topParentIDValue) return false;
                        for(var i=0;i<data.length;i++)
                        {
                            if(data[i][p.idFieldName] == pid) return false;
                        }
                        return true;
                    };
                    //计算孤立节点的个数
                    var isolateLength =0;
                    for(var i=0;i<data.length;i++)
                    {
                        if(isolate(data[i][p.parentIDFieldName])) isolateLength++;
                    }
                    var targetData = [];                    //存储数据的容器(返回)
                    var itemLength = data.length;           //数据集合的个数
                    var insertedLength = 0;                 //已插入的数据个数
                    var currentIndex = 0;                   //当前数据索引
                    var getItem = function(container,id)    //获取数据项(为空时表示没有插入)
                    {
                        if(!container.length) return null;
                        for(var i=0;i<container.length;i++)
                        {
                            if(container[i][p.idFieldName] == id) return container[i];
                            if(container[i][p.childrenListName ? p.childrenListName : "childrenList"])
                            {
                                var finditem = getItem(container[i][p.childrenListName ? p.childrenListName : "childrenList"],id);
                                if(finditem) return finditem;
                            }
                        }
                        return null;
                    };
                    var addItem = function(container,item)  //插入数据项
                    {
                        container.push($.extend({},item));
                        insertedLength++;
                    };
                    //判断已经插入的节点和孤立节点 的个数总和是否已经满足条件
                    while(insertedLength + isolateLength <itemLength)
                    {
                        var item = data[currentIndex];
                        var id = item[p.idFieldName];
                        var pid = item[p.parentIDFieldName];
                        if(pid == p.topParentIDValue)//根节点
                        {
                            getItem(targetData,id) == null && addItem(targetData,item);
                        }
                        else
                        {
                            var pitem = getItem(targetData,pid);
                            if(pitem && getItem(targetData,id) == null)//找到父节点数据并且还没插入
                            {
                                pitem[p.childrenListName ? p.childrenListName : "childrenList"] =  pitem[p.childrenListName ? p.childrenListName : "childrenList"] || [];
                                addItem(pitem[p.childrenListName ? p.childrenListName : "childrenList"],item);
                            }
                        }
                        currentIndex = (currentIndex+1)%itemLength;
                    }
                    return targetData;
                }
            };
            if (!$(this).hasClass('l-tree')) $(this).addClass('l-tree');
            g.tree = $(this);
            if(!p.treeLine) g.tree.addClass("l-tree-noline");
            g.sysAttribute = ['isexpand','ischecked','href','style'];
            g.loading = $("<div class='l-tree-loading'></div>");
            g.tree.after(g.loading);
            g.data = [];
            g.maxOutlineLevel = 1;
            g.treedataindex = 0;
            po.applyTree();
            po.setTreeEven();
            if (p.data)
            {
                g.append(null, p.data);
            }
            if (p.url)
            {
                g.loadData(null, p.url, p.queryParam);
            }
            if (this.id == undefined || this.id == "") this.id = "LigerUI_" + new Date().getTime();
            LigerUIManagers[this.id + "_Tree"] = g;
            this.usedTree = true;
        });
        if (this.length == 0) return null;
        if (this.length == 1) return LigerUIManagers[this[0].id + "_Tree"];
        var managers = [];
        this.each(function() {
            managers.push(LigerUIManagers[this.id + "_Tree"]);
        });
        return managers;
    };

})(jQuery);