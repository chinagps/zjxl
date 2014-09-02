(function($) {
	KCPT.object = function(o) {
		this.options = $.extend( {}, o);
		this.readyMap = [];
		this.children = [];
		this.childrenList = [];
		this.parent = null;
		this.ready( {});
		return this;
	};
	
	KCPT.object.prototype.dispose = function() {
		this.onDispose();
		this.options = null;
	};
	KCPT.object.prototype.onDispose = function(e) {
	};
	KCPT.object.prototype.ready = function(o) {
		this.onReady(null, o);
	};
	KCPT.object.prototype.onReady = function(e, config) {
		var r = this.options.ready;
		if (r) {
			if (r.cbfun) {
				r.cbfun.call(r.scope || this, this, r.data);
			}
		}
	};
	KCPT.object.prototype.onLoad = function(e, o) {
		var r = this.options.load;
		if (r) {
			if (r.cbfun) {
				r.cbfun.call(r.scope || this, this, r.data);
			}
		}
		return false;
	};
	KCPT.object.prototype.onBeforeLoad = function(e, o) {
		var r = this.options.beforeLoad;
		if (r) {
			if (r.cbfun) {
				r.cbfun.call(r.scope || this, this, r.data);
			}
		}
		return false;
	};
	KCPT.object.prototype.load = function(c) {
		this.onBeforeLoad(null, c);
		this.onLoad();
		return this;
	};
	KCPT.object.prototype.remove = function(o) {
		this.onBeforeRemove(o);
		var count = this.children.length;
		for ( var i = 0; i < count; i++) {
			this.children[i].remove();
		}
		this.children = [];
		this.getParent().removeChild(this);
		return;
	};
	KCPT.object.prototype.onBeforeRemove = function(e, o) {
		var r = this.options.beforeRemove;
		if (r) {
			if (r.cbfun) {
				r.cbfun.call(r.scope || this, this, r.data);
			}
		}
		return false;
	};
	KCPT.object.prototype.onRemove = function(e, o) {
		var r = this.options.remove;
		if (r) {
			if (r.cbfun) {
				r.cbfun.call(r.scope || this, this, r.data);
			}
		}
		return false;
	};
	KCPT.object.prototype.removeChild = function(node) {
		for ( var i = 0; i < this.children.length; i++) {
			if (this.children[i].id == node.id) {
				this.children.splice(i, 1);
				node.setParent(null);
				node.onRemove();
				node.dispose();
				delete node;
				break;
			}
		}
		return true;
	};
	KCPT.object.prototype.onShow = function() {
	};
	KCPT.object.prototype.getOptions = function() {
		return this.options;
	};
	KCPT.object.prototype.addChild = function(o) {
		if (o) {
			this.children.push(o);
			o.parent = this;
		}
	};
	KCPT.object.prototype.getChildren = function() {
		return this.children;
	};
	KCPT.object.prototype.setParent = function(o) {
		this.parent = o;
	};
	KCPT.object.prototype.getParent = function() {
		return this.parent;
	};
	KCPT.object.prototype.getName = function() {
		return this.name;
	};
	KCPT.object.prototype.getId = function() {
		return this.id;
	};
	KCPT.object.prototype.addChildList = function(o) {
		this.childrenList.push(o);
	};
	KCPT.object.prototype.getChildList = function(o) {
		return this.childrenList;
	};
	KCPT.object.prototype.getChildListChildByName = function(o){
		var returobj = null;
		for(var i = 0; i < this.childrenList.length;i++){
			var ob = this.childrenList[i];
			if(ob.name == o){
				returobj = ob;
				break;
			}
		}
		return returobj;
	};
	KCPT.object.prototype.setName = function(n) {
		return this.options.name = n;
	};
	KCPT.object.prototype.setId = function(id) {
		return this.options.id = id;
	};
	KCPT.object.prototype.getRoot = function() {
		var root = this.getParent();
		if (!root)
			return this;
		while (root && root.getParent()) {
			root = root.getParent();
		}
		return root;
	};
	KCPT.object.prototype.findChildByName = function(fName) {
		var n = null;
		if (fName && this.children && this.children.length > 0) {
			$(this.getChildren()).each(function() {
				if (this.getName() == fName) {
					n = this;
				}
			});
		}
		return n;
	};
	KCPT.object.prototype.findChildById = function(fName) {
		if (fName && this.children && this.children.length > 0) {
			var len = this.children.length;
			for ( var i = 0; i < len; i++) {
				if (this.children[i].getId() == fName) {
					return this.children[i];
				}
			}
		}
		return null;
	};
	KCPT.object.prototype.findNodeByName = function(fName) {
		var fNode;
		var cNode=null;
		var query = function(fName) {
			fNode = this.findChildByName(fName);
			if (fNode) {
				cNode = fNode;
			}
		};
		this.cascade(query, this, [ fName ]);
		return cNode;
	};
	KCPT.object.prototype.findByName = function(fName) {
		var node = this.getRoot();
		if (node) {
			var fNode = node.findNodeByName(fName);
			return fNode;
		}
		return null;
	};
	KCPT.object.prototype.cascade = function(fn, scope, args) {
		if (fn.apply(scope || this, args || [ this ]) !== false) {
			var cs = this.children;
			for ( var i = 0, len = cs.length; i < len; i++) {
				cs[i].cascade(fn, cs[i].scope, args);
			}
		}
	};
	KCPT.object.prototype.eachChild = function(fn, scope, args) {
		var cs = this.children;
		for ( var i = 0, len = cs.length; i < len; i++) {
			if (fn.apply(scope || this, args || [ cs[i] ]) === false) {
				break;
			}
		}
	};
	KCPT.object.prototype.setGrid = function(grid){
		 if (this.grid) 
             this.grid.remove();
         this.grid = grid;
         this.addChild(grid);
	};
	KCPT.object.prototype.getGrid = function(grid){
		return this.grid;
	};
	KCPT.object.prototype.setForm = function(Form){
		this.Form = Form;
	};
	KCPT.object.prototype.getForm = function(Form){
		return this.Form;
	};
	KCPT.object.prototype.print = function(pazu) {
		var isPromtUser = false;
		var isprev = true;
		pazu.TPrinter.isZoomOutToFit = true;
		pazu.TPrinter.isPrintBackground = true;
		pazu.TPrinter.marginTop = 15;
		pazu.TPrinter.marginBottom = 10;
		pazu.TPrinter.marginLeft = 10;
		pazu.TPrinter.marginRight = 15;
		if (isprev) {
			pazu.TPrinter.doPreview();
		} else {
			pazu.TPrinter.doPrint(isPromtUser);
		}
	};
	KCPT.object.prototype.onReSize = function() {
	};
	function isNum(n) {
		if (isNaN(n))
			return false;
		return true;
	}
	;
	StringUtil = {
		Base64Chars : "ABCDEFGHIJKLMNOP" + "QRSTUVWXYZabcdef"
				+ "ghijklmnopqrstuv" + "wxyz0123456789@*" + "-",
		base64Encode : function(s) {
			if (!s || s.length == 0)
				return s;
			var d = "";
			var b = this.ucs2_utf8(s);
			var b0, b1, b2, b3;
			var len = b.length;
			var i = 0;
			while (i < len) {
				var tmp = b[i++];
				b0 = (tmp & 0xfc) >> 2;
				b1 = (tmp & 0x03) << 4;
				if (i < len) {
					tmp = b[i++];
					b1 |= (tmp & 0xf0) >> 4;
					b2 = (tmp & 0x0f) << 2;
					if (i < len) {
						tmp = b[i++];
						b2 |= (tmp & 0xc0) >> 6;
						b3 = tmp & 0x3f;
					} else {
						b3 = 64;
					}
				} else {
					b2 = b3 = 64;
				}
				d += this.Base64Chars.charAt(b0);
				d += this.Base64Chars.charAt(b1);
				d += this.Base64Chars.charAt(b2);
				d += this.Base64Chars.charAt(b3);
			}
			return d;
		},
		base64Decode : function(s) {
			if (!s)
				return null;
			var len = s.length;
			if (len % 4 != 0) {
				throw s + " is not a valid Base64 string.";
			}
			var b = new Array();
			var i = 0, j = 0, e = 0, c, tmp;
			while (i < len) {
				c = this.Base64Chars.indexOf(s.charAt(i++));
				tmp = c << 18;
				c = this.Base64Chars.indexOf(s.charAt(i++));
				tmp |= c << 12;
				c = this.Base64Chars.indexOf(s.charAt(i++));
				if (c < 64) {
					tmp |= c << 6;
					c = this.Base64Chars.indexOf(s.charAt(i++));
					if (c < 64) {
						tmp |= c;
					} else {
						e = 1;
					}
				} else {
					e = 2;
					i++;
				}
				b[j + 2] = tmp & 0xff;
				tmp >>= 8;
				b[j + 1] = tmp & 0xff;
				tmp >>= 8;
				b[j + 0] = tmp & 0xff;
				j += 3;
			}
			b.splice(b.length - e, e);
			return this.utf8_ucs2(b);
		},
		ucs2_utf8 : function(s) {
			if (!s)
				return null;
			var d = new Array();
			if (s == "")
				return d;
			var c = 0, i = 0, j = 0;
			var len = s.length;
			while (i < len) {
				c = s.charCodeAt(i++);
				if (c <= 0x7f) {
					d[j++] = c;
				} else if ((c >= 0x80) && (c <= 0x7ff)) {
					d[j++] = ((c >> 6) & 0x1f) | 0xc0;
					d[j++] = (c & 0x3f) | 0x80;
				} else {
					d[j++] = (c >> 12) | 0xe0;
					d[j++] = ((c >> 6) & 0x3f) | 0x80;
					d[j++] = (c & 0x3f) | 0x80;
				}
			}
			return d;
		},
		utf8_ucs2 : function(s) {
			if (!s)
				return null;
			var len = s.length;
			if (len == 0)
				return "";
			var d = "";
			var c = 0, i = 0, tmp = 0;
			while (i < len) {
				c = s[i++];
				if ((c & 0xe0) == 0xe0) {
					tmp = (c & 0x0f) << 12;
					c = s[i++];
					tmp |= ((c & 0x3f) << 6);
					c = s[i++];
					tmp |= (c & 0x3f);
				} else if ((c & 0xc0) == 0xc0) {
					tmp = (c & 0x1f) << 6;
					c = s[i++];
					tmp |= (c & 0x3f);
				} else {
					tmp = c;
				}
				d += String.fromCharCode(tmp);
			}
			return d;
		}
	};
})(jQuery);