//**********************图片上传预览插件************************
//说明：图片上传预览插件
//上传的时候可以生成固定宽高范围内的等比例缩放图

//参数设置：
//width                     存放图片固定大小容器的宽
//height                    存放图片固定大小容器的高
//imgDiv                    页面DIV的JQuery的id
//imgType                   数组后缀名
//**********************图片上传预览插件*************************
(function($) {
    jQuery.fn.extend({
        uploadPreview1 : function(opt) {
        	
        	 $("#imgDiv").empty();
            var opts = jQuery.extend({
                width: 0,
                height: 0,
                imgDiv: "#imgDiv",
                imgType: ["jpg", "png"],
                callback: function() { return false; }
            }, opt || {});
            var _self = this;
            var _this = $(this);
            var imgDiv = $(opts.imgDiv);
            imgDiv.width(opts.width);
            imgDiv.height(opts.height);
            //只改变一次
            var flagChange = true;
            autoScaling = function() {
                if ($.browser.version == "7.0" || $.browser.version == "8.0") imgDiv.get(0).filters.item("DXImageTransform.Microsoft.AlphaImageLoader").sizingMethod = "image";
                var img_width = imgDiv.width();
                var img_height = imgDiv.height();
                if (img_width > 0 && img_height > 0) {
                    var rate = (opts.width / img_width < opts.height / img_height) ? opts.width / img_width : opts.height / img_height;
                    if (rate <= 1) {
                        if ($.browser.version == "7.0" || $.browser.version == "8.0") imgDiv.get(0).filters.item("DXImageTransform.Microsoft.AlphaImageLoader").sizingMethod = "scale";
                        imgDiv.width(img_width * rate);
                        imgDiv.height(img_height * rate);
                        $("#updateImgDiv").width(img_width * rate);
                        $("#updateImgDiv").height(img_height * rate);
                    } else {
                        imgDiv.width(img_width);
                        imgDiv.height(img_height);
                    }
//                    var left = (opts.width - imgDiv.width()) * 0.5;
//                    var top = (opts.height - imgDiv.height()) * 0.5;
//                    imgDiv.css({ "margin-left": left, "margin-top": top });
                    imgDiv.show();
                    $("#defaultImg").css("display","none");
                    if(img_width!=365 || img_height!=69){
                    	imgDiv.attr("style","");
                    	$("#imageType").val("");
                    	$.ligerDialog.error("标识图片大小为365*69像素！");
                    }
                }
            };
            
            this.change(function() {
            	if(flagChange){
            		flagChange = false;
                if (this.value) {
                    if (!RegExp("\.(" + opts.imgType.join("|") + ")$", "i").test(this.value.toLowerCase())) {
                    	$.ligerDialog.error("图片类型必须是" + opts.imgType.join(",") + "中的一种");
                        this.value = "";
                        return false;
                    }
//                    imgDiv.hide();
                    // google "MOZILLA/5.0 (WINDOWS NT 6.1; WOW64) APPLEWEBKIT/537.11 (KHTML, LIKE GECKO) CHROME/23.0.1271.97 SAFARI/537.11"
                    //ie9 "MOZILLA/5.0 (COMPATIBLE; MSIE 9.0; WINDOWS NT 6.1; WIN64; X64; TRIDENT/5.0)"
                    //获取浏览器版本信息
                    var browserVersion= window.navigator.userAgent.toUpperCase();
                    
//                    if ($.browser.msie) {
                        if (browserVersion.indexOf("MSIE 6.0")>-1) {
                            var img = $("<img />");
                            imgDiv.replaceWith(img);
                            imgDiv = img;
                            
                            var image = new Image();
                            image.src = 'file:///' + this.value;
                            image.height = "80px";
                            image.width = "180px";
                            imgDiv.attr('src', image.src);
                            autoScaling();
                        }else if(browserVersion.indexOf("MSIE 7.0")>-1 || browserVersion.indexOf("MSIE 8.0")>-1 || 
                        		browserVersion.indexOf("MSIE 9.0")>-1) {
                            var flag = true;
                            imgDiv.css({ filter: "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)" });
                            imgDiv.get(0).filters.item("DXImageTransform.Microsoft.AlphaImageLoader").sizingMethod = "image";
                            try {
                            	//IE7和IE8下需要使用select来获取路径,document.selection.createRange().text:来获取页面上的值
                            	this.select();
                            	this.blur();
                            	var imgUrl = document.selection.createRange().text;
                            	
                                imgDiv.get(0).filters.item('DXImageTransform.Microsoft.AlphaImageLoader').src = imgUrl;
                                var temp = this.value.split("\.");
                                if(temp.length>0){
                                	var uploadImgType = temp[new Number(temp.length)-1];
                                    $("#imageType").val(uploadImgType);
                                }
                                nowImgFlag = true;
                            } catch (e) {
                            	 imgDiv.attr("style","");
                            	 $("#defaultImg").css("display","none");
                            	 $("#imageType").val("");
                            	if(flag){
                            		$.ligerDialog.error("无效的图片文件！");
                            	}
                            	flag = false;
                            }
                            if(flag){
                            	setTimeout("autoScaling()", 500);
                            }else{
                            	$("#imageType").val("");
                            }
                        }
//                    }
                        //仅测试过google浏览器
                    else {
                        var reader = new FileReader();  
                        reader.onload = function(evt){
                        	imgDiv.html("<img src='" + evt.target.result + "' />");
                        	};
                        reader.readAsDataURL(this.files[0]); 
                        //保存图片类型
                        var temp = this.value.split("\.");
                        if(temp.length>0){
                        	var uploadImgType = temp[new Number(temp.length)-1];
                            $("#imageType").val(uploadImgType);
                        }
                    }
                }
            	 }
            });
           
        }
    });
})(jQuery);

