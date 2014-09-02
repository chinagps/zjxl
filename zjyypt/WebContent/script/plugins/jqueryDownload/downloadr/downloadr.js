(function($) {
  $.fn.downloadr = function() {
  	return this.each(function() {
  	
  	function returnBrowserTest(){
				
					var dlBrowser = $.browser.browser();
					
					var dlString = '';
					
					switch(dlBrowser){
					
						case "Safari":
						
						dlString = '右键点击下面的图片并选择 <strong>另存为...</strong> 或 <strong>链接另存为...</strong>';
						
						break;
						
						case "Firefox":
						
						dlString = '右键点击下面的图片并选择 <strong>另存为...</strong>'
						
						break;
						
						case "Msie":
						
						dlString = '右键点击下面的图片并选择 <strong>另存为...</strong>';
						
						break;
						
						default:
						
						dlString = '右键点击下面的图片并选择 <strong>目标另存为...</strong>';
					}
					
					
					return dlString;
				}	
				
				var element = this;
			  
			  	$(element).addClass("download_link");
			  	
			  	var theTitle = $(element).attr('title');
			  				  	
				var theLink = $(element).attr('href');
	
			  	$(element).bind('click',function(e){
			  	
			  		e.preventDefault();

				  	var html = "";
				  	
				    //html += "<h2>Download '" + theTitle + "'</h2>";
				  	html += "<h1>下载  '" + theTitle + "'</h1>";
				  	//html += "<h1>下载 '" + theTitle + "'," + returnBrowserTest()+"</h1>";
				  	html += "<h1>" + returnBrowserTest()+"</h1>";
				  	html += "<p style='text-align:center;'><a href='" + theLink + "'><img src='script/plugins/jqueryDownload/downloadr/download.png' alt='点击右键->另存为来下载' id='download_file'/></a></p>";
//				  	html += "<p>If you want to open the file in your browser, just click <strong><a href='" + theLink + "'>here</a></strong>.</p>";
				  	
				  	jQuery.facebox(html);
			  		
			  	});
			  	});

  }
})(jQuery);