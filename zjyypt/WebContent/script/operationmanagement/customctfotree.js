/*********************************************************
 * 自定义左侧树
 * 
 * 调用方法：
 * var options = {mainContainer:"left_panel",//左侧树容器ID
 * 				  viewPanel:['corp','team','vehicle','line','driver'],//显示面板
 * 				  defaultFV:'corp',//默认显示面板
 * 				  height:this.height-8,//高度
 * 				  isCheckAll:true,//是否全选
 * 				  loadSuccessFun:function(){
									alert('aa');
									}//回调函数  在左侧树加载完成后执行
				};
 * var tree = new CustomCtfoTree(options);
 * 
 * 属性
 * currentPanel 当前的左侧树面板 corp team vehicle line driver
   currentTreeManager 当前树的管理器
 * 提供方法
 * getGroupId(flag) 获取当前选中的企业id，多个以逗号分隔 flag : true or false  是否过滤半选状态
 * getFleetId(flag) 获取当前选中的车队id，多个以逗号分隔 flag : true or false  是否过滤半选状态
 * getVehicleId(flag) 获取当前选中的车辆id，多个以逗号分隔 flag : true or false  是否过滤半选状态
 * getWayLineId(flag) 获取当前选中的线路id，多个以逗号分隔 flag : true or false  是否过滤半选状态
 * getDriverId(flag) 获取当前选中的驾驶员id，多个以逗号分隔 flag : true or false  是否过滤半选状态
 * getCurrentPanelObj() 当前选中的面板对象
 * yujch
 *********************************************************/
var CustomCtfoTree = function(options){
	this.version = "create by yujch in 2012.06.10";
	this.defaults = { defaultHeight:"500" ,defaultFV:"corp",checkAll:true,evenRowClass:"evenRow", oddRowClass:"oddRow", activeRowClass:"activeRow" };
	this.opts = $.extend({}, this.defaults, options);
	this.mainContainer = $("#"+this.opts.mainContainer); //包含此对象的div对象
	this.loadHtml = "script/operationmanagement/customctfotree.html";
	this.currentPanel = null;
	this.currentTreeManager = null;
	this.selectedNodeId = "";
	this.isFirstLoad=true;
	this.init();
};

CustomCtfoTree.prototype = {
		init : function(){
			var obj = this;
			//添加系统级变量存储树数据
			if (!(KCPT.TREE_DATA)){
				KCPT.TREE_DATA = {};
			}
			//加载树静态资源
			obj.load();
		},
		load : function(){
			var obj = this;
			if (obj.mainContainer){
				obj.mainContainer.load(obj.loadHtml,null,function(){
					//手风琴对象
					var accordionObj = $("DIV[name='accordion']",obj.mainContainer);
					
					//备份手风琴对象原始内容
					//var initialContent = $(" > DIV",accordionObj);
					var panelTypeMap = {};
					$("> div", accordionObj).each(function (i, box)
		            {
						var innerid =$(box).attr("innerid");
		                if (innerid)
		                {
		                	if (obj.panelDisplay(innerid)){
		                		$.data(panelTypeMap,$(box).attr("title"),$(box).attr("innerid"));
		                		//为当前元素的子元素添加id
		                		//$(box).attr("id","panelInner_"+jQuery.uuid);
		                		//$(" > div").attr("id","panelInner_"+jQuery.uuid);
							}else{
								//删除不需要显示的手风琴面板 
								$(" > DIV[innerid='"+innerid+"']",accordionObj).remove();
							}
		                }
		            });
					//取出当前树第一个面板
					obj.opts.defaultFV = $("> div:first", accordionObj).attr("innerid");
					//加入载入成功后相关初始设置
					obj.initAccordion(accordionObj,panelTypeMap);
					
					//默认切换到显示第一个面板
					var firstview = obj.opts.defaultFV;
					if (obj.opts.firstview){
						firstview = obj.opts.firstview;
					}
					var accordionObj = $("DIV[name='accordion']",obj.mainContainer);
					$("> .l-accordion-header", accordionObj).each(function (i, box)
		            {
						if ($("> .l-accordion-toggle", box).hasClass("l-accordion-toggle-close")){
							if ($(this).attr("innerid")==firstview){
								$(box).trigger("click");
							}
						}
		            });
					
					//如果当前面板为第一个面板,则需要默认加载一次数据
					if (firstview==obj.opts.defaultFV){
						obj.currentPanel = firstview;
						obj.toggleAccordion(accordionObj,firstview);
					}
					
				});
			}
		},
		//回调函数执行
		runCallBack : function (){
			var obj = this;
			//如果是第一次加载则执行回调函数。
 			if (obj.isFirstLoad){
 				if (obj.opts.loadSuccessFun){
 					obj.opts.loadSuccessFun();
 				}
 				obj.isFirstLoad = false;
 			}
		},
		panelDisplay : function(innerid){
			var obj = this;
			var flag = false;
			if (obj.opts.viewPanel){
				for (var j=0;j<obj.opts.viewPanel.length;j++){
					if (innerid==obj.opts.viewPanel[j]){
						flag = true;
						break;
					}
				}
			}else{
				flag = true;
			}
			return flag;
		},
		//初始化主手风琴组件
		initAccordion : function(accordionObj,typeMap){
			var obj = this;
			var height = obj.opts.defaultHeight;
			if (obj.opts.height){
				height = obj.opts.height;
			}
			accordionObj.ligerAccordion({ height : height,changeHeightOnResize : true,speed : null});
			
			$("> .l-accordion-header", accordionObj).each(function (i, box)
            {
				$(box).attr("innerid",$.data(typeMap,$("> .l-accordion-header-inner", box).html())).bind("click",function(){
					if ($("> .l-accordion-toggle", box).hasClass("l-accordion-toggle-open")){
						obj.currentPanel=$(this).attr("innerid");
						//切换手风琴组件
						obj.toggleAccordion(accordionObj,$(this).attr("innerid"));
					}
				});
				
            });
 		},
 		getPosition:function(obj){
 			var top=0;
	 		top = obj.offset().top;
 			return top;
 		},
 		//切换手风琴组件 参数：切换后的手风琴面板对象
 		toggleAccordion : function(accordionObj,innerid){
 			var obj = this;
 			//面板内容对象
 			$("> .l-accordion-content", accordionObj).each(function (i, box)
            {
				if ($(box).attr("innerid")==innerid){
					var currentPanelObj = $(box);
					var panelContextObj = $("DIV[class='panelInner'] > ul[name='panelCon']",currentPanelObj);
					if (innerid=='vehicle'){
						//计算高度
						var hgt = 260;
						if (obj.getPosition(panelContextObj)){
							hgt=$(window).height()-obj.getPosition(panelContextObj)-50;
						}
						panelContextObj.css("overflow","auto").css("height",hgt+"px");
					}
		 			//如果当前面板下有树，则加载
		 			if (panelContextObj.attr("treedataurl")){
		 				//先判断树数据是否存在，如存在则不用查询
		 				
		 				if ($.data(KCPT.TREE_DATA,innerid)){
		 					//直接加载树
		 					obj.loadCurrectPanelTree(innerid,panelContextObj,$.data(KCPT.TREE_DATA,innerid));
		 				}else{
		 					//请求数据
		 					$.ajax({
				 				   type: 'post',
				 				   url: panelContextObj.attr("treedataurl"),
				 				   data: '',
				 				   success: function(col){
				 					   //查询成功后缓存数据
				 					   var data = eval(col);
				 					   $.data(KCPT.TREE_DATA,innerid,data);
				 					   //加载树
				 					   obj.loadCurrectPanelTree(innerid,panelContextObj,data);
				 				   }
				 				});
		 				}
		 			}
		 			//手风琴面板特殊处理项
		 			if (innerid=='vehicle'){
		 				obj.bindPanelVehicleEvent(currentPanelObj);
		 			}
				}
            });
 		},
 		loadCurrectPanelTree : function(innerid,panelContextObj,data){
 			var obj = this;
 			var options = {
						data: data,
						onBeforeExpand : function(note){
							if (innerid=='vehicle'){
								obj.treeClick(note);
							}
						},
						checkbox : true,
						isCheckAll : true,
						childType : 'entType'
					};
				//如果目标面板下有内容,则不重复加载
				if (panelContextObj.html()){
					obj.currentTreeManager = panelContextObj.ligerGetTreeManager();
				}else{
					obj.currentTreeManager = panelContextObj.ligerTree(options);
				}
				
				var ischeckall = obj.opts.checkAll;
				if (obj.opts.isCheckAll){
					ischeckall = obj.opts.isCheckAll;
				}
				
				if (ischeckall){
					var rootChkBox = $("li:first > div > div[class*=l-checkbox]",panelContextObj);
					var cls = rootChkBox.attr("class");
					//if (obj.currentPanel!='vehicle'){
						if(cls != undefined && cls.indexOf("l-checkbox-checked") == -1){
				    		rootChkBox.trigger("click");
				    	}
					//}
				}
				
				//加载成功后执行回调函数
				obj.runCallBack();
				
		    	if (obj.currentPanel=='vehicle'){
		    		obj.leafCoverFolder();
		    	}
 		},
 		bindPanelVehicleEvent : function(currentPanelObj){
			var obj = this;
			var url = "operationmanagement/findVehicleForThreeTab.action";
			var panelSearchObj = $("div[name='panelSearch']",currentPanelObj);
			$("INPUT[name='threeSearchInput']",panelSearchObj).bind("focus",function(){
				if ($(this).val()=='车牌号'){
					$(this).val('');
				}
			});
			$("INPUT[name='searchThree']",panelSearchObj).bind("click",function(){
				var vehicleNo = $("INPUT[name='threeSearchInput']",panelSearchObj).val();
				if(vehicleNo.length < 3){
					$.ligerDialog.alert('请最少输入三位车牌号!', '提示', 'warn');
					return ;
				}
				
				$.ajax({
				   type: 'post',
				   url: url,
				   data: 'tabFlag=3&rows=10000&requestParam.like.vehicleNo='+ $.trim(vehicleNo).toUpperCase(),
				   success: function(col){
					   var result = eval("data="+col);
					   var resultOperObj = $("SPAN[name='resultOper']",panelSearchObj);
				   		if(result.Rows.length != 0){
				   			//查询结果有数据时取消树的全选状态
				   			var panelContextObj = $("DIV[class='panelInner'] > ul[name='panelCon']",currentPanelObj);
							var rootChkBox = $("li:first > div > div[class*=l-checkbox]",panelContextObj);
							var cls = rootChkBox.attr("class");
								if(cls.indexOf("l-checkbox-checked") > 0){
						    		rootChkBox.trigger("click");
						    	}
								
				   			var selResultObj = $("select[name='vehicleResult']",resultOperObj);
				   			selResultObj.attr("disabled",false);
				   			selResultObj.empty();
				   			selResultObj.data("searchArr",result);
				   			//resultOperObj.removeClass("btnNone");
				   			//obj.findVehicleNoHC(col);
				   		    //向结果集中填入数据
					   		$.each(result.Rows,function(idx,node){
					   			var vid = node.vid;
				                var vehicleNo = node.vehicleNo;
				                
				                $("select[name='vehicleResult']",resultOperObj).append("<option value='"+vid+"'>"+$.trim(vehicleNo)+"</option>"); 
				                if (idx==0){
				                	obj.selectedNodeId=vid;
				                	//默认选中第一个车
				                	obj._getDataNodeByTreeDataIndex(null,node);
				                	//alert("aaaaaaaaaaaaaaaaaaaa");
				                	
				        			//alert("oooo");
				                }
					   		});
				   		}else{
				   			$("select[name='vehicleResult']",resultOperObj).empty();
				   			$("select[name='vehicleResult']",resultOperObj).attr("disabled",true);
				   			$.ligerDialog.alert('没有符合条件的记录!', '提示', 'warn');
				   		}
				   		
				   }
				});
			});

			$("select[name='vehicleResult']",panelSearchObj).bind("change",function(){
				var vid = $(this).val();
				var resultArr = $(this).data("searchArr");
				$.each(resultArr.Rows,function(idx,node){
	                if (node.vid==vid){
	                	obj.selectedNodeId=vid;//高亮显示此节点
	                	obj._getDataNodeByTreeDataIndex(null,node);
	        			return false;
	                }
		   		});
			});
			//清除选中结果,清空结果集
			$("input[name='clearResult']",panelSearchObj).bind("click",function(){
				var selObj = $("select[name='vehicleResult']",panelSearchObj);
				var resultArr = selObj.data("searchArr");
				$.each(resultArr.Rows,function(idx,node){
					var vinObj = $("#"+node.vid);
					$("div[class*='l-checkbox-checked']",vinObj).trigger("click");
		   		});
				selObj.empty();
				selObj.attr("disabled",true);
			});
		},
		findVehicleNoHC : function(vehicleArr) {
			var obj = this;
			var RowsArr = eval("data=" + vehicleArr);
			CustomCtfoTree.resultIdx = 0;
			obj._searchDataNodeByTreeDataIndex(RowsArr.Rows[0].entId,RowsArr.Rows[0].vid);
		},
		//通过查询的车辆entid并展开节点
		_searchDataNodeByTreeDataIndex : function(entId,vid){
			var temp = $("ul[id=panelCon3]:visible").find("li[outlinelevel=1]").find(".l-box.l-checkbox").eq(0);
			if(temp.attr("class").indexOf("l-checkbox-checked")>0){
				temp.click();
			}
			var tmpNode = $("ul[id=panelCon3]:visible").find("li[id="+entId+"]");
			var temchedui = tmpNode.find("div.l-body").find("div.l-box.l-expandable-close");
			temchedui.click();
			
			var parents = tmpNode.parents();
			parents.each(function(){
				var that = $(this);
				if(that.attr("outlineLevel")&&that.attr("treedataindex")){
					if(that.attr("isexpand")==undefined||that.attr("isexpand")=="false"||that.attr("isexpand")==false){
						that.find("div.l-body").eq(0).find("div.l-box.l-expandable-close").click();
					}
				}
			});
			var time = null;
			time = setTimeout(function(){
				var checkbox = tmpNode.find("li[id="+vid+"]").find(".l-box.l-checkbox");
				if(checkbox.attr("class").indexOf("l-checkbox-unchecked")>0){
					checkbox.click();
				}
				clearTimeout(time);
			}, 1000);
		},
		//查询结果选中高亮状态
        searchSel : function(liId,parentNode){
         	 //setTimeout("divOffset('"+liId+"')",1000);
        	var obj = this;
         	var tmpNode = $("#"+liId,parentNode);
        	if(tmpNode != null && tmpNode != undefined){
        		
        		var panelContextObj = $("DIV[class='panelInner'] > ul[name='panelCon']",obj.getCurrentPanelObj());
        		panelContextObj.scrollTop(0);
        		var basloc = panelContextObj.offset();
        		var arr = $(tmpNode).offset();

        		var scollheight = 0;
        		
        		scollheight= arr.top-basloc.top-50;

        		panelContextObj.scrollTop(scollheight);

        		 $("div[class*=searchBk]",panelContextObj).each(function(i,box){
        			 $(box).removeClass("searchBk");
        		 });

        		 $(" > div",tmpNode).addClass("searchBk");
        		 
        		 obj.selectedNodeId="";
        	}
        },
      //查询结果上移一位
		treeSearchUp : function(){
			var obj = this;
			var resultArr = obj.searchArr;
			var manager = obj.currentTreeManager;
			data = manager.getData();
			if(obj.resultIdx > 0){
				obj.resultIdx = Number(obj.resultIdx)-1;
				obj._getDataNodeByTreeDataIndex(data[0].childrenList,resultArr.Rows[obj.resultIdx]);
				obj.searchSel(resultArr.Rows[obj.resultIdx].vid);
			}
		},
		//查询结果下移一位
		treeSearchDown : function(){
			var obj = this;
			var resultArr = obj.searchArr;
			var manager = obj.currentTreeManager;
			data = manager.getData();
			if(obj.resultIdx < resultArr.Rows.length-1){
				obj.resultIdx = Number(obj.resultIdx)+1;
				obj._getDataNodeByTreeDataIndex(data[0].childrenList,resultArr.Rows[obj.resultIdx]);
				obj.searchSel(resultArr.Rows[obj.resultIdx].vid);
			}
		},
		//获取当期面板下选中数据,组成以逗号分隔的字符串
		//falg 表示获取的值是否过滤;是否选择半选的节点
		// 1/true：过滤,
		// 0/false ： 不过滤
		getCurrentTreeSelect : function(tx,flag){
			var obj = this;
			var str = "";
			var manager = obj.currentTreeManager;
			//var notes = manager.getChecked();
			var notes = null;
			if (tx == "corp" || tx == "line") {
				notes = manager.getChecked();
			} else if (tx == "team") {
				this.selectedTeamNodes = manager.getChecked();
				notes = this.selectedTeamNodes;
			} else {
				notes = this.selectedTeamNodes;
			}
			//alert(JSON.stringify(notes));
            for (var i = 0; i < notes.length; i++)
            {
            	var entType = "";
            	try{
            		entType = notes[i].data.nodeType ? notes[i].data.nodeType : "";
            	}catch(e){entType = "3";}//在获取不到节点属性nodeType 的情况下，该方法是获取 车辆 ID
            	//alert("corp:"+tx+"entType:"+entType);
				if((tx == "corp"&& entType == "1") ||(tx == "team"&& entType == "2") ||(tx == "line"&& entType == "4")||(tx == "driver"&& entType == "5")){
					if(flag){
						var d = $(notes[i].target).find("div[class*=l-checkbox-incomplete]");//获取该车辆所在车队，是否半选
						if(d.length != 0){
							continue ;
						}
					}
					if(str.length != 0 ){
						str = str + "," + notes[i].data.id;
					}else{
						str = notes[i].data.id;
					}
				}else if(tx == "vehicle"&& entType == "3"){
					//车辆 为懒加载数据，tree.data中无法获取到jquery对象，自获取target-DOM对象获取ID
					if(flag){
						var parentNode = $(notes[i].target).parent().parent();
						var d = $(parentNode).find("div[class*=l-checkbox-incomplete]");//获取该车辆所在车队，是否半选
						if(d.length == 0){
						 continue;
						}
					}
					if(str.length != 0){
						str = str + "," + $(notes[i].target).attr("id");
					}else{
						str = $(notes[i].target).attr("id");
					}
				}
            }
            //alert("str:"+str);
            return str;
		},
		getCurrentTreeSelect2 : function(){
			var obj = this;
			var str = "";
			var manager = obj.currentTreeManager;
			var notes = manager.getChecked();
			//alert(JSON.stringify(notes));
			var corpids = "";
			var teamids = "";
			var vids = "";
			var lineids = "";
			var driverids = "";
			var seldata = {};
			//获取全选的企业信息，获取全选的组织信息，获取全选的车辆信息
            for (var i = 0; i < notes.length; i++)
            {
            	var d = $(notes[i].target).find("div[class*=l-checkbox-incomplete]");//获取该车辆所在车队，是否半选
				if(d.length != 0){
					continue ;
				}
				
            	var entType = "";
            	try{
            		entType = notes[i].data.nodeType ? notes[i].data.nodeType : "";
            	}catch(e){entType = "3";}//在获取不到节点属性nodeType 的情况下，该方法是获取 车辆 ID
            	//alert("corp:"+tx+"entType:"+entType);
            	if (entType == "1"){
            		if(corpids.length != 0 ){
            			corpids = corpids + "," + notes[i].data.id;
					}else{
						corpids = notes[i].data.id;
					}
            	}
            	if (entType == "2"){
            		if(teamids.length != 0 ){
            			teamids = teamids + "," + notes[i].data.id;
					}else{
						teamids = notes[i].data.id;
					}
            	}
            	
            	if (entType == "3"){
            		if(vids.length != 0 ){
            			vids = vids + "," + $(notes[i].target).attr("id");
					}else{
						vids = $(notes[i].target).attr("id");
					}
            	}
            	
            	if (entType == "4"){
            		if(lineids.length != 0 ){
            			lineids = lineids + "," + notes[i].data.id;
					}else{
						lineids = notes[i].data.id;
					}
            	}
            	
            	if (entType == "5"){
            		if(driverids.length != 0 ){
            			driverids = driverids + "," + notes[i].data.id;
					}else{
						driverids = notes[i].data.id;
					}
            	}
            }
            $.data(seldata,"corpids",corpids);
            $.data(seldata,"teamids",teamids);
            $.data(seldata,"vids",vids);
            $.data(seldata,"lineids",lineids);
            $.data(seldata,"driverids",driverids);
            //alert("str:"+str);
            return seldata;
		},
      //查找结果中的车辆，并展开节点 
		_getDataNodeByTreeDataIndex: function (data,subNodes)
        {
        	var obj = this;
        	//车队ID
        	var entId = subNodes.entId;
        	//alert(entId);
        	//当前panel容器
        	var currentPanelConObj = $(".panelInner ul[name='panelCon']",obj.getCurrentPanelObj());
        	
        	var teamNode = $("#"+entId,currentPanelConObj);

        	//打开车队以上所有节点
        	var nodeArr = new Array();
        	obj.treeStepExpand(teamNode,nodeArr);
        	
        	if (nodeArr.length>0){
        		var k = 0;
        		for (var i=nodeArr.length-1;i>=0;i--){
        			var thisobj = $("> .l-body > div[class*=l-expandable-close]",nodeArr[i]);
        			if (thisobj.length>0){
        				k=k+1;
        				thisobj.trigger("click");
        			}
            	}
        		if (k==0) {
    				//如果当前有需要高亮显示的节点，则选中
            		if (obj.selectedNodeId){
        	    		obj.searchSel(obj.selectedNodeId,teamNode);
        	    	}
    			}
        	}
        	
        	
            return true;
        },
        _nodeIsOpen : function (node){
        	if ($(".l-body > div[class*=l-expandable-close]",node)){
        		return false;
        	}else{
        		return true;
        	}
        },
        _loopOpenNode : function (node){
        	//树节点打开关闭控制阀
        	if ($(".l-body > div[class*=l-expandable-close]",node)){
        		//当前节点处于关闭状态,则取出当前节点的父节点接续判断
        		var parentNode = $(node).parent().parent();
        		_loopOpenNode(parentNode);
        		$(".l-body > div[class*=l-expandable-close]",node).triggle("click");
        	}
        },
		_getDataNodeByTreeDataIndex2: function (data,subNodes)
        {
        	var obj = this;
        	var entId = subNodes.entId;
        	alert(JSON.stringify(data));
        	alert("subNodes::::"+JSON.stringify(subNodes));
            for (var i = 0; i < data.length; i++)
            {
            	if(data[i].childrenList != ""){
					this._getDataNodeByTreeDataIndex(data[i].childrenList,subNodes);
            	}else{
            		var currentPanelObj = obj.getCurrentPanelObj();
		            if (data[i].id == entId){//data[i].id
						var tmpNode = currentPanelObj.find("li[id="+entId+"]");
			          	var dvNodes = $(tmpNode).find("div[class*=l-expandable-close]");
						$(dvNodes[0]).click();//点击“+”号展开节点
						obj.treeStepExpand(tmpNode);
		            }
            	}
            }
            return true;
        },
		//falg 表示获取的值是否过滤
		// 1/true：过滤,
		// 0/false ： 不过滤
		getGroupId : function(flag){//获取组织ID
			var obj = this;
			var panelId = obj.currentPanel;
			var arr = "";
			if(panelId != "team"&&panelId != "vehicle"){
			  arr = obj.getCurrentTreeSelect("corp",flag);
			}
			return arr;
		},
		//flag 表示获取的值是否过滤
		// 1/true：过滤,
		// 0/false ： 不过滤
		getFleetId : function(flag){//获取车队ID
			var obj = this;
			var panelId = obj.currentPanel;
			var arr = "";
			if(panelId == "team"||panelId == "vehicle"){
				arr = obj.getCurrentTreeSelect("team",flag);
			}
			return arr;
		},
		//falg 表示获取的值是否过滤
		// 1/true：过滤,
		// 0/false ： 不过滤
		getVehicleId : function(flag){//获取车辆ID
			var obj = this;
			var panelId = obj.currentPanel;
			var arr = "";
			if(  panelId == "vehicle"){
				arr =  obj.getCurrentTreeSelect("vehicle",flag);
			}
			return arr;
		},
		//falg 表示获取的值是否过滤
		// 1/true：过滤,
		// 0/false ： 不过滤
		getWayLineId : function(flag){//获取线路ID
			var obj = this;
			var panelId = obj.currentPanel;
			var arr = "";
			if(panelId == "line"){
				arr = obj.getCurrentTreeSelect("line",flag);
			}
			return arr;
		},
		getDriverId : function(flag){//获取线路ID
			var obj = this;
			var panelId = obj.currentPanel;
			var arr = "";
			if(panelId == "driver"){
				arr = obj.getCurrentTreeSelect("driver",flag);
			}
			return arr;
		},
		//清除查询车辆查询结果
		clearResult : function(){
			var obj = this;
			obj.searchArr = [];
			var heightNode = $("#panel3").find("div[class*=searchBk]");
			alert(heightNode.length);
			$(heightNode[0]).removeClass("searchBk");
			$("#resultOper").addClass("btnNone");
		},
        //展开节点
        treeStepExpand : function(treeNode,nodeArr){
        	var obj = this;
			var manager = obj.currentTreeManager;
			var treeLevel = $(treeNode).attr("outlinelevel");
			//alert("treeLevel:"+treeLevel);
			if(treeLevel == "1"){
				return true;
			}
			nodeArr.push(treeNode);
			var parentNode = manager.getParentTreeItem(treeNode);
			
			if ($(".l-body > div[class*=l-expandable-close]",parentNode)){
				this.treeStepExpand(parentNode,nodeArr);
				//$(".l-body > div[class*=l-expandable-close]",parentNode).trigger("click");
        	}
        },
		//获取打勾的复选框节点ID
		// 1: 获取组织节点ID
		//2：获取车队ID
		//3：获取车辆ID
		//4：获取线路ID
		getCheckSelect : function(tx,flag){
			var str = "";
			var idx = this.getDisplayPanel();
			var manager = this.getManager(idx);
			var notes = manager.getChecked();
            for (var i = 0; i < notes.length; i++)
            {
            	var entType = "";
            	try{
            		entType = notes[i].data.nodeType ? notes[i].data.nodeType : "";
            	}catch(e){entType = "3";}//在获取不到节点属性nodeType 的情况下，该方法是获取 车辆 ID
				if((tx == "group" && entType == "1") ||
					(tx == "fleet" && entType == "2") ||
					(tx == "wayLine" && entType == "4")){
					if(flag){
						var d = $(notes[i].target).find("div[class*=l-checkbox-incomplete]");//获取该车辆所在车队，是否半选
						if(d.length != 0){
							continue ;
						}
					}
					if(str.length != 0 ){
						str = str + "," + notes[i].data.id;
					}else{
						str = notes[i].data.id;
					}
				}else if(tx == "vehicle" && entType == "3"){
					//车辆 为懒加载数据，tree.data中无法获取到jquery对象，自获取target-DOM对象获取ID
					if(flag){
						var parentNode = $(notes[i].target).parent().parent();
						var d = $(parentNode).find("div[class*=l-checkbox-incomplete]");//获取该车辆所在车队，是否半选
						if(d.length == 0){
						 continue;
						}
					}
					if(str.length != 0){
						str = str + "," + $(notes[i].target).attr("id");
					}else{
						str = $(notes[i].target).attr("id");
					}
				}
            }

            return str;
		},
		// 树节点点击事件
		treeClick : function(note) {
			var obj = this;
			try{
				var dix = obj.currentPanel;
				var manager = obj.currentTreeManager;
				var id = note.data.id;
				var entType = note.data.entType;
				var nodeType = note.data.nodeType;
				
				if(entType == "2"){
					if(dix == "vehicle"){
						if (note.data.childrenList=="" && nodeType == "2"){
							var tg = note.target;
							if($(tg).attr("flag") == "1"){
								return ;
							}
							$(tg).attr("flag","1");
							var url = 'operationmanagement/findVehicleNodesOfTeam.action?teamId='+id;
							
							obj.ajaxTreeNode(url,note,id,manager,dix);
						}
					}else if(dix == "line"){
						if (note.data.childrenList=="" && nodeType == "2"){
							var tg = note.target;
							if($(tg).attr("flag") == "1"){
								return ;
							}
							$(tg).attr("flag","1");
							var url = "operationmanagement/findCorpAndLineTree.action";
							obj.ajaxTreeNode(url,note,id,manager,dix);
						}
					}
				}
					//如果当前有需要高亮显示的节点，则选中
	        		if (obj.selectedNodeId){
	    	    		obj.searchSel(obj.selectedNodeId,note.target);
	    	    	}
			}catch(e){return ;}
		},
	    addTreeNode : function(note,nodes,manager){
	    	var obj = this;
	    	manager.append(note.target,eval(nodes));
	    	obj.selectNode(note.target);
	    	//如果当前有需要高亮显示的节点，则选中
    		if (obj.selectedNodeId){
	    		obj.searchSel(obj.selectedNodeId,note.target);
	    	}
	    },
	    ajaxTreeNode : function(url,note,id,manager,idx){
	    	var obj = this;
	    	$.ajax({
			   type: 'post',
			   url: url,
			   data: '',
			   aysnc : false,
			   success: function(col){
					obj.addTreeNode(note,col,manager);
					//obj.selectNode(id);
			   }
			});
	    },
	    //选中节点下所有子节点    参数：node 单击节点对象
	    selectNode2 : function (id)
	    {
	    	var node = $("#"+id);
	    	//alert($("> div",node).html());
	    	//alert($(node).html());
	    	//当前节点是否选中
	    	if ($(".l-body > div[class*='l-checkbox']",node).hasClass("l-checkbox-checked")){
//	    		$(".l-body > div[class*='l-checkbox-unchecked']",node).trigger('click');
	    		$(".l-body > div[class*='l-checkbox-unchecked']",node).removeClass('l-checkbox-unchecked').addClass("l-checkbox-checked");
	    	}
	    },
	  //选中节点下所有子节点    参数：node 单击节点对象
	    selectNode : function (node)
	    {
	    	//当前节点是否选中
	    	if ($(".l-body > div[class*='l-checkbox']",node).hasClass("l-checkbox-checked")){
	    		//$(".l-body > div[class*='l-checkbox-unchecked']",node).trigger('click');
	    		$(".l-body > div[class*='l-checkbox-unchecked']",node).removeClass('l-checkbox-unchecked').addClass("l-checkbox-checked");
	    	}
	    },
        leafCoverFolder : function(){
        	var obj = this;
        	if (obj.currentPanel=='vehicle'){
        		$(".panelInner ul[name='panelCon']",obj.getCurrentPanelObj()).find("div[class*=l-note]").removeClass("l-note").addClass("l-expandable-close");
        	}
	    },
	    //获取当前选中的面板对象
        getCurrentPanelObj:function(){
        	var obj = this;

        	//手风琴对象
			var accordionObj = $("DIV[name='accordion']",obj.mainContainer);
			var panelObj = $("DIV[innerid="+obj.currentPanel+"]",accordionObj);
			for (var i=0;i<panelObj.length;i++){
				if ($(panelObj[i]).attr('class')=="l-accordion-content"){
					return $(panelObj[i]);
				}
			}
        }
	};