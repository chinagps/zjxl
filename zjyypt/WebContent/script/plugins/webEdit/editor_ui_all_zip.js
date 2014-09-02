UEDITOR_CONFIG = window.UEDITOR_CONFIG || {};
var baidu = baidu || {};
baidu.editor = baidu.editor || {};
baidu.editor.commands = {};
baidu.editor.plugins = {};
baidu.editor.browser = function() {
	var d = navigator.userAgent.toLowerCase(), b = window.opera, c = {
		ie : !!window.ActiveXObject,
		opera : (!!b && b.version),
		webkit : (d.indexOf(" applewebkit/") > -1),
		air : (d.indexOf(" adobeair/") > -1),
		mac : (d.indexOf("macintosh") > -1),
		quirks : (document.compatMode == "BackCompat")
	};
	c.gecko = (navigator.product == "Gecko" && !c.webkit && !c.opera);
	var a = 0;
	if (c.ie) {
		a = parseFloat(d.match(/msie (\d+)/)[1]);
		c.ie8 = !!document.documentMode;
		c.ie8Compat = document.documentMode == 8;
		c.ie7Compat = ((a == 7 && !document.documentMode) || document.documentMode == 7);
		c.ie6Compat = (a < 7 || c.quirks)
	}
	if (c.gecko) {
		var e = d.match(/rv:([\d\.]+)/);
		if (e) {
			e = e[1].split(".");
			a = e[0] * 10000 + (e[1] || 0) * 100 + (e[2] || 0) * 1
		}
	}
	if (/chrome\/(\d+\.\d)/i.test(d)) {
		c.chrome = +RegExp["\x241"]
	}
	if (/(\d+\.\d)?(?:\.\d)?\s+safari\/?(\d+\.\d+)?/i.test(d)
			&& !/chrome/i.test(d)) {
		c.safari = +(RegExp["\x241"] || RegExp["\x242"])
	}
	if (c.opera) {
		a = parseFloat(b.version())
	}
	if (c.webkit) {
		a = parseFloat(d.match(/ applewebkit\/(\d+)/)[1])
	}
	c.version = a;
	c.isCompatible = !c.mobile
			&& ((c.ie && a >= 6) || (c.gecko && a >= 10801)
					|| (c.opera && a >= 9.5) || (c.air && a >= 1)
					|| (c.webkit && a >= 522) || false);
	return c
}();
(function() {
	baidu.editor.utils = {};
	var b = new Function();
	var a = baidu.editor.utils = {
		makeInstance : function(c) {
			b.prototype = c;
			c = new b;
			b.prototype = null;
			return c
		},
		isArray : function(c) {
			return c && c.constructor === Array
		},
		isString : function(c) {
			return typeof c == "string" || c.constructor == String
		},
		each : function(f, e, g) {
			if (a.isArray(f)) {
				for (var d = 0; d < f.length; d++) {
					e.call(g, f[d], d, f)
				}
			} else {
				for (var c in f) {
					e.call(g, f[c], c, f)
				}
			}
		},
		inherits : function(f, d) {
			var c = f.prototype;
			var e = a.makeInstance(d.prototype);
			a.extend(e, c, true);
			f.prototype = e;
			return (e.constructor = f)
		},
		bind : function(c, d) {
			return function() {
				return c.apply(d, arguments)
			}
		},
		defer : function(d, c, e) {
			var f;
			return function() {
				if (e) {
					clearTimeout(f)
				}
				f = setTimeout(d, c)
			}
		},
		extend : function(e, f, c) {
			if (f) {
				for (var d in f) {
					if (!c || !e.hasOwnProperty(d)) {
						e[d] = f[d]
					}
				}
			}
			return e
		},
		indexOf : function(e, d, c) {
			c = c || 0;
			while (c < e.length) {
				if (e[c] === d) {
					return c
				}
				c++
			}
			return -1
		},
		removeItem : function(e, d) {
			var c = e.length;
			if (c) {
				while (c--) {
					if (e[c] === d) {
						e.splice(c, 1);
						break
					}
				}
			}
		},
		trim : function() {
			var c = /(^[ \t\n\r]+)|([ \t\n\r]+$)/g;
			return function(d) {
				return d.replace(c, "")
			}
		}(),
		listToMap : function(d) {
			if (!d) {
				return {}
			}
			var f = d.split(/,/g), c = f.length, e = {};
			if (c) {
				while (c--) {
					e[f[c]] = 1
				}
			}
			return e
		},
		unhtml : function() {
			var d = {
				"<" : "&lt;",
				"&" : "&amp",
				'"' : "&quot;",
				">" : "&gt;"
			};
			function c(e) {
				return d[e]
			}
			return function(e) {
				return e ? e.replace(/[&<">]/g, c) : ""
			}
		}(),
		cssStyleToDomStyle : function() {
			var f = document.createElement("div").style, d = f.cssFloat != undefined
					? "cssFloat"
					: f.styleFloat != undefined ? "styleFloat" : "float", c = {
				"float" : d
			};
			function e(g) {
				return g.charAt(1).toUpperCase()
			}
			return function(g) {
				return c[g] || (c[g] = g.toLowerCase().replace(/-./g, e))
			}
		}()
	}
})();
(function() {
	baidu.editor.EventBase = c;
	var a = baidu.editor.utils;
	function c() {
	}
	c.prototype = {
		addListener : function(d, e) {
			b(this, d, true).push(e)
		},
		removeListener : function(e, f) {
			var d = b(this, e);
			d && a.removeItem(d, f)
		},
		fireEvent : function(g) {
			var f = b(this, g), h, e, d;
			if (f) {
				d = f.length;
				while (d--) {
					e = f[d].apply(this, arguments);
					if (e !== undefined) {
						h = e
					}
				}
			}
			if (e = this["on" + g.toLowerCase()]) {
				h = e.apply(this, arguments)
			}
			return h
		}
	};
	function b(g, e, f) {
		var d;
		e = e.toLowerCase();
		return ((d = (g.__allListeners || f && (g.__allListeners = {}))) && (d[e] || f
				&& (d[e] = [])))
	}
})();
baidu.editor.dom = baidu.editor.dom || {};
baidu.editor.dom.dtd = (function() {
	function z(B) {
		for (var A in B) {
			B[A.toUpperCase()] = B[A]
		}
		return B
	}
	function a(E) {
		var B = arguments;
		for (var D = 1; D < B.length; D++) {
			var A = B[D];
			for (var C in A) {
				if (!E.hasOwnProperty(C)) {
					E[C] = A[C]
				}
			}
		}
		return E
	}
	var y = z({
				isindex : 1,
				fieldset : 1
			}), x = z({
				input : 1,
				button : 1,
				select : 1,
				textarea : 1,
				label : 1
			}), w = a(z({
						a : 1
					}), x), v = a({
				iframe : 1
			}, w), u = z({
				hr : 1,
				ul : 1,
				menu : 1,
				div : 1,
				blockquote : 1,
				noscript : 1,
				table : 1,
				center : 1,
				address : 1,
				dir : 1,
				pre : 1,
				h5 : 1,
				dl : 1,
				h4 : 1,
				noframes : 1,
				h6 : 1,
				ol : 1,
				h1 : 1,
				h3 : 1,
				h2 : 1
			}), t = z({
				ins : 1,
				del : 1,
				script : 1,
				style : 1
			}), s = a(z({
						b : 1,
						acronym : 1,
						bdo : 1,
						"var" : 1,
						"#" : 1,
						abbr : 1,
						code : 1,
						br : 1,
						i : 1,
						cite : 1,
						kbd : 1,
						u : 1,
						strike : 1,
						s : 1,
						tt : 1,
						strong : 1,
						q : 1,
						samp : 1,
						em : 1,
						dfn : 1,
						span : 1
					}), t), r = a(z({
						sub : 1,
						img : 1,
						embed : 1,
						object : 1,
						sup : 1,
						basefont : 1,
						map : 1,
						applet : 1,
						font : 1,
						big : 1,
						small : 1
					}), s), q = a(z({
						p : 1
					}), r), p = a(z({
						iframe : 1
					}), r, x), n = z({
				img : 1,
				embed : 1,
				noscript : 1,
				br : 1,
				kbd : 1,
				center : 1,
				button : 1,
				basefont : 1,
				h5 : 1,
				h4 : 1,
				samp : 1,
				h6 : 1,
				ol : 1,
				h1 : 1,
				h3 : 1,
				h2 : 1,
				form : 1,
				font : 1,
				"#" : 1,
				select : 1,
				menu : 1,
				ins : 1,
				abbr : 1,
				label : 1,
				code : 1,
				table : 1,
				script : 1,
				cite : 1,
				input : 1,
				iframe : 1,
				strong : 1,
				textarea : 1,
				noframes : 1,
				big : 1,
				small : 1,
				span : 1,
				hr : 1,
				sub : 1,
				bdo : 1,
				"var" : 1,
				div : 1,
				object : 1,
				sup : 1,
				strike : 1,
				dir : 1,
				map : 1,
				dl : 1,
				applet : 1,
				del : 1,
				isindex : 1,
				fieldset : 1,
				ul : 1,
				b : 1,
				acronym : 1,
				a : 1,
				blockquote : 1,
				i : 1,
				u : 1,
				s : 1,
				tt : 1,
				address : 1,
				q : 1,
				pre : 1,
				p : 1,
				em : 1,
				dfn : 1
			}), m = a(z({
						a : 0
					}), p), k = z({
				tr : 1
			}), j = z({
				"#" : 1
			}), i = a(z({
						param : 1
					}), n), h = a(z({
						form : 1
					}), y, v, u, q), g = z({
				li : 1
			}), f = z({
				style : 1,
				script : 1
			}), e = z({
				base : 1,
				link : 1,
				meta : 1,
				title : 1
			}), d = a(e, f), c = z({
				head : 1,
				body : 1
			}), b = z({
				html : 1
			});
	var l = z({
				address : 1,
				blockquote : 1,
				center : 1,
				dir : 1,
				div : 1,
				dl : 1,
				fieldset : 1,
				form : 1,
				h1 : 1,
				h2 : 1,
				h3 : 1,
				h4 : 1,
				h5 : 1,
				h6 : 1,
				hr : 1,
				isindex : 1,
				menu : 1,
				noframes : 1,
				ol : 1,
				p : 1,
				pre : 1,
				table : 1,
				ul : 1
			}), o = z({
				area : 1,
				base : 1,
				br : 1,
				col : 1,
				hr : 1,
				img : 1,
				embed : 1,
				input : 1,
				link : 1,
				meta : 1,
				param : 1
			});
	return z({
				$nonBodyContent : a(b, c, e),
				$block : l,
				$inline : m,
				$body : a(z({
									script : 1,
									style : 1
								}), l),
				$cdata : z({
							script : 1,
							style : 1
						}),
				$empty : o,
				$nonChild : z({
							iframe : 1
						}),
				$listItem : z({
							dd : 1,
							dt : 1,
							li : 1
						}),
				$list : z({
							ul : 1,
							ol : 1,
							dl : 1
						}),
				$isNotEmpty : z({
							table : 1,
							ul : 1,
							ol : 1,
							dl : 1,
							iframe : 1,
							area : 1,
							base : 1,
							col : 1,
							hr : 1,
							img : 1,
							embed : 1,
							input : 1,
							link : 1,
							meta : 1,
							param : 1
						}),
				$removeEmpty : z({
							a : 1,
							abbr : 1,
							acronym : 1,
							address : 1,
							b : 1,
							bdo : 1,
							big : 1,
							cite : 1,
							code : 1,
							del : 1,
							dfn : 1,
							em : 1,
							font : 1,
							i : 1,
							ins : 1,
							label : 1,
							kbd : 1,
							q : 1,
							s : 1,
							samp : 1,
							small : 1,
							span : 1,
							strike : 1,
							strong : 1,
							sub : 1,
							sup : 1,
							tt : 1,
							u : 1,
							"var" : 1
						}),
				$tableContent : z({
							caption : 1,
							col : 1,
							colgroup : 1,
							tbody : 1,
							td : 1,
							tfoot : 1,
							th : 1,
							thead : 1,
							tr : 1,
							table : 1
						}),
				html : c,
				head : d,
				style : j,
				script : j,
				body : h,
				base : {},
				link : {},
				meta : {},
				title : j,
				col : {},
				tr : z({
							td : 1,
							th : 1
						}),
				img : {},
				embed : {},
				colgroup : z({
							thead : 1,
							col : 1,
							tbody : 1,
							tr : 1,
							tfoot : 1
						}),
				noscript : h,
				td : h,
				br : {},
				th : h,
				center : h,
				kbd : m,
				button : a(q, u),
				basefont : {},
				h5 : m,
				h4 : m,
				samp : m,
				h6 : m,
				ol : g,
				h1 : m,
				h3 : m,
				option : j,
				h2 : m,
				form : a(y, v, u, q),
				select : z({
							optgroup : 1,
							option : 1
						}),
				font : m,
				ins : m,
				menu : g,
				abbr : m,
				label : m,
				table : z({
							thead : 1,
							col : 1,
							tbody : 1,
							tr : 1,
							colgroup : 1,
							caption : 1,
							tfoot : 1
						}),
				code : m,
				tfoot : k,
				cite : m,
				li : h,
				input : {},
				iframe : h,
				strong : m,
				textarea : j,
				noframes : h,
				big : m,
				small : m,
				span : {
					"#" : 1
				},
				hr : m,
				dt : m,
				sub : m,
				optgroup : z({
							option : 1
						}),
				param : {},
				bdo : m,
				"var" : m,
				div : h,
				object : i,
				sup : m,
				dd : h,
				strike : m,
				area : {},
				dir : g,
				map : a(z({
									area : 1,
									form : 1,
									p : 1
								}), y, t, u),
				applet : i,
				dl : z({
							dt : 1,
							dd : 1
						}),
				del : m,
				isindex : {},
				fieldset : a(z({
									legend : 1
								}), n),
				thead : k,
				ul : g,
				acronym : m,
				b : m,
				a : a(	z({
									a : 1
								}), p),
				blockquote : a(z({
									td : 1,
									tr : 1,
									tbody : 1,
									li : 1
								}), h),
				caption : m,
				i : m,
				u : m,
				tbody : k,
				s : m,
				address : a(v, q),
				tt : m,
				legend : m,
				q : m,
				pre : a(s, w),
				p : a(	z({
									a : 1
								}), m),
				em : m,
				dfn : m
			})
})();
baidu.editor.dom.domUtils = baidu.editor.dom.domUtils || {};
(function() {
	var g = baidu.editor, e = g.browser, a = g.dom.dtd, i = g.utils, b;
	function f(k, m) {
		if (/color/i.test(k) && /rgba?/.test(m)) {
			var n = m.split(",");
			if (n.length > 3) {
				return ""
			}
			m = "#";
			for (var l = 0, j; j = n[l++];) {
				j = parseInt(j.replace(/[^\d]/gi, ""), 10).toString(16);
				m += j.length == 1 ? "0" + j : j
			}
			m = m.toUpperCase()
		}
		return m
	}
	function d(p, q, k, j, n, o) {
		var m = j && p[q], l;
		!m && (m = p[k]);
		while (!m && (l = (l || p).parentNode)) {
			if (l.tagName == "BODY") {
				return null
			}
			if (o && !o(l)) {
				return null
			}
			m = l[k]
		}
		if (m && n && !n(m)) {
			return d(m, q, k, false, n)
		}
		return m
	}
	var h = e.ie && e.version < 9 ? {
		tabindex : "tabIndex",
		readonly : "readOnly",
		"for" : "htmlFor",
		"class" : "className",
		maxlength : "maxLength",
		cellspacing : "cellSpacing",
		cellpadding : "cellPadding",
		rowspan : "rowSpan",
		colspan : "colSpan",
		usemap : "useMap",
		frameborder : "frameBorder"
	} : {
		tabindex : "tabIndex",
		readonly : "readOnly"
	};
	var c = baidu.editor.dom.domUtils = {
		NODE_ELEMENT : 1,
		NODE_DOCUMENT : 9,
		NODE_TEXT : 3,
		NODE_COMMENT : 8,
		NODE_DOCUMENT_FRAGMENT : 11,
		POSITION_IDENTICAL : 0,
		POSITION_DISCONNECTED : 1,
		POSITION_FOLLOWING : 2,
		POSITION_PRECEDING : 4,
		POSITION_IS_CONTAINED : 8,
		POSITION_CONTAINS : 16,
		fillChar : e.ie && e.version == "6" ? "\ufeff" : "\u200B",
		keys : {
			8 : 1,
			46 : 1,
			16 : 1,
			17 : 1,
			18 : 1,
			37 : 1,
			38 : 1,
			39 : 1,
			40 : 1,
			13 : 1
		},
		getPosition : function(o, m) {
			if (o === m) {
				return 0
			}
			var k, n = [o], l = [m];
			k = o;
			while (k = k.parentNode) {
				if (k === m) {
					return 10
				}
				n.push(k)
			}
			k = m;
			while (k = k.parentNode) {
				if (k === o) {
					return 20
				}
				l.push(k)
			}
			n.reverse();
			l.reverse();
			if (n[0] !== l[0]) {
				return 1
			}
			var j = -1;
			while (j++, n[j] === l[j]) {
			}
			o = n[j];
			m = l[j];
			while (o = o.nextSibling) {
				if (o === m) {
					return 4
				}
			}
			return 2
		},
		getNodeIndex : function(k) {
			var l = k.parentNode.childNodes, j = 0;
			while (l[j] !== k) {
				j++
			}
			return j
		},
		findParent : function(l, j, k) {
			if (!this.isBody(l)) {
				l = k ? l : l.parentNode;
				while (l) {
					if (!j || j(l) || this.isBody(l)) {
						return j && !j(l) && this.isBody(l) ? null : l
					}
					l = l.parentNode
				}
			}
			return null
		},
		findParentByTagName : function(l, k, j) {
			if (l && l.nodeType && !this.isBody(l)
					&& (l.nodeType == 1 || l.nodeType)) {
				k = !i.isArray(k) ? [k] : k;
				l = l.nodeType == 3 || !j ? l.parentNode : l;
				while (l && l.tagName && l.nodeType != 9) {
					if (i.indexOf(k, l.tagName.toLowerCase()) > -1) {
						return l
					}
					l = l.parentNode
				}
			}
			return null
		},
		findParents : function(n, m, j, l) {
			var k = m && (j && j(n) || !j) ? [n] : [];
			while (n = c.findParent(n, j)) {
				k.push(n)
			}
			if (!l) {
				k.reverse()
			}
			return k
		},
		insertAfter : function(k, j) {
			return k.parentNode.insertBefore(j, k.nextSibling)
		},
		remove : function(k, l) {
			var j = k.parentNode, m;
			if (j) {
				if (l && k.hasChildNodes()) {
					while (m = k.firstChild) {
						j.insertBefore(m, k)
					}
				}
				j.removeChild(k)
			}
			return k
		},
		getNextDomNode : function(m, j, k, l) {
			return d(m, "firstChild", "nextSibling", j, k, l)
		},
		getPreviousDomNode : function(l, j, k) {
			return d(l, "lastChild", "previousSibling", j, k)
		},
		isBookmarkNode : function(j) {
			return j.nodeType == 1 && j.id && /^_baidu_bookmark_/i.test(j.id)
		},
		getWindow : function(j) {
			var k = j.ownerDocument || j;
			return k.defaultView || k.parentWindow
		},
		getCommonAncestor : function(o, m) {
			if (o === m) {
				return o
			}
			var n = [o], l = [m], k = o, j = -1;
			while (k = k.parentNode) {
				if (k === m) {
					return k
				}
				n.push(k)
			}
			k = m;
			while (k = k.parentNode) {
				if (k === o) {
					return k
				}
				l.push(k)
			}
			n.reverse();
			l.reverse();
			while (j++, n[j] === l[j]) {
			}
			return j == 0 ? null : n[j - 1]
		},
		clearEmptySibling : function(m, k, l) {
			function j(p, n) {
				var o;
				if (p
						&& (!c.isBookmarkNode(p) && c.isEmptyInlineElement(p) || c
								.isWhitespace(p))) {
					o = p[n];
					c.remove(p);
					o && j(o, n)
				}
			}
			!k && j(m.nextSibling, "nextSibling");
			!l && j(m.previousSibling, "previousSibling")
		},
		split : function(m, o) {
			var n = m.ownerDocument;
			if (e.ie && o == m.nodeValue.length) {
				var l = n.createTextNode("");
				return c.insertAfter(m, l)
			}
			var j = m.splitText(o);
			if (e.ie8) {
				var k = n.createTextNode("");
				c.insertAfter(j, k);
				c.remove(k)
			}
			return j
		},
		isWhitespace : function(k) {
			var j = new RegExp("[^ \t\n\r" + c.fillChar + "]");
			return !j.test(k.nodeValue)
		},
		getXY : function(k) {
			var j = 0, l = 0;
			while (k.offsetParent) {
				l += k.offsetTop;
				j += k.offsetLeft;
				k = k.offsetParent
			}
			return {
				x : j,
				y : l
			}
		},
		on : function(o, n, m) {
			var l = n instanceof Array ? n : [n], j = l.length;
			var p;
			if (!o.addEventListener) {
				p = function(k) {
					k = k || window.event;
					var q = k.srcElement;
					return m.call(q, k)
				};
				m._d = p
			}
			if (j) {
				while (j--) {
					n = l[j];
					if (o.addEventListener) {
						o.addEventListener(n, m, false)
					} else {
						o.attachEvent("on" + n, p)
					}
				}
			}
			o = null
		},
		un : function(o, n, m) {
			var l = n instanceof Array ? n : [n], j = l.length;
			if (j) {
				while (j--) {
					n = l[j];
					if (o.removeEventListener) {
						o.removeEventListener(n, m, false)
					} else {
						o.detachEvent("on" + n, m._d || m)
					}
				}
			}
		},
		isSameElement : function(l, j) {
			if (l.tagName != j.tagName) {
				return false
			}
			var r = l.attributes, p = j.attributes;
			if (!e.ie && r.length != p.length) {
				return false
			}
			var m = r.length, s = 0;
			if (m) {
				while (m--) {
					var q = r[m];
					if (!e.ie || q.specified) {
						s++;
						if (q.nodeName == "style") {
							continue
						}
						var o = j.attributes[q.nodeName];
						var n = o && o.nodeValue || null;
						if (n != q.nodeValue) {
							return false
						}
					}
				}
			}
			if (!c.isSameStyle(l, j)) {
				return false
			}
			if (e.ie) {
				m = p.length;
				if (m) {
					while (m--) {
						if (p[m].specified) {
							s--
						}
					}
				}
				return !s
			}
			return true
		},
		isRedundantSpan : function(j) {
			if (j.nodeType == 3 || j.tagName.toLowerCase() != "span") {
				return 0
			}
			if (e.ie) {
				return j.style.cssText == "" ? 1 : 0
			}
			return !j.attributes.length
		},
		isSameStyle : function(n, m) {
			var l = n.style.cssText, j = m.style.cssText;
			if (!l && !j) {
				return true
			} else {
				if (!l || !j) {
					return false
				}
			}
			var q = {}, k = [], o = {};
			l.replace(/[\w-]+\s*(?=:)/g, function(r) {
						q[r] = k.push(r)
					});
			try {
				j.replace(/[\w-]+\s*(?=:)/g, function(s) {
							var r = q[s];
							if (r) {
								s = i.cssStyleToDomStyle(s);
								if (n.style[s] !== m.style[s]) {
									throw o
								}
								k[r - 1] = ""
							} else {
								throw o
							}
						})
			} catch (p) {
				if (p === o) {
					return false
				}
			}
			return !k.join("")
		},
		isBlockElm : function() {
			var k = ["block", "list-item", "table", "table-row-group",
					"table-header-group", "table-footer-group", "table-row",
					"table-column-group", "table-column", "table-cell",
					"table-caption"], j = {
				hr : 1
			};
			return function(m, l) {
				return m.nodeType == 1
						&& (i.indexOf(k, c.getComputedStyle(m, "display")) != -1 || i
								.extend(j, l || {})[m.tagName
								.toLocaleLowerCase()])
			}
		}(),
		isBody : function(j) {
			return j && j.nodeType == 1 && j.tagName.toLowerCase() == "body"
		},
		breakParent : function(n, l) {
			var k, p = n, o = n, j, m;
			do {
				p = p.parentNode;
				if (j) {
					k = p.cloneNode(false);
					k.appendChild(j);
					j = k;
					k = p.cloneNode(false);
					k.appendChild(m);
					m = k
				} else {
					j = p.cloneNode(false);
					m = j.cloneNode(false)
				}
				while (k = o.previousSibling) {
					j.insertBefore(k, j.firstChild)
				}
				while (k = o.nextSibling) {
					m.appendChild(k)
				}
				o = p
			} while (l !== p);
			k = l.parentNode;
			k.insertBefore(j, l);
			k.insertBefore(m, l);
			k.insertBefore(n, m);
			c.remove(l);
			return n
		},
		isEmptyInlineElement : function(j) {
			if (j.nodeType != 1 || !a.$removeEmpty[j.tagName]) {
				return 0
			}
			j = j.firstChild;
			while (j) {
				if (c.isBookmarkNode(j)) {
					return 0
				}
				if (j.nodeType == 1 && !c.isEmptyInlineElement(j)
						|| j.nodeType == 3 && !c.isWhitespace(j)) {
					return 0
				}
				j = j.nextSibling
			}
			return 1
		},
		trimWhiteTextNode : function(k) {
			function j(l) {
				var m;
				while ((m = k[l]) && m.nodeType == 3 && c.isWhitespace(m)) {
					k.removeChild(m)
				}
			}
			j("firstChild");
			j("lastChild")
		},
		mergChild : function(n, l, t) {
			var q = c.getElementsByTagName(n, n.tagName.toLowerCase());
			for (var p = 0, v; v = q[p++];) {
				if (!v.parentNode || c.isBookmarkNode(v)) {
					continue
				}
				if (v.tagName.toLowerCase() == "span") {
					if (n === v.parentNode) {
						c.trimWhiteTextNode(n);
						if (n.childNodes.length == 1) {
							n.style.cssText = v.style.cssText + ";"
									+ n.style.cssText;
							c.remove(v, true);
							continue
						}
					}
					v.style.cssText = n.style.cssText + ";" + v.style.cssText;
					if (t) {
						var k = t.style;
						if (k) {
							k = k.split(";");
							for (var o = 0, u; u = k[o++];) {
								v.style[i.cssStyleToDomStyle(u.split(":")[0])] = u
										.split(":")[1]
							}
						}
					}
					if (c.isSameStyle(v, n)) {
						c.remove(v, true)
					}
					continue
				}
				if (c.isSameElement(n, v)) {
					c.remove(v, true)
				}
			}
			if (l == "span") {
				var m = c.getElementsByTagName(n, "a");
				for (var p = 0, r; r = m[p++];) {
					r.style.cssText = ";" + n.style.cssText;
					r.style.textDecoration = "underline"
				}
			}
		},
		getElementsByTagName : function(n, k) {
			var o = n.getElementsByTagName(k), j = [];
			for (var m = 0, l; l = o[m++];) {
				j.push(l)
			}
			return j
		},
		mergToParent : function(k) {
			var j = k.parentNode;
			while (j && a.$removeEmpty[j.tagName]) {
				if (j.tagName == k.tagName || j.tagName == "A") {
					c.trimWhiteTextNode(j);
					if (j.tagName.toLowerCase() == "span"
							&& !c.isSameStyle(j, k)
							|| (j.tagName == "A" && k.tagName == "SPAN")) {
						if (j.childNodes.length > 1 || j !== k.parentNode) {
							k.style.cssText = j.style.cssText + ";"
									+ k.style.cssText;
							j = j.parentNode;
							continue
						} else {
							j.style.cssText += ";" + k.style.cssText;
							if (j.tagName == "A") {
								j.style.textDecoration = "underline"
							}
						}
					}
					j.tagName != "A" && c.remove(k, true)
				}
				j = j.parentNode
			}
		},
		mergSibling : function(l, k, j) {
			function m(p, q, o) {
				var n;
				if ((n = o[p]) && !c.isBookmarkNode(n) && n.nodeType == 1
						&& c.isSameElement(o, n)) {
					while (n.firstChild) {
						if (q == "firstChild") {
							o.insertBefore(n.lastChild, o.firstChild)
						} else {
							o.appendChild(n.firstChild)
						}
					}
					c.remove(n)
				}
			}
			!k && m("previousSibling", "firstChild", l);
			!j && m("nextSibling", "lastChild", l)
		},
		unselectable : e.gecko ? function(j) {
			j.style.MozUserSelect = "none"
		} : e.webkit ? function(j) {
			j.style.KhtmlUserSelect = "none"
		} : function(l) {
			l.unselectable = "on";
			for (var k = 0, j; j = l.all[k++];) {
				switch (j.tagName.toLowerCase()) {
					case "iframe" :
					case "textarea" :
					case "input" :
					case "select" :
						break;
					default :
						j.unselectable = "on"
				}
			}
		},
		removeAttributes : function(m, n) {
			var l = n.length;
			if (l) {
				while (l--) {
					var j = n[l];
					j = h[j] || j;
					m.removeAttribute(j)
				}
			}
		},
		setAttributes : function(l, k) {
			for (var j in k) {
				switch (j.toLowerCase()) {
					case "class" :
						l.className = k[j];
						break;
					case "style" :
						l.style.cssText = k[j];
						break;
					default :
						l.setAttribute(j.toLowerCase(), k[j])
				}
			}
			return l
		},
		getComputedStyle : function(l, k) {
			function n(q, r) {
				if (q == "font-size" && /pt$/.test(r)) {
					r = Math.round(parseFloat(r) / 0.75) + "px"
				}
				return r
			}
			if (l.nodeType == 3) {
				l = l.parentNode
			}
			if (e.ie && k == "font-size" && !a.$empty[l.tagName]
					&& !a.$nonChild[l.tagName]) {
				var m = l.ownerDocument.createElement("span");
				m.style.cssText = "padding:0;border:0;";
				m.innerHTML = ".";
				l.appendChild(m);
				var j = m.offsetHeight;
				l.removeChild(m);
				m = null;
				return j + "px"
			}
			try {
				var o = c.getStyle(l, k)
						|| (window.getComputedStyle
								? c.getWindow(l).getComputedStyle(l, "")
										.getPropertyValue(k)
								: (l.currentStyle || l.style)[i
										.cssStyleToDomStyle(k)])
			} catch (p) {
				return null
			}
			return n(k, f(k, o))
		},
		removeClasses : function(j, k) {
			j.className = (" " + j.className + " ").replace(new RegExp(
							"(?:\\s+(?:" + k.join("|") + "))+\\s+", "g"), " ")
		},
		removeStyle : function(k, j) {
			k.style[i.cssStyleToDomStyle(j)] = "";
			if (k.style.removeAttribute) {
				k.style.removeAttribute(i.cssStyleToDomStyle(j))
			}
			if (!k.style.cssText) {
				k.removeAttribute("style")
			}
		},
		hasClass : function(j, k) {
			return (" " + j.className + " ").indexOf(" " + k + " ") > -1
		},
		preventDefault : function(j) {
			if (j.preventDefault) {
				j.preventDefault()
			} else {
				j.returnValue = false
			}
		},
		getStyle : function(k, j) {
			var l = k.style[i.cssStyleToDomStyle(j)];
			return f(j, l)
		},
		setStyle : function(k, j, l) {
			k.style[i.cssStyleToDomStyle(j)] = l
		},
		setStyles : function(k, l) {
			for (var j in l) {
				if (l.hasOwnProperty(j)) {
					c.setStyle(k, j, l[j])
				}
			}
		},
		removeDirtyAttr : function(m) {
			for (var l = 0, k, j = m.getElementsByTagName("*"); k = j[l++];) {
				k.removeAttribute("_moz_dirty")
			}
			m.removeAttribute("_moz_dirty")
		},
		getChildCount : function(l, j) {
			var k = 0, m = l.firstChild;
			j = j || function() {
				return 1
			};
			while (m) {
				if (j(m)) {
					k++
				}
				m = m.nextSibling
			}
			return k
		},
		clearReduent : function(m, r) {
			var k, l = new RegExp(c.fillChar, "g"), n;
			for (var p = 0, j; j = r[p++];) {
				k = m.getElementsByTagName(j);
				for (var o = 0, q; q = k[o++];) {
					if (q.parentNode
							&& q[e.ie ? "innerText" : "textContent"].replace(l,
									"").length == 0 && q.children.length == 0) {
						n = q.parentNode;
						c.remove(q);
						while (n.childNodes.length == 0
								&& new RegExp(r.join("|"), "i").test(n.tagName)) {
							q = n;
							n = n.parentNode;
							c.remove(q)
						}
					}
				}
			}
		},
		isEmptyNode : function(j) {
			var k = j.firstChild;
			return !k || c.getChildCount(j, function(l) {
						return !c.isBr(l) && !c.isBookmarkNode(l)
								&& !c.isWhitespace(l)
					}) == 0
		},
		clearSelectedArr : function(j) {
			var k;
			while (k = j.pop()) {
				k.className = ""
			}
		},
		scrollToView : function(l, r, j) {
			var k = function() {
				var s = r.document, t = s.compatMode == "CSS1Compat";
				return {
					width : (t
							? s.documentElement.clientWidth
							: s.body.clientWidth)
							|| 0,
					height : (t
							? s.documentElement.clientHeight
							: s.body.clientHeight)
							|| 0
				}
			}, q = function(t) {
				if ("pageXOffset" in t) {
					return {
						x : t.pageXOffset || 0,
						y : t.pageYOffset || 0
					}
				} else {
					var s = t.document;
					return {
						x : s.documentElement.scrollLeft || s.body.scrollLeft
								|| 0,
						y : s.documentElement.scrollTop || s.body.scrollTop
								|| 0
					}
				}
			};
			var o = k().height, p = o * -1 + j;
			p += (l.offsetHeight || 0);
			var m = c.getXY(l);
			p += m.y;
			var n = q(r).y;
			if (p > n || p < n - o) {
				r.scrollTo(0, p + (p < 0 ? -20 : 20))
			}
		},
		isBr : function(j) {
			return j.nodeType == 1 && j.tagName == "BR"
		},
		findTagNamesInSelection : function(r, x) {
			var n, k, u, m, l, o, s;
			if (r.collapsed) {
				m = r.startContainer;
				if (m && (m = c.findParentByTagName(m, x, true))) {
					return m
				}
			} else {
				r.shrinkBoundary();
				l = r.startContainer.nodeType == 3
						|| !r.startContainer.childNodes[r.startOffset]
						? r.startContainer
						: r.startContainer.childNodes[r.startOffset];
				o = r.endContainer.nodeType == 3 || r.endOffset == 0
						? r.endContainer
						: r.endContainer.childNodes[r.endOffset - 1];
				s = c.getCommonAncestor(l, o);
				for (var p = 0, v; v = x[p++];) {
					m = c.findParentByTagName(s, v, true);
					if (!m && s.nodeType == 1) {
						n = s.getElementsByTagName(v);
						for (var q = 0, w; w = n[q++];) {
							if (l == w || o == w) {
								m = w;
								break
							}
							k = c.getPosition(w, l), u = c.getPosition(w, o);
							if ((k & c.POSITION_FOLLOWING || k
									& c.POSITION_CONTAINS)
									&& (u & c.POSITION_PRECEDING || u
											& c.POSITION_CONTAINS)) {
								m = w;
								break
							}
						}
					}
					if (m) {
						return m
					}
				}
			}
			return null
		},
		isFillChar : function(k) {
			var j = new RegExp(c.fillChar);
			return k.nodeType == 3 && !k.nodeValue.replace(j, "").length
		},
		isStartInblock : function(k) {
			var n = k.cloneRange(), j = 0, o = n.startContainer;
			if (c.isFillChar(o)) {
				n.setStartBefore(o)
			}
			while (!n.startOffset) {
				o = n.startContainer;
				if (c.isBlockElm(o) || c.isBody(o)) {
					j = 1;
					break
				}
				var m = n.startContainer.previousSibling, l;
				while (m && c.isFillChar(m)) {
					l = m;
					m = m.previousSibling
				}
				if (l) {
					n.setStartBefore(l)
				} else {
					n.setStartBefore(n.startContainer)
				}
			}
			return j && !c.isBody(n.startContainer) ? 1 : 0
		},
		isEmptyBlock : function(k) {
			var j = new RegExp("[ \t\r\n" + c.fillChar + "]", "g");
			if (k[e.ie ? "innerText" : "textContent"].replace(j, "").length > 0) {
				return 0
			}
			for (var l in a.$isNotEmpty) {
				if (k.getElementsByTagName(l).length) {
					return 0
				}
			}
			return 1
		},
		findStartElement : function(l, k) {
			var m = l.startContainer;
			if (m.hasChildNodes()) {
				m = m.childNodes[l.startOffset] || m
			} else {
				if (m.nodeType == 3) {
					if (l.startOffset == 0) {
						m = m.previousSibling || m.parentNode
					} else {
						if (l.startOffset >= m.nodeValue.length) {
							m = m.nextSibling || m.parentNode
						}
					}
				}
			}
			if (m.nodeType != 1) {
				m = m.parentNode
			}
			while (m != null) {
				if (j(m)) {
					return m
				}
				m = m.parentNode
			}
			return null;
			function j(n) {
				if (typeof k == "string") {
					return n.nodeName == k
				} else {
					if (typeof k == "function") {
						return k(n)
					} else {
						return k.test(n.nodeName)
					}
				}
			}
		}
	}
})();
baidu.editor.dom.Range = baidu.editor.dom.Range || {};
(function() {
	var h = baidu.editor, g = h.browser, e = h.dom.domUtils, a = h.dom.dtd, k = h.utils, i = 0, j = e.fillChar;
	var c = function(m) {
		m.collapsed = m.startContainer && m.endContainer
				&& m.startContainer === m.endContainer
				&& m.startOffset == m.endOffset
	}, b = function(n, o, p, m) {
		if (o.nodeType == 1 && (a.$empty[o.tagName] || a.$nonChild[o.tagName])) {
			p = e.getNodeIndex(o) + (n ? 0 : 1);
			o = o.parentNode
		}
		if (n) {
			m.startContainer = o;
			m.startOffset = p;
			if (!m.endContainer) {
				m.collapse(true)
			}
		} else {
			m.endContainer = o;
			m.endOffset = p;
			if (!m.startContainer) {
				m.collapse(false)
			}
		}
		c(m);
		return m
	}, l = function(s, w) {
		var q = s.startContainer, p = s.endContainer, y = s.startOffset, r = s.endOffset, E = s.document, m = E
				.createDocumentFragment(), t, v;
		if (q.nodeType == 1) {
			q = q.childNodes[y] || (t = q.appendChild(E.createTextNode("")))
		}
		if (p.nodeType == 1) {
			p = p.childNodes[r] || (v = p.appendChild(E.createTextNode("")))
		}
		if (q === p && q.nodeType == 3) {
			m.appendChild(E.createTextNode(q.substringData(y, r - y)));
			if (w) {
				q.deleteData(y, r - y);
				s.collapse(true)
			}
			return m
		}
		var u, A, C = m, B = e.findParents(q, true), n = e.findParents(p, true);
		for (var z = 0; B[z] == n[z]; z++) {
		}
		for (var x = z, D; D = B[x]; x++) {
			u = D.nextSibling;
			if (D == q) {
				if (!t) {
					if (s.startContainer.nodeType == 3) {
						C.appendChild(E.createTextNode(q.nodeValue.slice(y)));
						if (w) {
							q.deleteData(y, q.nodeValue.length - y)
						}
					} else {
						C.appendChild(!w ? q.cloneNode(true) : q)
					}
				}
			} else {
				A = D.cloneNode(false);
				C.appendChild(A)
			}
			while (u) {
				if (u === p || u === n[x]) {
					break
				}
				D = u.nextSibling;
				C.appendChild(!w ? u.cloneNode(true) : u);
				u = D
			}
			C = A
		}
		C = m;
		if (!B[z]) {
			C.appendChild(B[z - 1].cloneNode(false));
			C = C.firstChild
		}
		for (var x = z, o; o = n[x]; x++) {
			u = o.previousSibling;
			if (o == p) {
				if (!v && s.endContainer.nodeType == 3) {
					C.appendChild(E.createTextNode(p.substringData(0, r)));
					if (w) {
						p.deleteData(0, r)
					}
				}
			} else {
				A = o.cloneNode(false);
				C.appendChild(A)
			}
			if (x != z || !B[z]) {
				while (u) {
					if (u === q) {
						break
					}
					o = u.previousSibling;
					C.insertBefore(!w ? u.cloneNode(true) : u, C.firstChild);
					u = o
				}
			}
			C = A
		}
		if (w) {
			s.setStartBefore(!n[z] ? n[z - 1] : !B[z] ? B[z - 1] : n[z])
					.collapse(true)
		}
		t && e.remove(t);
		v && e.remove(v);
		return m
	};
	var d = baidu.editor.dom.Range = function(m) {
		var n = this;
		n.startContainer = n.startOffset = n.endContainer = n.endOffset = null;
		n.document = m;
		n.collapsed = true
	};
	function f(o) {
		var n = o.parentNode, m;
		e.remove(o);
		while (n && a.$removeEmpty[n.tagName] && n.childNodes.length == 0) {
			m = n;
			e.remove(n);
			n = m.parentNode
		}
	}
	d.prototype = {
		cloneContents : function() {
			return this.collapsed ? null : l(this, 0)
		},
		deleteContents : function() {
			if (!this.collapsed) {
				l(this, 1)
			}
			if (g.webkit) {
				var m = this.startContainer;
				if (m.nodeType == 3 && !m.nodeValue.length) {
					this.setStartBefore(m).collapse(true);
					e.remove(m)
				}
			}
			return this
		},
		extractContents : function() {
			return this.collapsed ? null : l(this, 2)
		},
		setStart : function(m, n) {
			return b(true, m, n, this)
		},
		setEnd : function(m, n) {
			return b(false, m, n, this)
		},
		setStartAfter : function(m) {
			return this.setStart(m.parentNode, e.getNodeIndex(m) + 1)
		},
		setStartBefore : function(m) {
			return this.setStart(m.parentNode, e.getNodeIndex(m))
		},
		setEndAfter : function(m) {
			return this.setEnd(m.parentNode, e.getNodeIndex(m) + 1)
		},
		setEndBefore : function(m) {
			return this.setEnd(m.parentNode, e.getNodeIndex(m))
		},
		selectNode : function(m) {
			return this.setStartBefore(m).setEndAfter(m)
		},
		selectNodeContents : function(m) {
			return this.setStart(m, 0).setEnd(m,
					m.nodeType == 3 ? m.nodeValue.length : m.childNodes.length)
		},
		cloneRange : function() {
			var n = this, m = new d(n.document);
			return m.setStart(n.startContainer, n.startOffset).setEnd(
					n.endContainer, n.endOffset)
		},
		collapse : function(m) {
			var n = this;
			if (m) {
				n.endContainer = n.startContainer;
				n.endOffset = n.startOffset
			} else {
				n.startContainer = n.endContainer;
				n.startOffset = n.endOffset
			}
			n.collapsed = true;
			return n
		},
		shrinkBoundary : function(n) {
			var m = this, p, o = m.collapsed;
			while (m.startContainer.nodeType == 1
					&& (p = m.startContainer.childNodes[m.startOffset])
					&& p.nodeType == 1 && !e.isBookmarkNode(p)
					&& !a.$empty[p.tagName] && !a.$nonChild[p.tagName]) {
				m.setStart(p, 0)
			}
			if (o) {
				return m.collapse(true)
			}
			if (!n) {
				while (m.endContainer.nodeType == 1 && m.endOffset > 0
						&& (p = m.endContainer.childNodes[m.endOffset - 1])
						&& p.nodeType == 1 && !e.isBookmarkNode(p)
						&& !a.$empty[p.tagName] && !a.$nonChild[p.tagName]) {
					m.setEnd(p, p.childNodes.length)
				}
			}
			return m
		},
		getCommonAncestor : function(n, o) {
			var p = this.startContainer, m = this.endContainer;
			if (p === m) {
				if (n && p.nodeType == 1
						&& this.startOffset == this.endOffset - 1) {
					return p.childNodes[this.startOffset]
				}
				return o && p.nodeType == 3 ? p.parentNode : p
			}
			return e.getCommonAncestor(p, m)
		},
		trimBoundary : function(n) {
			this.txtToElmBoundary();
			var r = this.startContainer, q = this.startOffset, p = this.collapsed, m = this.endContainer;
			if (r.nodeType == 3) {
				if (q == 0) {
					this.setStartBefore(r)
				} else {
					if (q >= r.nodeValue.length) {
						this.setStartAfter(r)
					} else {
						var o = e.split(r, q);
						if (r === m) {
							this.setEnd(o, this.endOffset - q)
						} else {
							if (r.parentNode === m) {
								this.endOffset += 1
							}
						}
						this.setStartBefore(o)
					}
				}
				if (p) {
					return this.collapse(true)
				}
			}
			if (!n) {
				q = this.endOffset;
				m = this.endContainer;
				if (m.nodeType == 3) {
					if (q == 0) {
						this.setEndBefore(m)
					} else {
						if (q >= m.nodeValue.length) {
							this.setEndAfter(m)
						} else {
							e.split(m, q);
							this.setEndAfter(m)
						}
					}
				}
			}
			return this
		},
		txtToElmBoundary : function() {
			function m(o, q) {
				var n = o[q + "Container"], p = o[q + "Offset"];
				if (n.nodeType == 3) {
					if (!p) {
						o["set" + q.replace(/(\w)/, function(r) {
									return r.toUpperCase()
								}) + "Before"](n)
					} else {
						if (p >= n.nodeValue.length) {
							o["set" + q.replace(/(\w)/, function(r) {
										return r.toUpperCase()
									}) + "After"](n)
						}
					}
				}
			}
			if (!this.collapsed) {
				m(this, "start");
				m(this, "end")
			}
			return this
		},
		insertNode : function(o) {
			var q = o, n = 1;
			if (o.nodeType == 11) {
				q = o.firstChild;
				n = o.childNodes.length
			}
			this.trimBoundary(true);
			var r = this.startContainer, p = this.startOffset;
			var m = r.childNodes[p];
			if (m) {
				r.insertBefore(o, m)
			} else {
				r.appendChild(o)
			}
			if (q.parentNode === this.endContainer) {
				this.endOffset = this.endOffset + n
			}
			return this.setStartBefore(q)
		},
		setCursor : function(n, m) {
			return this.collapse(n ? false : true).select(m)
		},
		createBookmark : function(o, p) {
			var m, n = this.document.createElement("span");
			n.style.cssText = "display:none;line-height:0px;";
			n.appendChild(this.document.createTextNode("\uFEFF"));
			n.id = "_baidu_bookmark_start_" + (p ? "" : i++);
			if (!this.collapsed) {
				m = n.cloneNode(true);
				m.id = "_baidu_bookmark_end_" + (p ? "" : i++)
			}
			this.insertNode(n);
			if (m) {
				this.collapse(false).insertNode(m);
				this.setEndBefore(m)
			}
			this.setStartAfter(n);
			return {
				start : o ? n.id : n,
				end : m ? o ? m.id : m : null,
				id : o
			}
		},
		moveToBookmark : function(n) {
			var o = n.id ? this.document.getElementById(n.start) : n.start, m = n.end
					&& n.id ? this.document.getElementById(n.end) : n.end;
			this.setStartBefore(o);
			e.remove(o);
			if (m) {
				this.setEndBefore(m);
				e.remove(m)
			} else {
				this.collapse(true)
			}
			return this
		},
		enlarge : function(n, q) {
			var m = e.isBody, r, p, o = this.document.createTextNode("");
			if (n) {
				p = this.startContainer;
				if (p.nodeType == 1) {
					if (p.childNodes[this.startOffset]) {
						r = p = p.childNodes[this.startOffset]
					} else {
						p.appendChild(o);
						r = p = o
					}
				} else {
					r = p
				}
				while (1) {
					if (e.isBlockElm(p)) {
						p = r;
						while ((r = p.previousSibling) && !e.isBlockElm(r)) {
							p = r
						}
						this.setStartBefore(p);
						break
					}
					r = p;
					p = p.parentNode
				}
				p = this.endContainer;
				if (p.nodeType == 1) {
					if (r = p.childNodes[this.endOffset]) {
						p.insertBefore(o, r)
					} else {
						p.appendChild(o)
					}
					r = p = o
				} else {
					r = p
				}
				while (1) {
					if (e.isBlockElm(p)) {
						p = r;
						while ((r = p.nextSibling) && !e.isBlockElm(r)) {
							p = r
						}
						this.setEndAfter(p);
						break
					}
					r = p;
					p = p.parentNode
				}
				if (o.parentNode === this.endContainer) {
					this.endOffset--
				}
				e.remove(o)
			}
			if (!this.collapsed) {
				while (this.startOffset == 0) {
					if (q && q(this.startContainer)) {
						break
					}
					if (m(this.startContainer)) {
						break
					}
					this.setStartBefore(this.startContainer)
				}
				while (this.endOffset == (this.endContainer.nodeType == 1
						? this.endContainer.childNodes.length
						: this.endContainer.nodeValue.length)) {
					if (q && q(this.endContainer)) {
						break
					}
					if (m(this.endContainer)) {
						break
					}
					this.setEndAfter(this.endContainer)
				}
			}
			return this
		},
		adjustmentBoundary : function() {
			if (!this.collapsed) {
				while (!e.isBody(this.startContainer)
						&& this.startOffset == this.startContainer[this.startContainer.nodeType == 3
								? "nodeValue"
								: "childNodes"].length) {
					this.setStartAfter(this.startContainer)
				}
				while (!e.isBody(this.endContainer) && !this.endOffset) {
					this.setEndBefore(this.endContainer)
				}
			}
			return this
		},
		applyInlineStyle : function(o, z, v) {
			if (this.collapsed) {
				return this
			}
			this.trimBoundary().enlarge(false, function(D) {
						return D.nodeType == 1 && e.isBlockElm(D)
					}).adjustmentBoundary();
			var w = this.createBookmark(), r = w.end, B = function(D) {
				return D.nodeType == 1 ? D.tagName.toLowerCase() != "br" : !e
						.isWhitespace(D)
			}, u = e.getNextDomNode(w.start, false, B), p, q, t = this
					.cloneRange();
			while (u && (e.getPosition(u, r) & e.POSITION_PRECEDING)) {
				if (u.nodeType == 3 || a[o][u.tagName]) {
					t.setStartBefore(u);
					p = u;
					while (p && (p.nodeType == 3 || a[o][p.tagName]) && p !== r) {
						q = p;
						p = e.getNextDomNode(p, p.nodeType == 1, null,
								function(D) {
									return a[o][D.tagName]
								})
					}
					var A = t.setEndAfter(q).extractContents(), x;
					if (v && v.length > 0) {
						var m, y;
						y = m = v[0].cloneNode(false);
						for (var s = 1, C; C = v[s++];) {
							m.appendChild(C.cloneNode(false));
							m = m.firstChild
						}
						x = m
					} else {
						x = t.document.createElement(o)
					}
					if (z) {
						e.setAttributes(x, z)
					}
					x.appendChild(A);
					e.mergChild(x, o, z);
					t.insertNode(v ? y : x);
					var n;
					if (o == "span" && z.style
							&& /text\-decoration/.test(z.style)
							&& (n = e.findParentByTagName(x, "a", true))) {
						e.setAttributes(n, z);
						e.remove(x, true);
						x = n
					} else {
						e.mergSibling(x);
						e.clearEmptySibling(x)
					}
					u = e.getNextDomNode(x, false, B);
					e.mergToParent(x);
					if (p === r) {
						break
					}
				} else {
					u = e.getNextDomNode(u, true, B)
				}
			}
			return this.moveToBookmark(w)
		},
		removeInlineStyle : function(n) {
			if (this.collapsed) {
				return this
			}
			n = k.isArray(n) ? n : [n];
			this.shrinkBoundary().adjustmentBoundary();
			var t = this.startContainer, m = this.endContainer;
			while (1) {
				if (t.nodeType == 1) {
					if (k.indexOf(n, t.tagName.toLowerCase()) > -1) {
						break
					}
					if (t.tagName.toLowerCase() == "body") {
						t = null;
						break
					}
				}
				t = t.parentNode
			}
			while (1) {
				if (m.nodeType == 1) {
					if (k.indexOf(n, m.tagName.toLowerCase()) > -1) {
						break
					}
					if (m.tagName.toLowerCase() == "body") {
						m = null;
						break
					}
				}
				m = m.parentNode
			}
			var p = this.createBookmark(), s, r;
			if (t) {
				r = this.cloneRange().setEndBefore(p.start).setStartBefore(t);
				s = r.extractContents();
				r.insertNode(s);
				e.clearEmptySibling(t, true);
				t.parentNode.insertBefore(p.start, t)
			}
			if (m) {
				r = this.cloneRange().setStartAfter(p.end).setEndAfter(m);
				s = r.extractContents();
				r.insertNode(s);
				e.clearEmptySibling(m, false, true);
				m.parentNode.insertBefore(p.end, m.nextSibling)
			}
			var q = e.getNextDomNode(p.start, false, function(u) {
						return u.nodeType == 1
					}), o;
			while (q && q !== p.end) {
				o = e.getNextDomNode(q, true, function(u) {
							return u.nodeType == 1
						});
				if (k.indexOf(n, q.tagName.toLowerCase()) > -1) {
					e.remove(q, true)
				}
				q = o
			}
			return this.moveToBookmark(p)
		},
		getClosedNode : function() {
			var n;
			if (!this.collapsed) {
				var m = this.cloneRange().adjustmentBoundary().shrinkBoundary();
				if (m.startContainer.nodeType == 1
						&& m.startContainer === m.endContainer
						&& m.endOffset - m.startOffset == 1) {
					var o = m.startContainer.childNodes[m.startOffset];
					if (o && o.nodeType == 1 && a.$empty[o.tagName]) {
						n = o
					}
				}
			}
			return n
		},
		select : g.ie ? function(m) {
			var r = this.collapsed, u;
			if (!r) {
				this.shrinkBoundary()
			}
			var p = this.getClosedNode();
			if (p) {
				try {
					u = this.document.body.createControlRange();
					u.addElement(p);
					u.select()
				} catch (v) {
				}
				return this
			}
			var w = this.createBookmark(), o = w.start, q;
			u = this.document.body.createTextRange();
			u.moveToElementText(o);
			u.moveStart("character", 1);
			if (!r) {
				var t = this.document.body.createTextRange();
				q = w.end;
				t.moveToElementText(q);
				u.setEndPoint("EndToEnd", t)
			} else {
				if (!m && this.startContainer.nodeType != 3) {
					var n = h.fillData, x, s = this.document
							.createElement("span");
					try {
						if (n
								&& n.parentNode
								&& !n.nodeValue.replace(new RegExp(e.fillChar,
												"g"), "").length) {
							f(n)
						}
					} catch (v) {
					}
					x = h.fillData = this.document.createTextNode(j);
					s.appendChild(this.document.createTextNode(j));
					o.parentNode.insertBefore(s, o);
					o.parentNode.insertBefore(x, o);
					u.moveStart("character", -1);
					u.collapse(true)
				}
			}
			this.moveToBookmark(w);
			s && e.remove(s);
			u.select();
			return this
		} : function(o) {
			var s = e.getWindow(this.document), r = s.getSelection(), q, t;
			g.gecko ? this.document.body.focus() : s.focus();
			function n(u) {
				if (u
						&& u.nodeType == 3
						&& !u.nodeValue
								.replace(new RegExp(e.fillChar, "g"), "").length) {
					e.remove(u)
				}
			}
			if (r) {
				r.removeAllRanges();
				if (this.collapsed && !o) {
					var m = h.fillData;
					q = this.document.createTextNode(j);
					h.fillData = q;
					this.insertNode(q);
					if (m && m.parentNode) {
						if (!m.nodeValue.replace(new RegExp(e.fillChar, "g"),
								"").length) {
							f(m)
						} else {
							m.nodeValue = m.nodeValue.replace(new RegExp(
											e.fillChar, "g"), "")
						}
					}
					n(q.previousSibling);
					n(q.nextSibling);
					this.setStart(q, g.webkit ? 1 : 0).collapse(true)
				}
				var p = this.document.createRange();
				p.setStart(this.startContainer, this.startOffset);
				p.setEnd(this.endContainer, this.endOffset);
				r.addRange(p)
			}
			return this
		},
		scrollToView : function(o, p) {
			o = o ? window : e.getWindow(this.document);
			var m = this.document.createElement("span");
			m.innerHTML = "&nbsp;";
			var n = this.cloneRange();
			n.insertNode(m);
			e.scrollToView(m, o, p);
			e.remove(m);
			return this
		}
	}
})();
baidu.editor.dom.Selection = baidu.editor.dom.Selection || {};
(function() {
	baidu.editor.dom.Selection = b;
	var a = baidu.editor.dom.domUtils, e = baidu.editor.dom.dtd, g = baidu.editor.browser.ie;
	function f(r, j) {
		var k = a.getNodeIndex;
		r = r.duplicate();
		r.collapse(j);
		var v = r.parentElement();
		if (!v.hasChildNodes()) {
			return {
				container : v,
				offset : 0
			}
		}
		var u = v.children, l, n = r.duplicate(), w = 0, q = u.length - 1, s = -1, h;
		while (w <= q) {
			s = Math.floor((w + q) / 2);
			l = u[s];
			n.moveToElementText(l);
			var p = n.compareEndPoints("StartToStart", r);
			if (p > 0) {
				q = s - 1
			} else {
				if (p < 0) {
					w = s + 1
				} else {
					return {
						container : v,
						offset : k(l)
					}
				}
			}
		}
		if (s == -1) {
			n.moveToElementText(v);
			n.setEndPoint("StartToStart", r);
			h = n.text.replace(/(\r\n|\r)/g, "\n").length;
			u = v.childNodes;
			if (!h) {
				l = u[u.length - 1];
				return {
					container : l,
					offset : l.nodeValue.length
				}
			}
			var o = u.length;
			while (h > 0) {
				h -= u[--o].nodeValue.length
			}
			return {
				container : u[o],
				offset : -h
			}
		}
		n.collapse(p > 0);
		n.setEndPoint(p > 0 ? "StartToStart" : "EndToStart", r);
		h = n.text.replace(/(\r\n|\r)/g, "\n").length;
		if (!h) {
			return e.$empty[l.tagName] || e.$nonChild[l.tagName] ? {
				container : v,
				offset : k(l) + (p > 0 ? 0 : 1)
			} : {
				container : l,
				offset : p > 0 ? 0 : l.childNodes.length
			}
		}
		while (h > 0) {
			try {
				var m = l;
				l = l[p > 0 ? "previousSibling" : "nextSibling"];
				h -= l.nodeValue.length
			} catch (t) {
				return {
					container : v,
					offset : k(m)
				}
			}
		}
		return {
			container : l,
			offset : p > 0 ? -h : l.nodeValue.length + h
		}
	}
	function d(j, i) {
		if (j.item) {
			i.selectNode(j.item(0))
		} else {
			var h = f(j, true);
			i.setStart(h.container, h.offset);
			if (j.compareEndPoints("StartToEnd", j) != 0) {
				h = f(j, false);
				i.setEnd(h.container, h.offset)
			}
		}
		return i
	}
	function c(j) {
		var i = j.getNative().createRange();
		var h = i.item ? i.item(0) : i.parentElement();
		if ((h.ownerDocument || h) === j.document) {
			return i
		}
	}
	function b(j) {
		var i = this, h;
		i.document = j;
		if (g) {
			h = a.getWindow(j).frameElement;
			a.on(h, "beforedeactivate", function() {
						i._bakIERange = i.getIERange()
					});
			a.on(h, "activate", function() {
						try {
							if (!c(i) && i._bakIERange) {
								i._bakIERange.select()
							}
						} catch (k) {
						}
						i._bakIERange = null
					})
		}
		h = j = null
	}
	b.prototype = {
		getNative : function() {
			if (g) {
				return this.document.selection
			} else {
				return a.getWindow(this.document).getSelection()
			}
		},
		getIERange : function() {
			var h = c(this);
			if (!h) {
				if (this._bakIERange) {
					return this._bakIERange
				}
			}
			return h
		},
		cache : function() {
			this.clear();
			this._cachedRange = this.getRange();
			this._cachedStartElement = this.getStart()
		},
		clear : function() {
			this._cachedRange = this._cachedStartElement = null
		},
		getRange : function() {
			var k = this;
			function j(o) {
				var q = k.document.body.firstChild, p = o.collapsed;
				while (q && q.firstChild) {
					o.setStart(q, 0);
					q = q.firstChild
				}
				if (!o.startContainer) {
					o.setStart(k.document.body, 0)
				}
				if (p) {
					o.collapse(true)
				}
			}
			if (k._cachedRange != null) {
				return this._cachedRange
			}
			var i = new baidu.editor.dom.Range(k.document);
			if (g) {
				var m = k.getIERange();
				if (m) {
					d(m, i)
				} else {
					j(i)
				}
			} else {
				var l = k.getNative();
				if (l && l.rangeCount) {
					var h = l.getRangeAt(0);
					var n = l.getRangeAt(l.rangeCount - 1);
					i.setStart(h.startContainer, h.startOffset).setEnd(
							n.endContainer, n.endOffset);
					if (i.collapsed && a.isBody(i.startContainer)
							&& !i.startOffset) {
						j(i)
					}
				} else {
					j(i)
				}
			}
			return i
		},
		getStart : function() {
			if (this._cachedStartElement) {
				return this._cachedStartElement
			}
			var h = g ? this.getIERange() : this.getRange(), k, l, i, j;
			if (g) {
				if (!h) {
					return this.document.body.firstChild
				}
				if (h.item) {
					return h.item(0)
				}
				k = h.duplicate();
				k.text.length > 0 && k.moveStart("character", 1);
				k.collapse(1);
				l = k.parentElement();
				j = i = h.parentElement();
				while (i = i.parentNode) {
					if (i == l) {
						l = j;
						break
					}
				}
			} else {
				h.shrinkBoundary();
				l = h.startContainer;
				if (l.nodeType == 1 && l.hasChildNodes()) {
					l = l.childNodes[Math.min(l.childNodes.length - 1,
							h.startOffset)]
				}
				if (l.nodeType == 3) {
					return l.parentNode
				}
			}
			return l
		},
		getText : function() {
			var h = this.getNative(), i = baidu.editor.browser.ie ? h
					.createRange() : h.getRangeAt(0);
			return i.text || i.toString()
		}
	}
})();
(function() {
	baidu.editor.Editor = f;
	var g = baidu.editor, i = g.utils, d = g.EventBase, c = g.dom.domUtils, j = g.dom.Selection, b = g.browser.ie, h = 0, e = g.browser, a = g.dom.dtd;
	function f(k) {
		var l = this;
		l.uid = h++;
		d.call(l);
		l.commands = {};
		l.options = i.extend(k || {}, UEDITOR_CONFIG, true);
		l.initPlugins()
	}
	f.prototype = {
		render : function(k) {
			if (k.constructor === String) {
				k = document.getElementById(k)
			}
			var n = "baidu_editor_" + this.uid;
			k.innerHTML = '<iframe id="'
					+ n
					+ '"width="100%" height="100%" scroll="no" frameborder="0"></iframe>';
			k.style.overflow = "hidden";
			var l = document.getElementById(n), m = l.contentWindow.document;
			this._setup(m)
		},
		_setup : function(q) {
			var l = this.options, p = this;
			q.open();
			var n = (b ? "" : "<!DOCTYPE html>")
					+ '<html xmlns="http://www.w3.org/1999/xhtml"><head><title></title>'
					+ (l.iframeCssUrl
							? '<link rel="stylesheet" type="text/css" href="'
									+ i.unhtml(l.iframeCssUrl) + '"/>'
							: "")
					+ '<style type="text/css">'
					+ (b && e.version < 9 ? "body" : "html")
					+ "{ word-wrap: break-word;word-break: break-all;cursor: text; height: 100%; font-size:"
					+ this.options.defaultFontSize + ";font-family:"
					+ this.options.defaultFontFamily + ";}\n"
					+ (l.initialStyle || " ")
					+ "</style></head><body></body></html>";
			q.write(n);
			q.close();
			if (b) {
				q.body.disabled = true;
				q.body.contentEditable = true;
				q.body.disabled = false
			} else {
				q.body.contentEditable = true;
				q.body.spellcheck = false
			}
			this.document = q;
			this.window = q.defaultView || q.parentWindow;
			this.iframe = this.window.frameElement;
			if (this.options.minFrameHeight) {
				this.setHeight(this.options.minFrameHeight)
			}
			this.body = q.body;
			this.selection = new j(q);
			this._initEvents();
			if (this.options.initialContent) {
				if (p.options.autoClearinitialContent) {
					var m = p.execCommand;
					p.execCommand = function() {
						p.fireEvent("firstBeforeExecCommand");
						m.apply(p, arguments)
					};
					this.setDefaultContent(this.options.initialContent)
				} else {
					this.setContent(this.options.initialContent)
				}
			}
			for (var o = this.iframe.parentNode; !c.isBody(o); o = o.parentNode) {
				if (o.tagName == "FORM") {
					c.on(o, "submit", function() {
								var s = document
										.getElementById("ueditor_textarea_"
												+ p.options.textarea);
								if (!s) {
									s = document.createElement("textarea");
									s.setAttribute("name", p.options.textarea);
									s.id = "ueditor_textarea_"
											+ p.options.textarea;
									s.style.display = "none";
									this.appendChild(s)
								}
								s.value = p.getContent()
							});
					break
				}
			}
			if (c.getChildCount(this.body, function(s) {
						return !c.isBr(s)
					}) == 0) {
				this.body.innerHTML = "<p>" + (e.ie ? "" : "<br/>") + "</p>"
			}
			if (p.options.focus) {
				var k = this.selection.getRange(), r = this.body.firstChild;
				setTimeout(function() {
							k.setStartBefore(r).setCursor(false, true);
							p._selectionChange()
						})
			}
			this.fireEvent("ready")
		},
		sync : function() {
			for (var l = this.iframe.parentNode; !c.isBody(l); l = l.parentNode) {
				if (l.tagName == "FORM") {
					var k = document.getElementById("ueditor_textarea_"
							+ this.options.textarea);
					if (!k) {
						k = document.createElement("textarea");
						k.setAttribute("name", this.options.textarea);
						k.id = "ueditor_textarea_" + this.options.textarea;
						k.style.display = "none";
						l.appendChild(k)
					}
					k.value = this.getContent();
					break
				}
			}
		},
		setHeight : function(k) {
			if (k !== parseInt(this.iframe.parentNode.style.height)) {
				this.iframe.parentNode.style.height = k + "px"
			}
		},
		getContent : function() {
			this.fireEvent("beforegetcontent");
			var l = new RegExp(c.fillChar, "g"), k = this.document.body.innerHTML
					.replace(l, "");
			this.fireEvent("aftergetcontent");
			if (this.serialize) {
				var m = this.serialize.parseHTML(k);
				m = this.serialize.transformOutput(m);
				k = this.serialize.toHTML(m)
			}
			return k
		},
		getContentTxt : function() {
			var l, k;
			k = e.ie ? "\r\t\n" : "&#nbsp;\r\t\n";
			l = new RegExp("[" + k + c.fillChar + "]", "g");
			return this.document.body[e.ie ? "innerText" : "textContent"]
					.replace(l, "")
		},
		setContent : function(k) {
			var o = this;
			o.fireEvent("beforesetcontent");
			var m = this.serialize;
			if (m) {
				var n = m.parseHTML(k);
				n = m.transformInput(n);
				n = m.filter(n);
				k = m.toHTML(n)
			}
			this.document.body.innerHTML = k;
			if (o.options.enterTag == "p") {
				var r = this.body.firstChild, q = o.document.createElement("p"), l;
				while (r) {
					if (r.nodeType == 3 || r.nodeType == 1 && a.p[r.tagName]) {
						l = r.nextSibling;
						q.appendChild(r);
						r = l;
						if (!r) {
							o.body.appendChild(q)
						}
					} else {
						if (q.firstChild) {
							o.body.insertBefore(q, r);
							q = o.document.createElement("p")
						}
						r = r.nextSibling
					}
				}
			}
			o.adjustTable && o.adjustTable(o.body);
			o.fireEvent("aftersetcontent");
			o._selectionChange()
		},
		focus : function() {
			c.getWindow(this.document).focus()
		},
		initPlugins : function(l) {
			var n, k = baidu.editor.plugins;
			if (l) {
				for (var m = 0, o; o = l[m++];) {
					if (i.indexOf(this.options.plugins, o) == -1
							&& (n = baidu.editor.plugins[o])) {
						this.options.plugins.push(o);
						n.call(this)
					}
				}
			} else {
				l = this.options.plugins;
				if (l) {
					for (m = 0; o = k[l[m++]];) {
						o.call(this)
					}
				} else {
					this.options.plugins = [];
					for (o in k) {
						this.options.plugins.push(o);
						k[o].call(this)
					}
				}
			}
		},
		_initEvents : function() {
			var l = this, p = this.document, o = c.getWindow(p);
			l._proxyDomEvent = i.bind(l._proxyDomEvent, l);
			c.on(p, ["click", "contextmenu", "mousedown", "keydown", "keyup",
							"keypress", "mouseup", "mouseover", "mouseout",
							"selectstart"], l._proxyDomEvent);
			c.on(o, ["focus", "blur"], l._proxyDomEvent);
			c.on(p, ["mouseup", "keydown"], function(q) {
						if (q.type == "keydown"
								&& (q.ctrlKey || q.metaKey || q.shiftKey || q.altKey)) {
							return
						}
						if (q.button == 2) {
							return
						}
						l._selectionChange(250, true)
					});
			var k = 0, m = e.ie ? l.body : l.document, n;
			c.on(m, "dragstart", function() {
						k = 1
					});
			c.on(m, e.webkit ? "dragover" : "drop", function() {
				return e.webkit ? function() {
					clearTimeout(n);
					n = setTimeout(function() {
								if (!k) {
									var u = l.selection, q = u.getRange();
									if (q) {
										var r = q.getCommonAncestor();
										if (r && l.serialize) {
											var t = l.serialize, s = t
													.filter(t
															.transformInput(t
																	.parseHTML(t
																			.word(r.innerHTML))));
											r.innerHTML = t.toHTML(s)
										}
									}
								}
								k = 0
							}, 200)
				}
						: function(q) {
							if (!k) {
								q.preventDefault
										? q.preventDefault()
										: (q.returnValue = false)
							}
							k = 0
						}
			}())
		},
		_proxyDomEvent : function(k) {
			return this.fireEvent(k.type.replace(/^on/, ""), k)
		},
		_selectionChange : function(l, k) {
			var m = this;
			clearTimeout(this._selectionChangeTimer);
			this._selectionChangeTimer = setTimeout(function() {
				m.selection.cache();
				if (m.selection._cachedRange && m.selection._cachedStartElement) {
					m.fireEvent("beforeselectionchange");
					m.fireEvent("selectionchange", k);
					m.selection.clear()
				}
			}, l || 50)
		},
		_callCmdFn : function(o, l) {
			var k = l[0].toLowerCase(), n, m;
			m = (n = this.commands[k]) && n[o]
					|| (n = baidu.editor.commands[k]) && n[o];
			if (n && !m && o == "queryCommandState") {
				return false
			} else {
				if (m) {
					return m.apply(this, l)
				}
			}
		},
		execCommand : function(l) {
			l = l.toLowerCase();
			var m = this, k, n = m.commands[l] || baidu.editor.commands[l];
			if (!n || !n.execCommand) {
				return
			}
			if (!n.notNeedUndo && !m.__hasEnterExecCommand) {
				m.__hasEnterExecCommand = true;
				m.fireEvent("beforeexeccommand", l);
				k = this._callCmdFn("execCommand", arguments);
				m.fireEvent("afterexeccommand", l);
				m.__hasEnterExecCommand = false
			} else {
				k = this._callCmdFn("execCommand", arguments)
			}
			m._selectionChange();
			return k
		},
		queryCommandState : function(k) {
			return this._callCmdFn("queryCommandState", arguments)
		},
		queryCommandValue : function(k) {
			return this._callCmdFn("queryCommandValue", arguments)
		},
		hasContents : function() {
			var k = this.body[e.ie ? "innerText" : "textContent"], l = new RegExp(
					"[ \t\n\r" + c.fillChar + "]", "g");
			return !!k.replace(l, "").length
		},
		reset : function() {
			this.fireEvent("reset")
		},
		setDefaultContent : function() {
			function k(m) {
				var n = this;
				if (n.document.getElementById("initContent")) {
					n.document.body.innerHTML = "<p>"
							+ (baidu.editor.browser.ie ? "" : "<br/>") + "</p>";
					var l = n.selection.getRange();
					n.removeListener("firstBeforeExecCommand", k);
					n.removeListener("focus", k);
					setTimeout(function() {
								l.setStart(n.document.body.firstChild, 0)
										.collapse(true).select(true);
								n._selectionChange()
							})
				}
			}
			return function(l) {
				var m = this;
				m.document.body.innerHTML = '<p id="initContent">' + l + "</p>";
				m.addListener("firstBeforeExecCommand", k);
				m.addListener("mousedown", k)
			}
		}()
	};
	i.inherits(f, d)
})();
(function() {
	var a = baidu.editor.dom.domUtils, d = baidu.editor.dom.dtd, b = baidu.editor.utils, c = baidu.editor.browser;
	baidu.editor.commands.inserthtml = {
		execCommand : function(k, p) {
			var r = this, q, u, n, w, g, m = r.currentSelectedArr;
			q = r.selection.getRange();
			g = q.document.createElement("div");
			g.style.display = "inline";
			g.innerHTML = b.trim(p);
			try {
				r.adjustTable && r.adjustTable(g)
			} catch (t) {
			}
			if (m && m.length) {
				for (var n = 0, f; f = m[n++];) {
					f.className = ""
				}
				m[0].innerHTML = "";
				q.setStart(m[0], 0).collapse(true);
				r.currentSelectedArr = []
			}
			if (!q.collapsed) {
				q.deleteContents();
				if (q.startContainer.nodeType == 1) {
					var h = q.startContainer.childNodes[q.startOffset], j;
					if (h && a.isBlockElm(h) && (j = h.previousSibling)
							&& a.isBlockElm(j)) {
						q.setEnd(j, j.childNodes.length).collapse();
						while (h.firstChild) {
							j.appendChild(h.firstChild)
						}
						a.remove(h)
					}
				}
			}
			var h, v, j, l, s = 0;
			while (h = g.firstChild) {
				q.insertNode(h);
				if (!s && h.nodeType == a.NODE_ELEMENT && a.isBlockElm(h)) {
					v = a.findParent(h, function(e) {
								return a.isBlockElm(e)
							});
					if (v
							&& v.tagName.toLowerCase != "body"
							&& !(d[v.tagName][h.nodeName] && h.parentNode === v)) {
						if (!d[v.tagName][h.nodeName]) {
							j = v
						} else {
							l = h.parentNode;
							while (l !== v) {
								j = l;
								l = l.parentNode
							}
						}
						a.breakParent(h, j || l);
						var j = h.previousSibling;
						a.trimWhiteTextNode(j);
						if (!j.childNodes.length) {
							a.remove(j)
						}
						s = 1
					}
				}
				var o = h.nextSibling;
				if (!g.firstChild && o && a.isBlockElm(o)) {
					q.setStart(o, 0).collapse(true);
					break
				}
				q.setEndAfter(h).collapse()
			}
			h = q.startContainer;
			if (a.isBlockElm(h) && a.isEmptyNode(h)) {
				h.innerHTML = baidu.editor.browser.ie ? "" : "<br/>"
			}
			q.select(true);
			setTimeout(function() {
						q.scrollToView(r.autoHeightEnabled, r.autoHeightEnabled
										? a.getXY(r.iframe).y
										: 0)
					}, 200)
		}
	}
}());
(function() {
	var a = baidu.editor.dom.domUtils;
	baidu.editor.commands.insertimage = {
		execCommand : function(e, d) {
			var c = this.selection.getRange(), b = c.getClosedNode();
			if (b && /img/ig.test(b.tagName)) {
				if (b.className != "edui-faked-video") {
					a.setAttributes(b, d)
				}
			} else {
				var g = "<img ", f;
				for (f in d) {
					g += f + "='" + d[f] + "' "
				}
				g += "/>";
				this.execCommand("inserthtml", g)
			}
		}
	}
})();
(function() {
	var b = baidu.editor.dom.domUtils, e = b.isBlockElm, d = {
		left : 1,
		right : 1,
		center : 1,
		justify : 1
	}, c = baidu.editor.utils, a = function(i, f) {
		var l = i.createBookmark(), o = function(p) {
			return p.nodeType == 1 ? p.tagName.toLowerCase() != "br"
					&& !b.isBookmarkNode(p) : !b.isWhitespace(p)
		};
		i.enlarge(true);
		var q = i.createBookmark(), k = b.getNextDomNode(q.start, false, o), m = i
				.cloneRange(), h;
		while (k && !(b.getPosition(k, q.end) & b.POSITION_FOLLOWING)) {
			if (k.nodeType == 3 || !e(k)) {
				m.setStartBefore(k);
				while (k && k !== q.end && !e(k)) {
					h = k;
					k = b.getNextDomNode(k, false, null, function(p) {
								return !e(p)
							})
				}
				m.setEndAfter(h);
				var j = m.getCommonAncestor();
				if (!b.isBody(j) && e(j)) {
					b.setStyles(j, c.isString(f) ? {
								"text-align" : f
							} : f);
					k = j
				} else {
					var g = i.document.createElement("p");
					b.setStyles(g, c.isString(f) ? {
								"text-align" : f
							} : f);
					var n = m.extractContents();
					g.appendChild(n);
					m.insertNode(g);
					k = g
				}
				k = b.getNextDomNode(k, false, o)
			} else {
				k = b.getNextDomNode(k, true, o)
			}
		}
		return i.moveToBookmark(q).moveToBookmark(l)
	};
	baidu.editor.commands.justify = {
		execCommand : function(h, l) {
			var g = new baidu.editor.dom.Range(this.document);
			if (this.currentSelectedArr && this.currentSelectedArr.length > 0) {
				for (var j = 0, k; k = this.currentSelectedArr[j++];) {
					a(g.selectNode(k), l)
				}
				g.selectNode(this.currentSelectedArr[0]).select()
			} else {
				g = this.selection.getRange();
				if (g.collapsed) {
					var f = this.document.createTextNode("p");
					g.insertNode(f)
				}
				a(g, l);
				if (f) {
					g.setStartBefore(f).collapse(true);
					b.remove(f)
				}
				g.select()
			}
			return true
		},
		queryCommandValue : function() {
			var f = this.selection.getStart(), g = b.getComputedStyle(f,
					"text-align");
			return d[g] ? g : "left"
		}
	}
})();
(function() {
	var a = baidu.editor.dom.domUtils, f = {
		forecolor : "color",
		backcolor : "background-color",
		fontsize : "font-size",
		fontfamily : "font-family",
		underline : "text-decoration",
		strikethrough : "text-decoration"
	}, d = new RegExp(a.fillChar, "g"), c = baidu.editor.browser, b = 0;
	for (var e in f) {
		(function(h, g) {
			baidu.editor.commands[h] = {
				execCommand : function(p, m) {
					m = m
							|| (this.queryCommandState(p)
									? "none"
									: p == "underline"
											? "underline"
											: "line-through");
					var l = this, k = this.selection.getRange(), o;
					if (!b) {
						l.addListener("beforegetcontent", function() {
									a.clearReduent(l.document, ["span"])
								});
						b = 1
					}
					if (m == "default") {
						if (k.collapsed) {
							o = l.document.createTextNode("font");
							k.insertNode(o).select()
						}
						l.execCommand("removeFormat", "span,a", g);
						if (o) {
							k.setStartBefore(o).setCursor();
							a.remove(o)
						}
					} else {
						if (l.currentSelectedArr
								&& l.currentSelectedArr.length > 0) {
							for (var j = 0, r; r = l.currentSelectedArr[j++];) {
								k.selectNodeContents(r);
								k.applyInlineStyle("span", {
											style : g + ":" + m
										})
							}
							k.selectNodeContents(this.currentSelectedArr[0])
									.select()
						} else {
							if (!k.collapsed) {
								if ((h == "underline" || h == "strikethrough")
										&& l.queryCommandValue(h)) {
									l.execCommand("removeFormat", "span,a", g)
								}
								k = l.selection.getRange();
								k.applyInlineStyle("span", {
											style : g + ":" + m
										}).select()
							} else {
								var n = a.findParentByTagName(k.startContainer,
										"span", true);
								o = l.document.createTextNode("font");
								if (n
										&& !n.children.length
										&& !n[c.ie
												? "innerText"
												: "textContent"].replace(d, "").length) {
									k.insertNode(o);
									if (h == "underline"
											|| h == "strikethrough") {
										k.selectNode(o).select();
										l.execCommand("removeFormat", "span,a",
												g, null);
										n = a.findParentByTagName(o, "span",
												true);
										k.setStartBefore(o)
									}
									n.style.cssText = n.style.cssText + ";" + g
											+ ":" + m;
									k.collapse(true).select()
								} else {
									k.insertNode(o);
									k.selectNode(o).select();
									n = k.document.createElement("span");
									if (h == "underline"
											|| h == "strikethrough") {
										if (a.findParentByTagName(o, "a", true)) {
											k.setStartBefore(o).setCursor();
											a.remove(o);
											return
										}
										l.execCommand("removeFormat", "span,a",
												g)
									}
									n.style.cssText = g + ":" + m;
									o.parentNode.insertBefore(n, o);
									if (!c.ie) {
										var q = n.parentNode;
										while (!a.isBlockElm(q)) {
											if (q.tagName == "SPAN") {
												n.style.cssText = q.style.cssText
														+ n.style.cssText
											}
											q = q.parentNode
										}
									}
									k.setStart(n, 0).setCursor()
								}
								a.remove(o)
							}
						}
					}
					return true
				},
				queryCommandValue : function(j) {
					var i = this.selection.getStart();
					if (j == "underline" || j == "strikethrough") {
						var k = i, l;
						while (k && !a.isBlockElm(k) && !a.isBody(k)) {
							if (k.nodeType == 1) {
								l = a.getComputedStyle(k, g);
								if (l != "none") {
									return l
								}
							}
							k = k.parentNode
						}
						return "none"
					}
					return a.getComputedStyle(i, g)
				},
				queryCommandState : function(i) {
					if (!(i == "underline" || i == "strikethrough")) {
						return 0
					}
					return this.queryCommandValue(i) == (i == "underline"
							? "underline"
							: "line-through")
				}
			}
		})(e, f[e])
	}
})();
(function() {
	var d = baidu.editor.dom, a = d.domUtils, b = baidu.editor.browser;
	function c(g) {
		var h = g.startContainer, f = g.endContainer;
		if (h = a.findParentByTagName(h, "a", true)) {
			g.setStartBefore(h)
		}
		if (f = a.findParentByTagName(f, "a", true)) {
			g.setEndAfter(f)
		}
	}
	baidu.editor.commands.unlink = {
		execCommand : function() {
			var f, g = new baidu.editor.dom.Range(this.document), n = this.currentSelectedArr, m;
			if (n && n.length > 0) {
				for (var k = 0, l; l = n[k++];) {
					f = a.getElementsByTagName(l, "a");
					for (var h = 0, o; o = f[h++];) {
						a.remove(o, true)
					}
				}
				if (a.isEmptyNode(n[0])) {
					g.setStart(n[0], 0).setCursor()
				} else {
					g.selectNodeContents(n[0]).select()
				}
			} else {
				g = this.selection.getRange();
				if (g.collapsed
						&& !a.findParentByTagName(g.startContainer, "a", true)) {
					return
				}
				m = g.createBookmark();
				c(g);
				g.removeInlineStyle("a").moveToBookmark(m).select()
			}
		},
		queryCommandState : function() {
			return this.queryCommandValue("link") ? 0 : -1
		}
	};
	function e(g, h) {
		c(g = g.adjustmentBoundary());
		var i = g.startContainer;
		if (i.nodeType == 1) {
			i = i.childNodes[g.startOffset];
			if (i
					&& i.nodeType == 1
					&& i.tagName == "A"
					&& /^(?:https?|ftp|file)\s*:\s*\/\//.test(i[b.ie
							? "innerText"
							: "textContent"])) {
				i.innerHTML = h.href
			}
		}
		g.removeInlineStyle("a");
		if (g.collapsed) {
			var f = g.document.createElement("a");
			a.setAttributes(f, h);
			f.innerHTML = h.href;
			g.insertNode(f).selectNode(f)
		} else {
			g.applyInlineStyle("a", h)
		}
	}
	baidu.editor.commands.link = {
		execCommand : function(g, j) {
			var f = new baidu.editor.dom.Range(this.document), l = this.currentSelectedArr;
			if (l && l.length) {
				for (var h = 0, k; k = l[h++];) {
					if (a.isEmptyNode(k)) {
						k.innerHTML = j.href
					}
					e(f.selectNodeContents(k), j)
				}
				f.selectNodeContents(l[0]).select()
			} else {
				e(f = this.selection.getRange(), j);
				f.collapse().select(b.gecko ? true : false)
			}
		},
		queryCommandValue : function() {
			var o = new baidu.editor.dom.Range(this.document), m = this.currentSelectedArr, k, j;
			if (m && m.length) {
				for (var n = 0, g; g = m[n++];) {
					k = g.getElementsByTagName("a");
					if (k[0]) {
						return k[0]
					}
				}
			} else {
				o = this.selection.getRange();
				if (o.collapsed) {
					j = this.selection.getStart();
					if (j && (j = a.findParentByTagName(j, "a", true))) {
						return j
					}
				} else {
					o.shrinkBoundary();
					var h = o.startContainer.nodeType == 3
							|| !o.startContainer.childNodes[o.startOffset]
							? o.startContainer
							: o.startContainer.childNodes[o.startOffset], l = o.endContainer.nodeType == 3
							|| o.endOffset == 0
							? o.endContainer
							: o.endContainer.childNodes[o.endOffset - 1], p = o
							.getCommonAncestor();
					j = a.findParentByTagName(p, "a", true);
					if (!j && p.nodeType == 1) {
						var k = p.getElementsByTagName("a"), f, q;
						for (var n = 0, r; r = k[n++];) {
							f = a.getPosition(r, h), q = a.getPosition(r, l);
							if ((f & a.POSITION_FOLLOWING || f
									& a.POSITION_CONTAINS)
									&& (q & a.POSITION_PRECEDING || q
											& a.POSITION_CONTAINS)) {
								j = r;
								break
							}
						}
					}
					return j
				}
			}
		}
	}
})();
(function() {
	var a = baidu.editor.dom.domUtils, b = baidu.editor.dom.dtd;
	baidu.editor.commands.removeformat = {
		execCommand : function(o, r, c, m, n) {
			var h = new RegExp("^(?:"
							+ (r || this.options.removeFormatTags).replace(
									/,/g, "|") + ")$", "i"), f = c
					? []
					: (m || this.options.removeFormatAttributes).split(","), j = new baidu.editor.dom.Range(this.document), k, e, l, d = function(
					i) {
				return i.nodeType == 1
			};
			function p(x) {
				var i = x.createBookmark();
				if (x.collapsed) {
					x.enlarge(true)
				}
				if (!n) {
					var s = a.findParentByTagName(x.startContainer, "a", true);
					if (s) {
						x.setStartBefore(s)
					}
					s = a.findParentByTagName(x.endContainer, "a", true);
					if (s) {
						x.setEndAfter(s)
					}
				}
				k = x.createBookmark();
				t = k.start;
				while ((l = t.parentNode) && !a.isBlockElm(l)) {
					a.breakParent(t, l);
					a.clearEmptySibling(t)
				}
				if (k.end) {
					t = k.end;
					while ((l = t.parentNode) && !a.isBlockElm(l)) {
						a.breakParent(t, l);
						a.clearEmptySibling(t)
					}
					var y = a.getNextDomNode(k.start, false, d), w;
					while (y) {
						if (y == k.end) {
							break
						}
						w = a.getNextDomNode(y, true, d);
						if (!b.$empty[y.tagName.toLowerCase()]
								&& !a.isBookmarkNode(y)) {
							if (h.test(y.tagName)) {
								if (c) {
									a.removeStyle(y, c);
									if (a.isRedundantSpan(y)
											&& c != "text-decoration") {
										a.remove(y, true)
									}
								} else {
									a.remove(y, true)
								}
							} else {
								if (!b.$tableContent[y.tagName]
										&& !b.$list[y.tagName]) {
									a.removeAttributes(y, f);
									if (a.isRedundantSpan(y)) {
										a.remove(y, true)
									}
								}
							}
						}
						y = w
					}
				}
				var z = k.start.parentNode;
				if (a.isBlockElm(z) && !b.$tableContent[z.tagName]
						&& !b.$list[z.tagName]) {
					a.removeAttributes(z, f)
				}
				z = k.end.parentNode;
				if (k.end && a.isBlockElm(z) && !b.$tableContent[z.tagName]
						&& !b.$list[z.tagName]) {
					a.removeAttributes(z, f)
				}
				x.moveToBookmark(k).moveToBookmark(i);
				var t = x.startContainer, v, u = x.collapsed;
				while (t.nodeType == 1 && a.isEmptyNode(t)
						&& b.$removeEmpty[t.tagName]) {
					v = t.parentNode;
					x.setStartBefore(t);
					if (x.startContainer === x.endContainer) {
						x.endOffset--
					}
					a.remove(t);
					t = v
				}
				if (!u) {
					t = x.endContainer;
					while (t.nodeType == 1 && a.isEmptyNode(t)
							&& b.$removeEmpty[t.tagName]) {
						v = t.parentNode;
						x.setEndBefore(t);
						a.remove(t);
						t = v
					}
				}
			}
			if (this.currentSelectedArr && this.currentSelectedArr.length) {
				for (var g = 0, q; q = this.currentSelectedArr[g++];) {
					j.selectNodeContents(q);
					p(j)
				}
				j.selectNodeContents(this.currentSelectedArr[0]).select()
			} else {
				j = this.selection.getRange();
				p(j);
				j.select()
			}
		}
	}
})();
(function() {
	var a = baidu.editor.dom.domUtils, b = baidu.editor.dom.dtd, c = function(e) {
		var d = e.selection.getStart();
		return a.findParentByTagName(d, "blockquote", true)
	};
	baidu.editor.commands.blockquote = {
		execCommand : function(o, s) {
			var r = this.selection.getRange(), q = c(this), e = b.blockquote, n = r
					.createBookmark(), v = this.currentSelectedArr;
			if (q) {
				if (v && v.length) {
					a.remove(q, true)
				} else {
					var l = r.startContainer, m = a.isBlockElm(l) ? l : a
							.findParent(l, function(i) {
										return a.isBlockElm(i)
									}), g = r.endContainer, h = a.isBlockElm(g)
							? g
							: a.findParent(g, function(i) {
										return a.isBlockElm(i)
									});
					m = a.findParentByTagName(m, "li", true) || m;
					h = a.findParentByTagName(h, "li", true) || h;
					if (m.tagName == "LI" || m.tagName == "TD" || m === q) {
						a.remove(q, true)
					} else {
						a.breakParent(m, q)
					}
					if (m !== h) {
						q = a.findParentByTagName(h, "blockquote");
						if (q) {
							if (h.tagName == "LI" || h.tagName == "TD") {
								a.remove(q, true)
							} else {
								a.breakParent(h, q)
							}
						}
					}
					var k = a.getElementsByTagName(this.document, "blockquote");
					for (var w = 0, f; f = k[w++];) {
						if (!f.childNodes.length) {
							a.remove(f)
						} else {
							if (a.getPosition(f, m) & a.POSITION_FOLLOWING
									&& a.getPosition(f, h)
									& a.POSITION_PRECEDING) {
								a.remove(f, true)
							}
						}
					}
				}
			} else {
				var x = r.cloneRange(), t = x.startContainer.nodeType == 1
						? x.startContainer
						: x.startContainer.parentNode, d = t, u = 1;
				while (1) {
					if (a.isBody(t)) {
						if (d !== t) {
							if (r.collapsed) {
								x.selectNode(d);
								u = 0
							} else {
								x.setStartBefore(d)
							}
						} else {
							x.setStart(t, 0)
						}
						break
					}
					if (!e[t.tagName]) {
						if (r.collapsed) {
							x.selectNode(d)
						} else {
							x.setStartBefore(d)
						}
						break
					}
					d = t;
					t = t.parentNode
				}
				if (u) {
					d = t = t = x.endContainer.nodeType == 1
							? x.endContainer
							: x.endContainer.parentNode;
					while (1) {
						if (a.isBody(t)) {
							if (d !== t) {
								x.setEndAfter(d)
							} else {
								x.setEnd(t, t.childNodes.length)
							}
							break
						}
						if (!e[t.tagName]) {
							x.setEndAfter(d);
							break
						}
						d = t;
						t = t.parentNode
					}
				}
				t = r.document.createElement("blockquote");
				a.setAttributes(t, s);
				t.appendChild(x.extractContents());
				x.insertNode(t);
				var j = a.getElementsByTagName(t, "blockquote");
				for (var w = 0, p; p = j[w++];) {
					if (p.parentNode) {
						a.remove(p, true)
					}
				}
			}
			r.moveToBookmark(n).select()
		},
		queryCommandState : function() {
			return c(this) ? 1 : 0
		}
	}
})();
(function() {
	var a = baidu.editor.dom.domUtils;
	baidu.editor.commands.outdent = baidu.editor.commands.indent = {
		execCommand : function(d) {
			var b = this, c = d.toLowerCase() == "outdent"
					? "0em"
					: (b.options.indentValue || "2em");
			b.execCommand("Paragraph", "p", {
						textIndent : c
					})
		}
	}
})();
(function() {
	baidu.editor.commands.print = {
		execCommand : function() {
			this.window.print()
		},
		notNeedUndo : 1
	}
})();
baidu.editor.commands.preview = {
	execCommand : function() {
		var c = this;
		var b = window.open("", "_blank", "");
		var e = b.document, a = baidu.editor.utils;
		e.open();
		e.write('<html><head><link rel="stylesheet" type="text/css" href="'
				+ a.unhtml(this.options.iframeCssUrl)
				+ '"/><title></title></head><body>' + c.getContent()
				+ "</body></html>");
		e.close()
	},
	notNeedUndo : 1
};
(function() {
	var a = baidu.editor.browser;
	baidu.editor.commands.selectall = {
		execCommand : function() {
			this.document.execCommand("selectAll", false, null);
			!a.ie && this.focus()
		},
		notNeedUndo : 1
	}
})();
(function() {
	var a = baidu.editor.dom.domUtils, f = a.isBlockElm, e = ["TD", "LI", "PRE"], b = baidu.editor.utils, c = baidu.editor.browser, d = function(
			i, g, o) {
		var k = i.createBookmark(), p = function(s) {
			return s.nodeType == 1 ? s.tagName.toLowerCase() != "br"
					&& !a.isBookmarkNode(s) : !a.isWhitespace(s)
		}, r;
		i.enlarge(true);
		var q = i.createBookmark(), j = a.getNextDomNode(q.start, false, p), n = i
				.cloneRange(), h;
		while (j && !(a.getPosition(j, q.end) & a.POSITION_FOLLOWING)) {
			if (j.nodeType == 3 || !f(j)) {
				n.setStartBefore(j);
				while (j && j !== q.end && !f(j)) {
					h = j;
					j = a.getNextDomNode(j, false, null, function(s) {
								return !f(s)
							})
				}
				n.setEndAfter(h);
				r = i.document.createElement(g);
				if (o) {
					for (var m in o) {
						r.style[m] = o[m]
					}
				}
				r.appendChild(n.extractContents());
				n.insertNode(r);
				var l = r.parentNode;
				if (f(l) && !a.isBody(r.parentNode)
						&& b.indexOf(e, l.tagName) == -1) {
					l.getAttribute("dir")
							&& r.setAttribute("dir", l.getAttribute("dir"));
					l.style.cssText
							&& (r.style.cssText = l.style.cssText + ";"
									+ r.style.cssText);
					l.style.textAlign && !r.style.textAlign
							&& (r.style.textAlign = l.style.textAlign);
					l.style.textIndent && !r.style.textIndent
							&& (r.style.textIndent = l.style.textIndent);
					l.style.padding && !r.style.padding
							&& (r.style.padding = l.style.padding);
					if (o && /h\d/i.test(l.tagName)) {
						for (var m in o) {
							l.style[m] = o[m]
						}
						a.remove(r, true);
						r = l
					} else {
						a.remove(r.parentNode, true)
					}
				}
				if (b.indexOf(e, l.tagName) != -1) {
					j = l
				} else {
					j = r
				}
				j = a.getNextDomNode(j, false, p)
			} else {
				j = a.getNextDomNode(j, true, p)
			}
		}
		return i.moveToBookmark(q).moveToBookmark(k)
	};
	baidu.editor.commands.paragraph = {
		execCommand : function(q, g, p) {
			var n = new baidu.editor.dom.Range(this.document);
			if (this.currentSelectedArr && this.currentSelectedArr.length > 0) {
				for (var m = 0, h; h = this.currentSelectedArr[m++];) {
					if (h.style.display == "none") {
						continue
					}
					if (!a.getChildCount(h, function(i) {
								return !a.isBr(i) && !a.isWhitespace(i)
							})) {
						var k = this.document.createTextNode("paragraph");
						h.insertBefore(k, h.firstChild)
					}
					d(n.selectNodeContents(h), g, p);
					if (k) {
						var o = k.parentNode;
						a.remove(k);
						if (c.ie && !o.firstChild) {
							o.innerHTML = "&nbsp;"
						}
					}
				}
				n.selectNode(this.currentSelectedArr[0]).select()
			} else {
				n = this.selection.getRange();
				if (n.collapsed) {
					var l = this.document.createTextNode("p");
					n.insertNode(l)
				}
				n = d(n, g, p);
				if (l) {
					n.setStartBefore(l).collapse(true);
					a.remove(l)
				}
				if (c.gecko && n.collapsed && n.startContainer.nodeType == 1) {
					var j = n.startContainer.childNodes[n.startOffset];
					if (j && j.nodeType == 1 && j.tagName.toLowerCase() == g) {
						n.setStart(j, 0).collapse(true)
					}
				}
				n.select()
			}
			return true
		},
		queryCommandValue : function() {
			var g = this.selection.getStart(), h = a.findParentByTagName(g, [
							"p", "h1", "h2", "h3", "h4", "h5", "h6"], true);
			return h && h.tagName.toLowerCase()
		}
	}
})();
(function() {
	var a = baidu.editor.dom.domUtils, d = a.isBlockElm, c = function(j) {
		var f = j.selection.getStart(), e;
		if (f) {
			e = a.findParents(f, true, d, true);
			for (var h = 0, g; g = e[h++];) {
				if (g.getAttribute("dir")) {
					return g
				}
			}
		}
	}, b = function(i, j, h) {
		var m, q = function(p) {
			return p.nodeType == 1 ? !a.isBookmarkNode(p) : !a.isWhitespace(p)
		}, g = c(j);
		if (g && i.collapsed) {
			g.setAttribute("dir", h);
			return i
		}
		m = i.createBookmark();
		i.enlarge(true);
		var r = i.createBookmark(), l = a.getNextDomNode(r.start, false, q), n = i
				.cloneRange(), f;
		while (l && !(a.getPosition(l, r.end) & a.POSITION_FOLLOWING)) {
			if (l.nodeType == 3 || !d(l)) {
				n.setStartBefore(l);
				while (l && l !== r.end && !d(l)) {
					f = l;
					l = a.getNextDomNode(l, false, null, function(p) {
								return !d(p)
							})
				}
				n.setEndAfter(f);
				var k = n.getCommonAncestor();
				if (!a.isBody(k) && d(k)) {
					k.setAttribute("dir", h);
					l = k
				} else {
					var e = i.document.createElement("p");
					e.setAttribute("dir", h);
					var o = n.extractContents();
					e.appendChild(o);
					n.insertNode(e);
					l = e
				}
				l = a.getNextDomNode(l, false, q)
			} else {
				l = a.getNextDomNode(l, true, q)
			}
		}
		return i.moveToBookmark(r).moveToBookmark(m)
	};
	baidu.editor.commands.directionality = {
		execCommand : function(h, g) {
			var f = new baidu.editor.dom.Range(this.document);
			if (this.currentSelectedArr && this.currentSelectedArr.length > 0) {
				for (var j = 0, k; k = this.currentSelectedArr[j++];) {
					if (k.style.display != "none") {
						b(f.selectNode(k), this, g)
					}
				}
				f.selectNode(this.currentSelectedArr[0]).select()
			} else {
				f = this.selection.getRange();
				if (f.collapsed) {
					var e = this.document.createTextNode("d");
					f.insertNode(e)
				}
				b(f, this, g);
				if (e) {
					f.setStartBefore(e).collapse(true);
					a.remove(e)
				}
				f.select()
			}
			return true
		},
		queryCommandValue : function() {
			var e = c(this);
			return e ? e.getAttribute("dir") : "ltr"
		}
	}
})();
(function() {
	var a = baidu.editor.dom.domUtils;
	baidu.editor.commands.horizontal = {
		execCommand : function(c) {
			if (this.queryCommandState(c) !== -1) {
				this.execCommand("insertHtml", "<hr>");
				var b = this.selection.getRange(), e = b.startContainer;
				if (e.nodeType == 1 && !e.childNodes[b.startOffset]) {
					var d;
					if (d = e.childNodes[b.startOffset - 1]) {
						if (d.nodeType == 1 && d.tagName == "HR") {
							if (this.options.enterTag == "p") {
								d = this.document.createElement("p");
								b.insertNode(d);
								b.setStart(d, 0).setCursor()
							} else {
								d = this.document.createElement("br");
								b.insertNode(d);
								b.setStartBefore(d).setCursor()
							}
						}
					}
				}
				return true
			}
		},
		queryCommandState : function() {
			var b = this.selection.getRange();
			return a.findParentByTagName(b.startContainer, "table")
					|| a.findParentByTagName(b.endContainer, "table") ? -1 : 0
		}
	}
})();
baidu.editor.commands.time = {
	execCommand : function() {
		var b = new Date, c = b.getMinutes(), d = b.getSeconds(), a = [
				b.getHours(), c < 10 ? "0" + c : c, d < 10 ? "0" + d : d];
		this.execCommand("insertHtml", a.join(":"));
		return true
	}
};
baidu.editor.commands.date = {
	execCommand : function() {
		var c = new Date, d = c.getMonth() + 1, b = c.getDate(), a = [
				c.getFullYear(), d < 10 ? "0" + d : d, b < 10 ? "0" + b : b];
		this.execCommand("insertHtml", a.join("-"));
		return true
	}
};
(function() {
	var a = baidu.editor.dom.domUtils, d = baidu.editor.dom.dtd, b = baidu.editor.utils, c = baidu.editor.browser;
	baidu.editor.commands.inserthtml = {
		execCommand : function(k, p) {
			var r = this, q, u, n, w, g, m = r.currentSelectedArr;
			q = r.selection.getRange();
			g = q.document.createElement("div");
			g.style.display = "inline";
			g.innerHTML = b.trim(p);
			try {
				r.adjustTable && r.adjustTable(g)
			} catch (t) {
			}
			if (m && m.length) {
				for (var n = 0, f; f = m[n++];) {
					f.className = ""
				}
				m[0].innerHTML = "";
				q.setStart(m[0], 0).collapse(true);
				r.currentSelectedArr = []
			}
			if (!q.collapsed) {
				q.deleteContents();
				if (q.startContainer.nodeType == 1) {
					var h = q.startContainer.childNodes[q.startOffset], j;
					if (h && a.isBlockElm(h) && (j = h.previousSibling)
							&& a.isBlockElm(j)) {
						q.setEnd(j, j.childNodes.length).collapse();
						while (h.firstChild) {
							j.appendChild(h.firstChild)
						}
						a.remove(h)
					}
				}
			}
			var h, v, j, l, s = 0;
			while (h = g.firstChild) {
				q.insertNode(h);
				if (!s && h.nodeType == a.NODE_ELEMENT && a.isBlockElm(h)) {
					v = a.findParent(h, function(e) {
								return a.isBlockElm(e)
							});
					if (v
							&& v.tagName.toLowerCase != "body"
							&& !(d[v.tagName][h.nodeName] && h.parentNode === v)) {
						if (!d[v.tagName][h.nodeName]) {
							j = v
						} else {
							l = h.parentNode;
							while (l !== v) {
								j = l;
								l = l.parentNode
							}
						}
						a.breakParent(h, j || l);
						var j = h.previousSibling;
						a.trimWhiteTextNode(j);
						if (!j.childNodes.length) {
							a.remove(j)
						}
						s = 1
					}
				}
				var o = h.nextSibling;
				if (!g.firstChild && o && a.isBlockElm(o)) {
					q.setStart(o, 0).collapse(true);
					break
				}
				q.setEndAfter(h).collapse()
			}
			h = q.startContainer;
			if (a.isBlockElm(h) && a.isEmptyNode(h)) {
				h.innerHTML = baidu.editor.browser.ie ? "" : "<br/>"
			}
			q.select(true);
			setTimeout(function() {
						q.scrollToView(r.autoHeightEnabled, r.autoHeightEnabled
										? a.getXY(r.iframe).y
										: 0)
					}, 200)
		}
	}
}());
(function() {
	var a = baidu.editor.dom.domUtils;
	baidu.editor.commands.rowspacing = {
		execCommand : function(b, c) {
			this.execCommand("paragraph", "p", {
						padding : c + "px 0"
					});
			return true
		},
		queryCommandValue : function() {
			var c = this.selection.getStart(), b = a.findParent(c, function(e) {
						return a.isBlockElm(e)
					}, true), d;
			if (b) {
				d = a.getComputedStyle(b, "padding-top").replace(/[^\d]/g, "");
				return d * 1 <= 10 ? 0 : d
			}
			return 0
		}
	}
})();
(function() {
	function a(b, c) {
		b.setStart(c, 0).setCursor()
	}
	baidu.editor.commands.cleardoc = {
		execCommand : function(e) {
			var f = this, c = f.options.enterTag, d = baidu.editor.browser, b = this.selection
					.getRange();
			if (c == "br") {
				this.body.innerHTML = "<br/>";
				a(b, this.body)
			} else {
				this.body.innerHTML = "<p>" + (d.ie ? "" : "<br/>") + "</p>";
				f.focus();
				a(b, f.body.firstChild)
			}
		}
	}
})();
(function() {
	var a = baidu.editor.dom.domUtils;
	baidu.editor.commands.anchor = {
		execCommand : function(f, e) {
			var c = this.selection.getRange();
			var b = c.getClosedNode();
			if (b && b.getAttribute("anchorname")) {
				if (e) {
					b.setAttribute("anchorname", e)
				} else {
					c.setStartBefore(b).setCursor();
					a.remove(b)
				}
			} else {
				if (e) {
					var d = this.document.createElement("img");
					c.collapse(true);
					d.setAttribute("anchorname", e);
					d.className = "anchorclass";
					c.insertNode(d).setStartAfter(d).collapse(true)
							.select(true)
				}
			}
		}
	}
})();
(function() {
	var a = baidu.editor.dom.domUtils, b = baidu.editor.browser;
	baidu.editor.commands["delete"] = {
		execCommand : function() {
			var g = this.selection.getRange(), f = 0, j = 0, h = this;
			if (g.collapsed) {
				return
			}
			while (!g.startOffset && !a.isBody(g.startContainer)) {
				f = 1;
				g.setStartBefore(g.startContainer)
			}
			while (!a.isBody(g.endContainer)) {
				var d, k = g.endContainer, i = g.endOffset;
				if (k.nodeType == 3 && i == k.nodeValue.length) {
					g.setEndAfter(k);
					continue
				}
				d = k.childNodes[i];
				if (!d || a.isBr(d) && k.lastChild === d) {
					g.setEndAfter(k);
					continue
				}
				break
			}
			if (f) {
				var c = h.document.createElement("span");
				c.innerHTML = "start";
				c.id = "_baidu_cut_start";
				g.insertNode(c).setStartBefore(c)
			}
			if (j) {
				var e = h.document.createElement("span");
				e.innerHTML = "end";
				e.id = "_baidu_cut_end";
				g.cloneRange().collapse(false).insertNode(e);
				g.setEndAfter(e)
			}
			g.deleteContents();
			if (a.isBody(g.startContainer) && a.isEmptyNode(h.body)) {
				h.body.innerHTML = "<p>" + (b.ie ? "" : "<br/>") + "</p>";
				g.setStart(h.body.firstChild, 0).collapse(true)
			}
			g.select(true)
		},
		queryCommandState : function() {
			return this.selection.getRange().collapsed ? -1 : 0
		}
	}
})();
(function() {
	var c = baidu.editor, a = c.dom.domUtils, b = ["td"];
	baidu.editor.plugins.pagebreak = function() {
		var d = this;
		d.commands.pagebreak = {
			execCommand : function() {
				var f = d.selection.getRange();
				var k = d.document.createElement("div");
				k.className = "pagebreak";
				a.unselectable(k);
				var i = a.findParentByTagName(f.startContainer, b, true), g = [], e;
				if (i) {
					switch (i.tagName) {
						case "TD" :
							e = i.parentNode;
							if (!e.previousSibling) {
								var h = a.findParentByTagName(e, "table");
								h.parentNode.insertBefore(k, h);
								g = a.findParents(k, true)
							} else {
								e.parentNode.insertBefore(k, e);
								g = a.findParents(k)
							}
							e = g[1];
							if (k !== e) {
								a.breakParent(k, e)
							}
							f.moveToBookmark(bk).select();
							a.clearSelectedArr(d.currentSelectedArr)
					}
				} else {
					if (!f.collapsed) {
						f.deleteContents();
						var j = f.startContainer;
						while (a.isBlockElm(j) && a.isEmptyNode(j)) {
							f.setStartBefore(j).collapse(true);
							a.remove(j);
							j = f.startContainer
						}
					}
					g = a.findParents(f.startContainer, true);
					e = g[1];
					f.insertNode(k);
					e && a.breakParent(k, e);
					f.setEndAfter(k).setCursor(true, true)
				}
			}
		}
	}
})();
(function() {
	var a = baidu.editor.dom.domUtils, b = new RegExp(
			baidu.editor.dom.domUtils.fillChar + "|</hr>", "gi"), c = baidu.editor.browser;
	baidu.editor.plugins.undo = function() {
		var i = this, k = i.options.maxUndoCount, h = i.options.maxInputCount, d = /\b(?:href|src|name)="[^"]*?"/gi;
		function f() {
			this.list = [];
			this.index = 0;
			this.hasUndo = false;
			this.hasRedo = false;
			this.undo = function() {
				if (this.hasUndo) {
					var n = this.getScene(), m = this.list[this.index];
					if (m.content.replace(d, "") != n.content.replace(d, "")) {
						this.save()
					}
					if (!this.list[this.index - 1] && this.list.length == 1) {
						this.reset();
						return
					}
					while (this.list[this.index].content == this.list[this.index
							- 1].content) {
						this.index--;
						if (this.index == 0) {
							return this.restore(0)
						}
					}
					this.restore(--this.index)
				}
			};
			this.redo = function() {
				if (this.hasRedo) {
					while (this.list[this.index].content == this.list[this.index
							+ 1].content) {
						this.index++;
						if (this.index == this.list.length - 1) {
							return this.restore(this.index)
						}
					}
					this.restore(++this.index)
				}
			};
			this.restore = function() {
				var p = this.list[this.index];
				i.document.body.innerHTML = p.bookcontent.replace(b, "");
				var m = new baidu.editor.dom.Range(i.document);
				m.moveToBookmark({
							start : "_baidu_bookmark_start_",
							end : "_baidu_bookmark_end_",
							id : true
						}).select(!c.gecko);
				setTimeout(function() {
							m.scrollToView(i.autoHeightEnabled,
									i.autoHeightEnabled
											? a.getXY(i.iframe).y
											: 0)
						}, 200);
				this.update();
				if (i.currentSelectedArr) {
					i.currentSelectedArr = [];
					var o = i.document.getElementsByTagName("td");
					for (var n = 0, q; q = o[n++];) {
						if (q.className == i.options.selectedTdClass) {
							i.currentSelectedArr.push(q)
						}
					}
				}
				this.clearKey()
			};
			this.getScene = function() {
				var n = i.selection.getRange(), m = i.body.innerHTML.replace(b,
						"");
				baidu.editor.browser.ie
						&& (m = m.replace(/>&nbsp;</g, "><").replace(/\s*</g,
								"").replace(/>\s*/g, ">"));
				var p = n.createBookmark(true, true), o = i.body.innerHTML
						.replace(b, "");
				n.moveToBookmark(p).select(true);
				return {
					bookcontent : o,
					content : m
				}
			};
			this.save = function() {
				var n = this.getScene(), m = this.list[this.index];
				if (m && m.content == n.content
						&& m.bookcontent == n.bookcontent) {
					return
				}
				this.list = this.list.slice(0, this.index + 1);
				this.list.push(n);
				if (this.list.length > k) {
					this.list.shift()
				}
				this.index = this.list.length - 1;
				this.clearKey();
				this.update()
			};
			this.update = function() {
				this.hasRedo = this.list[this.index + 1] ? true : false;
				this.hasUndo = this.list[this.index - 1]
						|| this.list.length == 1 ? true : false
			};
			this.reset = function() {
				this.list = [];
				this.index = 0;
				this.hasUndo = false;
				this.hasRedo = false;
				this.clearKey()
			};
			this.clearKey = function() {
				g = 0;
				e = null
			}
		}
		i.undoManger = new f();
		function j() {
			this.undoManger.save()
		}
		i.addListener("beforeexeccommand", j);
		i.addListener("afterexeccommand", j);
		i.addListener("reset", function() {
					i.undoManger.reset()
				});
		i.commands.redo = i.commands.undo = {
			execCommand : function(m) {
				i.undoManger[m]()
			},
			queryCommandState : function(m) {
				return i.undoManger["has"
						+ (m.toLowerCase() == "undo" ? "Undo" : "Redo")]
						? 0
						: -1
			},
			notNeedUndo : 1
		};
		var l = {
			16 : 1,
			17 : 1,
			18 : 1,
			37 : 1,
			38 : 1,
			39 : 1,
			40 : 1,
			13 : 1
		}, g = 0, e;
		i.addListener("keydown", function(n, m) {
					var o = m.keyCode || m.which;
					if (!l[o] && !m.ctrlKey && !m.metaKey && !m.shiftKey
							&& !m.altKey) {
						if (i.undoManger.list.length == 0
								|| ((o == 8 || o == 46) && e != o)) {
							i.undoManger.save();
							e = o;
							return
						}
						if (i.undoManger.list.length == 2
								&& i.undoManger.index == 0 && g == 0) {
							i.undoManger.list.splice(1, 1);
							i.undoManger.update()
						}
						e = o;
						g++;
						if (g > h) {
							setTimeout(function() {
										i.undoManger.save()
									}, 0)
						}
					}
				})
	}
})();
(function() {
	var a = baidu.editor.dom.domUtils, b = baidu.editor.browser;
	function c(h) {
		var f = this.document;
		if (f.getElementById("baidu_pastebin")) {
			return
		}
		var e = this.selection.getRange(), d = e.createBookmark(), g = f
				.createElement("div");
		g.id = "baidu_pastebin";
		b.webkit && g.appendChild(f.createTextNode(a.fillChar + a.fillChar));
		f.body.appendChild(g);
		d.start.style.display = "";
		g.style.cssText = "position:absolute;width:1px;height:1px;overflow:hidden;left:-1000px;white-space:nowrap;top:"
				+ a.getXY(d.start).y + "px";
		e.selectNodeContents(g).select(true);
		setTimeout(function() {
					if (b.webkit) {
						var j = f.querySelectorAll("#baidu_pastebin");
						var i = j[j.length - 1];
						if (g !== i) {
							g.parentNode.removeChild(g);
							g = i
						}
					}
					g.parentNode.removeChild(g);
					e.moveToBookmark(d).select(true);
					h(g)
				}, 0)
	}
	baidu.editor.plugins.paste = function() {
		var g = this;
		var f = g.options.pasteplain;
		var d = {
			flag : ""
		};
		g.commands.pasteplain = {
			queryCommandState : function() {
				return f
			},
			execCommand : function() {
				f = !f | 0
			},
			notNeedUndo : 1
		};
		function e(s) {
			var r;
			if (s.firstChild) {
				var w = a.getElementsByTagName(s, "span");
				for (var z = 0, l; l = w[z++];) {
					if (l.id == "_baidu_cut_start" || l.id == "_baidu_cut_end") {
						a.remove(l)
					}
				}
				if (b.webkit) {
					var y = s.querySelectorAll("div #baidu_pastebin"), u;
					for (var z = 0, A; A = y[z++];) {
						u = g.document.createElement("p");
						while (A.firstChild) {
							u.appendChild(A.firstChild)
						}
						A.parentNode.insertBefore(u, A);
						a.remove(A, true)
					}
					var n = s.querySelectorAll("span.Apple-style-span");
					for (var z = 0, o; o = n[z++];) {
						a.remove(o, true)
					}
					var h = s.querySelectorAll("meta");
					for (var z = 0, o; o = h[z++];) {
						a.remove(o)
					}
					var t = s.querySelectorAll("div br");
					for (var z = 0, j; j = t[z++];) {
						var q = j.parentNode;
						if (q.tagName == "DIV" && q.childNodes.length == 1) {
							a.remove(q)
						}
					}
				}
				if (b.gecko) {
					var v = s.querySelectorAll("[_moz_dirty]");
					for (z = 0; o = v[z++];) {
						o.removeAttribute("_moz_dirty")
					}
				}
				r = s.innerHTML;
				var B = g.serialize;
				if (B) {
					try {
						var x = B.transformInput(B.parseHTML(B.word(r), true));
						x = B.filter(x, f ? {
									whiteList : {
										p : {
											$ : {}
										}
									},
									blackList : {
										style : 1,
										script : 1,
										object : 1
									}
								} : null, d);
						if (b.webkit) {
							var k = x.children.length, m;
							while ((m = x.children[k - 1]) && m.tag == "br") {
								x.children.splice(k - 1, 1);
								k = x.children.length
							}
						}
						r = B.toHTML(x)
					} catch (C) {
					}
				}
				g.fireEvent("beforepaste", r);
				g.execCommand("insertHtml", r)
			}
		}
		g.addListener("ready", function() {
			a.on(g.body, "cut", function() {
						var h = g.selection.getRange();
						if (!h.collapsed && g.undoManger) {
							g.undoManger.save()
						}
					});
			a.on(g.body, b.ie ? "keydown" : "paste", function(h) {
				if (b.ie && (!h.ctrlKey || h.keyCode != "86")) {
					return
				}
				c.call(g, function(j) {
							e(j);
							function i() {
								g.ui.hideToolbarMsg();
								g.removeListener("selectionchange", i)
							}
							if (d.flag && g.ui) {
								g.ui
										.showToolbarMsg(g.options.messages.pasteMsg);
								d.flag = "";
								setTimeout(function() {
											g.addListener("selectionchange", i)
										}, 100)
							}
						})
			})
		})
	}
})();
(function() {
	var a = baidu.editor.dom.domUtils, c = baidu.editor.dom.dtd, d = {
		TD : 1,
		PRE : 1,
		BLOCKQUOTE : 1
	}, b = baidu.editor.browser;
	baidu.editor.plugins.list = function() {
		var e = this;
		e.addListener("keydown", function(o, v) {
			function k() {
				v.preventDefault ? v.preventDefault() : (v.returnValue = false);
				e.undoManger && e.undoManger.save()
			}
			var w = v.keyCode || v.which;
			if (w == 13) {
				var n = e.selection.getRange(), g = a.findParentByTagName(
						n.startContainer, ["ol", "ul"], true), j = a
						.findParentByTagName(n.endContainer, ["ol", "ul"], true);
				if (g && j && g === j) {
					if (!n.collapsed) {
						g = a.findParentByTagName(n.startContainer, "li", true);
						j = a.findParentByTagName(n.endContainer, "li", true);
						if (g && j && g === j) {
							n.deleteContents();
							t = a.findParentByTagName(n.startContainer, "li",
									true);
							if (t && a.isEmptyBlock(t)) {
								i = t.previousSibling;
								m = t.nextSibling;
								f = e.document.createElement("p");
								f.innerHTML = b.ie ? "" : "<br/>";
								r = t.parentNode;
								if (i && m) {
									n.setStart(m, 0).collapse(true)
											.select(true);
									a.remove(t)
								} else {
									if (!i && !m || !i) {
										r.parentNode.insertBefore(f, r)
									} else {
										t.parentNode.parentNode.insertBefore(f,
												r.nextSibling)
									}
									a.remove(t);
									if (!r.firstChild) {
										a.remove(r)
									}
									n.setStart(f, 0).setCursor()
								}
								k();
								return
							}
						} else {
							var u = n.cloneRange(), h = u.collapse(false)
									.createBookmark();
							n.deleteContents();
							u.moveToBookmark(h);
							var t = a.findParentByTagName(u.startContainer,
									"li", true), i = t.previousSibling, m = t.nextSibling;
							if (i) {
								t = i;
								if (i.firstChild && a.isBlockElm(i.firstChild)) {
									i = i.firstChild
								}
								if (a.isEmptyNode(i)) {
									a.remove(t)
								}
							}
							if (m) {
								t = m;
								if (m.firstChild && a.isBlockElm(m.firstChild)) {
									m = m.firstChild
								}
								if (a.isEmptyNode(m)) {
									a.remove(t)
								}
							}
							u.select();
							k();
							return
						}
					}
					t = a.findParentByTagName(n.startContainer, "li", true);
					if (t) {
						if (a.isEmptyBlock(t)) {
							h = n.createBookmark();
							var r = t.parentNode;
							if (t !== r.lastChild) {
								a.breakParent(t, r)
							} else {
								r.parentNode.insertBefore(t, r.nextSibling)
							}
							if (!c.$list[t.parentNode.tagName]) {
								if (!a.isBlockElm(t.firstChild)) {
									f = e.document.createElement("p");
									t.parentNode.insertBefore(f, t);
									while (t.firstChild) {
										f.appendChild(t.firstChild)
									}
									a.remove(t)
								} else {
									a.remove(t, true)
								}
							}
							n.moveToBookmark(h).select()
						} else {
							var l = t.firstChild;
							if (!l || !a.isBlockElm(l)) {
								var f = e.document.createElement("p");
								f.innerHTML = b.ie || t.firstChild
										? ""
										: "<br/>";
								while (t.firstChild) {
									f.appendChild(t.firstChild)
								}
								t.appendChild(f);
								l = f
							}
							var q = e.document.createElement("span");
							n.insertNode(q);
							a.breakParent(q, t);
							var s = q.nextSibling;
							l = s.firstChild;
							if (!l) {
								f = e.document.createElement("p");
								f.innerHTML = b.ie ? "" : "<br/>";
								s.appendChild(f);
								l = f
							}
							if (a.isEmptyNode(l)) {
								l.innerHTML = b.ie ? "" : "<br/>"
							}
							n.setStart(l, 0).collapse(true).shrinkBoundary()
									.select();
							a.remove(q);
							i = s.previousSibling;
							if (i && a.isEmptyBlock(i)) {
								i.innerHTML = "<p>" + (b.ie ? "" : "<br/>")
										+ "</p>"
							}
						}
						k()
					}
				}
			}
		});
		baidu.editor.commands.insertorderedlist = baidu.editor.commands.insertunorderedlist = {
			execCommand : function(j, z) {
				if (!z) {
					z = j.toLowerCase() == "insertorderedlist"
							? "decimal"
							: "disc"
				}
				var G = this, s = this.selection.getRange(), t = function(i) {
					return i.nodeType == 1
							? i.tagName.toLowerCase() != "br"
							: !a.isWhitespace(i)
				}, I = j.toLowerCase() == "insertorderedlist" ? "ol" : "ul", h = G.document
						.createDocumentFragment();
				s.shrinkBoundary().adjustmentBoundary();
				var m = s.createBookmark(true), l = a.findParentByTagName(
						G.document.getElementById(m.start), "li"), w = 0, k = a
						.findParentByTagName(G.document.getElementById(m.end),
								"li"), x = 0, E, o, A, C;
				if (l || k) {
					l && (E = l.parentNode);
					if (!m.end) {
						k = l
					}
					k && (o = k.parentNode);
					if (E === o) {
						while (l !== k) {
							C = l;
							l = l.nextSibling;
							if (!a.isBlockElm(C.firstChild)) {
								var u = G.document.createElement("p");
								while (C.firstChild) {
									u.appendChild(C.firstChild)
								}
								C.appendChild(u)
							}
							h.appendChild(C)
						}
						C = G.document.createElement("span");
						E.insertBefore(C, k);
						if (!a.isBlockElm(k.firstChild)) {
							u = G.document.createElement("p");
							while (k.firstChild) {
								u.appendChild(k.firstChild)
							}
							k.appendChild(u)
						}
						h.appendChild(k);
						a.breakParent(C, E);
						if (a.isEmptyNode(C.previousSibling)) {
							a.remove(C.previousSibling)
						}
						if (a.isEmptyNode(C.nextSibling)) {
							a.remove(C.nextSibling)
						}
						if (E.tagName.toLowerCase() == I
								&& a.getComputedStyle(E, "list-style-type") == z) {
							for (var y = 0, q; q = h.childNodes[y++];) {
								a.remove(q, true)
							}
							C.parentNode.insertBefore(h, C)
						} else {
							A = G.document.createElement(I);
							a.setStyle(A, "list-style-type", z);
							A.appendChild(h);
							C.parentNode.insertBefore(A, C)
						}
						a.remove(C);
						s.moveToBookmark(m).select();
						return
					}
					if (l) {
						while (l) {
							C = l.nextSibling;
							var f = G.document.createDocumentFragment(), D = 0;
							while (l.firstChild) {
								if (a.isBlockElm(l.firstChild)) {
									D = 1
								}
								f.appendChild(l.firstChild)
							}
							if (!D) {
								var H = G.document.createElement("p");
								H.appendChild(f);
								h.appendChild(H)
							} else {
								h.appendChild(f)
							}
							a.remove(l);
							l = C
						}
						E.parentNode.insertBefore(h, E.nextSibling);
						if (a.isEmptyNode(E)) {
							s.setStartBefore(E);
							a.remove(E)
						} else {
							s.setStartAfter(E)
						}
						w = 1
					}
					if (k) {
						l = o.firstChild;
						while (l !== k) {
							C = l.nextSibling;
							f = G.document.createDocumentFragment(), D = 0;
							while (l.firstChild) {
								if (a.isBlockElm(l.firstChild)) {
									D = 1
								}
								f.appendChild(l.firstChild)
							}
							if (!D) {
								H = G.document.createElement("p");
								H.appendChild(f);
								h.appendChild(H)
							} else {
								h.appendChild(f)
							}
							a.remove(l);
							l = C
						}
						h.appendChild(k.firstChild);
						a.remove(k);
						o.parentNode.insertBefore(h, o);
						s.setEndBefore(o);
						if (a.isEmptyNode(o)) {
							a.remove(o)
						}
						x = 1
					}
				}
				if (!w) {
					s.setStartBefore(G.document.getElementById(m.start))
				}
				if (m.end && !x) {
					s.setEndAfter(G.document.getElementById(m.end))
				}
				s.enlarge(true, function(i) {
							return d[i.tagName]
						});
				h = G.document.createDocumentFragment();
				var g = s.createBookmark(), v = a.getNextDomNode(g.start,
						false, t), F = s.cloneRange(), B, n = a.isBlockElm;
				while (v && v !== g.end
						&& (a.getPosition(v, g.end) & a.POSITION_PRECEDING)) {
					if (v.nodeType == 3 || c.li[v.tagName]) {
						if (v.nodeType == 1 && c.$list[v.tagName]) {
							while (v.firstChild) {
								h.appendChild(v.firstChild)
							}
							B = a.getNextDomNode(v, false, t);
							a.remove(v);
							v = B;
							continue
						}
						B = v;
						F.setStartBefore(v);
						while (v && v !== g.end
								&& (!n(v) || a.isBookmarkNode(v))) {
							B = v;
							v = a.getNextDomNode(v, false, null, function(i) {
										return !d[i.tagName]
									})
						}
						if (v && n(v)) {
							C = a.getNextDomNode(B, false, t);
							if (C && a.isBookmarkNode(C)) {
								v = a.getNextDomNode(C, false, t);
								B = C
							}
						}
						F.setEndAfter(B);
						v = a.getNextDomNode(B, false, t);
						var r = s.document.createElement("li");
						r.appendChild(F.extractContents());
						h.appendChild(r)
					} else {
						v = a.getNextDomNode(v, true, t)
					}
				}
				s.moveToBookmark(g).collapse(true);
				A = G.document.createElement(I);
				a.setStyle(A, "list-style-type", z);
				A.appendChild(h);
				s.insertNode(A).moveToBookmark(m).select()
			},
			queryCommandState : function(g) {
				var f = this.selection.getStart();
				return a.findParentByTagName(f,
						g.toLowerCase() == "insertorderedlist" ? "ol" : "ul",
						true) ? 1 : 0
			},
			queryCommandValue : function(h) {
				var f = this.selection.getStart(), g = a.findParentByTagName(f,
						h.toLowerCase() == "insertorderedlist" ? "ol" : "ul",
						true);
				return g ? a.getComputedStyle(g, "list-style-type") : null
			}
		}
	}
})();
(function() {
	var d = baidu.editor.browser, a = baidu.editor.dom.domUtils, g = baidu.editor.dom.dtd;
	function f(i) {
		i = i || {};
		this.indentChar = i.indentChar || "  ";
		this.breakChar = i.breakChar || "\n";
		this.selfClosingEnd = i.selfClosingEnd || " />"
	}
	var h = function() {
		var j = {
			"<" : "&lt;",
			">" : "&gt;",
			'"' : "&quot;",
			"'" : "&#39;"
		};
		function i(k) {
			return j[k]
		}
		return function(k) {
			k = k + "";
			return k ? k.replace(/[<>"']/g, i) : ""
		}
	}();
	function e(j) {
		var l = [];
		for (var i in j) {
			l.push(i + '="' + h(j[i]) + '"')
		}
		return l.join(" ")
	}
	f.prototype = {
		format : function(i) {
			var j = baidu.editor.serialize.parseHTML(i);
			this.buff = [];
			this.indents = "";
			this.indenting = 1;
			this.visitNode(j);
			return this.buff.join("")
		},
		visitNode : function(j) {
			if (j.type == "fragment") {
				this.visitChildren(j.children)
			} else {
				if (j.type == "element") {
					var i = g.$empty[j.tag];
					this.visitTag(j.tag, j.attributes, i);
					this.visitChildren(j.children);
					if (!i) {
						this.visitEndTag(j.tag)
					}
				} else {
					if (j.type == "comment") {
						this.visitComment(j.data)
					} else {
						this.visitText(j.data)
					}
				}
			}
		},
		visitChildren : function(k) {
			for (var j = 0; j < k.length; j++) {
				this.visitNode(k[j])
			}
		},
		visitTag : function(i, k, j) {
			if (this.indenting) {
				this.indent()
			} else {
				if (!g.$inline[i] && i != "a") {
					this.newline();
					this.indent()
				}
			}
			this.buff.push("<", i);
			var l = e(k);
			if (l) {
				this.buff.push(" ", l)
			}
			if (j) {
				this.buff.push(this.selfClosingEnd);
				if (i == "br") {
					this.newline()
				}
			} else {
				this.buff.push(">");
				this.indents += this.indentChar
			}
			if (!g.$inline[i]) {
				this.newline()
			}
		},
		indent : function() {
			this.buff.push(this.indents);
			this.indenting = 0
		},
		newline : function() {
			this.buff.push(this.breakChar);
			this.indenting = 1
		},
		visitEndTag : function(i) {
			this.indents = this.indents.slice(0, -this.indentChar.length);
			if (this.indenting) {
				this.indent()
			} else {
				if (!g.$inline[i] && !(g[i] && g[i]["#"])) {
					this.newline();
					this.indent()
				}
			}
			this.buff.push("</", i, ">")
		},
		visitText : function(i) {
			if (this.indenting) {
				this.indent()
			}
			this.buff.push(i)
		},
		visitComment : function(i) {
			if (this.indenting) {
				this.indent()
			}
			this.buff.push("<!--", i, "-->")
		}
	};
	function c(i) {
		var j;
		if (d.ie) {
			j = i.createTextRange();
			j.collapse(true);
			j.select()
		} else {
			i.setSelectionRange(0, 0);
			i.focus()
		}
	}
	function b(j) {
		var i = document.createElement("textarea");
		i.style.cssText = "resize:none;width:100%;height:100%;border:0;padding:0;margin:0;";
		j.appendChild(i);
		return i
	}
	baidu.editor.plugins.source = function() {
		var l = this;
		l.initPlugins(["serialize"]);
		var k = new f(l.options.source);
		var m = false;
		var i;
		l.addListener("ready", function() {
					var p = l.iframe.parentNode;
					if (d.ie && d.version < 8) {
						p.onresize = function() {
							if (i) {
								i.style.width = this.offsetWidth + "px";
								i.style.height = this.offsetHeight + "px"
							}
						}
					}
					p = null
				});
		var n;
		l.commands.source = {
			execCommand : function() {
				m = !m;
				if (m) {
					l.undoManger && l.undoManger.save();
					this.currentSelectedArr
							&& a.clearSelectedArr(this.currentSelectedArr);
					if (d.gecko) {
						l.body.contentEditable = false
					}
					n = l.iframe.style.cssText;
					l.iframe.style.cssText += "position:absolute;left:-32768px;top:-32768px;";
					var p = k.format(l.getContent());
					i = b(l.iframe.parentNode);
					i.value = p;
					if (d.ie && d.version < 8) {
						i.style.height = l.iframe.parentNode.offsetHeight
								+ "px";
						i.style.width = l.iframe.parentNode.offsetWidth + "px"
					}
					setTimeout(function() {
								c(i)
							})
				} else {
					l.iframe.style.cssText = n;
					l.setContent(i.value || "<p><br/></p>");
					a.remove(i);
					i = null;
					setTimeout(function() {
						var s = l.body.firstChild;
						if (!s) {
							l.body.innerHTML = "<p>" + (d.ie ? "" : "<br/>")
									+ "</p>";
							s = l.body.firstChild
						}
						l.undoManger && l.undoManger.save();
						while (s && s.firstChild) {
							s = s.firstChild
						}
						var r = l.selection.getRange();
						if (s.nodeType == 3
								|| baidu.editor.dom.dtd.$empty[s.tagName]) {
							r.setStartBefore(s)
						} else {
							r.setStart(s, 0)
						}
						if (baidu.editor.browser.gecko) {
							var q = document.createElement("input");
							document.body.appendChild(q);
							l.body.contentEditable = false;
							setTimeout(function() {
										q.focus();
										setTimeout(function() {
													l.body.contentEditable = true;
													r.setCursor(false, true);
													baidu.editor.dom.domUtils
															.remove(q)
												})
									})
						} else {
							r.setCursor(false, true)
						}
					})
				}
				this.fireEvent("sourcemodechanged", m)
			},
			queryCommandState : function() {
				return m | 0
			}
		};
		if (d.ie) {
			l.addListener("fullscreenchanged", function(p, q) {
						if (q && i) {
							i.style.height = l.iframe.parentNode.offsetHeight
									+ "px";
							i.style.width = l.iframe.parentNode.offsetWidth
									+ "px"
						}
					})
		}
		var j = l.queryCommandState;
		l.queryCommandState = function(p) {
			p = p.toLowerCase();
			if (m) {
				return p == "source" ? 1 : -1
			}
			return j.apply(this, arguments)
		};
		var o = l.getContent;
		l.getContent = function() {
			if (m && i) {
				var p = i.value;
				if (this.serialize) {
					var q = this.serialize.parseHTML(p);
					q = this.serialize.filter(q);
					p = this.serialize.toHTML(q)
				}
				return p
			} else {
				return o.apply(this, arguments)
			}
		}
	}
})();
baidu.editor.plugins.shortcutkeys = function() {
	var a = this, b = baidu.editor.utils.extend({
				"ctrl+66" : "Bold",
				"ctrl+90" : "Undo",
				"ctrl+89" : "Redo",
				"ctrl+73" : "Italic",
				"ctrl+85" : "Underline:Underline",
				"ctrl+shift+67" : "removeformat",
				"ctrl+shift+76" : "justify:left",
				"ctrl+shift+82" : "justify:right",
				"ctrl+65" : "selectAll"
			}, a.options.shortcutkeys);
	a.addListener("keydown", function(d, h) {
		var g = h.keyCode || h.which, f;
		for (var c in b) {
			if (/^(ctrl)(\+shift)?\+(\d+)$/.test(c.toLowerCase())
					|| /^(\d+)$/.test(c)) {
				if (((RegExp.$1 == "ctrl" ? (h.ctrlKey || h.metaKey) : 0)
						&& (RegExp.$2 != "" ? h[RegExp.$2.slice(1) + "Key"] : 1) && g == RegExp.$3)
						|| g == RegExp.$1) {
					f = b[c].split(":");
					a.execCommand(f[0], f[1]);
					h.preventDefault
							? h.preventDefault()
							: (h.returnValue = false)
				}
			}
		}
	})
};
(function() {
	var c = baidu.editor.browser, a = baidu.editor.dom.domUtils, b;
	baidu.editor.plugins.enterkey = function() {
		var e = this, d = e.options.enterTag;
		e.addListener("keyup", function(n, o) {
					var q = o.keyCode || o.which;
					if (q == 13) {
						var m = e.selection.getRange(), j = m.startContainer, f;
						if (!c.ie) {
							if (/h\d/i.test(b)) {
								if (c.gecko) {
									var l = a.findParentByTagName(j, ["h1",
													"h2", "h3", "h4", "h5",
													"h6", "blockquote"], true);
									if (!l) {
										e.document.execCommand("formatBlock",
												false, "<p>");
										f = 1
									}
								} else {
									if (j.nodeType == 1) {
										var k = e.document.createTextNode(""), g;
										m.insertNode(k);
										g = a.findParentByTagName(k, "div",
												true);
										if (g) {
											var i = e.document
													.createElement("p");
											while (g.firstChild) {
												i.appendChild(g.firstChild)
											}
											g.parentNode.insertBefore(i, g);
											a.remove(g);
											m.setStartBefore(k).setCursor();
											f = 1
										}
										a.remove(k)
									}
								}
								if (e.undoManger && f) {
									e.undoManger.save()
								}
							}
						}
						m = e.selection.getRange();
						setTimeout(function() {
									m.scrollToView(e.autoHeightEnabled,
											e.autoHeightEnabled ? a
													.getXY(e.iframe).y : 0)
								}, 50)
					}
				});
		e.addListener("keydown", function(k, m) {
			var o = m.keyCode || m.which;
			if (o == 13) {
				if (e.undoManger) {
					e.undoManger.save()
				}
				b = "";
				var h = e.selection.getRange();
				if (!h.collapsed) {
					var f = h.startContainer, g = h.endContainer, i = a
							.findParentByTagName(f, "td", true), j = a
							.findParentByTagName(g, "td", true);
					if (i && j && i !== j || !i && j || i && !j) {
						m.preventDefault
								? m.preventDefault()
								: (m.returnValue = false);
						return
					}
				}
				e.currentSelectedArr
						&& a.clearSelectedArr(e.currentSelectedArr);
				if (d == "p") {
					if (!c.ie) {
						f = a.findParentByTagName(h.startContainer, ["ol",
										"ul", "p", "h1", "h2", "h3", "h4",
										"h5", "h6", "blockquote"], true);
						if (!f) {
							e.document.execCommand("formatBlock", false, "<p>");
							if (c.gecko) {
								h = e.selection.getRange();
								f = a.findParentByTagName(h.startContainer,
										"p", true);
								f && a.removeDirtyAttr(f)
							}
						} else {
							b = f.tagName;
							f.tagName.toLowerCase() == "p" && c.gecko
									&& a.removeDirtyAttr(f)
						}
					}
				} else {
					m.preventDefault
							? m.preventDefault()
							: (m.returnValue = false);
					if (!h.collapsed) {
						h.deleteContents();
						f = h.startContainer;
						if (f.nodeType == 1
								&& (f = f.childNodes[h.startOffset])) {
							while (f.nodeType == 1) {
								if (baidu.editor.dom.dtd.$empty[f.tagName]) {
									h.setStartBefore(f).setCursor();
									if (e.undoManger) {
										e.undoManger.save()
									}
									return false
								}
								if (!f.firstChild) {
									var n = h.document.createElement("br");
									f.appendChild(n);
									h.setStart(f, 0).setCursor();
									if (e.undoManger) {
										e.undoManger.save()
									}
									return false
								}
								f = f.firstChild
							}
							if (f === h.startContainer.childNodes[h.startOffset]) {
								n = h.document.createElement("br");
								h.insertNode(n).setCursor()
							} else {
								h.setStart(f, 0).setCursor()
							}
						} else {
							n = h.document.createElement("br");
							h.insertNode(n).setStartAfter(n).setCursor()
						}
					} else {
						n = h.document.createElement("br");
						h.insertNode(n);
						var l = n.parentNode;
						if (l.lastChild === n) {
							n.parentNode.insertBefore(n.cloneNode(true), n);
							h.setStartBefore(n)
						} else {
							h.setStartAfter(n)
						}
						h.setCursor()
					}
				}
			}
		})
	}
})();
(function() {
	var b = baidu.editor.dom.domUtils, c = baidu.editor.browser, a = baidu.editor.dom.dtd, g = baidu.editor.utils, e = 0, h = b.keys, i = {
		B : "strong",
		I : "em",
		FONT : "span"
	}, d = [0, 10, 12, 16, 18, 24, 32, 48], f = {
		OL : ["decimal", "lower-alpha", "lower-roman", "upper-alpha",
				"upper-roman"],
		UL : ["circle", "disc", "square"]
	};
	baidu.editor.plugins.keystrokes = function() {
		var j = this;
		j.addListener("keydown", function(l, z) {
			var s = z.keyCode || z.which;
			if (s == 8 || s == 46) {
				var w = j.selection.getRange(), I, n, m;
				if (w.collapsed) {
					n = w.startContainer;
					if (b.isWhitespace(n)) {
						n = n.parentNode
					}
					if (b.isEmptyNode(n) && n === j.body.firstChild) {
						if (n.tagName != "P") {
							B = j.document.createElement("p");
							j.body.insertBefore(B, n);
							B.innerHTML = c.ie ? "" : "<br/>";
							w.setStart(B, 0).setCursor()
						}
						z.preventDefault
								? z.preventDefault()
								: (z.returnValue = false);
						return
					}
				}
				if (w.collapsed
						&& w.startContainer.nodeType == 3
						&& w.startContainer.nodeValue.replace(new RegExp(
										b.fillChar, "g"), "").length == 0) {
					w.setStartBefore(w.startContainer).collapse(true)
				}
				if (n = w.getClosedNode()) {
					j.undoManger && j.undoManger.save();
					w.setStartBefore(n);
					b.remove(n);
					w.setCursor();
					j.undoManger && j.undoManger.save();
					z.preventDefault
							? z.preventDefault()
							: (z.returnValue = false);
					return
				}
				if (!c.ie) {
					n = b.findParentByTagName(w.startContainer, "table", true);
					m = b.findParentByTagName(w.endContainer, "table", true);
					if (n && !m || !n && m || n !== m) {
						z.preventDefault();
						return
					}
					if (c.webkit && w.collapsed && n) {
						I = w.cloneRange().txtToElmBoundary();
						n = I.startContainer;
						if (b.isBlockElm(n) && n.nodeType == 1
								&& !a.$tableContent[n.tagName]
								&& !b.getChildCount(n, function(p) {
											return p.nodeType == 1
													? p.tagName !== "BR"
													: 1
										})) {
							I.setStartBefore(n).setCursor();
							b.remove(n, true);
							z.preventDefault();
							return
						}
					}
				}
				if (w.collapsed && !w.startOffset) {
					I = w.cloneRange().trimBoundary();
					var u = b.findParentByTagName(w.startContainer, "li", true), A;
					if (u && !I.startOffset) {
						if (u && (A = u.previousSibling)) {
							if (s == 46 && u.childNodes.length) {
								return
							}
							j.undoManger && j.undoManger.save();
							var q = u.firstChild;
							if (b.isBlockElm(q)) {
								if (b.isEmptyNode(q)) {
									w.setEnd(A, A.childNodes.length)
											.shrinkBoundary().collapse()
											.select(true)
								} else {
									F = j.document.createElement("span");
									w.insertNode(F);
									if (b.isBlockElm(A.firstChild)) {
										A.firstChild.appendChild(F);
										while (q.firstChild) {
											A.firstChild
													.appendChild(q.firstChild)
										}
									} else {
										while (q.firstChild) {
											A.appendChild(q.firstChild)
										}
									}
									w.setStartBefore(F).collapse(true)
											.select(true);
									b.remove(F)
								}
							} else {
								if (b.isEmptyNode(u)) {
									w.setEnd(A, A.childNodes.length)
											.shrinkBoundary().collapse()
											.select(true)
								} else {
									w.setEnd(A, A.childNodes.length).collapse()
											.select(true);
									while (u.firstChild) {
										A.appendChild(u.firstChild)
									}
								}
							}
							b.remove(u);
							j.undoManger && j.undoManger.save();
							z.preventDefault
									? z.preventDefault()
									: (z.returnValue = false);
							return
						}
						if (u && !u.previousSibling) {
							q = u.firstChild;
							if (!q || b.isEmptyNode(b.isBlockElm(q) ? q : u)) {
								var B = j.document.createElement("p");
								u.parentNode.parentNode.insertBefore(B,
										u.parentNode);
								B.innerHTML = c.ie ? "" : "<br/>";
								w.setStart(B, 0).setCursor();
								b.remove(!u.nextSibling ? u.parentNode : u);
								j.undoManger && j.undoManger.save();
								z.preventDefault
										? z.preventDefault()
										: (z.returnValue = false);
								return
							}
						}
					}
				}
				if (j.undoManger) {
					if (!w.collapsed) {
						j.undoManger.save();
						e = 1
					}
				}
			}
			if (s == 9) {
				w = j.selection.getRange();
				j.undoManger && j.undoManger.save();
				for (var G = 0, x = ""; G < j.options.tabSize; G++) {
					x += j.options.tabNode
				}
				var F = j.document.createElement("span");
				F.innerHTML = x;
				if (w.collapsed) {
					u = b.findParentByTagName(w.startContainer, "li", true);
					if (u && b.isStartInblock(w)) {
						k = w.createBookmark();
						var E = u.parentNode, H = j.document
								.createElement(E.tagName);
						var o = g.indexOf(f[H.tagName], b.getComputedStyle(E,
										"list-style-type"));
						o = o + 1 == f[H.tagName].length ? 0 : o + 1;
						b.setStyle(H, "list-style-type", f[H.tagName][o]);
						E.insertBefore(H, u);
						H.appendChild(u);
						w.moveToBookmark(k).select()
					} else {
						w.insertNode(F.cloneNode(true).firstChild)
								.setCursor(true)
					}
				} else {
					n = b.findParentByTagName(w.startContainer, "table", true);
					m = b.findParentByTagName(w.endContainer, "table", true);
					if (n || m) {
						z.preventDefault
								? z.preventDefault()
								: (z.returnValue = false);
						return
					}
					n = b.findParentByTagName(w.startContainer, ["ol", "ul"],
							true);
					m = b.findParentByTagName(w.endContainer, ["ol", "ul"],
							true);
					if (n && m && n === m) {
						var k = w.createBookmark();
						n = b.findParentByTagName(w.startContainer, "li", true);
						m = b.findParentByTagName(w.endContainer, "li", true);
						if (n === n.parentNode.firstChild) {
							var v = j.document
									.createElement(n.parentNode.tagName);
							n.parentNode.parentNode.insertBefore(v,
									n.parentNode);
							v.appendChild(n.parentNode)
						} else {
							E = n.parentNode, H = j.document
									.createElement(E.tagName);
							o = g.indexOf(f[H.tagName], b.getComputedStyle(E,
											"list-style-type"));
							o = o + 1 == f[H.tagName].length ? 0 : o + 1;
							b.setStyle(H, "list-style-type", f[H.tagName][o]);
							n.parentNode.insertBefore(H, n);
							var t;
							while (n !== m) {
								t = n.nextSibling;
								H.appendChild(n);
								n = t
							}
							H.appendChild(m)
						}
						w.moveToBookmark(k).select()
					} else {
						if (n || m) {
							z.preventDefault
									? z.preventDefault()
									: (z.returnValue = false);
							return
						}
						n = b.findParent(w.startContainer, y);
						m = b.findParent(w.endContainer, y);
						if (n && m && n === m) {
							w.deleteContents();
							w.insertNode(F.cloneNode(true).firstChild)
									.setCursor(true)
						} else {
							var r = w.createBookmark(), y = function(p) {
								return b.isBlockElm(p)
							};
							w.enlarge(true);
							var D = w.createBookmark(), C = b.getNextDomNode(
									D.start, false, y);
							while (C
									&& !(b.getPosition(C, D.end) & b.POSITION_FOLLOWING)) {
								C.insertBefore(F.cloneNode(true).firstChild,
										C.firstChild);
								C = b.getNextDomNode(C, false, y)
							}
							w.moveToBookmark(D).moveToBookmark(r).select()
						}
					}
				}
				j.undoManger && j.undoManger.save();
				z.preventDefault ? z.preventDefault() : (z.returnValue = false)
			}
		});
		j.addListener("keyup", function(t, w) {
			var x = w.keyCode || w.which;
			if (!c.gecko && !h[x] && !w.ctrlKey && !w.metaKey && !w.shiftKey
					&& !w.altKey) {
				r = j.selection.getRange();
				if (r.collapsed) {
					var m = r.startContainer, l, n = 0;
					while (!b.isBlockElm(m)) {
						if (m.nodeType == 1
								&& g.indexOf(["FONT", "B", "I"], m.tagName) != -1) {
							var o = j.document.createElement(i[m.tagName]);
							if (m.tagName == "FONT") {
								o.style.cssText = (m.getAttribute("size")
										? "font-size:"
												+ (d[m.getAttribute("size")] || 12)
												+ "px"
										: "")
										+ ";"
										+ (m.getAttribute("color") ? "color:"
												+ m.getAttribute("color") : "")
										+ ";"
										+ (m.getAttribute("face")
												? "font-family:"
														+ m
																.getAttribute("face")
												: "") + ";" + m.style.cssText
							}
							while (m.firstChild) {
								o.appendChild(m.firstChild)
							}
							m.parentNode.insertBefore(o, m);
							b.remove(m);
							if (!n) {
								r.setEnd(o, o.childNodes.length).collapse(true)
							}
							m = o;
							n = 1
						}
						m = m.parentNode
					}
					n && r.select()
				}
			}
			if (x == 8 || x == 46) {
				var r, s, m, v, q = this.currentSelectedArr;
				if (q && q.length > 0) {
					for (var p = 0, k; k = q[p++];) {
						k.innerHTML = c.ie
								? (c.version < 9 ? "&#65279" : "")
								: "<br/>"
					}
					r = new baidu.editor.dom.Range(this.document);
					r.setStart(q[0], 0).setCursor();
					if (e) {
						j.undoManger.save();
						e = 0
					}
					if (c.webkit) {
						w.preventDefault()
					}
					return
				}
				r = j.selection.getRange();
				if (b.isEmptyBlock(j.document.body) && !r.startOffset) {
					j.document.body.innerHTML = "<p>" + (c.ie ? "" : "<br/>")
							+ "</p>";
					r.setStart(j.document.body.firstChild, 0).setCursor();
					j.undoManger && j.undoManger.save();
					return
				}
				m = r.startContainer;
				if (b.isWhitespace(m)) {
					m = m.parentNode
				}
				while (m.nodeType == 1 && b.isEmptyNode(m)
						&& a.$removeEmpty[m.tagName]) {
					v = m.parentNode;
					b.remove(m);
					m = v
				}
				if (m.nodeType == 1 && b.isEmptyNode(m)) {
					if (c.ie) {
						var u = r.document.createElement("span");
						m.appendChild(u);
						r.setStart(u, 0).setCursor()
					} else {
						m.innerHTML = "<br/>";
						r.setStart(m, 0).setCursor(false, true)
					}
					setTimeout(function() {
								if (c.ie) {
									b.remove(u)
								}
								if (e) {
									j.undoManger.save();
									e = 0
								}
							}, 0)
				} else {
					if (e) {
						j.undoManger.save();
						e = 0
					}
				}
			}
		})
	}
})();
baidu.editor.plugins.fiximgclick = function() {
	var b = this, a = baidu.editor.browser;
	if (a.webkit) {
		b.addListener("click", function(d, f) {
					if (f.target.tagName == "IMG") {
						var c = new baidu.editor.dom.Range(b.document);
						c.selectNode(f.target).select()
					}
				})
	}
};
(function() {
	var c = baidu.editor, b = c.browser, a = c.dom.domUtils;
	baidu.editor.plugins.autolink = function() {
		var d = 0;
		if (b.ie) {
			return
		}
		var e = this;
		e.addListener("reset", function() {
					d = 0
				});
		e.addListener("keydown", function(j, l) {
			var o = l.keyCode || l.which;
			if (o == 32 || o == 13) {
				var g = e.selection.getNative(), i = g.getRangeAt(0)
						.cloneRange(), h, n;
				var f = i.startContainer;
				while (f.nodeType == 1 && i.startOffset > 0) {
					f = i.startContainer.childNodes[i.startOffset - 1];
					if (!f) {
						break
					}
					i.setStart(f, f.nodeType == 1
									? f.childNodes.length
									: f.nodeValue.length);
					i.collapse(true);
					f = i.startContainer
				}
				do {
					if (i.startOffset == 0) {
						f = i.startContainer.previousSibling;
						while (f && f.nodeType == 1) {
							f = f.lastChild
						}
						if (!f || a.isFillChar(f)) {
							break
						}
						h = f.nodeValue.length
					} else {
						f = i.startContainer;
						h = i.startOffset
					}
					i.setStart(f, h - 1);
					n = i.toString().charCodeAt(0)
				} while (n != 160 && n != 32);
				if (i
						.toString()
						.replace(new RegExp(a.fillChar, "g"), "")
						.match(/^(\s*)(?:https?:\/\/|ssh:\/\/|ftp:\/\/|file:\/|www\.)/i)) {
					var k = e.document.createElement("a"), m = e.document
							.createTextNode(" ");
					if (RegExp.$1.length) {
						i.setStart(i.startContainer, i.startOffset
										+ RegExp.$1.length)
					}
					k.appendChild(i.extractContents());
					k.href = k.innerHTML;
					i.insertNode(k);
					k.parentNode.insertBefore(m, k.nextSibling);
					i.setStart(m, 0);
					i.collapse(true);
					g.removeAllRanges();
					g.addRange(i)
				}
			}
		})
	}
})();
(function() {
	var a = baidu.editor.browser;
	baidu.editor.plugins.autoheight = function() {
		var c = this;
		c.autoHeightEnabled = this.options.autoHeightEnabled;
		var e;
		var d;
		var b;
		c.enableAutoHeight = function() {
			var f = c.iframe, h = c.document, g = c.options.minFrameHeight;
			function i() {
				c.setHeight(Math.max(a.ie
								? h.body.scrollHeight
								: h.body.offsetHeight + 20, g))
			}
			this.autoHeightEnabled = true;
			d = f.scroll;
			b = h.body.style.overflowY;
			f.scroll = "no";
			h.body.style.overflowY = "hidden";
			e = setTimeout(function() {
						if (c.queryCommandState("source") != 1) {
							i()
						}
						e = setTimeout(arguments.callee)
					});
			c.fireEvent("autoheightchanged", this.autoHeightEnabled)
		};
		c.disableAutoHeight = function() {
			var f = c.iframe, g = c.document;
			f.scroll = d;
			g.body.style.overflowY = b;
			clearTimeout(e);
			this.autoHeightEnabled = false;
			c.fireEvent("autoheightchanged", this.autoHeightEnabled)
		};
		c.addListener("ready", function() {
					if (this.autoHeightEnabled) {
						c.enableAutoHeight()
					}
				})
	}
})();
(function() {
	var e = baidu.editor.browser, c = baidu.editor.dom.domUtils, d, b = e.ie
			&& e.version <= 6;
	baidu.editor.plugins.autofloat = function() {
		var g = this.options.autoFloatEnabled;
		if (!g) {
			return
		}
		var i = this, j = false, k = 0, m, l = document.createElement("div");
		function o(t) {
			var p = i.ui.getDom("toolbarbox"), r = c.getXY(p), q = window.getComputedStyle
					? document.defaultView.getComputedStyle(p, null).position
					: p.currentStyle.position, s = window.getComputedStyle
					? document.defaultView.getComputedStyle(p, null).left
					: p.currentStyle.left;
			l.style.height = p.offsetHeight + "px";
			m = p.style.cssText;
			p.style.width = p.offsetWidth + "px";
			p.parentNode.insertBefore(l, p);
			if (b) {
				p.style.position = "absolute";
				p.style.setExpression("top",
						'eval("((document.documentElement||document.body).scrollTop-'
								+ t + ")+'px'\")");
				p.style.zIndex = "1"
			} else {
				p.style.position = "fixed";
				p.style.zIndex = "1";
				p.style.top = "0";
				((q == "absolute" || q == "relative") && parseFloat(s))
						&& (p.style.left = r.x + "px")
			}
			j = true
		}
		function h() {
			var p = i.ui.getDom("toolbarbox");
			l.parentNode.removeChild(l);
			if (b) {
				p.style.removeExpression("top")
			}
			p.style.cssText = m;
			j = false
		}
		function n() {
			var r = d.getClientRect(i.ui.getDom("toolbarbox"));
			var p = d.getClientRect(i.ui.getDom("iframeholder"));
			if (!j) {
				if (r.top < 0 && p.bottom > r.height + k) {
					var s = (document.documentElement.scrollTop || document.body.scrollTop)
							+ r.top;
					o(s)
				}
			} else {
				var q = d.getClientRect(l);
				if (r.top < q.top || r.bottom + k > p.bottom) {
					h()
				}
			}
		}
		i.addListener("ready", function() {
					if (a()) {
						if (b) {
							f()
						}
						i.addListener("autoheightchanged", function(q, p) {
									if (p) {
										c.on(window, "scroll", n);
										c.on(window, "resize", n);
										i.addListener("keydown", n)
									} else {
										c.un(window, "scroll", n);
										c.un(window, "resize", n);
										i.removeListener("keydown", n)
									}
								});
						i.addListener("beforefullscreenchange", function(q, p) {
									if (p) {
										if (j) {
											h()
										}
									}
								});
						i.addListener("fullscreenchanged", function(q, p) {
									if (!p) {
										n()
									}
								})
					}
				})
	};
	function a() {
		try {
			d = baidu.editor.ui.uiUtils
		} catch (g) {
			alert("autofloat插件功能依赖于UEditor UI\nautofloat定义位置: _src/plugins/autofloat/autofloat.js");
			throw ({
				name : "未包含UI文件",
				message : "autofloat功能依赖于UEditor UI。autofloat定义位置: _src/plugins/autofloat/autofloat.js"
			})
		}
		return 1
	}
	function f() {
		var g = document.body.style;
		g.backgroundImage = 'url("about:blank")';
		g.backgroundAttachment = "fixed"
	}
})();
(function() {
	Array.prototype.contains = function(d, e) {
		for (var c = 0; c < this.length; c++) {
			if (e && this[c] == d) {
				return this[c]
			} else {
				if (this[c].toLowerCase() == d.toLowerCase()) {
					return this[c].toLowerCase()
				}
			}
		}
		return false
	};
	function a(c) {
		if (c < 10) {
			return "&nbsp;&nbsp;"
		} else {
			if (c >= 10 && c < 100) {
				return "&nbsp;"
			} else {
				if (c >= 100 && c < 1000) {
					return ""
				}
			}
		}
	}
	function b(d, c) {
		this._codetxt = d;
		switch (c && c.toLowerCase()) {
			case "sql" :
				this._caseSensitive = false;
				this._keywords = "COMMIT,DELETE,INSERT,LOCK,ROLLBACK,SELECT,TRANSACTION,READ,ONLY,WRITE,USE,ROLLBACK,SEGMENT,ROLE,EXCEPT,NONE,UPDATE,DUAL,WORK,COMMENT,FORCE,FROM,WHERE,INTO,VALUES,ROW,SHARE,MODE,EXCLUSIVE,UPDATE,ROW,NOWAIT,TO,SAVEPOINT,UNION,UNION,ALL,INTERSECT,MINUS,START,WITH,CONNECT,BY,GROUP,HAVING,ORDER,UPDATE,NOWAIT,IDENTIFIED,SET,DROP,PACKAGE,CREATE,REPLACE,PROCEDURE,FUNCTION,TABLE,RETURN,AS,BEGIN,DECLARE,END,IF,THEN,ELSIF,ELSE,WHILE,CURSOR,EXCEPTION,WHEN,OTHERS,NO_DATA_FOUND,TOO_MANY_ROWS,CURSOR_ALREADY_OPENED,FOR,LOOP,IN,OUT,TYPE,OF,INDEX,BINARY_INTEGER,RAISE,ROWTYPE,VARCHAR2,NUMBER,LONG,DATE,RAW,LONG RAW,CHAR,INTEGER,MLSLABEL,CURRENT,OF,DEFAULT,CURRVAL,NEXTVAL,LEVEL,ROWID,ROWNUM,DISTINCT,ALL,LIKE,IS,NOT,NULL,BETWEEN,ANY,AND,OR,EXISTS,ASC,DESC,ABS,CEIL,COS,COSH,EXP,FLOOR,LN,LOG,MOD,POWER,ROUND,SIGN,SIN,SINH,SQRT,TAN,TANH,TRUNC,CHR,CONCAT,INITCAP,LOWER,LPAD,LTRIM,NLS_INITCAP,NLS_LOWER,NLS_UPPER,REPLACE,RPAD,RTRIM,SOUNDEX,SUBSTR,SUBSTRB,TRANSLATE,UPPER,ASCII,INSTR,INSTRB,LENGTH,LENGTHB,NLSSORT,ADD_MONTHS,LAST_DAY,MONTHS_BETWEEN,NEW_TIME,NEXT_DAY,ROUND,SYSDATE,TRUNC,CHARTOROWID,CONVERT,HEXTORAW,RAWTOHEX,ROWIDTOCHAR,TO_CHAR,TO_DATE,TO_LABEL,TO_MULTI_BYTE,TO_NUMBER,TO_SINGLE_BYTE,DUMP,GREATEST,GREATEST_LB,LEAST,LEAST_UB,NVL,UID,USER,USERENV,VSIZE,AVG,COUNT,GLB,LUB,MAX,MIN,STDDEV,SUM,VARIANCE"
						.split(",");
				this._commonObjects = [""];
				this._tags = [""];
				this._wordDelimiters = "　 ,.?!;:\\/<>(){}[]\"'\r\n\t=+-|*%@#$^&";
				this._quotation = ["'"];
				this._lineComment = "--";
				this._escape = "";
				this._commentOn = "/*";
				this._commentOff = "*/";
				this._ignore = "";
				this._dealTag = false;
				break;
			case "c#" :
				this._caseSensitive = true;
				this._keywords = "abstract,as,base,bool,break,byte,case,catch,char,checked,class,const,continue,decimal,default,delegate,do,double,else,enum,event,explicit,extern,false,finally,fixed,float,for,foreach,get,goto,if,implicit,in,int,interface,internal,is,lock,long,namespace,new,null,object,operator,out,override,params,private,protected,public,readonly,ref,return,sbyte,sealed,short,sizeof,stackalloc,static,set,string,struct,switch,this,throw,true,try,typeof,uint,ulong,unchecked,unsafe,ushort,using,value,virtual,void,volatile,while"
						.split(",");
				this._commonObjects = "String,Boolean,DateTime,Int32,Int64,Exception,DataTable,DataReader"
						.split(",");
				this._tags = [""];
				this._wordDelimiters = "　 ,.?!;:\\/<>(){}[]\"'\r\n\t=+-|*%@#$^&";
				this._quotation = ['"'];
				this._lineComment = "//";
				this._escape = "\\";
				this._commentOn = "/*";
				this._commentOff = "*/";
				this._ignore = "";
				this._dealTag = false;
				break;
			case "java" :
				this._caseSensitive = true;
				this._keywords = "abstract,boolean,break,byte,case,catch,char,class,const,continue,default,do,double,else,extends,final,finally,float,for,goto,if,implements,import,instanceof,int,interface,long,native,new,package,private,protected,public,return,short,static,strictfp,super,switch,synchronized,this,throw,throws,transient,try,void,volatile,while"
						.split(",");
				this._commonObjects = "String,Boolean,DateTime,Int32,Int64,Exception,DataTable,DataReader"
						.split(",");
				this._tags = [""];
				this._wordDelimiters = "　 ,.?!;:\\/<>(){}[]\"'\r\n\t=+-|*%@#$^&";
				this._quotation = ['"'];
				this._lineComment = "//";
				this._escape = "\\";
				this._commentOn = "/*";
				this._commentOff = "*/";
				this._ignore = "";
				this._dealTag = false;
				break;
			case "vbs" :
			case "vb" :
				this._caseSensitive = false;
				this._keywords = "And,ByRef,ByVal,Call,Case,Class,Const,Dim,Do,Each,Else,ElseIf,Empty,End,Eqv,Erase,Error,Exit,Explicit,False,For,Function,Get,If,Imp,In,Is,Let,Loop,Mod,Next,Not,Nothing,Null,On,Option,Or,Private,Property,Public,Randomize,ReDim,Resume,Select,Set,Step,Sub,Then,To,True,Until,Wend,While,Xor,Anchor,Array,Asc,Atn,CBool,CByte,CCur,CDate,CDbl,Chr,CInt,CLng,Cos,CreateObject,CSng,CStr,Date,DateAdd,DateDiff,DatePart,DateSerial,DateValue,Day,Dictionary,Document,Element,Err,Exp,FileSystemObject,Filter,Fix,Int,Form,FormatCurrency,FormatDateTime,FormatNumber,FormatPercent,GetObject,Hex,Hour,InputBox,InStr,InstrRev,IsArray,IsDate,IsEmpty,IsNull,IsNumeric,IsObject,Join,LBound,LCase,Left,Len,Link,LoadPicture,Location,Log,LTrim,RTrim,Trim,Mid,Minute,Month,MonthName,MsgBox,Navigator,Now,Oct,Replace,Right,Rnd,Round,ScriptEngine,ScriptEngineBuildVersion,ScriptEngineMajorVersion,ScriptEngineMinorVersion,Second,Sgn,Sin,Space,Split,Sqr,StrComp,String,StrReverse,Tan,Time,TextStream,TimeSerial,TimeValue,TypeName,UBound,UCase,VarType,Weekday,WeekDayName,Year"
						.split(",");
				this._commonObjects = "String,Number,Boolean,Date,Integert,Long,Double,Single"
						.split(",");
				this._tags = [""];
				this._wordDelimiters = "　 ,.?!;:\\/<>(){}[]\"'\r\n\t=+-|*%@#$^&";
				this._quotation = ['"'];
				this._lineComment = "'";
				this._escape = "";
				this._commentOn = "";
				this._commentOff = "";
				this._ignore = "<!--";
				this._dealTag = false;
				break;
			case "javascript" :
				this._caseSensitive = true;
				this._keywords = "function,void,this,boolean,while,if,return,new,true,false,try,catch,throw,null,else,int,long,do,var"
						.split(",");
				this._commonObjects = "String,Number,Boolean,RegExp,Error,Math,Date"
						.split(",");
				this._tags = [""];
				this._wordDelimiters = "　 ,.?!;:\\/<>(){}[]\"'\r\n\t=+-|*%@#$^&";
				this._quotation = ['"', "'"];
				this._lineComment = "//";
				this._escape = "\\";
				this._commentOn = "/*";
				this._commentOff = "*/";
				this._ignore = "<!--";
				break;
			case "css" :
			case "html" :
				this._caseSensitive = true;
				this._keywords = "function,void,this,boolean,while,if,return,new,true,false,try,catch,throw,null,else,int,long,do,var"
						.split(",");
				this._commonObjects = "String,Number,Boolean,RegExp,Error,Math,Date"
						.split(",");
				this._tags = "html,head,body,title,style,script,language,input,select,div,span,button,img,iframe,frame,frameset,table,tr,td,caption,form,font,meta,textarea"
						.split(",");
				this._wordDelimiters = "　 ,.?!;:\\/>(){}[]\"'\r\n\t+-|*%@#$^&";
				this._quotation = ['"', "'"];
				this._lineComment = "//";
				this._escape = "\\";
				this._commentOn = "/*";
				this._commentOff = "*/";
				this._ignore = "<!--";
				this._dealTag = true;
				break;
			case "xml" :
			default :
				this._caseSensitive = true;
				this._keywords = "!DOCTYPE,?xml,script,version,encoding"
						.split(",");
				this._commonObjects = [""];
				this._tags = [""];
				this._wordDelimiters = "　 ,.;:\\/<>(){}[]\"'\r\n\t=+-|*%@#$^&";
				this._quotation = ['"', "'"];
				this._lineComment = "";
				this._escape = "\\";
				this._commentOn = "<!--";
				this._commentOff = "-->";
				this._ignore = "<!--";
				this._dealTag = true;
				break
		}
		this.highlight = function() {
			var h = new Array();
			var j = 0;
			var m = new Array();
			for (var k = 0; k < this._codetxt.length; k++) {
				if (this._wordDelimiters.indexOf(this._codetxt.charAt(k)) == -1) {
					if (!h[j]) {
						h[j] = ""
					}
					h[j] += this._codetxt.charAt(k)
				} else {
					if (h[j]) {
						j++
					}
					h[j++] = this._codetxt.charAt(k)
				}
			}
			var n = false;
			var e = false;
			var o = false;
			var g = 1;
			var l = "";
			var f = false;
			m[m.length] = '<span style=" text-align: right;padding:2px 10px  0;border-right:5px solid #ccc;margin:-2px 10px 0 0;color:#000;">'
					+ g + "." + a(g) + "</span>";
			for (var k = 0; k <= j; k++) {
				if (typeof(h[k]) == "undefined" || h[k].length == 0) {
					continue
				}
				if (h[k] == " ") {
					m[m.length] = ("&nbsp;")
				} else {
					if (!o && !e && !n && this.isKeyword(h[k])) {
						m[m.length] = ("<span style='color:#0000FF;'>" + h[k] + "</span>")
					} else {
						if (!o && !e && !n && this.isCommonObject(h[k])) {
							m[m.length] = ("<span style='color:#808000;'>"
									+ h[k] + "</span>")
						} else {
							if (!o && !e && !n && f && this.isTag(h[k])) {
								m[m.length] = ("<span style='color:#0000FF;'>"
										+ h[k] + "</span>")
							} else {
								if (h[k] == "\n") {
									if (o) {
										m[m.length] = ("</span>");
										o = false
									}
									g++;
									m[m.length] = ('<br/><span style="text-align: right;padding:4px 10px  0;border-right:5px solid #ccc;margin:-5px 10px 0 0;color:#000;">'
											+ g + "." + a(g) + "</span>")
								} else {
									if (this._quotation.contains(h[k]) && !e
											&& !o) {
										if (n) {
											if (l == h[k]) {
												if (f) {
													m[m.length] = (h[k] + "</span><span style='color:#808000;'>")
												} else {
													m[m.length] = (h[k] + "</span>")
												}
												n = false;
												l = ""
											} else {
												m[m.length] = h[k].replace(
														/\</g, "&lt;")
											}
										} else {
											if (f) {
												m[m.length] = ("</span><span style='color:#FF00FF;'>" + h[k])
											} else {
												m[m.length] = ("<span style='color:#FF00FF;'>" + h[k])
											}
											n = true;
											l = h[k]
										}
									} else {
										if (h[k] == this._escape) {
											m[m.length] = (h[k]);
											if (k < j - 1) {
												if (h[k + 1].charCodeAt(0) >= 32
														&& h[k + 1]
																.charCodeAt(0) <= 127) {
													m[m.length] = h[k + 1]
															.substr(0, 1)
															.replace("&",
																	"&amp;")
															.replace(/\</g,
																	"&lt;");
													h[k + 1] = h[k + 1]
															.substr(1)
												}
											}
										} else {
											if (h[k] == "\t") {
												m[m.length] = ("&nbsp;&nbsp;&nbsp;&nbsp;")
											} else {
												if (this.isStartWith(
														this._commentOn, h, k)
														&& !o && !e && !n) {
													e = true;
													m[m.length] = ("<span style='color:#008000;'>" + this._commentOn
															.replace(/\</g,
																	"&lt;"));
													k = k
															+ this._commentOn.length
															- 1
												} else {
													if (this.isStartWith(
															this._lineComment,
															h, k)
															&& !o && !e && !n) {
														o = true;
														m[m.length] = ("<span style='color:#008000;'>" + this._lineComment);
														k = k
																+ this._lineComment.length
																- 1
													} else {
														if (this.isStartWith(
																this._ignore,
																h, k)
																&& !o
																&& !e
																&& !n) {
															o = true;
															m[m.length] = ("<span style='color:#008000;'>" + this._ignore
																	.replace(
																			/\</g,
																			"&lt;"));
															k = k
																	+ this._ignore.length
																	- 1
														} else {
															if (this
																	.isStartWith(
																			this._commentOff,
																			h,
																			k)
																	&& !n && !o) {
																if (e) {
																	e = false;
																	m[m.length] = (this._commentOff + "</span>");
																	k = k
																			+ this._commentOff.length
																			- 1
																}
															} else {
																if (this._dealTag
																		&& !o
																		&& !e
																		&& !n
																		&& h[k] == "<") {
																	m[m.length] = "&lt;<span style='color:#808000;'>";
																	f = true
																} else {
																	if (this._dealTag
																			&& f
																			&& h[k] == ">") {
																		m[m.length] = "</span>&gt;";
																		f = false
																	} else {
																		if (h[k] == "&") {
																			m[m.length] = "&amp;"
																		} else {
																			m[m.length] = h[k]
																					.replace(
																							/</g,
																							"&lt;")
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
			m[m.length] = ("");
			this._codetxt = m.join("")
		};
		this.isStartWith = function(h, g, e) {
			if (h) {
				for (var f = 0; f < h.length; f++) {
					if (this._caseSensitive) {
						if (h.charAt(f) != g[e + f] || (e + f >= g.length)) {
							return false
						}
					} else {
						if (h.charAt(f).toLowerCase() != g[e + f].toLowerCase()
								|| (e + f >= g.length)) {
							return false
						}
					}
				}
				return true
			} else {
				return false
			}
		};
		this.isKeyword = function(e) {
			return this._keywords.contains(e, this._caseSensitive)
		};
		this.isCommonObject = function(e) {
			return this._commonObjects.contains(e, this._caseSensitive)
		};
		this.isTag = function(e) {
			return this._tags.contains(e)
		};
		this.transform = function() {
			this._codetxt = this._codetxt.replace(/&nbsp;/ig, " ").replace(
					/<br\/>|<br>/ig, "\n").replace(/<[^>]*>/ig, "").replace(
					/&lt;/ig, "<").replace(/&gt;/ig, ">").replace(/&amp;/ig,
					"&").replace(/([0-9]+\.\s*)/ig, function(f) {
						var e = f.split(".");
						if (e[0] < 10) {
							return e[1].replace(/\s{2}/, "")
						} else {
							if (e[0] < 100) {
								return e[1].replace(/\s{1}/, "")
							} else {
								return e[1]
							}
						}
					})
		}
	}
	baidu.editor.plugins.highlight = function() {
		var d = this, c = baidu.editor.dom.domUtils;
		d.commands.highlightcode = {
			execCommand : function(q, h, k) {
				if (h && k) {
					var j = new b(h, k);
					j.highlight();
					d.execCommand("inserthtml", "<pre _syntax='" + k + "'>"
									+ j._codetxt + "</pre>");
					for (var n = 0, e, m = c.getElementsByTagName(d.document,
							"pre"); e = m[n++];) {
						e.style.overflowX = "auto"
					}
				} else {
					var o = this.selection.getRange(), g = c
							.findParentByTagName(o.startContainer, "pre", true), l = c
							.findParentByTagName(o.endContainer, "pre", true);
					if (g && l && g === l) {
						if (c.isBody(g.parentNode)) {
							var f = d.document.createElement("p");
							f.innerHTML = baidu.editor.browser.ie
									? ""
									: "<br/>";
							d.body.insertBefore(f, g);
							o.setStart(f, 0)
						} else {
							o.setStartBefore(g)
						}
						o.setCursor();
						c.remove(g)
					}
				}
			},
			queryCommandState : function() {
				var f = this.selection.getRange(), g = c.findParentByTagName(
						f.startContainer, "pre", true), e = c
						.findParentByTagName(f.endContainer, "pre", true);
				return g && e && g === e ? 0 : -1
			}
		};
		d.addListener("beforegetcontent", function() {
			for (var f = 0, h, g = c.getElementsByTagName(d.document, "pre"); h = g[f++];) {
				var e = new b(h.innerHTML.replace(/\r\n/ig, ""));
				e.transform();
				h.innerHTML = "";
				h.appendChild(d.document.createTextNode(e._codetxt))
			}
		});
		d.addListener("aftersetcontent", function() {
			for (var f = 0, h, g = c.getElementsByTagName(d.document, "pre"); h = g[f++];) {
				var e = new b(h.innerHTML, h.getAttribute("_syntax"));
				e.transform();
				e.highlight();
				h.innerHTML = e._codetxt;
				h.style.overflowX = "auto"
			}
		})
	}
})();
(function() {
	baidu.editor.plugins.serialize = function() {
		var e = this;
		var p = baidu.editor.dom.dtd;
		var h = p.$empty;
		var v = baidu.editor.browser;
		var o = function() {
			var A = /<(?:(?:\/([^>]+)>[ \t\r\n]*)|(?:!--([\S|\s]*?)-->)|(?:([^\s\/>]+)\s*((?:(?:"[^"]*")|(?:'[^']*')|[^"'<>])*)\/?>[ \t\r\n]*))/g;
			var y = /([\w\-:.]+)(?:(?:\s*=\s*(?:(?:"([^"]*)")|(?:'([^']*)')|([^\s>]+)))|(?=\s|$))/g;
			var B = {
				checked : 1,
				compact : 1,
				declare : 1,
				defer : 1,
				disabled : 1,
				ismap : 1,
				multiple : 1,
				nohref : 1,
				noresize : 1,
				noshade : 1,
				nowrap : 1,
				readonly : 1,
				selected : 1
			};
			var E = {
				script : 1,
				style : 1
			};
			var z = {
				li : {
					"$" : "ul",
					ul : 1,
					ol : 1
				},
				dd : {
					"$" : "dl",
					dl : 1
				},
				dt : {
					"$" : "dl",
					dl : 1
				},
				option : {
					"$" : "select",
					select : 1
				},
				td : {
					"$" : "tr",
					tr : 1
				},
				tr : {
					"$" : "tbody",
					tbody : 1,
					thead : 1,
					tfoot : 1,
					table : 1
				},
				tbody : {
					"$" : "table",
					table : 1,
					colgroup : 1
				},
				thead : {
					"$" : "table",
					table : 1
				},
				tfoot : {
					"$" : "table",
					table : 1
				},
				col : {
					"$" : "colgroup",
					colgroup : 1
				}
			};
			var C = {
				table : "td",
				tbody : "td",
				thead : "td",
				tfoot : "td",
				tr : "td",
				colgroup : "col",
				ul : "li",
				ol : "li",
				dl : "dd",
				select : "option"
			};
			function D(I, M) {
				var J, K = 0, G, R;
				A.exec("");
				while ((J = A.exec(I))) {
					var P = J.index;
					if (P > K) {
						var S = I.slice(K, P);
						if (R) {
							R.push(S)
						} else {
							M.onText(S)
						}
					}
					K = A.lastIndex;
					if ((G = J[1])) {
						G = G.toLowerCase();
						if (R && G == R._tag_name) {
							M.onCDATA(R.join(""));
							R = null
						}
						if (!R) {
							M.onTagClose(G);
							continue
						}
					}
					if (R) {
						R.push(J[0]);
						continue
					}
					if ((G = J[3])) {
						if (/="/.test(G)) {
							continue
						}
						G = G.toLowerCase();
						var Q = J[4], F, H = {}, O = Q && Q.slice(-1) == "/";
						if (Q) {
							y.exec("");
							while ((F = y.exec(Q))) {
								var N = F[1].toLowerCase(), L = F[2] || F[3]
										|| F[4] || "";
								if (!L && B[N]) {
									L = N
								}
								if (N == "style") {
									if (v.ie && v.version <= 6) {
										L = L.replace(/(?!;)\s*([\w-]+):/g,
												function(T, U) {
													return U.toLowerCase()
															+ ":"
												})
									}
								}
								H[N] = L
							}
						}
						M.onTagOpen(G, H, O);
						if (!R && E[G]) {
							R = [];
							R._tag_name = G
						}
						continue
					}
					if ((G = J[2])) {
						M.onComment(G)
					}
				}
				if (I.length > K) {
					M.onText(I.slice(K, I.length))
				}
			}
			return function(I, J) {
				var G = {
					type : "fragment",
					parent : null,
					children : []
				};
				var H = G;
				function L(M) {
					M.parent = H;
					H.children.push(M)
				}
				function K(N, M) {
					var O = N;
					if (z[O.tag]) {
						while (z[H.tag] && z[H.tag][O.tag]) {
							H = H.parent
						}
						if (H.tag == O.tag) {
							H = H.parent
						}
						while (z[O.tag]) {
							if (z[O.tag][H.tag]) {
								break
							}
							O = O.parent = {
								type : "element",
								tag : z[O.tag]["$"],
								attributes : {},
								children : [O]
							}
						}
					}
					if (J) {
						while (p[O.tag]
								&& !(H.tag == "span" ? baidu.editor.utils
										.extend(p.strong, {
													a : 1,
													A : 1
												}) : (p[H.tag] || p.div))[O.tag]) {
							if (F(H)) {
								continue
							}
							if (!H.parent) {
								break
							}
							H = H.parent
						}
					}
					O.parent = H;
					H.children.push(O);
					if (M) {
						H = N
					}
					return N
				}
				function F(M) {
					var N;
					if (!M.children.length && (N = C[M.tag])) {
						K({
									type : "element",
									tag : N,
									attributes : {},
									children : []
								}, true);
						return true
					}
					return false
				}
				D(I, {
							onText : function(M) {
								while (!(p[H.tag] || p.div)["#"]) {
									if (F(H)) {
										continue
									}
									H = H.parent
								}
								if (/[^ \t\r\n]/.test(M)) {
									L({
												type : "text",
												data : M
											})
								}
							},
							onComment : function(M) {
								L({
											type : "comment",
											data : M
										})
							},
							onCDATA : function(M) {
								while (!(p[H.tag] || p.div)["#"]) {
									if (F(H)) {
										continue
									}
									H = H.parent
								}
								L({
											type : "cdata",
											data : M
										})
							},
							onTagOpen : function(M, O, N) {
								N = N || h[M];
								K({
											type : "element",
											tag : M,
											attributes : O,
											closed : N,
											children : []
										}, !N)
							},
							onTagClose : function(M) {
								var N = H;
								while (N && M != N.tag) {
									N = N.parent
								}
								if (N) {
									for (var O = H; O !== N.parent; O = O.parent) {
										F(O)
									}
									if (!N.children.length
											&& p.$removeEmpty[N.tag]) {
										N.parent.children.pop()
									}
									H = N.parent
								} else {
									if (!p.$removeEmpty[M]) {
										N = {
											type : "element",
											tag : M,
											attributes : {},
											children : []
										};
										K(N, true);
										F(N);
										H = N.parent
									}
								}
							}
						});
				while (H !== G) {
					F(H);
					H = H.parent
				}
				return G
			}
		}();
		var l = function() {
			var z = {
				"<" : "&lt;",
				">" : "&gt;",
				'"' : "&quot;",
				"'" : "&#39;"
			};
			function y(A) {
				return z[A]
			}
			return function(A) {
				A = A + "";
				return A ? A.replace(/[<>"']/g, y) : ""
			}
		}();
		var n = function() {
			function z(F) {
				var E = F.children;
				var G = [];
				for (var D = 0, C; C = E[D]; D++) {
					G.push(n(C))
				}
				return G.join("")
			}
			function A(D) {
				var E = [];
				for (var C in D) {
					E.push(C + '="' + l(D[C]) + '"')
				}
				return E.join(" ")
			}
			function y(C) {
				return l(C.data)
			}
			function B(F) {
				var C = F.tag;
				var D = A(F.attributes);
				var E = "<" + C + (D ? " " + D : "") + (h[C] ? " />" : ">");
				if (!h[C]) {
					E += z(F);
					E += "</" + C + ">"
				}
				return E
			}
			return function(C) {
				if (C.type == "fragment") {
					return z(C)
				} else {
					if (C.type == "element") {
						return B(C)
					} else {
						if (C.type == "text" || C.type == "cdata") {
							return y(C)
						} else {
							if (C.type == "comment") {
								return "<!--" + C.data + "-->"
							}
						}
					}
				}
				return ""
			}
		}();
		var j = function() {
			function z(C) {
				var B = new RegExp(/(class="?Mso|style="[^"]*\bmso\-|w:WordDocument)/ig);
				return B.test(C)
			}
			function A(B) {
				B = B.replace(/([\d.]+)([\w]+)?/g, function(C, E, D) {
							return (Math.round(parseFloat(E)) || 1)
									+ (D || "px")
						});
				return B
			}
			function y(B) {
				B = B.replace(/<!--\s*EndFragment\s*-->[\s\S]*$/, "");
				B = B.replace(/\r\n|\n|\r/ig, "");
				B = B.replace(/^\s*(&nbsp;)+/ig, "");
				B = B.replace(/(&nbsp;|<br[^>]*>)+\s*$/ig, "");
				B = B.replace(/<!--[\s\S]*?-->/ig, "");
				B = B
						.replace(
								/<(!|script[^>]*>.*?<\/script(?=[>\s])|\/?(\?xml(:\w+)?|xml|meta|link|style|\w+:\w+)(?=[\s\/>]))[^>]*>/gi,
								"");
				B = B.replace(/<p [^>]*class="?MsoHeading"?[^>]*>(.*?)<\/p>/gi,
						"<p><strong>$1</strong></p>");
				B = B.replace(/(lang)\s*=\s*([\'\"]?)[\w-]+\2/ig, "");
				B = B.replace(/(<[a-z][^>]*)\sstyle="([^"]*)"/gi, function(H,
						L, C) {
					var E = [], G = 0, K = C.replace(/^\s+|\s+$/, "").replace(
							/&quot;/gi, "'").split(/;\s*/g);
					for (var G = 0; G < K.length; G++) {
						var J = K[G];
						var D, I, F = J.split(":");
						if (F.length == 2) {
							D = F[0].toLowerCase();
							I = F[1].toLowerCase();
							switch (D) {
								case "mso-padding-alt" :
								case "mso-padding-top-alt" :
								case "mso-padding-right-alt" :
								case "mso-padding-bottom-alt" :
								case "mso-padding-left-alt" :
								case "mso-margin-alt" :
								case "mso-margin-top-alt" :
								case "mso-margin-right-alt" :
								case "mso-margin-bottom-alt" :
								case "mso-margin-left-alt" :
								case "mso-table-layout-alt" :
								case "mso-height" :
								case "mso-width" :
								case "mso-vertical-align-alt" :
									E[G++] = D.replace(/^mso-|-alt$/g, "")
											+ ":" + A(I);
									continue;
								case "horiz-align" :
									E[G++] = "text-align:" + I;
									continue;
								case "vert-align" :
									E[G++] = "vertical-align:" + I;
									continue;
								case "font-color" :
								case "mso-foreground" :
									E[G++] = "color:" + I;
									continue;
								case "mso-background" :
								case "mso-highlight" :
									E[G++] = "background:" + I;
									continue;
								case "mso-default-height" :
									E[G++] = "min-height:" + A(I);
									continue;
								case "mso-default-width" :
									E[G++] = "min-width:" + A(I);
									continue;
								case "mso-padding-between-alt" :
									E[G++] = "border-collapse:separate;border-spacing:"
											+ A(I);
									continue;
								case "text-line-through" :
									if ((I == "single") || (I == "double")) {
										E[G++] = "text-decoration:line-through"
									}
									continue;
								case "mso-zero-height" :
									if (I == "yes") {
										E[G++] = "display:none"
									}
									continue
							}
							if (/^(mso|column|font-emph|lang|layout|line-break|list-image|nav|panose|punct|row|ruby|sep|size|src|tab-|table-border|text-(?:align|decor|indent|trans)|top-bar|version|vnd|word-break)/
									.test(D)) {
								if (!/mso\-list/.test(D)) {
									continue
								}
							}
							E[G] = D + ":" + F[1]
						}
					}
					if (G > 0) {
						return L + ' style="' + E.join(";") + '"'
					} else {
						return L
					}
				});
				B = B.replace(/([ ]+)<\/span>/ig, function(C, D) {
							return new Array(D.length + 1).join("&nbsp;")
									+ "</span>"
						});
				return B
			}
			return function(B) {
				g = null;
				s = "", k = "", q = "";
				if (z(B)) {
					B = y(B)
				}
				return B.replace(/>[ \t\r\n]*</g, "><")
			}
		}();
		var c = {
			text : "#text",
			comment : "#comment",
			cdata : "#cdata-section",
			fragment : "#document-fragment"
		};
		function u(z) {
			var y;
			if (z && z.tag == "p") {
				if (z.attributes["class"] == "MsoListParagraph"
						|| /mso-list/.test(z.attributes.style)) {
					y = 1
				} else {
					var A = z.children[0];
					if (A && A.tag == "span"
							&& /Wingdings/i.test(A.attributes.style)) {
						y = 1
					}
				}
			}
			return y
		}
		var g, d = {
			decimal : /\d+/,
			"lower-roman" : /^m{0,4}(cm|cd|d?c{0,3})(xc|xl|l?x{0,3})(ix|iv|v?i{0,3})$/,
			"upper-roman" : /^M{0,4}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/,
			"lower-alpha" : /^\(?[a-z]+\)?$/,
			"upper-alpha" : /^\(?[A-Z]+\)?$/
		}, i = {
			disc : /^[l\u00B7\u2002]/,
			circle : /^[\u006F\u00D8]/,
			square : /^[\u006E\u25C6]/
		}, s = "", k = "", q, t, x, w;
		function f(D) {
			if (D.type == "element" && !D.children.length
					&& p.$removeEmpty[D.tag] && D.tag != "a") {
				return {
					type : "fragment",
					children : []
				}
			}
			var G = [0, 10, 12, 16, 18, 24, 32, 48], F, H = baidu.editor.utils.indexOf;
			switch (D.tag) {
				case "li" :
					var B = D.children[0];
					if (!B || B.type != "element" || B.tag != "p") {
						var J = {
							type : "element",
							tag : "p",
							attributes : {},
							children : D.children
						};
						D.children = [J]
					}
					break;
				case "table" :
				case "td" :
					a(D);
					break;
				case "a" :
					if (D.attributes.anchorname) {
						D.tag = "img";
						D.attributes = {
							"class" : "anchorclass",
							anchorname : D.attributes.name
						};
						D.closed = 1
					}
					break;
				case "b" :
					D.tag = D.name = "strong";
					break;
				case "i" :
					D.tag = D.name = "em";
					break;
				case "u" :
					D.tag = D.name = "span";
					D.attributes.style = (D.attributes.style || "")
							+ ";text-decoration:underline;";
					break;
				case "s" :
				case "del" :
					D.tag = D.name = "span";
					D.attributes.style = (D.attributes.style || "")
							+ ";text-decoration:line-through;";
					if (D.children.length == 1) {
						B = D.children[0];
						if (B.tag == D.tag) {
							D.attributes.style += ";" + B.attributes.style;
							D.children = B.children
						}
					}
					break;
				case "span" :
					if (/mso-list/.test(D.attributes.style)) {
						if (q != "end") {
							var K = D.children[0], A;
							while (K.type == "element") {
								K = K.children[0]
							}
							for (A in i) {
								if (i[A].test(K.data)) {
									s = "ul";
									k = A;
									break
								}
							}
							if (!s) {
								for (A in d) {
									if (d[A].test(K.data.replace(/\.$/, ""))) {
										s = "ol";
										k = A;
										break
									}
								}
							}
							if (q) {
								if (K.data == q) {
									if (s != "ul") {
										k = ""
									}
									s = "ul"
								} else {
									if (s != "ol") {
										k = ""
									}
									s = "ol"
								}
								q = "end"
							} else {
								q = K.data
							}
							if (s) {
								var C = D;
								while (C.tag != "ul" && C.tag != "ol") {
									C = C.parent
								}
								C.tag = s;
								C.attributes.style = "list-style-type:" + k
							}
						}
						D = {
							type : "fragment",
							children : []
						};
						break
					}
					var z = D.attributes.style;
					if (z) {
						z = z.replace(/background(?!-)/g, "background-color");
						z = z
								.match(/(?:\b(?:color|font-size|background-color|font-size|font-family|text-decoration)\b\s*:\s*(&[^;]+;|[^;])+(?=;)?)/gi);
						if (z) {
							D.attributes.style = z.join(";");
							if (!D.attributes.style) {
								delete D.attributes.style
							}
						}
					}
					break;
				case "font" :
					D.tag = D.name = "span";
					F = D.attributes;
					D.attributes = {
						style : (F.size ? "font-size:" + (G[F.size] || 12)
								+ "px" : "")
								+ ";"
								+ (F.color ? "color:" + F.color : "")
								+ ";"
								+ (F.face ? "font-family:" + F.face : "")
								+ ";" + (F.style || "")
					};
					while (D.parent.tag == D.tag
							&& D.parent.children.length == 1) {
						D.attributes.style
								&& (D.parent.attributes.style
										? (D.parent.attributes.style += ";"
												+ D.attributes.style)
										: (D.parent.attributes.style = D.attributes.style));
						D.parent.children = D.children;
						D = D.parent
					}
					break;
				case "p" :
					if (D.attributes.align) {
						D.attributes.style = (D.attributes.style || "")
								+ ";text-align:" + D.attributes.align + ";";
						delete D.attributes.align
					}
					if (u(D)) {
						if (!g) {
							var y = {
								type : "element",
								tag : "ul",
								attributes : {},
								children : []
							}, E = H(D.parent.children, D);
							D.parent.children[E] = y;
							y.parent = D.parent;
							y.children[0] = D;
							D.parent = y;
							while (1) {
								D = y.parent.children[E + 1];
								if (u(D)) {
									y.children[y.children.length] = D;
									D.parent = y;
									y.parent.children.splice(E + 1, 1)
								} else {
									break
								}
							}
							return y
						}
						D.tag = D.name = "li";
						var I = D.children[0];
						while (I && I.type == "element") {
							I = I.children[0]
						}
						I.parent.attributes.style = (I.parent.attributes.style || "")
								+ "mso-list:10";
						delete D.attributes["class"];
						delete D.attributes.style;
						var J = {
							type : "element",
							tag : "p",
							attributes : {},
							children : D.children
						};
						D.children = [J]
					}
			}
			return D
		}
		function a(z) {
			if (v.ie && z.attributes.style) {
				var y = z.attributes.style.match(/border[^:]*:([^;]*)/i);
				if (y) {
					y = y[1];
					if (y) {
						z.attributes.style = z.attributes.style.replace(
								/border[^;]*?(;|$)/ig, "").replace(/^\s*|\s*$/,
								"");
						if (!/^\s*#\w+\s*$/.test(y)) {
							z.attributes.style = (/;$/.test(z.attributes.style)
									|| z.attributes.style.length == 0
									? ""
									: ";")
									+ "border:" + y
						}
					}
				}
				z.attributes.style = z.attributes.style
						.replace(/^\s*|\s*$/, "")
			}
		}
		function m(y) {
			if (y.type == "text") {
				y.data = y.data.replace(/ /g, "&nbsp;")
			}
			switch (y.tag) {
				case "table" :
					!y.attributes.style && delete y.attributes.style;
					if (v.ie && y.attributes.style) {
						a(y)
					}
					break;
				case "td" :
					if (/display\s*:\s*none/i.test(y.attributes.style)) {
						return {
							type : "fragment",
							children : []
						}
					}
					if (v.ie && !y.children.length) {
						var z = {
							type : "text",
							data : "&nbsp;",
							parent : y
						};
						y.children[0] = z
					}
					if (v.ie && y.attributes.style) {
						a(y)
					}
					break;
				case "img" :
					if (y.attributes.anchorname) {
						y.tag = "a";
						y.attributes = {
							name : y.attributes.anchorname,
							anchorname : 1
						};
						y.closed = null
					}
			}
			return y
		}
		function b(E, D, y) {
			if (!E.children || !E.children.length) {
				return E
			}
			var C = E.children;
			for (var B = 0; B < C.length; B++) {
				var A = D(C[B], y);
				if (A.type == "fragment") {
					var z = [B, 1];
					z.push.apply(z, A.children);
					C.splice.apply(C, z);
					if (!C.length) {
						E = {
							type : "fragment",
							children : []
						}
					}
					B--
				} else {
					C[B] = A
				}
			}
			return E
		}
		function r(y) {
			this.rules = y
		}
		r.prototype = {
			rules : null,
			filter : function(A, D, C) {
				D = D || this.rules;
				var z = D && D.whiteList;
				var y = D && D.blackList;
				function B(I, H) {
					I.name = I.type == "element" ? I.tag : c[I.type];
					if (H == null) {
						return b(I, B, I)
					}
					if (y && y[I.name]) {
						C && (C.flag = 1);
						return {
							type : "fragment",
							children : []
						}
					}
					if (z) {
						if (I.type == "element") {
							if (H.type == "fragment" ? z[I.name] : z[I.name]
									&& z[H.name][I.name]) {
								var G;
								if ((G = z[I.name].$)) {
									var J = I.attributes;
									var F = {};
									for (var E in G) {
										if (J[E]) {
											F[E] = J[E]
										}
									}
									I.attributes = F
								}
							} else {
								C && (C.flag = 1);
								I.type = "fragment";
								I.name = H.name
							}
						} else {
						}
					}
					if (y || z) {
						b(I, B, I)
					}
					return I
				}
				return B(A, null)
			},
			transformInput : function(y, A) {
				function z(B) {
					B = f(B);
					if (B.tag == "ol" || B.tag == "ul") {
						g = 1
					}
					B = b(B, z, B);
					if (B.tag == "ol" || B.tag == "ul") {
						g = 0;
						s = "", k = "", q = ""
					}
					if (B.type == "text"
							&& B.data.replace(/\s/g, "") == e.options.pageBreakTag) {
						B.type = "element";
						B.name = B.tag = "div";
						delete B.data;
						B.attributes = {
							"class" : "pagebreak",
							unselectable : "on",
							style : "moz-user-select:none;-khtml-user-select: none;"
						};
						B.children = []
					}
					return B
				}
				return z(y)
			},
			transformOutput : function(y) {
				function z(A) {
					if (A.tag == "div" && A.attributes["class"] == "pagebreak") {
						delete A.tag;
						A.type = "text";
						A.data = e.options.pageBreakTag;
						delete A.children
					}
					A = m(A);
					if (A.tag == "ol" || A.tag == "ul") {
						g = 1
					}
					A = b(A, z, A);
					if (A.tag == "ol" || A.tag == "ul") {
						g = 0
					}
					return A
				}
				return z(y)
			},
			toHTML : n,
			parseHTML : o,
			word : j
		};
		e.serialize = new r(e.options.serialize);
		baidu.editor.serialize = new r({})
	}
})();
(function() {
	baidu.editor.plugins.video = function() {
		var d = this;
		var c = {};
		var a = [];
		var e = 0;
		function b(i, l, g, k) {
			var h = "edui_faked_video_" + (e++);
			var j = '<img isfakedvideo id="'
					+ h
					+ '" width="'
					+ l
					+ '" height="'
					+ g
					+ '" _url="'
					+ i
					+ '" class="edui-faked-video" src="http://hi.baidu.com/fc/editor/images/spacer.gif" style="background:url(http://hi.baidu.com/ui/neweditor/lib/fck/images/fck_videologo.gif) no-repeat center center; border:1px solid gray;'
					+ k + ';" />';
			c[h] = '<embed isfakedvideo type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" src="'
					+ i
					+ '" width="'
					+ l
					+ '" height="'
					+ g
					+ '" wmode="transparent" play="true" loop="false" menu="false" allowscriptaccess="never"></embed>';
			return j
		}
		d.commands.insertvideo = {
			execCommand : function(l, i) {
				var h = i.url;
				var k = i.width || 320;
				var g = i.height || 240;
				var j = i.style ? i.style : "";
				d.execCommand("inserthtml", b(h, k, g, j))
			}
		};
		function f(j, i) {
			var h = new RegExp(i + ":\\s*((\\w)*)", "ig");
			var g = h.exec(j);
			return g ? g[1] : ""
		}
		d.addListener("beforegetcontent", function() {
					var j = d.document.createElement("div");
					var k = {};
					for (var g in c) {
						var l;
						while ((l = d.document.getElementById(g))) {
							j.innerHTML = c[g];
							var h = j.firstChild;
							h.width = l.width;
							h.height = l.height;
							var i = l.style.cssText;
							if (/float/ig.test(i)) {
								if (!!window.ActiveXObject) {
									h.style.styleFloat = f(i, "float")
								} else {
									h.style.cssFloat = f(i, "float")
								}
							} else {
								if (/display/ig.test(i)) {
									h.style.display = f(i, "display")
								}
							}
							l.parentNode.replaceChild(h, l);
							a.push([l, h]);
							k[g] = c[g]
						}
					}
					c = k
				});
		d.addListener("aftersetcontent", function() {
					var n = d.document.createElement("div");
					c = {};
					var l = d.document.getElementsByTagName("embed");
					var i = [];
					var m = l.length;
					while (m--) {
						i[m] = l[m]
					}
					m = i.length;
					while (m--) {
						var h = i[m].src;
						var j = i[m].width || 320;
						var o = i[m].height || 240;
						var p = i[m].style.cssText;
						var g = f(p, "display")
								? "display:" + f(p, "display")
								: "float:" + f(p, "float");
						n.innerHTML = b(h, j, o, g);
						i[m].parentNode.replaceChild(n.firstChild, i[m])
					}
				});
		d.addListener("aftergetcontent", function() {
					for (var g = 0; g < a.length; g++) {
						var h = a[g];
						h[1].parentNode.replaceChild(h[0], h[1])
					}
					a = []
				})
	}
})();
(function() {
	baidu.editor.plugins.table = function() {
		var d = baidu.editor, r = d.browser, j = d.dom.domUtils, h = j.keys, q = j.clearSelectedArr;
		var a, i, g = j.isEmptyNode;
		function k(t) {
			var u = t.parentNode.cells;
			for (var w = 0, v; v = u[w]; w++) {
				if (v === t) {
					return w
				}
			}
		}
		function o(t) {
			return t.style.display == "none"
		}
		function l(t) {
			var w = 0;
			for (var u = 0, v; v = t[u++];) {
				if (!o(v)) {
					w++
				}
			}
			return w
		}
		var s = this;
		s.currentSelectedArr = [];
		s.addListener("mousedown", n);
		s.addListener("keydown", function(u, t) {
					var v = t.keyCode || t.which;
					if (!h[v] && !t.ctrlKey && !t.metaKey && !t.shiftKey
							&& !t.altKey) {
						q(s.currentSelectedArr)
					}
				});
		s.addListener("mouseup", function(w, u) {
			a = null;
			s.removeListener("mouseover", n);
			var y = s.currentSelectedArr[0];
			if (y) {
				s.document.body.style.webkitUserSelect = "";
				var v = new baidu.editor.dom.Range(s.document);
				if (g(y)) {
					v.setStart(s.currentSelectedArr[0], 0).setCursor()
				} else {
					v.selectNodeContents(s.currentSelectedArr[0]).select()
				}
			} else {
				var v = s.selection.getRange().shrinkBoundary();
				if (!v.collapsed) {
					var x = j.findParentByTagName(v.startContainer, "td", true), t = j
							.findParentByTagName(v.endContainer, "td", true);
					if (x && !t || !x && t || x && t && x !== t) {
						v.collapse(true).select(true)
					}
				}
			}
		});
		function p() {
			s.currentSelectedArr = [];
			a = null
		}
		s.commands.inserttable = {
			queryCommandState : function() {
				var t = this.selection.getRange();
				return j.findParentByTagName(t.startContainer, "table", true)
						|| j.findParentByTagName(t.endContainer, "table", true)
						|| s.currentSelectedArr.length > 0 ? -1 : 0
			},
			execCommand : function(x, w) {
				i = w;
				var t = [];
				t.push("cellpadding='" + (w.cellpadding || 0) + "'");
				t.push("cellspacing='" + (w.cellspacing || 0) + "'");
				w.width ? t.push("width='" + w.width + "'") : t
						.push("width='500'");
				w.height ? t.push("height='" + w.height + "'") : t
						.push("height='100'");
				t.push("borderColor='" + (w.bordercolor || "#000") + "'");
				t.push("border='" + (w.border || 1) + "'");
				var y, z = [], v = w.numRows;
				if (v) {
					while (v--) {
						var A = [];
						var u = w.numCols;
						while (u--) {
							A[u] = "<td width="
									+ Math.floor((w.width || 500) / w.numCols)
									+ " >" + (r.ie ? j.fillChar : "<br/>")
									+ "</td>"
						}
						z.push("<tr "
								+ (w.align
										? "style=text-align:" + w.align + ""
										: "") + ">" + A.join("") + "</tr>")
					}
				}
				y = "<table  "
						+ t.join(" ")
						+ (w.backgroundcolor ? ' style="background-color:'
								+ w.backgroundcolor + ';"' : "") + ">"
						+ z.join("") + "</table>";
				this.execCommand("insertHtml", y);
				p()
			}
		};
		s.commands.edittable = {
			queryCommandState : function() {
				var t = this.selection.getRange();
				return j.findParentByTagName(t.startContainer, "table", true)
						|| s.currentSelectedArr.length > 0 ? 0 : -1
			},
			execCommand : function(u, t) {
				var y = this.selection.getStart();
				var w = j.findParentByTagName(y, "table", true);
				if (w) {
					w.setAttribute("cellpadding", t.cellpadding);
					w.setAttribute("cellspacing", t.cellspacing);
					w.setAttribute("width", t.width);
					w.setAttribute("height", t.height);
					w.setAttribute("border", t.border);
					w.setAttribute("borderColor", t.bordercolor);
					j.setStyle(w, "background-color", t.backgroundcolor);
					for (var v = 0, x; x = w.rows[v++];) {
						j.setStyle(x, "text-align", t.align)
					}
				}
			}
		};
		s.commands.deletetable = {
			queryCommandState : function() {
				var t = this.selection.getRange();
				return (j.findParentByTagName(t.startContainer, "table", true) && j
						.findParentByTagName(t.endContainer, "table", true))
						|| s.currentSelectedArr.length > 0 ? 0 : -1
			},
			execCommand : function() {
				var t = this.selection.getRange(), u = j.findParentByTagName(
						s.currentSelectedArr.length > 0
								? s.currentSelectedArr[0]
								: t.startContainer, "table", true);
				var v = u.ownerDocument.createElement("p");
				v.innerHTML = r.ie ? "&nbsp;" : "<br/>";
				u.parentNode.insertBefore(v, u);
				j.remove(u);
				t.setStart(v, 0).setCursor();
				j.remove(u);
				p()
			}
		};
		s.commands.addcaption = {
			queryCommandState : function() {
				var t = this.selection.getRange();
				return (j.findParentByTagName(t.startContainer, "table", true) && j
						.findParentByTagName(t.endContainer, "table", true))
						|| s.currentSelectedArr.length > 0 ? 0 : -1
			},
			execCommand : function(u, v) {
				var t = this.selection.getRange(), w = j.findParentByTagName(
						s.currentSelectedArr.length > 0
								? s.currentSelectedArr[0]
								: t.startContainer, "table", true);
				if (v == "on") {
					var x = w.createCaption();
					x.innerHTML = "请在此输入表格标题"
				} else {
					w.removeChild(w.caption)
				}
			}
		};
		s.commands.mergeright = {
			queryCommandState : function() {
				var t = this.selection.getRange(), y = t.startContainer, x = j
						.findParentByTagName(y, ["td", "th"], true);
				if (!x || this.currentSelectedArr.length > 1) {
					return -1
				}
				var w = x.parentNode;
				var u = k(x) + x.colSpan;
				if (u >= w.cells.length) {
					return -1
				}
				var v = w.cells[u];
				if (o(v)) {
					return -1
				}
				return x.rowSpan == v.rowSpan ? 0 : -1
			},
			execCommand : function() {
				var z = this.selection.getRange(), t = z.startContainer, u = j
						.findParentByTagName(t, ["td", "th"], true)
						|| s.currentSelectedArr[0], A = u.parentNode, D = A.parentNode.parentNode.rows;
				var w = A.rowIndex, C = k(u) + u.colSpan, y = D[w].cells[C];
				for (var x = w; x < w + y.rowSpan; x++) {
					for (var v = C; v < C + y.colSpan; v++) {
						var B = D[x].cells[v];
						B.setAttribute("rootRowIndex", A.rowIndex);
						B.setAttribute("rootCellIndex", k(u))
					}
				}
				u.colSpan += y.colSpan || 1;
				b(u, y);
				y.style.display = "none";
				z.setStart(u, 0).setCursor(true, true)
			}
		};
		s.commands.mergedown = {
			queryCommandState : function() {
				var u = this.selection.getRange(), A = u.startContainer, z = j
						.findParentByTagName(A, "td", true);
				if (!z || l(s.currentSelectedArr) > 1) {
					return -1
				}
				var y = z.parentNode, w = y.parentNode.parentNode, x = w.rows;
				var v = y.rowIndex + z.rowSpan;
				if (v >= x.length) {
					return -1
				}
				var t = x[v].cells[k(z)];
				if (o(t)) {
					return -1
				}
				return z.colSpan == t.colSpan ? 0 : -1
			},
			execCommand : function() {
				var z = this.selection.getRange(), t = z.startContainer, v = j
						.findParentByTagName(t, ["td", "th"], true)
						|| s.currentSelectedArr[0];
				var B = v.parentNode, D = B.parentNode.parentNode.rows;
				var u = B.rowIndex + v.rowSpan, A = k(v), x = D[u].cells[A];
				for (var y = u; y < u + x.rowSpan; y++) {
					for (var w = A; w < A + x.colSpan; w++) {
						var C = D[y].cells[w];
						C.setAttribute("rootRowIndex", B.rowIndex);
						C.setAttribute("rootCellIndex", k(v))
					}
				}
				v.rowSpan += x.rowSpan || 1;
				b(v, x);
				x.style.display = "none";
				z.setStart(v, 0).setCursor()
			}
		};
		s.commands.deleterow = {
			queryCommandState : function() {
				var t = this.selection.getRange(), v = t.startContainer, u = j
						.findParentByTagName(v, ["td", "th"], true);
				if (!u && s.currentSelectedArr.length == 0) {
					return -1
				}
			},
			execCommand : function() {
				var E = this.selection.getRange(), x = E.startContainer, z = j
						.findParentByTagName(x, ["td", "th"], true), t, K, w, B, C, A;
				if (z && s.currentSelectedArr.length == 0) {
					var y = (z.rowSpan || 1) - 1;
					s.currentSelectedArr.push(z);
					t = z.parentNode, K = t.parentNode.parentNode;
					B = K.rows, C = t.rowIndex + 1, A = k(z);
					while (y) {
						s.currentSelectedArr.push(B[C].cells[A]);
						y--;
						C++
					}
				}
				while (z = s.currentSelectedArr.pop()) {
					if (!j.findParentByTagName(z, "table")) {
						continue
					}
					t = z.parentNode, K = t.parentNode.parentNode;
					w = t.cells, B = K.rows, C = t.rowIndex, A = k(z);
					for (var D = 0; D < w.length;) {
						var v = w[D];
						if (o(v)) {
							var u = B[v.getAttribute("rootRowIndex")].cells[v
									.getAttribute("rootCellIndex")];
							u.rowSpan--;
							D += u.colSpan
						} else {
							if (v.rowSpan == 1) {
								D += v.colSpan
							} else {
								var I = B[C + 1].cells[D];
								I.style.display = "";
								I.rowSpan = v.rowSpan - 1;
								I.colSpan = v.colSpan;
								D += v.colSpan
							}
						}
					}
					j.remove(t);
					var L, G, J;
					if (C == B.length) {
						if (C == 0) {
							var F = K.ownerDocument.createElement("p");
							F.innerHTML = r.ie ? "&nbsp;" : "<br/>";
							K.parentNode.insertBefore(F, K);
							j.remove(K);
							E.setStart(F, 0).setCursor();
							return
						}
						var H = C - 1;
						L = B[H].cells[A];
						G = o(L) ? B[L.getAttribute("rootRowIndex")].cells[L
								.getAttribute("rootCellIndex")] : L
					} else {
						J = B[C].cells[A];
						G = o(J) ? B[J.getAttribute("rootRowIndex")].cells[J
								.getAttribute("rootCellIndex")] : J
					}
				}
				E.setStart(G, 0).setCursor();
				e(K)
			}
		};
		s.commands.deletecol = {
			queryCommandState : function() {
				var t = this.selection.getRange(), v = t.startContainer, u = j
						.findParentByTagName(v, ["td", "th"], true);
				if (!u && s.currentSelectedArr.length == 0) {
					return -1
				}
			},
			execCommand : function() {
				var F = this.selection.getRange(), x = F.startContainer, A = j
						.findParentByTagName(x, ["td", "th"], true);
				if (A && s.currentSelectedArr.length == 0) {
					var z = (A.colSpan || 1) - 1;
					s.currentSelectedArr.push(A);
					while (z) {
						do {
							A = A.nextSibling
						} while (A.nodeType == 3);
						s.currentSelectedArr.push(A);
						z--
					}
				}
				while (A = s.currentSelectedArr.pop()) {
					if (!j.findParentByTagName(A, "table")) {
						continue
					}
					var t = A.parentNode, K = t.parentNode.parentNode, C = k(A), D = K.rows, v = t.cells, E = t.rowIndex;
					var w;
					for (var P = 0; P < D.length;) {
						var u = D[P].cells[C];
						if (o(u)) {
							var L = D[u.getAttribute("rootRowIndex")].cells[u
									.getAttribute("rootCellIndex")];
							w = L.rowSpan;
							for (var J = 0; J < L.rowSpan; J++) {
								var N = D[P + J].cells[C];
								j.remove(N)
							}
							L.colSpan--;
							P += w
						} else {
							if (u.colSpan == 1) {
								w = u.rowSpan;
								for (var J = P, I = P + u.rowSpan; J < I; J++) {
									j.remove(D[J].cells[C])
								}
								P += w
							} else {
								var y = D[P].cells[C + 1];
								y.style.display = "";
								y.rowSpan = u.rowSpan;
								y.colSpan = u.colSpan - 1;
								P += u.rowSpan;
								j.remove(u)
							}
						}
					}
					var O, H, M;
					if (C == v.length) {
						if (C == 0) {
							var G = K.ownerDocument.createElement("p");
							G.innerHTML = r.ie ? "&nbsp;" : "<br/>";
							K.parentNode.insertBefore(G, K);
							j.remove(K);
							F.setStart(G, 0).setCursor();
							return
						}
						var B = C - 1;
						O = D[E].cells[B];
						H = o(O) ? D[O.getAttribute("rootRowIndex")].cells[O
								.getAttribute("rootCellIndex")] : O
					} else {
						M = D[E].cells[C];
						H = o(M) ? D[M.getAttribute("rootRowIndex")].cells[M
								.getAttribute("rootCellIndex")] : M
					}
				}
				F.setStart(H, 0).setCursor();
				e(K)
			}
		};
		s.commands.splittocells = {
			queryCommandState : function() {
				var t = this.selection.getRange(), v = t.startContainer, u = j
						.findParentByTagName(v, ["td", "th"], true);
				return u
						&& (u.rowSpan > 1 || u.colSpan > 1)
						&& (!s.currentSelectedArr.length || l(s.currentSelectedArr) == 1)
						? 0
						: -1
			},
			execCommand : function() {
				var x = this.selection.getRange(), t = x.startContainer, u = j
						.findParentByTagName(t, ["td", "th"], true), z = u.parentNode, E = z.parentNode.parentNode;
				var C = z.rowIndex, B = k(u), A = u.rowSpan, y = u.colSpan;
				for (var w = 0; w < A; w++) {
					for (var v = 0; v < y; v++) {
						var D = E.rows[C + w].cells[B + v];
						D.rowSpan = 1;
						D.colSpan = 1;
						if (o(D)) {
							D.style.display = "";
							D.innerHTML = r.ie ? "" : "<br/>"
						}
					}
				}
			}
		};
		s.commands.splittorows = {
			queryCommandState : function() {
				var t = this.selection.getRange(), v = t.startContainer, u = j
						.findParentByTagName(v, "td", true)
						|| s.currentSelectedArr[0];
				return u
						&& (u.rowSpan > 1)
						&& (!s.currentSelectedArr.length || l(s.currentSelectedArr) == 1)
						? 0
						: -1
			},
			execCommand : function() {
				var x = this.selection.getRange(), t = x.startContainer, u = j
						.findParentByTagName(t, "td", true)
						|| s.currentSelectedArr[0], z = u.parentNode, F = z.parentNode.parentNode.rows;
				var C = z.rowIndex, B = k(u), A = u.rowSpan, y = u.colSpan;
				for (var w = 0; w < A; w++) {
					var E = F[C + w], D = E.cells[B];
					D.rowSpan = 1;
					D.colSpan = y;
					if (o(D)) {
						D.style.display = "";
						D.innerHTML = r.ie ? "" : "<br/>"
					}
					for (var v = B + 1; v < B + y; v++) {
						D = E.cells[v];
						D.setAttribute("rootRowIndex", C + w)
					}
				}
				q(s.currentSelectedArr);
				this.selection.getRange().setStart(u, 0).setCursor()
			}
		};
		s.commands.insertparagraphbeforetable = {
			queryCommandState : function() {
				var t = this.selection.getRange(), v = t.startContainer, u = j
						.findParentByTagName(v, "td", true)
						|| s.currentSelectedArr[0];
				return u && j.findParentByTagName(u, "table") ? 0 : -1
			},
			execCommand : function() {
				var t = this.selection.getRange(), v = t.startContainer, u = j
						.findParentByTagName(v, "table", true);
				v = s.document.createElement(s.options.enterTag);
				u.parentNode.insertBefore(v, u);
				q(s.currentSelectedArr);
				if (v.tagName == "P") {
					v.innerHTML = r.ie ? "" : "<br/>";
					t.setStart(v, 0)
				} else {
					t.setStartBefore(v)
				}
				t.setCursor()
			}
		};
		s.commands.splittocols = {
			queryCommandState : function() {
				var t = this.selection.getRange(), v = t.startContainer, u = j
						.findParentByTagName(v, ["td", "th"], true)
						|| s.currentSelectedArr[0];
				return u
						&& (u.colSpan > 1)
						&& (!s.currentSelectedArr.length || l(s.currentSelectedArr) == 1)
						? 0
						: -1
			},
			execCommand : function() {
				var x = this.selection.getRange(), t = x.startContainer, u = j
						.findParentByTagName(t, ["td", "th"], true)
						|| s.currentSelectedArr[0], z = u.parentNode, F = z.parentNode.parentNode.rows;
				var C = z.rowIndex, B = k(u), A = u.rowSpan, y = u.colSpan;
				for (var w = 0; w < y; w++) {
					var E = F[C].cells[B + w];
					E.rowSpan = A;
					E.colSpan = 1;
					if (o(E)) {
						E.style.display = "";
						E.innerHTML = r.ie ? "" : "<br/>"
					}
					for (var v = C + 1; v < C + A; v++) {
						var D = F[v].cells[B + w];
						D.setAttribute("rootCellIndex", B + w)
					}
				}
				q(s.currentSelectedArr);
				this.selection.getRange().setStart(u, 0).setCursor()
			}
		};
		s.commands.insertrow = {
			queryCommandState : function() {
				var t = this.selection.getRange();
				return j.findParentByTagName(t.startContainer, "table", true)
						|| j.findParentByTagName(t.endContainer, "table", true)
						|| s.currentSelectedArr.length != 0 ? 0 : -1
			},
			execCommand : function() {
				var y = this.selection.getRange(), t = y.startContainer, A = j
						.findParentByTagName(t, "tr", true)
						|| s.currentSelectedArr[0].parentNode, D = A.parentNode.parentNode, G = D.rows;
				var B = A.rowIndex, E = G[B].cells;
				var F = D.insertRow(B);
				var w;
				for (var z = 0; z < E.length;) {
					var C = E[z];
					if (o(C)) {
						var x = G[C.getAttribute("rootRowIndex")].cells[C
								.getAttribute("rootCellIndex")];
						x.rowSpan++;
						for (var v = 0; v < x.colSpan; v++) {
							w = C.cloneNode(false);
							w.rowSpan = w.colSpan = 1;
							w.innerHTML = r.ie ? "" : "<br/>";
							w.className = "";
							if (F.children[z + v]) {
								F.insertBefore(w, F.children[z + v])
							} else {
								F.appendChild(w)
							}
							w.style.display = "none"
						}
						z += x.colSpan
					} else {
						for (var u = 0; u < C.colSpan; u++) {
							w = C.cloneNode(false);
							w.rowSpan = w.colSpan = 1;
							w.innerHTML = r.ie ? "" : "<br/>";
							w.className = "";
							if (F.children[z + u]) {
								F.insertBefore(w, F.children[z + u])
							} else {
								F.appendChild(w)
							}
						}
						z += C.colSpan
					}
				}
				e(D);
				y.setStart(F.cells[0], 0).setCursor();
				q(s.currentSelectedArr)
			}
		};
		s.commands.insertcol = {
			queryCommandState : function() {
				var t = this.selection.getRange();
				return j.findParentByTagName(t.startContainer, "table", true)
						|| j.findParentByTagName(t.endContainer, "table", true)
						|| s.currentSelectedArr.length != 0 ? 0 : -1
			},
			execCommand : function() {
				var y = this.selection.getRange(), t = y.startContainer, u = j
						.findParentByTagName(t, ["td", "th"], true)
						|| s.currentSelectedArr[0], E = j.findParentByTagName(
						u, "table"), F = E.rows;
				var A = k(u), x;
				for (var C = 0; C < F.length;) {
					var D = F[C].cells[A], z;
					if (o(D)) {
						var B = F[D.getAttribute("rootRowIndex")].cells[D
								.getAttribute("rootCellIndex")];
						B.colSpan++;
						for (var w = 0; w < B.rowSpan; w++) {
							x = u.cloneNode(false);
							x.rowSpan = x.colSpan = 1;
							x.innerHTML = r.ie ? "" : "<br/>";
							x.className = "";
							z = F[C + w];
							if (z.children[A]) {
								z.insertBefore(x, z.children[A])
							} else {
								z.appendChild(x)
							}
							x.style.display = "none"
						}
						C += B.rowSpan
					} else {
						for (var v = 0; v < D.rowSpan; v++) {
							x = u.cloneNode(false);
							x.rowSpan = x.colSpan = 1;
							x.innerHTML = r.ie ? "" : "<br/>";
							x.className = "";
							z = F[C + v];
							if (z.children[A]) {
								z.insertBefore(x, z.children[A])
							} else {
								z.appendChild(x)
							}
							x.innerHTML = r.ie ? "" : "<br/>"
						}
						C += D.rowSpan
					}
				}
				e(E);
				y.setStart(F[0].cells[A], 0).setCursor();
				q(s.currentSelectedArr)
			}
		};
		s.commands.mergecells = {
			queryCommandState : function() {
				var v = 0;
				for (var t = 0, u; u = this.currentSelectedArr[t++];) {
					if (!o(u)) {
						v++
					}
				}
				return v > 1 ? 0 : -1
			},
			execCommand : function() {
				var u = s.currentSelectedArr[0], x = s.currentSelectedArr[s.currentSelectedArr.length
						- 1], E = j.findParentByTagName(u, "table"), G = E.rows, t = {
					beginRowIndex : u.parentNode.rowIndex,
					beginCellIndex : k(u),
					endRowIndex : x.parentNode.rowIndex,
					endCellIndex : k(x)
				}, D = t.beginRowIndex, w = t.beginCellIndex, v = t.endRowIndex
						- t.beginRowIndex + 1, C = t.endCellIndex
						- t.beginCellIndex + 1, A = G[D].cells[w];
				for (var z = 0, B; (B = G[D + z++]) && z <= v;) {
					for (var y = 0, F; (F = B.cells[w + y++]) && y <= C;) {
						if (z == 1 && y == 1) {
							F.style.display = "";
							F.rowSpan = v;
							F.colSpan = C
						} else {
							F.style.display = "none";
							F.rowSpan = 1;
							F.colSpan = 1;
							F.setAttribute("rootRowIndex", D);
							F.setAttribute("rootCellIndex", w);
							b(A, F)
						}
					}
				}
				this.selection.getRange().setStart(A, 0).setCursor();
				q(s.currentSelectedArr)
			}
		};
		function b(u, t) {
			if (g(t)) {
				return
			}
			if (g(u)) {
				u.innerHTML = t.innerHTML;
				return
			}
			var v = u.lastChild;
			if (v.nodeType != 1 || v.tagName != "BR") {
				u.appendChild(u.ownerDocument.createElement("br"))
			}
			while (v = t.firstChild) {
				u.appendChild(v)
			}
		}
		function f(x, w) {
			var G = x.parentNode, F = w.parentNode, H = G.rowIndex, v = F.rowIndex, D = G.parentNode.parentNode.rows, Q = D.length, u = D[0].cells.length, K = k(x), R = k(w);
			if (x == w) {
				return {
					beginRowIndex : H,
					beginCellIndex : K,
					endRowIndex : H + x.rowSpan - 1,
					endCellIndex : R + x.colSpan - 1
				}
			}
			var M = Math.min(H, v), E = Math.min(K, R), t = Math.max(H
							+ x.rowSpan - 1, v + w.rowSpan - 1), L = Math.max(K
							+ x.colSpan - 1, R + w.colSpan - 1);
			while (1) {
				var J = M, O = E, P = t, A = L;
				if (M > 0) {
					for (B = E; B <= L;) {
						var y = D[M].cells[B];
						if (o(y)) {
							M = y.getAttribute("rootRowIndex");
							y = D[y.getAttribute("rootRowIndex")].cells[y
									.getAttribute("rootCellIndex")]
						}
						B = k(y) + (y.colSpan || 1)
					}
				}
				if (E > 0) {
					for (var C = M; C <= t;) {
						var N = D[C].cells[E];
						if (o(N)) {
							E = N.getAttribute("rootCellIndex");
							N = D[N.getAttribute("rootRowIndex")].cells[N
									.getAttribute("rootCellIndex")]
						}
						C = N.parentNode.rowIndex + (N.rowSpan || 1)
					}
				}
				if (t < Q) {
					for (var B = E; B <= L;) {
						var z = D[t].cells[B];
						if (o(z)) {
							z = D[z.getAttribute("rootRowIndex")].cells[z
									.getAttribute("rootCellIndex")]
						}
						t = z.parentNode.rowIndex + z.rowSpan - 1;
						B = k(z) + (z.colSpan || 1)
					}
				}
				if (L < u) {
					for (C = M; C <= t;) {
						var I = D[C].cells[L];
						if (o(I)) {
							I = D[I.getAttribute("rootRowIndex")].cells[I
									.getAttribute("rootCellIndex")]
						}
						L = k(I) + I.colSpan - 1;
						C = I.parentNode.rowIndex + (I.rowSpan || 1)
					}
				}
				if (O == E && A == L && P == t && J == M) {
					break
				}
			}
			return {
				beginRowIndex : M,
				beginCellIndex : E,
				endRowIndex : t,
				endCellIndex : L
			}
		}
		function n(u, t) {
			if (t.button == 2) {
				return
			}
			s.document.body.style.webkitUserSelect = "";
			a = t.target || t.srcElement;
			q(s.currentSelectedArr);
			j.clearSelectedArr(s.currentSelectedArr);
			if (a.tagName !== "TD") {
				a = j.findParentByTagName(a, "td") || a
			}
			if (a.tagName == "TD") {
				s.addListener("mouseover", function(w, v) {
							var x = v.target || v.srcElement;
							m.call(s, x);
							v.preventDefault
									? v.preventDefault()
									: (v.returnValue = false)
						})
			} else {
				p()
			}
		}
		function m(v) {
			if (a && v.tagName == "TD") {
				s.document.body.style.webkitUserSelect = "none";
				var u = v.parentNode.parentNode.parentNode;
				s.selection.getNative()[r.ie ? "empty" : "removeAllRanges"]();
				var t = f(a, v);
				c(u, t)
			}
		}
		function c(w, v) {
			var x = w.rows;
			q(s.currentSelectedArr);
			for (var u = v.beginRowIndex; u <= v.endRowIndex; u++) {
				for (var t = v.beginCellIndex; t <= v.endCellIndex; t++) {
					var y = x[u].cells[t];
					y.className = s.options.selectedTdClass;
					s.currentSelectedArr.push(y)
				}
			}
		}
		function e(B) {
			var x = B.getElementsByTagName("td"), A, z, C = B.rows;
			for (var v = 0, u; u = x[v++];) {
				if (!o(u)) {
					A = u.parentNode.rowIndex;
					z = k(u);
					for (var t = 0; t < u.rowSpan; t++) {
						var y = t == 0 ? 1 : 0;
						for (; y < u.colSpan; y++) {
							var w = C[A + t].children[z + y];
							w.setAttribute("rootRowIndex", A);
							w.setAttribute("rootCellIndex", z)
						}
					}
				}
			}
		}
		s.adjustTable = function(G) {
			var E = G.getElementsByTagName("table");
			for (var A = 0, v; v = E[A++];) {
				if (v.getAttribute("border") == "0"
						|| !v.getAttribute("border")) {
					v.setAttribute("border", 1)
				}
				if (j.getComputedStyle(v, "border-color") == "#ffffff") {
					v.setAttribute("borderColor", "#000")
				}
				var z = j.getElementsByTagName(v, "td"), x, w;
				for (var y = 0, u; u = z[y++];) {
					var B = k(u), D = u.parentNode.rowIndex, F = j
							.findParentByTagName(u, "table").rows;
					for (var t = 0; t < u.rowSpan; t++) {
						var C = t == 0 ? 1 : 0;
						for (; C < u.colSpan; C++) {
							if (!x) {
								x = u.cloneNode(false);
								x.rowSpan = x.colSpan = 1;
								x.style.display = "none";
								x.innerHTML = r.ie ? "" : "<br/>"
							} else {
								x = x.cloneNode(true)
							}
							x.setAttribute("rootRowIndex",
									u.parentNode.rowIndex);
							x.setAttribute("rootCellIndex", B);
							if (t == 0) {
								if (u.nextSibling) {
									u.parentNode.insertBefore(x, u.nextSibling)
								} else {
									u.parentNode.appendChild(x)
								}
							} else {
								w = F[D + t].children[B];
								if (w) {
									w.parentNode.insertBefore(x, w)
								} else {
									F[D + t].appendChild(x)
								}
							}
						}
					}
				}
			}
		}
	}
})();
(function() {
	var a = baidu.editor.dom.domUtils;
	baidu.editor.plugins.contextmenu = function() {
		var d = this, e, b = d.options.contextMenu;
		var c = baidu.editor.ui.uiUtils;
		d.addListener("contextmenu", function(k, f) {
			var m = c.getViewportOffsetByEvent(f);
			if (e) {
				e.destroy()
			}
			for (var h = 0, j, g = []; j = b[h]; h++) {
				var l;
		(function(p) {
					if (p == "-") {
						if ((l = g[g.length - 1]) && l !== "-") {
							g.push("-")
						}
					} else {
						if (p.group) {
							for (var o = 0, n, i = []; n = p.subMenu[o]; o++) {
		(function				(q) {
									if (q == "-") {
										if ((l = i[i.length - 1]) && l !== "-") {
											i.push("-")
										}
									} else {
										if (d.queryCommandState(q.cmdName) != -1) {
											i.push({
														label : q.label,
														className : "edui-for-"
																+ q.cmdName
																+ (q.value || ""),
														onclick : q.exec
																? function() {
																	q.exec
																			.call(d)
																}
																: function() {
																	d
																			.execCommand(
																					q.cmdName,
																					q.value)
																}
													})
										}
									}
								})(n)
							}
							if (i.length) {
								g.push({
											label : p.group,
											className : "edui-for-" + p.icon,
											subMenu : {
												items : i
											}
										})
							}
						} else {
							if (d.queryCommandState(p.cmdName) != -1) {
								g.push({
											label : p.label,
											className : "edui-for-" + p.cmdName
													+ (p.value || ""),
											onclick : p.exec ? function() {
												p.exec.call(d)
											} : function() {
												d.execCommand(p.cmdName,
														p.value)
											}
										})
							}
						}
					}
				})(j)
			}
			if (g[g.length - 1] == "-") {
				g.pop()
			}
			e = new baidu.editor.ui.Menu({
						items : g
					});
			e.render();
			e.showAt(m);
			f.preventDefault ? f.preventDefault() : (f.returnValue = false)
		})
	}
})();
(function() {
	var c = baidu.editor, a = c.dom.domUtils, b = ["td"];
	baidu.editor.plugins.pagebreak = function() {
		var d = this;
		d.commands.pagebreak = {
			execCommand : function() {
				var f = d.selection.getRange();
				var k = d.document.createElement("div");
				k.className = "pagebreak";
				a.unselectable(k);
				var i = a.findParentByTagName(f.startContainer, b, true), g = [], e;
				if (i) {
					switch (i.tagName) {
						case "TD" :
							e = i.parentNode;
							if (!e.previousSibling) {
								var h = a.findParentByTagName(e, "table");
								h.parentNode.insertBefore(k, h);
								g = a.findParents(k, true)
							} else {
								e.parentNode.insertBefore(k, e);
								g = a.findParents(k)
							}
							e = g[1];
							if (k !== e) {
								a.breakParent(k, e)
							}
							f.moveToBookmark(bk).select();
							a.clearSelectedArr(d.currentSelectedArr)
					}
				} else {
					if (!f.collapsed) {
						f.deleteContents();
						var j = f.startContainer;
						while (a.isBlockElm(j) && a.isEmptyNode(j)) {
							f.setStartBefore(j).collapse(true);
							a.remove(j);
							j = f.startContainer
						}
					}
					g = a.findParents(f.startContainer, true);
					e = g[1];
					f.insertNode(k);
					e && a.breakParent(k, e);
					f.setEndAfter(k).setCursor(true, true)
				}
			}
		}
	}
})();
baidu.editor.plugins.basestyle = function() {
	var e = {
		bold : ["strong", "b"],
		italic : ["em", "i"],
		subscript : ["sub"],
		superscript : ["sup"]
	}, a = baidu.editor.dom.domUtils, d = function(g, f) {
		var h = g.selection.getStart();
		return a.findParentByTagName(h, f, true)
	}, b = 0;
	for (var c in e) {
		(function(g, f) {
			baidu.editor.commands[g] = {
				execCommand : function(j) {
					var h = new baidu.editor.dom.Range(this.document), p = "", n = this;
					if (!b) {
						this.addListener("beforegetcontent", function() {
									a.clearReduent(n.document, ["strong", "u",
													"em", "sup", "sub",
													"strike"])
								});
						b = 1
					}
					if (n.currentSelectedArr && n.currentSelectedArr.length > 0) {
						for (var l = 0, k; k = n.currentSelectedArr[l++];) {
							if (k.style.display != "none") {
								h.selectNodeContents(k).select();
								!p && (p = d(this, f));
								if (j == "superscript" || j == "subscript") {
									if (!p || p.tagName.toLowerCase() != j) {
										h.removeInlineStyle(["sub", "sup"])
									}
								}
								p ? h.removeInlineStyle(f) : h
										.applyInlineStyle(f[0])
							}
						}
						h.selectNodeContents(n.currentSelectedArr[0]).select()
					} else {
						h = n.selection.getRange();
						p = d(this, f);
						if (h.collapsed) {
							if (p) {
								var o = n.document.createTextNode("");
								h.insertNode(o).removeInlineStyle(f);
								h.setStartBefore(o);
								a.remove(o)
							} else {
								var m = h.document.createElement(f[0]);
								if (j == "superscript" || j == "subscript") {
									o = n.document.createTextNode("");
									h.insertNode(o).removeInlineStyle(["sub",
											"sup"]).setStartBefore(o)
											.collapse(true)
								}
								h.insertNode(m).setStart(m, 0)
							}
							h.collapse(true)
						} else {
							if (j == "superscript" || j == "subscript") {
								if (!p || p.tagName.toLowerCase() != j) {
									h.removeInlineStyle(["sub", "sup"])
								}
							}
							p ? h.removeInlineStyle(f) : h
									.applyInlineStyle(f[0])
						}
						h.select()
					}
					return true
				},
				queryCommandState : function() {
					return d(this, f) ? 1 : 0
				}
			}
		})(c, e[c])
	}
};
baidu.editor.plugins.elementpath = function() {
	var b = baidu.editor.dom.domUtils, d, a, c = baidu.editor.dom.dtd;
	baidu.editor.commands.elementpath = {
		execCommand : function(p, f) {
			var n = this, h = a[f], m = n.selection.getRange();
			n.currentSelectedArr && b.clearSelectedArr(n.currentSelectedArr);
			d = f * 1;
			if (c.$tableContent[h.tagName]) {
				switch (h.tagName) {
					case "TD" :
						n.currentSelectedArr = [h];
						h.className = n.options.selectedTdClass;
						break;
					case "TR" :
						var q = h.cells;
						for (var l = 0, g; g = q[l++];) {
							n.currentSelectedArr.push(g);
							g.className = n.options.selectedTdClass
						}
						break;
					case "TABLE" :
					case "TBODY" :
						var r = h.rows;
						for (var l = 0, o; o = r[l++];) {
							q = o.cells;
							for (var k = 0, e; e = q[k++];) {
								n.currentSelectedArr.push(e);
								e.className = n.options.selectedTdClass
							}
						}
				}
				h = n.currentSelectedArr[0];
				if (b.isEmptyNode(h)) {
					m.setStart(h, 0).setCursor()
				} else {
					m.selectNodeContents(h).select()
				}
			} else {
				m.selectNode(h).select()
			}
		},
		queryCommandValue : function() {
			var k = this.selection.getStart(), f = b.findParents(k, true), j = [];
			a = f;
			for (var h = 0, g; g = f[h]; h++) {
				if (g.nodeType == 3) {
					continue
				}
				var e = g.tagName.toLowerCase();
				if (e == "img" && g.getAttribute("anchorname")) {
					e = "anchor"
				}
				j[h] = e;
				if (d == h) {
					d = -1;
					break
				}
			}
			return j
		}
	}
};
baidu.editor.plugins.formatmatch = function() {
	var e = this, a = baidu.editor.dom.domUtils, f = [], c, b = 0, d = baidu.editor.browser;
	this.addListener("reset", function() {
				f = [];
				b = 0
			});
	function g(n, p) {
		if (d.webkit) {
			var m = p.target.tagName == "IMG" ? p.target : null
		}
		function h(i) {
			if (q && (!e.currentSelectedArr || !e.currentSelectedArr.length)) {
				i.selectNode(q)
			}
			return i.applyInlineStyle(f[f.length - 1].tagName, null, f)
		}
		e.undoManger && e.undoManger.save();
		var l = e.selection.getRange(), o = m || l.getClosedNode();
		if (c && o && o.tagName == "IMG") {
			o.style.cssText += ";float:"
					+ (c.style.cssFloat || c.style.styleFloat || "none")
					+ ";display:" + (c.style.display || "inline");
			c = null
		} else {
			if (!c) {
				var j = l.collapsed;
				if (j) {
					var q = e.document.createTextNode("match");
					l.insertNode(q).select()
				}
				e.__hasEnterExecCommand = true;
				e.execCommand("removeformat");
				e.__hasEnterExecCommand = false;
				l = e.selection.getRange();
				if (f.length == 0) {
					if (e.currentSelectedArr && e.currentSelectedArr.length > 0) {
						l.selectNodeContents(e.currentSelectedArr[0]).select()
					}
				} else {
					if (e.currentSelectedArr && e.currentSelectedArr.length > 0) {
						for (var k = 0, r; r = e.currentSelectedArr[k++];) {
							l.selectNodeContents(r);
							h(l)
						}
						l.selectNodeContents(e.currentSelectedArr[0]).select()
					} else {
						h(l)
					}
				}
				if (!e.currentSelectedArr || !e.currentSelectedArr.length) {
					if (q) {
						l.setStartBefore(q).collapse(true)
					}
					l.select()
				}
				q && a.remove(q)
			}
		}
		e.undoManger && e.undoManger.save();
		e.removeListener("mouseup", g);
		b = 0
	}
	baidu.editor.commands.formatmatch = {
		execCommand : function(j) {
			if (b) {
				b = 0;
				f = [];
				e.removeListener("mouseup", g);
				return
			}
			var h = e.selection.getRange();
			c = h.getClosedNode();
			if (!c || c.tagName != "IMG") {
				h.collapse(true).shrinkBoundary();
				var m = h.startContainer;
				f = a.findParents(m, true, function(i) {
							return !a.isBlockElm(i) && i.nodeType == 1
						});
				for (var l = 0, k; k = f[l]; l++) {
					if (k.tagName == "A") {
						f.splice(l, 1);
						break
					}
				}
			}
			e.addListener("mouseup", g);
			b = 1
		},
		queryCommandState : function() {
			return b
		},
		notNeedUndo : 1
	}
};
baidu.editor.plugins.searchreplace = function() {
	var a, b;
	this.addListener("reset", function() {
				a = null;
				b = null
			});
	baidu.editor.commands.searchreplace = {
		execCommand : function(m, c) {
			var h = this, d = h.selection, f, g, e = 0, c = baidu.editor.utils
					.extend(c, {
								replaceStr : null,
								all : false,
								casesensitive : false,
								dir : 1
							}, true);
			if (baidu.editor.browser.ie) {
				while (1) {
					var j;
					g = h.document.selection.createRange();
					j = g.duplicate();
					j.moveToElementText(h.document.body);
					if (c.all) {
						b = 0;
						c.dir = 1;
						if (a) {
							j.setEndPoint(c.dir == -1
											? "EndToStart"
											: "StartToEnd", a)
						}
					} else {
						j.setEndPoint(
								c.dir == -1 ? "EndToStart" : "StartToEnd", g);
						if (c.replaceStr) {
							j.setEndPoint(c.dir == -1
											? "StartToEnd"
											: "EndToStart", g)
						}
					}
					g = j.duplicate();
					if (!j
							.findText(c.searchStr, c.dir, c.casesensitive
											? 4
											: 0)) {
						j = h.document.selection.createRange();
						j.scrollIntoView();
						return e
					}
					j.select();
					if (c.replaceStr) {
						f = d.getRange();
						f.deleteContents().insertNode(f.document
								.createTextNode(c.replaceStr)).select();
						a = d.getNative().createRange()
					}
					e++;
					if (!c.all) {
						break
					}
				}
			} else {
				var i = h.window, l = d.getNative(), j;
				while (1) {
					if (c.all) {
						if (a) {
							a.collapse(false);
							g = a
						} else {
							g = h.document.createRange();
							g.setStart(h.document.body, 0)
						}
						l.removeAllRanges();
						l.addRange(g);
						b = 0;
						c.dir = 1
					} else {
						g = i.getSelection().getRangeAt(0);
						if (c.replaceStr) {
							g.collapse(c.dir == 1 ? true : false)
						}
					}
					if (!b) {
						g.collapse(c.dir < 0 ? true : false);
						l.removeAllRanges();
						l.addRange(g)
					} else {
						l.removeAllRanges()
					}
					if (!i.find(c.searchStr, c.casesensitive, c.dir < 0
									? true
									: false)) {
						l.removeAllRanges();
						return e
					}
					b = 0;
					f = i.getSelection().getRangeAt(0);
					if (!f.collapsed) {
						if (c.replaceStr) {
							f.deleteContents();
							var k = i.document.createTextNode(c.replaceStr);
							f.insertNode(k);
							f.selectNode(k);
							l.addRange(f);
							a = f.cloneRange()
						}
					}
					e++;
					if (!c.all) {
						break
					}
				}
			}
			return true
		}
	}
};
var baidu = baidu || {};
baidu.editor = baidu.editor || {};
baidu.editor.ui = {};
(function() {
	var d = baidu.editor.browser, c = baidu.editor.dom.domUtils;
	var g = "$EDITORUI";
	var f = window[g] = {};
	var a = "ID" + g;
	var i = 0;
	var b = baidu.editor.ui.uiUtils = {
		uid : function(j) {
			return (j ? j[a] || (j[a] = ++i) : ++i)
		},
		hook : function(j, l) {
			var k;
			if (j && j._callbacks) {
				k = j
			} else {
				k = function() {
					var p;
					if (j) {
						p = j.apply(this, arguments)
					}
					var o = k._callbacks;
					var m = o.length;
					while (m--) {
						var n = o[m].apply(this, arguments);
						if (p === undefined) {
							p = n
						}
					}
					return p
				};
				k._callbacks = []
			}
			k._callbacks.push(l);
			return k
		},
		createElementByHtml : function(j) {
			var k = document.createElement("div");
			k.innerHTML = j;
			k = k.firstChild;
			k.parentNode.removeChild(k);
			return k
		},
		getViewportElement : function() {
			return (d.ie && d.quirks)
					? document.body
					: document.documentElement
		},
		getClientRect : function(j) {
			var m = j.getBoundingClientRect();
			var k = {
				left : Math.round(m.left),
				top : Math.round(m.top),
				height : Math.round(m.bottom - m.top),
				width : Math.round(m.right - m.left)
			};
			var l;
			while ((l = j.ownerDocument) !== document
					&& (j = c.getWindow(l).frameElement)) {
				m = j.getBoundingClientRect();
				k.left += m.left;
				k.top += m.top
			}
			k.bottom = k.top + k.height;
			k.right = k.left + k.width;
			return k
		},
		getViewportRect : function() {
			var k = b.getViewportElement();
			var l = k.clientWidth | 0;
			var j = k.clientHeight | 0;
			return {
				left : 0,
				top : 0,
				height : j,
				width : l,
				bottom : j,
				right : l
			}
		},
		setViewportOffset : function(j, o) {
			var k;
			var n = b.getFixedLayer();
			if (j.parentNode === n) {
				j.style.left = o.left + "px";
				j.style.top = o.top + "px"
			} else {
				var m = parseInt(j.style.left) | 0;
				var l = parseInt(j.style.top) | 0;
				k = b.getClientRect(j);
				m = m + o.left - k.left;
				l = l + o.top - k.top;
				j.style.left = m + "px";
				j.style.top = l + "px"
			}
		},
		getEventOffset : function(j) {
			var k = j.target || j.srcElement;
			var l = b.getClientRect(k);
			var m = b.getViewportOffsetByEvent(j);
			return {
				left : m.left - l.left,
				top : m.top - l.top
			}
		},
		getViewportOffsetByEvent : function(k) {
			var l = k.target || k.srcElement;
			var j = c.getWindow(l).frameElement;
			var n = {
				left : k.clientX,
				top : k.clientY
			};
			if (j && l.ownerDocument !== document) {
				var m = b.getClientRect(j);
				n.left += m.left;
				n.top += m.top
			}
			return n
		},
		setGlobal : function(k, j) {
			f[k] = j;
			return g + '["' + k + '"]'
		},
		unsetGlobal : function(j) {
			delete f[j]
		},
		copyAttributes : function(o, n) {
			var l = n.attributes;
			var j = l.length;
			while (j--) {
				var m = l[j];
				if (m.nodeName != "style" && m.nodeName != "class"
						&& (!d.ie || m.specified)) {
					o.setAttribute(m.nodeName, m.nodeValue)
				}
			}
			if (n.className) {
				o.className += " " + n.className
			}
			if (n.style.cssText) {
				o.style.cssText += ";" + n.style.cssText
			}
		},
		removeStyle : function(k, j) {
			if (k.style.removeProperty) {
				k.style.removeProperty(j)
			} else {
				if (k.style.removeAttribute) {
					k.style.removeAttribute(j)
				} else {
					throw ""
				}
			}
		},
		contains : function(k, j) {
			return k
					&& j
					&& (k === j ? false : (k.contains ? k.contains(j) : k
							.compareDocumentPosition(j)
							& 16))
		},
		startDrag : function(r, n) {
			var p = document;
			var m = r.clientX;
			var l = r.clientY;
			function k(t) {
				var s = t.clientX - m;
				var u = t.clientY - l;
				n.ondragmove(s, u);
				if (t.stopPropagation) {
					t.stopPropagation()
				} else {
					t.cancelBubble = true
				}
			}
			if (p.addEventListener) {
				function q(s) {
					p.removeEventListener("mousemove", k, true);
					p.removeEventListener("mouseup", k, true);
					n.ondragstop()
				}
				p.addEventListener("mousemove", k, true);
				p.addEventListener("mouseup", q, true);
				r.preventDefault()
			} else {
				var o = r.srcElement;
				o.setCapture();
				function j() {
					o.releaseCapture();
					o.detachEvent("onmousemove", k);
					o.detachEvent("onmouseup", j);
					o.detachEvent("onlosecaptrue", j);
					n.ondragstop()
				}
				o.attachEvent("onmousemove", k);
				o.attachEvent("onmouseup", j);
				o.attachEvent("onlosecaptrue", j);
				r.returnValue = false
			}
			n.ondragstart()
		},
		getFixedLayer : function() {
			var j = document.getElementById("edui_fixedlayer");
			if (j == null) {
				j = document.createElement("div");
				j.id = "edui_fixedlayer";
				document.body.appendChild(j);
				if (d.ie && d.version <= 8) {
					j.style.position = "absolute";
					h();
					setTimeout(e)
				} else {
					j.style.position = "fixed"
				}
				j.style.left = "0";
				j.style.top = "0";
				j.style.width = "0";
				j.style.height = "0"
			}
			return j
		},
		makeUnselectable : function(k) {
			if (d.opera || (d.ie && d.version < 9)) {
				k.unselectable = "on";
				if (k.hasChildNodes()) {
					for (var j = 0; j < k.childNodes.length; j++) {
						if (k.childNodes[j].nodeType == 1) {
							b.makeUnselectable(k.childNodes[j])
						}
					}
				}
			} else {
				if (k.style.MozUserSelect !== undefined) {
					k.style.MozUserSelect = "none"
				} else {
					if (k.style.WebkitUserSelect !== undefined) {
						k.style.WebkitUserSelect = "none"
					} else {
						if (k.style.KhtmlUserSelect !== undefined) {
							k.style.KhtmlUserSelect = "none"
						}
					}
				}
			}
		},
		mapUrl : function(j) {
			return j.replace("~/", UEDITOR_CONFIG.UEDITOR_HOME_URL)
		}
	};
	function e() {
		var j = document.getElementById("edui_fixedlayer");
		b.setViewportOffset(j, {
					left : 0,
					top : 0
				});
		j.style.display = "none";
		j.style.display = "block"
	}
	function h(j) {
		c.on(window, "scroll", e)
	}
})();
(function() {
	var a = baidu.editor.utils, b = baidu.editor.ui.uiUtils, c = baidu.editor.EventBase, d = baidu.editor.ui.UIBase = function() {
	};
	d.prototype = {
		className : "",
		uiName : "",
		initOptions : function(f) {
			var g = this;
			for (var e in f) {
				g[e] = f[e]
			}
			this.id = this.id || "edui" + b.uid()
		},
		initUIBase : function() {
			this._globalKey = a.unhtml(b.setGlobal(this.id, this))
		},
		render : function(f) {
			var e = this.renderHtml();
			var g = b.createElementByHtml(e);
			var h = this.getDom();
			if (h != null) {
				h.parentNode.replaceChild(g, h);
				b.copyAttributes(g, h)
			} else {
				if (typeof f == "string") {
					f = document.getElementById(f)
				}
				f = f || b.getFixedLayer();
				f.appendChild(g)
			}
			this.postRender()
		},
		getDom : function(e) {
			if (!e) {
				return document.getElementById(this.id)
			} else {
				return document.getElementById(this.id + "_" + e)
			}
		},
		postRender : function() {
			this.fireEvent("postrender")
		},
		getHtmlTpl : function() {
			return ""
		},
		formatHtml : function(e) {
			var f = "edui-" + this.uiName;
			return (e.replace(/##/g, this.id).replace(/%%-/g,
					this.uiName ? f + "-" : "").replace(/%%/g,
					(this.uiName ? f : "") + " " + this.className).replace(
					/\$\$/g, this._globalKey))
		},
		renderHtml : function() {
			return this.formatHtml(this.getHtmlTpl())
		},
		dispose : function() {
			var e = this.getDom();
			if (e) {
				baidu.editor.dom.domUtils.remove(e)
			}
			b.unsetGlobal(this.id)
		}
	};
	a.inherits(d, c)
})();
(function() {
	var a = baidu.editor.utils, b = baidu.editor.ui.UIBase, c = baidu.editor.ui.Separator = function(
			d) {
		this.initOptions(d);
		this.initSeparator()
	};
	c.prototype = {
		uiName : "separator",
		initSeparator : function() {
			this.initUIBase()
		},
		getHtmlTpl : function() {
			return '<div id="##" class="edui-box %%"></div>'
		}
	};
	a.inherits(c, b)
})();
(function() {
	var b = baidu.editor.utils, a = baidu.editor.dom.domUtils, d = baidu.editor.ui.UIBase, c = baidu.editor.ui.uiUtils;
	var e = baidu.editor.ui.Mask = function(f) {
		this.initOptions(f);
		this.initUIBase()
	};
	e.prototype = {
		getHtmlTpl : function() {
			return '<div id="##" class="edui-mask %%" onmousedown="return $$._onMouseDown(event, this);"></div>'
		},
		postRender : function() {
			var f = this;
			a.on(window, "resize", function() {
						setTimeout(function() {
									if (!f.isHidden()) {
										f._fill()
									}
								})
					})
		},
		show : function() {
			this._fill();
			this.getDom().style.display = ""
		},
		hide : function() {
			this.getDom().style.display = "none"
		},
		isHidden : function() {
			return this.getDom().style.display == "none"
		},
		_onMouseDown : function() {
			return false
		},
		_fill : function() {
			var f = this.getDom();
			var g = c.getViewportRect();
			f.style.width = g.width + "px";
			f.style.height = g.height + "px"
		}
	};
	b.inherits(e, d)
})();
(function() {
	var c = baidu.editor.utils, e = baidu.editor.ui.uiUtils, a = baidu.editor.dom.domUtils, h = baidu.editor.ui.UIBase, g = baidu.editor.ui.Popup = function(
			i) {
		this.initOptions(i);
		this.initPopup()
	};
	var b = [];
	function f(l) {
		var m = [];
		for (var k = 0; k < b.length; k++) {
			var j = b[k];
			if (!j.isHidden()) {
				if (j.queryAutoHide(l) !== false) {
					j.hide()
				}
			}
		}
	}
	g.postHide = f;
	var d = ["edui-anchor-topleft", "edui-anchor-topright",
			"edui-anchor-bottomleft", "edui-anchor-bottomright"];
	g.prototype = {
		SHADOW_RADIUS : 5,
		content : null,
		_hidden : false,
		autoRender : true,
		initPopup : function() {
			this.initUIBase();
			b.push(this)
		},
		getHtmlTpl : function() {
			return '<div id="##" class="edui-popup %%"> <div id="##_body" class="edui-popup-body">  <div class="edui-shadow"></div>  <div id="##_content" class="edui-popup-content">'
					+ this.getContentHtmlTpl() + "  </div> </div></div>"
		},
		getContentHtmlTpl : function() {
			if (typeof this.content == "string") {
				return this.content
			}
			return this.content.renderHtml()
		},
		_UIBase_postRender : h.prototype.postRender,
		postRender : function() {
			if (this.content instanceof h) {
				this.content.postRender()
			}
			this.hide(true);
			this._UIBase_postRender()
		},
		_doAutoRender : function() {
			if (!this.getDom() && this.autoRender) {
				this.render()
			}
		},
		mesureSize : function() {
			var i = this.getDom("content");
			return e.getClientRect(i)
		},
		fitSize : function() {
			var i = this.getDom("body");
			i.style.width = "";
			i.style.height = "";
			var j = this.mesureSize();
			i.style.width = j.width + "px";
			i.style.height = j.height + "px";
			return j
		},
		showAnchor : function(j, i) {
			this.showAnchorRect(e.getClientRect(j), i)
		},
		showAnchorRect : function(p, m, n) {
			this._doAutoRender();
			var k = e.getViewportRect();
			this._show();
			var j = this.fitSize();
			var q, l, i, o;
			if (m) {
				q = (p.right + j.width > k.right && p.left > j.width);
				l = (p.top + j.height > k.bottom && p.bottom > j.height);
				i = p.right + j.width > k.right
						? (p.left > j.width ? p.left - j.width : (n ? k.right
								- j.width : p.right))
						: p.right;
				o = p.top + j.height > k.bottom ? (p.bottom > j.height
						? p.bottom - j.height
						: (n ? k.bottom - j.height : p.top)) : p.top
			} else {
				q = (p.right + j.width > k.right && p.left > j.width);
				l = (p.top + j.height > k.bottom && p.bottom > j.height);
				i = p.right + j.width > k.right ? (p.left > j.width ? p.right
						- j.width : (n ? k.right - j.width : p.left)) : p.left;
				o = p.bottom + j.height > k.bottom
						? (p.top > j.height ? p.top - j.height : (n ? k.bottom
								- j.height : p.bottom))
						: p.bottom
			}
			var r = this.getDom();
			e.setViewportOffset(r, {
						left : i,
						top : o
					});
			a.removeClasses(r, d);
			r.className += " " + d[(l ? 1 : 0) * 2 + (q ? 1 : 0)]
		},
		showAt : function(l) {
			var k = l.left;
			var j = l.top;
			var i = {
				left : k,
				top : j,
				right : k,
				bottom : j,
				height : 0,
				width : 0
			};
			this.showAnchorRect(i, false, true)
		},
		_show : function() {
			if (this._hidden) {
				var i = this.getDom();
				i.style.display = "";
				this._hidden = false;
				this.fireEvent("show")
			}
		},
		isHidden : function() {
			return this._hidden
		},
		show : function() {
			this._doAutoRender();
			this._show()
		},
		hide : function(i) {
			if (!this._hidden && this.getDom()) {
				this.getDom().style.display = "none";
				this._hidden = true;
				if (!i) {
					this.fireEvent("hide")
				}
			}
		},
		queryAutoHide : function(i) {
			return !i || !e.contains(this.getDom(), i)
		}
	};
	c.inherits(g, h);
	a.on(document, "mousedown", function(i) {
				var j = i.target || i.srcElement;
				f(j)
			});
	a.on(window, "scroll", function() {
				f()
			})
})();
(function() {
	var a = baidu.editor.utils, c = baidu.editor.ui.UIBase, b = baidu.editor.ui.ColorPicker = function(
			f) {
		this.initOptions(f);
		this.noColorText = this.noColorText || "不设置颜色";
		this.initUIBase()
	};
	b.prototype = {
		getHtmlTpl : function() {
			return e(this.noColorText)
		},
		_onTableClick : function(f) {
			var h = f.target || f.srcElement;
			var g = h.getAttribute("data-color");
			if (g) {
				this.fireEvent("pickcolor", g)
			}
		},
		_onTableOver : function(f) {
			var h = f.target || f.srcElement;
			var g = h.getAttribute("data-color");
			if (g) {
				this.getDom("preview").style.backgroundColor = g
			}
		},
		_onTableOut : function() {
			this.getDom("preview").style.backgroundColor = ""
		},
		_onPickNoColor : function() {
			this.fireEvent("picknocolor")
		}
	};
	a.inherits(b, c);
	var d = ("ff0000,ffa900,ffff00,99e600,00cc22,00ffff,00aaff,0055ff,5500ff,aa00ff,ff007f,ffffff,ffe5e5,fff2d9,ffffcc,eeffcc,d9ffe0,d9ffff,d9f2ff,d9e6ff,e6d9ff,f2d9ff,ffd9ed,d9d9d9,e68a8a,e6c78a,ffff99,bfe673,99eea0,a1e6e6,99ddff,8aa8e6,998ae6,c78ae6,e68ab9,b3b3b3,cc5252,cca352,d9d957,a7cc39,57ce6d,52cccc,52a3cc,527acc,6652cc,a352cc,cc5291,8c8c8c,991f1f,99701f,99991f,59800d,0f9932,1f9999,1f7099,1f4799,471f99,701f99,991f5e,404040,660000,664b14,666600,3b5900,005916,146666,144b66,143066,220066,301466,66143f,000000")
			.split(",");
	function e(f) {
		var h = '<div id="##" class="edui-colorpicker %%"><div class="edui-colorpicker-topbar edui-clearfix"><div unselectable="on" id="##_preview" class="edui-colorpicker-preview"></div><div unselectable="on" class="edui-colorpicker-nocolor" onclick="$$._onPickNoColor(event, this);">'
				+ f
				+ '</div></div><table class="edui-box" onmouseover="$$._onTableOver(event, this);" onmouseout="$$._onTableOut(event, this);" onclick="return $$._onTableClick(event, this);" cellspacing="0" cellpadding="0"><tr class="edui-colorpicker-tablefirstrow">';
		for (var g = 0; g < d.length; g++) {
			if (g && g % 12 === 0) {
				h += "</tr><tr>"
			}
			h += '<td><a hidefocus onclick="return false;" href="javascript:" unselectable="on" class="edui-box edui-colorpicker-colorcell" data-color="#'
					+ d[g]
					+ '" style="background-color:#'
					+ d[g]
					+ ';"></a></td>'
		}
		h += "</tr></table></div>";
		return h
	}
})();
(function() {
	var a = baidu.editor.utils, b = baidu.editor.ui.uiUtils, c = baidu.editor.ui.UIBase;
	var d = baidu.editor.ui.TablePicker = function(e) {
		this.initOptions(e);
		this.initTablePicker()
	};
	d.prototype = {
		defaultNumRows : 10,
		defaultNumCols : 10,
		maxNumRows : 20,
		maxNumCols : 20,
		numRows : 10,
		numCols : 10,
		lengthOfCellSide : 22,
		initTablePicker : function() {
			this.initUIBase()
		},
		getHtmlTpl : function() {
			return '<div id="##" class="edui-tablepicker %%"><div class="edui-tablepicker-body"><div class="edui-infoarea"><span id="##_label" class="edui-label"></span><span class="edui-clickable" onclick="$$._onMore();">更多</span></div><div class="edui-pickarea" onmousemove="$$._onMouseMove(event, this);" onmouseover="$$._onMouseOver(event, this);" onmouseout="$$._onMouseOut(event, this);" onclick="$$._onClick(event, this);"><div id="##_overlay" class="edui-overlay"></div></div></div></div>'
		},
		_UIBase_render : c.prototype.render,
		render : function(e) {
			this._UIBase_render(e);
			this.getDom("label").innerHTML = "0列 x 0行"
		},
		_track : function(i, h) {
			var f = this.getDom("overlay").style;
			var g = this.lengthOfCellSide;
			f.width = i * g + "px";
			f.height = h * g + "px";
			var e = this.getDom("label");
			e.innerHTML = i + "列 x " + h + "行";
			this.numCols = i;
			this.numRows = h
		},
		_onMouseOver : function(f, g) {
			var e = f.relatedTarget || f.fromElement;
			if (!b.contains(g, e) && g !== e) {
				this.getDom("label").innerHTML = "0列 x 0行";
				this.getDom("overlay").style.visibility = ""
			}
		},
		_onMouseOut : function(f, g) {
			var e = f.relatedTarget || f.toElement;
			if (!b.contains(g, e) && g !== e) {
				this.getDom("label").innerHTML = "0列 x 0行";
				this.getDom("overlay").style.visibility = "hidden"
			}
		},
		_onMouseMove : function(e, g) {
			var f = this.getDom("overlay").style;
			var k = b.getEventOffset(e);
			var i = this.lengthOfCellSide;
			var j = Math.ceil(k.left / i);
			var h = Math.ceil(k.top / i);
			this._track(j, h)
		},
		_onClick : function() {
			this.fireEvent("picktable", this.numCols, this.numRows)
		},
		_onMore : function() {
			this.fireEvent("more")
		}
	};
	a.inherits(d, c)
})();
(function() {
	var c = baidu.editor.browser, a = baidu.editor.dom.domUtils, b = baidu.editor.ui.uiUtils;
	var d = 'onmousedown="$$.Stateful_onMouseDown(event, this);" onmouseup="$$.Stateful_onMouseUp(event, this);"'
			+ (c.ie
					? (' onmouseenter="$$.Stateful_onMouseEnter(event, this);" onmouseleave="$$.Stateful_onMouseLeave(event, this);"')
					: (' onmouseover="$$.Stateful_onMouseOver(event, this);" onmouseout="$$.Stateful_onMouseOut(event, this);"'));
	baidu.editor.ui.Stateful = {
		alwalysHoverable : false,
		Stateful_init : function() {
			this._Stateful_dGetHtmlTpl = this.getHtmlTpl;
			this.getHtmlTpl = this.Stateful_getHtmlTpl
		},
		Stateful_getHtmlTpl : function() {
			var e = this._Stateful_dGetHtmlTpl();
			return e.replace(/stateful/g, function() {
						return d
					})
		},
		Stateful_onMouseEnter : function(e, f) {
			if (!this.isDisabled() || this.alwalysHoverable) {
				this.addState("hover");
				this.fireEvent("over")
			}
		},
		Stateful_onMouseLeave : function(e, f) {
			if (!this.isDisabled() || this.alwalysHoverable) {
				this.removeState("hover");
				this.removeState("active");
				this.fireEvent("out")
			}
		},
		Stateful_onMouseOver : function(f, g) {
			var e = f.relatedTarget;
			if (!b.contains(g, e) && g !== e) {
				this.Stateful_onMouseEnter(f, g)
			}
		},
		Stateful_onMouseOut : function(f, g) {
			var e = f.relatedTarget;
			if (!b.contains(g, e) && g !== e) {
				this.Stateful_onMouseLeave(f, g)
			}
		},
		Stateful_onMouseDown : function(e, f) {
			if (!this.isDisabled()) {
				this.addState("active")
			}
		},
		Stateful_onMouseUp : function(e, f) {
			if (!this.isDisabled()) {
				this.removeState("active")
			}
		},
		Stateful_postRender : function() {
			if (this.disabled && !this.hasState("disabled")) {
				this.addState("disabled")
			}
		},
		hasState : function(e) {
			return a.hasClass(this.getStateDom(), "edui-state-" + e)
		},
		addState : function(e) {
			if (!this.hasState(e)) {
				this.getStateDom().className += " edui-state-" + e
			}
		},
		removeState : function(e) {
			if (this.hasState(e)) {
				a.removeClasses(this.getStateDom(), ["edui-state-" + e])
			}
		},
		getStateDom : function() {
			return this.getDom("state")
		},
		isChecked : function() {
			return this.hasState("checked")
		},
		setChecked : function(e) {
			if (!this.isDisabled() && e) {
				this.addState("checked")
			} else {
				this.removeState("checked")
			}
		},
		isDisabled : function() {
			return this.hasState("disabled")
		},
		setDisabled : function(e) {
			if (e) {
				this.removeState("hover");
				this.removeState("checked");
				this.removeState("active");
				this.addState("disabled")
			} else {
				this.removeState("disabled")
			}
		}
	}
})();
(function() {
	var b = baidu.editor.utils, d = baidu.editor.ui.UIBase, c = baidu.editor.ui.Stateful, a = baidu.editor.ui.Button = function(
			e) {
		this.initOptions(e);
		this.initButton()
	};
	a.prototype = {
		uiName : "button",
		label : "",
		title : "",
		showIcon : true,
		showText : true,
		initButton : function() {
			this.initUIBase();
			this.Stateful_init()
		},
		getHtmlTpl : function() {
			return '<div id="##" class="edui-box %%"><div id="##_state" stateful><div class="%%-wrap"><div id="##_body" unselectable="on" '
					+ (this.title ? 'title="' + this.title + '"' : "")
					+ ' class="%%-body" onmousedown="return false;" onclick="return $$._onClick();">'
					+ (this.showIcon
							? '<div class="edui-box edui-icon"></div>'
							: "")
					+ (this.showText ? '<div class="edui-box edui-label">'
							+ this.label + "</div>" : "")
					+ "</div></div></div></div>"
		},
		postRender : function() {
			this.Stateful_postRender()
		},
		_onClick : function() {
			if (!this.isDisabled()) {
				this.fireEvent("click")
			}
		}
	};
	b.inherits(a, d);
	b.extend(a.prototype, c)
})();
(function() {
	var c = baidu.editor.utils, e = baidu.editor.ui.uiUtils, a = baidu.editor.dom.domUtils, f = baidu.editor.ui.UIBase, d = baidu.editor.ui.Stateful, b = baidu.editor.ui.SplitButton = function(
			g) {
		this.initOptions(g);
		this.initSplitButton()
	};
	b.prototype = {
		popup : null,
		uiName : "splitbutton",
		title : "",
		initSplitButton : function() {
			this.initUIBase();
			this.Stateful_init();
			var h = this;
			if (this.popup != null) {
				var g = this.popup;
				this.popup = null;
				this.setPopup(g)
			}
		},
		_UIBase_postRender : f.prototype.postRender,
		postRender : function() {
			this.Stateful_postRender();
			this._UIBase_postRender()
		},
		setPopup : function(g) {
			if (this.popup === g) {
				return
			}
			if (this.popup != null) {
				this.popup.dispose()
			}
			g.addListener("show", c.bind(this._onPopupShow, this));
			g.addListener("hide", c.bind(this._onPopupHide, this));
			g.addListener("postrender", c.bind(function() {
				g
						.getDom("body")
						.appendChild(e
								.createElementByHtml('<div id="'
										+ this.popup.id
										+ '_bordereraser" class="edui-bordereraser edui-background" style="width:'
										+ (e.getClientRect(this.getDom()).width - 2)
										+ 'px"></div>'));
				g.getDom().className += " " + this.className
			}, this));
			this.popup = g
		},
		_onPopupShow : function() {
			this.addState("opened")
		},
		_onPopupHide : function() {
			this.removeState("opened")
		},
		getHtmlTpl : function() {
			return '<div id="##" class="edui-box %%"><div '
					+ (this.title ? 'title="' + this.title + '"' : "")
					+ ' id="##_state" stateful><div class="%%-body"><div id="##_button_body" class="edui-box edui-button-body" onclick="$$._onButtonClick(event, this);"><div class="edui-box edui-icon"></div></div><div class="edui-box edui-splitborder"></div><div class="edui-box edui-arrow" onclick="$$._onArrowClick();"></div></div></div></div>'
		},
		showPopup : function() {
			var g = e.getClientRect(this.getDom());
			g.top -= this.popup.SHADOW_RADIUS;
			g.height += this.popup.SHADOW_RADIUS;
			this.popup.showAnchorRect(g)
		},
		_onArrowClick : function(h, g) {
			if (!this.isDisabled()) {
				this.showPopup()
			}
		},
		_onButtonClick : function() {
			if (!this.isDisabled()) {
				this.fireEvent("buttonclick")
			}
		}
	};
	c.inherits(b, f);
	c.extend(b.prototype, d, true)
})();
(function() {
	var b = baidu.editor.utils, c = baidu.editor.ui.uiUtils, d = baidu.editor.ui.ColorPicker, f = baidu.editor.ui.Popup, a = baidu.editor.ui.SplitButton, e = baidu.editor.ui.ColorButton = function(
			g) {
		this.initOptions(g);
		this.initColorButton()
	};
	e.prototype = {
		initColorButton : function() {
			var g = this;
			this.popup = new f({
						content : new d({
									noColorText : "清除颜色",
									onpickcolor : function(i, h) {
										g._onPickColor(h)
									},
									onpicknocolor : function(i, h) {
										g._onPickNoColor(h)
									}
								})
					});
			this.initSplitButton()
		},
		_SplitButton_postRender : a.prototype.postRender,
		postRender : function() {
			this._SplitButton_postRender();
			this.getDom("button_body").appendChild(c
					.createElementByHtml('<div id="' + this.id
							+ '_colorlump" class="edui-colorlump"></div>'));
			this.getDom().className += " edui-colorbutton"
		},
		setColor : function(g) {
			this.getDom("colorlump").style.backgroundColor = g;
			this.color = g
		},
		_onPickColor : function(g) {
			if (this.fireEvent("pickcolor", g) !== false) {
				this.setColor(g);
				this.popup.hide()
			}
		},
		_onPickNoColor : function(g) {
			if (this.fireEvent("picknocolor") !== false) {
				this.popup.hide()
			}
		}
	};
	b.inherits(e, a)
})();
(function() {
	var b = baidu.editor.utils, c = baidu.editor.ui.Popup, d = baidu.editor.ui.TablePicker, a = baidu.editor.ui.SplitButton, e = baidu.editor.ui.TableButton = function(
			f) {
		this.initOptions(f);
		this.initTableButton()
	};
	e.prototype = {
		initTableButton : function() {
			var f = this;
			this.popup = new c({
						content : new d({
									onpicktable : function(g, i, h) {
										f._onPickTable(i, h)
									},
									onmore : function() {
										f.popup.hide();
										f.fireEvent("more")
									}
								})
					});
			this.initSplitButton()
		},
		_onPickTable : function(g, f) {
			if (this.fireEvent("picktable", g, f) !== false) {
				this.popup.hide()
			}
		}
	};
	b.inherits(e, a)
})();
(function() {
	var a = baidu.editor.utils, b = baidu.editor.ui.uiUtils, d = baidu.editor.ui.UIBase, c = baidu.editor.ui.Toolbar = function(
			e) {
		this.initOptions(e);
		this.initToolbar()
	};
	c.prototype = {
		items : null,
		initToolbar : function() {
			this.items = this.items || [];
			this.initUIBase()
		},
		add : function(e) {
			this.items.push(e)
		},
		getHtmlTpl : function() {
			var f = [];
			for (var e = 0; e < this.items.length; e++) {
				f[e] = this.items[e].renderHtml()
			}
			return '<div id="##" class="edui-toolbar %%" onselectstart="return false;" onmousedown="return $$._onMouseDown(event, this);">'
					+ f.join("") + "</div>"
		},
		postRender : function() {
			var f = this.getDom();
			for (var e = 0; e < this.items.length; e++) {
				this.items[e].postRender()
			}
			b.makeUnselectable(f)
		},
		_onMouseDown : function() {
			return false
		}
	};
	a.inherits(c, d)
})();
(function() {
	var h = baidu.editor.utils, d = baidu.editor.dom.domUtils, b = baidu.editor.ui.uiUtils, c = baidu.editor.ui.UIBase, i = baidu.editor.ui.Popup, a = baidu.editor.ui.Stateful, e = baidu.editor.ui.Menu = function(
			j) {
		this.initOptions(j);
		this.initMenu()
	};
	var f = {
		renderHtml : function() {
			return '<div class="edui-menuitem edui-menuseparator"><div class="edui-menuseparator-inner"></div></div>'
		},
		postRender : function() {
		},
		queryAutoHide : function() {
			return true
		}
	};
	e.prototype = {
		items : null,
		uiName : "menu",
		initMenu : function() {
			this.items = this.items || [];
			this.initPopup();
			this.initItems()
		},
		initItems : function() {
			for (var j = 0; j < this.items.length; j++) {
				var k = this.items[j];
				if (k == "-") {
					this.items[j] = this.getSeparator()
				} else {
					if (!(k instanceof g)) {
						this.items[j] = this.createItem(k)
					}
				}
			}
		},
		getSeparator : function() {
			return f
		},
		createItem : function(j) {
			return new g(j)
		},
		_Popup_getContentHtmlTpl : i.prototype.getContentHtmlTpl,
		getContentHtmlTpl : function() {
			if (this.items.length == 0) {
				return this._Popup_getContentHtmlTpl()
			}
			var l = [];
			for (var j = 0; j < this.items.length; j++) {
				var k = this.items[j];
				l[j] = k.renderHtml()
			}
			return ('<div class="%%-body">' + l.join("") + "</div>")
		},
		_Popup_postRender : i.prototype.postRender,
		postRender : function() {
			var l = this;
			for (var j = 0; j < this.items.length; j++) {
				var k = this.items[j];
				k.ownerMenu = this;
				k.postRender()
			}
			d.on(this.getDom(), "mouseover", function(n) {
						n = n || event;
						var m = n.relatedTarget || n.fromElement;
						var o = l.getDom();
						if (!b.contains(o, m) && o !== m) {
							l.fireEvent("over")
						}
					});
			this._Popup_postRender()
		},
		queryAutoHide : function(k) {
			if (k) {
				if (b.contains(this.getDom(), k)) {
					return false
				}
				for (var j = 0; j < this.items.length; j++) {
					var l = this.items[j];
					if (l.queryAutoHide(k) === false) {
						return false
					}
				}
			}
		},
		clearItems : function() {
			for (var j = 0; j < this.items.length; j++) {
				var k = this.items[j];
				clearTimeout(k._showingTimer);
				clearTimeout(k._closingTimer);
				if (k.subMenu) {
					k.subMenu.destroy()
				}
			}
			this.items = []
		},
		destroy : function() {
			if (this.getDom()) {
				d.remove(this.getDom())
			}
			this.clearItems()
		},
		dispose : function() {
			this.destroy()
		}
	};
	h.inherits(e, i);
	var g = baidu.editor.ui.MenuItem = function(j) {
		this.initOptions(j);
		this.initUIBase();
		this.Stateful_init();
		if (this.subMenu && !(this.subMenu instanceof e)) {
			this.subMenu = new e(this.subMenu)
		}
	};
	g.prototype = {
		label : "",
		subMenu : null,
		ownerMenu : null,
		uiName : "menuitem",
		alwalysHoverable : true,
		getHtmlTpl : function() {
			return '<div id="##" class="%%" stateful onclick="$$._onClick(event, this);"><div class="%%-body">'
					+ this.renderLabelHtml() + "</div></div>"
		},
		postRender : function() {
			var j = this;
			this.addListener("over", function() {
						j.ownerMenu.fireEvent("submenuover", j);
						if (j.subMenu) {
							j.delayShowSubMenu()
						}
					});
			if (this.subMenu) {
				this.getDom().className += " edui-hassubmenu";
				this.subMenu.render();
				this.addListener("out", function() {
							j.delayHideSubMenu()
						});
				this.subMenu.addListener("over", function() {
							clearTimeout(j._closingTimer);
							j._closingTimer = null;
							j.addState("opened")
						});
				this.ownerMenu.addListener("hide", function() {
							j.hideSubMenu()
						});
				this.ownerMenu.addListener("submenuover", function(l, k) {
							if (k !== j) {
								j.delayHideSubMenu()
							}
						});
				this.subMenu._bakQueryAutoHide = this.subMenu.queryAutoHide;
				this.subMenu.queryAutoHide = function(k) {
					if (k && b.contains(j.getDom(), k)) {
						return false
					}
					return this._bakQueryAutoHide(k)
				}
			}
			this.getDom().style.tabIndex = "-1";
			b.makeUnselectable(this.getDom());
			this.Stateful_postRender()
		},
		delayShowSubMenu : function() {
			var j = this;
			if (!j.isDisabled()) {
				j.addState("opened");
				clearTimeout(j._showingTimer);
				clearTimeout(j._closingTimer);
				j._closingTimer = null;
				j._showingTimer = setTimeout(function() {
							j.showSubMenu()
						}, 250)
			}
		},
		delayHideSubMenu : function() {
			var j = this;
			if (!j.isDisabled()) {
				j.removeState("opened");
				clearTimeout(j._showingTimer);
				if (!j._closingTimer) {
					j._closingTimer = setTimeout(function() {
								if (!j.hasState("opened")) {
									j.hideSubMenu()
								}
								j._closingTimer = null
							}, 400)
				}
			}
		},
		renderLabelHtml : function() {
			return '<div class="edui-arrow"></div><div class="edui-box edui-icon"></div><div class="edui-box edui-label %%-label">'
					+ (this.label || "") + "</div>"
		},
		getStateDom : function() {
			return this.getDom()
		},
		queryAutoHide : function(j) {
			if (this.subMenu && this.hasState("opened")) {
				return this.subMenu.queryAutoHide(j)
			}
		},
		_onClick : function(j, k) {
			if (this.hasState("disabled")) {
				return
			}
			if (this.fireEvent("click", j, k) !== false) {
				if (this.subMenu) {
					this.showSubMenu()
				} else {
					i.postHide()
				}
			}
		},
		showSubMenu : function() {
			var j = b.getClientRect(this.getDom());
			j.right -= 5;
			j.left += 2;
			j.width -= 7;
			j.top -= 4;
			j.bottom += 4;
			j.height += 8;
			this.subMenu.showAnchorRect(j, true, true)
		},
		hideSubMenu : function() {
			this.subMenu.hide()
		}
	};
	h.inherits(g, c);
	h.extend(g.prototype, a, true)
})();
(function() {
	var b = baidu.editor.utils, d = baidu.editor.ui.uiUtils, e = baidu.editor.ui.Menu, a = baidu.editor.ui.SplitButton, c = baidu.editor.ui.Combox = function(
			f) {
		this.initOptions(f);
		this.initCombox()
	};
	c.prototype = {
		uiName : "combox",
		initCombox : function() {
			var h = this;
			this.items = this.items || [];
			for (var f = 0; f < this.items.length; f++) {
				var g = this.items[f];
				g.uiName = "listitem";
				g.index = f;
				g.onclick = function() {
					h.selectByIndex(this.index)
				}
			}
			this.popup = new e({
						items : this.items,
						uiName : "list"
					});
			this.initSplitButton()
		},
		_SplitButton_postRender : a.prototype.postRender,
		postRender : function() {
			this._SplitButton_postRender();
			this.setLabel(this.label || "")
		},
		showPopup : function() {
			var f = d.getClientRect(this.getDom());
			f.top += 1;
			f.bottom -= 1;
			f.height -= 2;
			this.popup.showAnchorRect(f)
		},
		getValue : function() {
			return this.value
		},
		setValue : function(g) {
			var f = this.indexByValue(g);
			if (f != -1) {
				this.selectedIndex = f;
				this.setLabel(this.items[f].label);
				this.value = this.items[f].value
			} else {
				this.selectedIndex = -1;
				this.setLabel(this.getLabelForUnknowValue(g));
				this.value = g
			}
		},
		setLabel : function(f) {
			this.getDom("button_body").innerHTML = f;
			this.label = f
		},
		getLabelForUnknowValue : function(f) {
			return f
		},
		indexByValue : function(g) {
			for (var f = 0; f < this.items.length; f++) {
				if (g == this.items[f].value) {
					return f
				}
			}
			return -1
		},
		getItem : function(f) {
			return this.items[f]
		},
		selectByIndex : function(f) {
			if (f < this.items.length && this.fireEvent("select", f) !== false) {
				this.selectedIndex = f;
				this.value = this.items[f].value;
				this.setLabel(this.items[f].label)
			}
		}
	};
	b.inherits(c, a)
})();
(function() {
	var h = baidu.editor.utils, d = baidu.editor.dom.domUtils, a = baidu.editor.ui.uiUtils, e = baidu.editor.ui.Mask, b = baidu.editor.ui.UIBase, f = baidu.editor.ui.Button, g = baidu.editor.ui.Dialog = function(
			j) {
		this.initOptions(j);
		this.initDialog()
	};
	var c;
	var i;
	g.prototype = {
		draggable : false,
		uiName : "dialog",
		initDialog : function() {
			var k = this;
			this.initUIBase();
			this.modalMask = (c || (c = new e({
						className : "edui-dialog-modalmask"
					})));
			this.dragMask = (i || (i = new e({
						className : "edui-dialog-dragmask"
					})));
			this.closeButton = new f({
						className : "edui-dialog-closebutton",
						title : "关闭对话框",
						onclick : function() {
							k.close(false)
						}
					});
			if (this.buttons) {
				for (var j = 0; j < this.buttons.length; j++) {
					if (!(this.buttons[j] instanceof f)) {
						this.buttons[j] = new f(this.buttons[j])
					}
				}
			}
		},
		fitSize : function() {
			var j = this.getDom("body");
			var k = this.mesureSize();
			j.style.width = k.width + "px";
			j.style.height = k.height + "px";
			return k
		},
		safeSetOffset : function(p) {
			var l = this;
			var j = l.getDom();
			var o = a.getViewportRect();
			var k = a.getClientRect(j);
			var n = p.left;
			if (n + k.width > o.right) {
				n = o.right - k.width
			}
			var m = p.top;
			if (m + k.height > o.bottom) {
				m = o.bottom - k.height
			}
			j.style.left = Math.max(n, 0) + "px";
			j.style.top = Math.max(m, 0) + "px"
		},
		showAtCenter : function() {
			this.getDom().style.display = "";
			var o = a.getViewportRect();
			var j = this.fitSize();
			var n = this.getDom("titlebar").offsetHeight | 0;
			var m = o.width / 2 - j.width / 2;
			var l = o.height / 2 - (j.height - n) / 2 - n;
			var k = this.getDom();
			this.safeSetOffset({
						left : Math.max(m | 0, 0),
						top : Math.max(l | 0, 0)
					});
			if (!d.hasClass(k, "edui-state-centered")) {
				k.className += " edui-state-centered"
			}
			this._show()
		},
		getContentHtml : function() {
			var j = "";
			if (typeof this.content == "string") {
				j = this.content
			} else {
				if (this.iframeUrl) {
					j = '<iframe id="'
							+ this.id
							+ '_iframe" class="%%-iframe" height="100%" width="100%" frameborder="0" src="'
							+ this.iframeUrl + '"></iframe>'
				}
			}
			return j
		},
		getHtmlTpl : function() {
			var k = "";
			if (this.buttons) {
				var l = [];
				for (var j = 0; j < this.buttons.length; j++) {
					l[j] = this.buttons[j].renderHtml()
				}
				k = '<div class="%%-foot"><div id="##_buttons" class="%%-buttons">'
						+ l.join("") + "</div></div>"
			}
			return '<div id="##" class="%%"><div class="%%-wrap"><div id="##_body" class="%%-body"><div class="%%-shadow"></div><div id="##_titlebar" class="%%-titlebar"><div class="%%-draghandle" onmousedown="$$._onTitlebarMouseDown(event, this);"><span class="%%-caption">'
					+ (this.title || "")
					+ "</span></div>"
					+ this.closeButton.renderHtml()
					+ '</div><div id="##_content" class="%%-content">'
					+ (this.autoReset ? "" : this.getContentHtml())
					+ "</div>"
					+ k + "</div></div></div>"
		},
		postRender : function() {
			if (!this.modalMask.getDom()) {
				this.modalMask.render();
				this.modalMask.hide()
			}
			if (!this.dragMask.getDom()) {
				this.dragMask.render();
				this.dragMask.hide()
			}
			var k = this;
			this.addListener("show", function() {
						k.modalMask.show()
					});
			this.addListener("hide", function() {
						k.modalMask.hide()
					});
			if (this.buttons) {
				for (var j = 0; j < this.buttons.length; j++) {
					this.buttons[j].postRender()
				}
			}
			d.on(window, "resize", function() {
						setTimeout(function() {
									if (!k.isHidden()) {
										k.safeSetOffset(a.getClientRect(k
												.getDom()))
									}
								})
					});
			this._hide()
		},
		mesureSize : function() {
			var j = this.getDom("body");
			var k = a.getClientRect(this.getDom("content")).width;
			var l = j.style;
			l.width = k;
			return a.getClientRect(j)
		},
		_onTitlebarMouseDown : function(j, k) {
			if (this.draggable) {
				var m;
				var n = a.getViewportRect();
				var l = this;
				a.startDrag(j, {
							ondragstart : function() {
								m = a.getClientRect(l.getDom());
								l.dragMask.show()
							},
							ondragmove : function(o, r) {
								var q = m.left + o;
								var p = m.top + r;
								l.safeSetOffset({
											left : q,
											top : p
										})
							},
							ondragstop : function() {
								d.removeClasses(l.getDom(),
										["edui-state-centered"]);
								l.dragMask.hide()
							}
						})
			}
		},
		reset : function() {
			this.getDom("content").innerHTML = this.getContentHtml()
		},
		_show : function() {
			if (this._hidden) {
				this.getDom().style.display = "";
				this._hidden = false;
				this.fireEvent("show")
			}
		},
		isHidden : function() {
			return this._hidden
		},
		_hide : function() {
			if (!this._hidden) {
				this.getDom().style.display = "none";
				this._hidden = true;
				this.fireEvent("hide")
			}
		},
		open : function() {
			if (this.autoReset) {
				this.reset()
			}
			this.showAtCenter();
			if (this.iframeUrl) {
				try {
					this.getDom("iframe").focus()
				} catch (j) {
				}
			}
		},
		_onCloseButtonClick : function(j, k) {
			this.close(false)
		},
		close : function(j) {
			if (this.fireEvent("close", j) !== false) {
				this._hide()
			}
		}
	};
	h.inherits(g, b)
})();
(function() {
	var b = baidu.editor.utils, c = baidu.editor.ui.Menu, a = baidu.editor.ui.SplitButton, d = baidu.editor.ui.MenuButton = function(
			e) {
		this.initOptions(e);
		this.initMenuButton()
	};
	d.prototype = {
		initMenuButton : function() {
			var e = this;
			this.uiName = "menubutton";
			this.popup = new c({
						items : e.items,
						className : e.className
					});
			this.popup.addListener("show", function() {
						var g = this;
						for (var f = 0; f < g.items.length; f++) {
							g.items[f].removeState("checked");
							if (g.items[f].value == e._value) {
								g.items[f].addState("checked");
								this.value = e._value
							}
						}
					});
			this.initSplitButton()
		},
		setValue : function(e) {
			this._value = e
		}
	};
	b.inherits(d, a)
})();
(function() {
	var d = baidu.editor.utils;
	var f = baidu.editor.ui.Popup;
	var c = baidu.editor.ui.SplitButton;
	var g;
	var e;
	(function() {
		var i, h = i = h || {
			version : "1.3.9"
		};
		h.guid = "$BAIDU$";
		window[h.guid] = window[h.guid] || {};
		h.ui = h.ui || {
			version : "1.3.9"
		};
		h.ui.getUI = function(m) {
			var m = m.split("-"), j = h.ui, k = m.length, l = 0;
			for (; l < k; l++) {
				j = j[m[l].charAt(0).toUpperCase() + m[l].slice(1)]
			}
			return j
		};
		h.lang = h.lang || {};
		h.lang.isString = function(j) {
			return "[object String]" == Object.prototype.toString.call(j)
		};
		h.isString = h.lang.isString;
		h.ui.create = function(j, k) {
			if (h.lang.isString(j)) {
				j = h.ui.getUI(j)
			}
			return new j(k)
		};
		h.dom = h.dom || {};
		h.dom.g = function(j) {
			if ("string" == typeof j || j instanceof String) {
				return document.getElementById(j)
			} else {
				if (j && j.nodeName && (j.nodeType == 1 || j.nodeType == 9)) {
					return j
				}
			}
			return null
		};
		h.g = h.G = h.dom.g;
		(function() {
			var j = window[h.guid];
			h.lang.guid = function() {
				return "TANGRAM__" + (j._counter++).toString(36)
			};
			j._counter = j._counter || 1
		})();
		window[h.guid]._instances = window[h.guid]._instances || {};
		h.lang.isFunction = function(j) {
			return "[object Function]" == Object.prototype.toString.call(j)
		};
		h.lang.Class = function(j) {
			this.guid = j || h.lang.guid();
			window[h.guid]._instances[this.guid] = this
		};
		window[h.guid]._instances = window[h.guid]._instances || {};
		h.lang.Class.prototype.dispose = function() {
			delete window[h.guid]._instances[this.guid];
			for (var j in this) {
				if (!h.lang.isFunction(this[j])) {
					delete this[j]
				}
			}
			this.disposed = true
		};
		h.lang.Class.prototype.toString = function() {
			return "[object " + (this._className || "Object") + "]"
		};
		h.lang.Event = function(k, j) {
			this.type = k;
			this.returnValue = true;
			this.target = j || null;
			this.currentTarget = null
		};
		h.lang.Class.prototype.addEventListener = function(m, n, j) {
			if (!h.lang.isFunction(n)) {
				return
			}
			!this.__listeners && (this.__listeners = {});
			var k = this.__listeners, l;
			if (typeof j == "string" && j) {
				if (/[^\w\-]/.test(j)) {
					throw ("nonstandard key:" + j)
				} else {
					n.hashCode = j;
					l = j
				}
			}
			m.indexOf("on") != 0 && (m = "on" + m);
			typeof k[m] != "object" && (k[m] = {});
			l = l || h.lang.guid();
			n.hashCode = l;
			k[m][l] = n
		};
		h.lang.Class.prototype.removeEventListener = function(l, m) {
			if (typeof m != "undefined") {
				if ((h.lang.isFunction(m) && !(m = m.hashCode))
						|| (!h.lang.isString(m))) {
					return
				}
			}
			!this.__listeners && (this.__listeners = {});
			l.indexOf("on") != 0 && (l = "on" + l);
			var j = this.__listeners;
			if (!j[l]) {
				return
			}
			if (typeof m != "undefined") {
				j[l][m] && delete j[l][m]
			} else {
				for (var k in j[l]) {
					delete j[l][k]
				}
			}
		};
		h.lang.Class.prototype.dispatchEvent = function(m, k) {
			if (h.lang.isString(m)) {
				m = new h.lang.Event(m)
			}
			!this.__listeners && (this.__listeners = {});
			k = k || {};
			for (var n in k) {
				m[n] = k[n]
			}
			var n, j = this.__listeners, l = m.type;
			m.target = m.target || this;
			m.currentTarget = this;
			l.indexOf("on") != 0 && (l = "on" + l);
			h.lang.isFunction(this[l]) && this[l].apply(this, arguments);
			if (typeof j[l] == "object") {
				for (n in j[l]) {
					j[l][n].apply(this, arguments)
				}
			}
			return m.returnValue
		};
		h.event = h.event || {};
		h.event._listeners = h.event._listeners || [];
		h.dom._g = function(j) {
			if (h.lang.isString(j)) {
				return document.getElementById(j)
			}
			return j
		};
		h._g = h.dom._g;
		h.event.on = function(j, o, m) {
			o = o.replace(/^on/i, "");
			j = h.dom._g(j);
			var n = function(r) {
				m.call(j, r)
			}, k = h.event._listeners, p = h.event._eventFilter, l, q = o;
			o = o.toLowerCase();
			if (p && p[o]) {
				l = p[o](j, o, n);
				q = l.type;
				n = l.listener
			}
			if (j.addEventListener) {
				j.addEventListener(q, n, false)
			} else {
				if (j.attachEvent) {
					j.attachEvent("on" + q, n)
				}
			}
			k[k.length] = [j, o, m, n, q];
			return j
		};
		h.on = h.event.on;
		h.event.un = function(p, m, q) {
			p = h.dom._g(p);
			m = m.replace(/^on/i, "").toLowerCase();
			var j = h.event._listeners, o = j.length, n = !q, k, l, r;
			while (o--) {
				k = j[o];
				if (k[1] === m && k[0] === p && (n || k[2] === q)) {
					l = k[4];
					r = k[3];
					if (p.removeEventListener) {
						p.removeEventListener(l, r, false)
					} else {
						if (p.detachEvent) {
							p.detachEvent("on" + l, r)
						}
					}
					j.splice(o, 1)
				}
			}
			return p
		};
		h.un = h.event.un;
		h.ui.Base = {
			id : "",
			getId : function(k) {
				var l = this, j;
				j = "tangram-" + l.uiType + "--" + (l.id ? l.id : l.guid);
				return k ? j + "-" + k : j
			},
			getClass : function(j) {
				var l = this, m = l.classPrefix, k = l.skin;
				if (j) {
					m += "-" + j;
					k += "-" + j
				}
				if (l.skin) {
					m += " " + k
				}
				return m
			},
			getMain : function() {
				return h.g(this.mainId)
			},
			getBody : function() {
				return h.g(this.getId())
			},
			uiType : "",
			getCallRef : function() {
				return "window['$BAIDU$']._instances['" + this.guid + "']"
			},
			getCallString : function(l) {
				var m = 0, j = Array.prototype.slice.call(arguments, 1), k = j.length;
				for (; m < k; m++) {
					if (typeof j[m] == "string") {
						j[m] = "'" + j[m] + "'"
					}
				}
				return this.getCallRef() + "." + l + "(" + j.join(",") + ");"
			},
			on : function(k, j, l) {
				h.on(k, j, l);
				this.addEventListener("ondispose", function() {
							h.un(k, j, l)
						})
			},
			renderMain : function(j) {
				var l = this, m = 0, k;
				if (l.getMain()) {
					return
				}
				j = h.g(j);
				if (!j) {
					j = document.createElement("div");
					document.body.appendChild(j);
					j.style.position = "absolute";
					j.className = l.getClass("main")
				}
				if (!j.id) {
					j.id = l.getId("main")
				}
				l.mainId = j.id;
				j.setAttribute("data-guid", l.guid);
				return j
			},
			dispose : function() {
				this.dispatchEvent("dispose");
				h.lang.Class.prototype.dispose.call(this)
			}
		};
		h.object = h.object || {};
		h.extend = h.object.extend = function(l, k) {
			for (var j in k) {
				if (k.hasOwnProperty(j)) {
					l[j] = k[j]
				}
			}
			return l
		};
		h.ui.createUI = function(q, k) {
			k = k || {};
			var m = k.superClass || h.lang.Class, n = m == h.lang.Class ? 1 : 0, p, r, l = function(
					t, u) {
				var j = this;
				t = t || {};
				m.call(j, !n ? t : (t.guid || ""), true);
				h.object.extend(j, l.options);
				h.object.extend(j, t);
				j.classPrefix = j.classPrefix || "tangram-"
						+ j.uiType.toLowerCase();
				for (p in h.ui.behavior) {
					if (typeof j[p] != "undefined" && j[p]) {
						h.object.extend(j, h.ui.behavior[p]);
						if (h.lang.isFunction(j[p])) {
							j.addEventListener("onload", function() {
										h.ui.behavior[p].call(j[p].apply(j))
									})
						} else {
							h.ui.behavior[p].call(j)
						}
					}
				}
				q.apply(j, arguments);
				for (p = 0, r = l._addons.length; p < r; p++) {
					l._addons[p](j)
				}
				if (t.parent && j.setParent) {
					j.setParent(t.parent)
				}
				if (!u && t.autoRender) {
					j.render(t.element)
				}
			}, s = function() {
			};
			s.prototype = m.prototype;
			var o = l.prototype = new s();
			for (p in h.ui.Base) {
				o[p] = h.ui.Base[p]
			}
			l.extend = function(j) {
				for (p in j) {
					l.prototype[p] = j[p]
				}
				return l
			};
			l._addons = [];
			l.register = function(j) {
				if (typeof j == "function") {
					l._addons.push(j)
				}
			};
			l.options = {};
			return l
		};
		h.ui.behavior = h.ui.behavior || {};
		h.string = h.string || {};
		(function() {
			var j = new RegExp(
					"(^[\\s\\t\\xa0\\u3000]+)|([\\u3000\\xa0\\s\\t]+\x24)", "g");
			h.string.trim = function(k) {
				return String(k).replace(j, "")
			}
		})();
		h.trim = h.string.trim;
		h.dom.addClass = function(m, l) {
			m = h.dom.g(m);
			var j = l.split(/\s+/), k = m.className, n = " " + k + " ", o = 0, p = j.length;
			for (; o < p; o++) {
				if (n.indexOf(" " + j[o] + " ") < 0) {
					k += (k ? " " : "") + j[o]
				}
			}
			m.className = k;
			return m
		};
		h.addClass = h.dom.addClass;
		h.dom.removeClass = function(n, m) {
			n = h.dom.g(n);
			var p = n.className.split(/\s+/), l = m.split(/\s+/), j, k = l.length, q, o = 0;
			for (; o < k; ++o) {
				for (q = 0, j = p.length; q < j; ++q) {
					if (p[q] == l[o]) {
						p.splice(q, 1);
						break
					}
				}
			}
			n.className = p.join(" ");
			return n
		};
		h.removeClass = h.dom.removeClass;
		h.dom.hasClass = function(m, l) {
			m = h.dom.g(m);
			var j = h.string.trim(l).split(/\s+/), k = j.length;
			l = m.className.split(/\s+/).join(" ");
			while (k--) {
				if (!(new RegExp("(^| )" + j[k] + "( |\x24)")).test(l)) {
					return false
				}
			}
			return true
		};
		h.event.getTarget = function(j) {
			return j.target || j.srcElement
		};
		h.array = h.array || {};
		h.each = h.array.forEach = h.array.each = function(l, n, j) {
			var o, m, p, k = l.length;
			if ("function" == typeof n) {
				for (p = 0; p < k; p++) {
					m = l[p];
					o = n.call(j || l, m, p);
					if (o === false) {
						break
					}
				}
			}
			return l
		};
		h.object.each = function(l, n) {
			var j, k, m;
			if ("function" == typeof n) {
				for (k in l) {
					if (l.hasOwnProperty(k)) {
						m = l[k];
						j = n.call(l, m, k);
						if (j === false) {
							break
						}
					}
				}
			}
			return l
		};
		h.fn = h.fn || {};
		h.fn.bind = function(j, k) {
			var l = arguments.length > 2 ? [].slice.call(arguments, 2) : null;
			return function() {
				var m = h.lang.isString(j) ? k[j] : j, n = (l) ? l
						.concat([].slice.call(arguments, 0)) : arguments;
				return m.apply(k || m, n)
			}
		};
		h.lang.Class.prototype.addEventListeners = function(n, m) {
			if (typeof m == "undefined") {
				for (var j in n) {
					this.addEventListener(j, n[j])
				}
			} else {
				n = n.split(",");
				var j = 0, k = n.length, l;
				for (; j < k; j++) {
					this.addEventListener(h.trim(n[j]), m)
				}
			}
		};
		(function() {
			var j = h.ui.behavior.statable = function() {
				var k = this;
				k.addEventListeners("ondisable,onenable", function(m, o) {
							var n, l;
							o = o || {};
							elementId = (o.element || k.getMain()).id;
							l = o.group;
							if (m.type == "ondisable"
									&& !k.getState(elementId, l)["disabled"]) {
								k.removeState("press", elementId, l);
								k.removeState("hover", elementId, l);
								k.setState("disabled", elementId, l)
							} else {
								if (m.type == "onenable"
										&& k.getState(elementId, l)["disabled"]) {
									k.removeState("disabled", elementId, l)
								}
							}
						})
			};
			j._states = {};
			j._allStates = ["hover", "press", "disabled"];
			j._allEventsName = ["mouseover", "mouseout", "mousedown", "mouseup"];
			j._eventsHandler = {
				mouseover : function(l, m) {
					var k = this;
					if (!k.getState(l, m)["disabled"]) {
						k.setState("hover", l, m);
						return true
					}
				},
				mouseout : function(l, m) {
					var k = this;
					if (!k.getState(l, m)["disabled"]) {
						k.removeState("hover", l, m);
						k.removeState("press", l, m);
						return true
					}
				},
				mousedown : function(l, m) {
					var k = this;
					if (!k.getState(l, m)["disabled"]) {
						k.setState("press", l, m);
						return true
					}
				},
				mouseup : function(l, m) {
					var k = this;
					if (!k.getState(l, m)["disabled"]) {
						k.removeState("press", l, m);
						return true
					}
				}
			};
			j._getStateHandlerString = function(l, n) {
				var m = this, o = 0, k = m._allEventsName.length, q = [], p;
				if (typeof l == "undefined") {
					l = n = ""
				}
				for (; o < k; o++) {
					p = m._allEventsName[o];
					q[o] = "on" + p + '="' + m.getCallRef() + "._fireEvent('"
							+ p + "', '" + l + "', '" + n + "', event)\""
				}
				return q.join(" ")
			};
			j._fireEvent = function(p, m, k, n) {
				var o = this, l = o.getId(m + k);
				if (o._eventsHandler[p].call(o, l, m)) {
					o.dispatchEvent(p, {
								element : l,
								group : m,
								key : k,
								DOMEvent : n
							})
				}
			};
			j.addState = function(l, k, n) {
				var m = this;
				m._allStates.push(l);
				if (k) {
					m._allEventsName.push(k);
					if (!n) {
						n = function() {
							return true
						}
					}
					m._eventsHandler[k] = n
				}
			};
			j.getState = function(k, l) {
				var m = this, n;
				l = l ? l + "-" : "";
				k = k ? k : m.getId();
				n = m._states[l + k];
				return n ? n : {}
			};
			j.setState = function(n, k, m) {
				var o = this, l, p;
				m = m ? m + "-" : "";
				k = k ? k : o.getId();
				l = m + k;
				o._states[l] = o._states[l] || {};
				p = o._states[l][n];
				if (!p) {
					o._states[l][n] = 1;
					h.addClass(k, o.getClass(m + n))
				}
			};
			j.removeState = function(n, k, m) {
				var o = this, l;
				m = m ? m + "-" : "";
				k = k ? k : o.getId();
				l = m + k;
				if (o._states[l]) {
					o._states[l][n] = 0;
					h.removeClass(k, o.getClass(m + n))
				}
			}
		})();
		h.browser = h.browser || {};
		h.browser.opera = /opera(\/| )(\d+(\.\d+)?)(.+?(version\/(\d+(\.\d+)?)))?/i
				.test(navigator.userAgent)
				? +(RegExp["\x246"] || RegExp["\x242"])
				: undefined;
		h.dom.insertHTML = function(m, k, n) {
			m = h.dom.g(m);
			var j, l;
			if (m.insertAdjacentHTML && !h.browser.opera) {
				m.insertAdjacentHTML(k, n)
			} else {
				j = m.ownerDocument.createRange();
				k = k.toUpperCase();
				if (k == "AFTERBEGIN" || k == "BEFOREEND") {
					j.selectNodeContents(m);
					j.collapse(k == "AFTERBEGIN")
				} else {
					l = k == "BEFOREBEGIN";
					j[l ? "setStartBefore" : "setEndAfter"](m);
					j.collapse(l)
				}
				j.insertNode(j.createContextualFragment(n))
			}
			return m
		};
		h.insertHTML = h.dom.insertHTML;
		h.string.format = function(m, k) {
			m = String(m);
			var j = Array.prototype.slice.call(arguments, 1), l = Object.prototype.toString;
			if (j.length) {
				j = j.length == 1 ? (k !== null
						&& (/\[object Array\]|\[object Object\]/
								.test(l.call(k))) ? k : j) : j;
				return m.replace(/#\{(.+?)\}/g, function(p, n) {
							var o = j[n];
							if ("[object Function]" == l.call(o)) {
								o = o(n)
							}
							return ("undefined" == typeof o ? "" : o)
						})
			}
			return m
		};
		h.format = h.string.format;
		h.ui.Base.setParent = function(j) {
			var l = this, k = l._parent;
			k && k.dispatchEvent("removechild");
			if (j.dispatchEvent("appendchild", {
						child : l
					})) {
				l._parent = j
			}
		};
		h.ui.Base.getParent = function() {
			return this._parent || null
		};
		h.browser.ie = h.ie = /msie (\d+\.\d+)/i.test(navigator.userAgent)
				? (document.documentMode || +RegExp["\x241"])
				: undefined;
		h.dom.remove = function(k) {
			k = h.dom._g(k);
			var j = k.parentNode;
			j && j.removeChild(k)
		};
		h.ui.Button = h.ui.createUI(new Function).extend({
			uiType : "button",
			tplBody : '<div id="#{id}" #{statable} class="#{class}">#{content}</div>',
			disabled : false,
			statable : true,
			_getString : function() {
				var j = this;
				return h.format(j.tplBody, {
							id : j.getId(),
							statable : j._getStateHandlerString(),
							"class" : j.getClass(),
							content : j.content
						})
			},
			render : function(l) {
				var j = this, k;
				j.addState("click", "click");
				h.dom.insertHTML(j.renderMain(l), "beforeEnd", j._getString());
				k = h.g(l).lastChild;
				if (j.title) {
					k.title = j.title
				}
				j.disabled && j.setState("disabled");
				j.dispatchEvent("onload")
			},
			isDisabled : function() {
				var k = this, j = k.getId();
				return k.getState()["disabled"]
			},
			dispose : function() {
				var j = this, k = j.getBody();
				j.dispatchEvent("dispose");
				h.each(j._allEventsName, function(l, m) {
							k["on" + l] = null
						});
				h.dom.remove(k);
				j.dispatchEvent("ondispose");
				h.lang.Class.prototype.dispose.call(j)
			},
			disable : function() {
				var j = this, k = j.getBody();
				j.dispatchEvent("ondisable", {
							element : k
						})
			},
			enable : function() {
				var j = this;
				body = j.getBody();
				j.dispatchEvent("onenable", {
							element : body
						})
			},
			fire : function(k, l) {
				var j = this, k = k.toLowerCase();
				if (j.getState()["disabled"]) {
					return
				}
				j._fireEvent(k, null, null, l)
			},
			update : function(k) {
				var j = this;
				h.extend(j, k);
				k.content && (j.getBody().innerHTML = k.content);
				j.dispatchEvent("onupdate")
			}
		});
		h.lang.isBoolean = function(j) {
			return typeof j === "boolean"
		};
		h.ui.Button.register(function(j) {
			if (!j.poll) {
				return
			}
			h.lang.isBoolean(j.poll) && (j.poll = {});
			j.addEventListener("mousedown", function(k) {
						var m = 0, n = j.poll.interval || 100, l = j.poll.time
								|| 0;
			(function	() {
							if (j.getState()["press"]) {
								m++ > l && j.onmousedown && j.onmousedown();
								j.poll.timeOut = setTimeout(arguments.callee, n)
							}
						})()
					});
			j.addEventListener("dispose", function() {
						if (j.poll.timeOut) {
							j.disable();
							window.clearTimeout(j.poll.timeOut)
						}
					})
		});
		h.date = h.date || {};
		h.number = h.number || {};
		h.number.pad = function(m, n) {
			var l = "", j = (m < 0), k = String(Math.abs(m));
			if (k.length < n) {
				l = (new Array(n - k.length + 1)).join("0")
			}
			return (j ? "-" : "") + l + k
		};
		h.date.format = function(t, o) {
			if ("string" != typeof o) {
				return t.toString()
			}
			function q(j, u) {
				o = o.replace(j, u)
			}
			var s = h.number.pad, n = t.getFullYear(), p = t.getMonth() + 1, k = t
					.getDate(), m = t.getHours(), r = t.getMinutes(), l = t
					.getSeconds();
			q(/yyyy/g, s(n, 4));
			q(/yy/g, s(parseInt(n.toString().slice(2), 10), 2));
			q(/MM/g, s(p, 2));
			q(/M/g, p);
			q(/dd/g, s(k, 2));
			q(/d/g, k);
			q(/HH/g, s(m, 2));
			q(/H/g, m);
			q(/hh/g, s(m % 12, 2));
			q(/h/g, m % 12);
			q(/mm/g, s(r, 2));
			q(/m/g, r);
			q(/ss/g, s(l, 2));
			q(/s/g, l);
			return o
		};
		h.array.indexOf = function(l, j, m) {
			var k = l.length, n = j;
			m = m | 0;
			if (m < 0) {
				m = Math.max(0, k + m)
			}
			for (; m < k; m++) {
				if (m in l && l[m] === j) {
					return m
				}
			}
			return -1
		};
		h.array.some = function(l, m, j) {
			var n = 0, k = l.length;
			for (; n < k; n++) {
				if (n in l && m.call(j || l, l[n], n)) {
					return true
				}
			}
			return false
		};
		h.lang.isDate = function(j) {
			return {}.toString.call(j) === "[object Date]"
					&& j.toString() !== "Invalid Date" && !isNaN(j)
		};
		h.lang.isNumber = function(j) {
			return "[object Number]" == Object.prototype.toString.call(j)
					&& isFinite(j)
		};
		h.i18n = h.i18n || {};
		h.i18n.cultures = h.i18n.cultures || {};
		h.i18n.cultures["zh-CN"] = h.object.extend(h.i18n.cultures["zh-CN"]
						|| {}, {
					calendar : {
						dateFormat : "yyyy-MM-dd",
						titleNames : "#{yyyy}年&nbsp;#{MM}月",
						monthNames : ["一", "二", "三", "四", "五", "六", "七", "八",
								"九", "十", "十一", "十二"],
						dayNames : {
							mon : "一",
							tue : "二",
							wed : "三",
							thu : "四",
							fri : "五",
							sat : "六",
							sun : "日"
						}
					},
					timeZone : 8,
					whitespace : new RegExp(
							"(^[\\s\\t\\xa0\\u3000]+)|([\\u3000\\xa0\\s\\t]+\x24)",
							"g"),
					number : {
						group : ",",
						groupLength : 3,
						decimal : ".",
						positive : "",
						negative : "-",
						_format : function(j, k) {
							return h.i18n.number._format(j, {
										group : this.group,
										groupLength : this.groupLength,
										decimal : this.decimal,
										symbol : k
												? this.negative
												: this.positive
									})
						}
					},
					currency : {
						symbol : "￥"
					},
					language : {
						ok : "确定",
						cancel : "取消",
						signin : "注册",
						signup : "登录"
					}
				});
		h.i18n.currentLocale = h.i18n.currentLocale || "zh-CN";
		h.i18n.date = h.i18n.date || {
			getDaysInMonth : function(k, j) {
				var l = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
				if (j == 1 && h.i18n.date.isLeapYear(k)) {
					return 29
				}
				return l[j]
			},
			isLeapYear : function(j) {
				return !(j % 400) || (!(j % 4) && !!(j % 100))
			},
			toLocaleDate : function(j, k, l) {
				return this._basicDate(j, k, l || h.i18n.currentLocale)
			},
			_basicDate : function(n, q, l) {
				var k = h.i18n.cultures[l || h.i18n.currentLocale].timeZone, m = k
						* 60, j, p, o = n.getTime();
				if (q) {
					j = h.i18n.cultures[q].timeZone;
					p = j * 60
				} else {
					p = -1 * n.getTimezoneOffset();
					j = j / 60
				}
				return new Date(j != k ? (o + (m - p) * 60000) : o)
			}
		};
		h.ui.Calendar = h.ui.createUI(function(k) {
			var j = this;
			j.flipContent = h.object.extend({
						prev : "&lt;",
						next : "&gt;"
					}, j.flipContent);
			j.addEventListener("mouseup", function(o) {
						var l = o.element, n = j._dates[l], m = h.dom
								.g(j._currElementId);
						m && h.dom.removeClass(m, j.getClass("date-current"));
						j._currElementId = l;
						j._initDate = n;
						h.dom.addClass(h.dom.g(l), j.getClass("date-current"));
						j.dispatchEvent("clickdate", {
									date : n
								})
					})
		}).extend({
			uiType : "calendar",
			weekStart : "Sun",
			statable : true,
			language : "zh-CN",
			tplDOM : '<div id="#{id}" class="#{class}">#{content}</div>',
			tplTable : '<table border="0" cellpadding="0" cellspacing="1" class="#{class}"><thead class="#{headClass}">#{head}</thead><tbody class="#{bodyClass}">#{body}</tbody></table>',
			tplDateCell : '<td id="#{id}" class="#{class}" #{handler}>#{content}</td>',
			tplTitle : '<div id="#{id}" class="#{class}"><div id="#{labelId}" class="#{labelClass}">#{text}</div><div id="#{prevId}" class="#{prevClass}"></div><div id="#{nextId}" class="#{nextClass}"></div></div>',
			_initialize : function() {
				var k = this;
				function j(l) {
					var m = [];
					h.array.each(l, function(n) {
								m.push(h.lang.isDate(n) ? k._toLocalDate(n) : {
									start : k._toLocalDate(n.start),
									end : k._toLocalDate(n.end)
								})
							});
					return m
				}
				k._highlightDates = j(k.highlightDates || []);
				k._disableDates = j(k.disableDates || []);
				k._initDate = k._toLocalDate(k.initDate || new Date());
				k._currDate = new Date(k._initDate.getTime());
				k.weekStart = k.weekStart.toLowerCase()
			},
			_getDateJson : function(j) {
				var n = this, k = h.lang.guid(), l = n._currDate, p = [], o;
				function m(r, s) {
					return r.getDate() == s.getDate()
							&& Math.abs(r.getTime() - s.getTime()) < 24 * 60
									* 60 * 1000
				}
				function q(r, t) {
					var s = t.getTime();
					return h.array.some(r, function(u) {
								if (h.lang.isDate(u)) {
									return m(u, t)
								} else {
									return m(u.start, t)
											|| s > u.start.getTime()
											&& s <= u.end.getTime()
								}
							})
				}
				j.getMonth() != l.getMonth()
						&& p.push(n.getClass("date-other"));
				q(n._highlightDates, j) && p.push(n.getClass("date-highlight"));
				if (m(n._initDate, j)) {
					p.push(n.getClass("date-current"));
					n._currElementId = n.getId(k)
				}
				m(n._toLocalDate(new Date()), j)
						&& p.push(n.getClass("date-today"));
				o = q(n._disableDates, j) && (p = []);
				return {
					id : n.getId(k),
					"class" : p.join("\x20"),
					handler : n._getStateHandlerString("", k),
					date : j,
					disabled : o
				}
			},
			_getMonthCount : function(n, l) {
				var k = h.i18n.date.getDaysInMonth, j = [31, 28, 31, 30, 31,
						30, 31, 31, 30, 31, 30, 31], m;
				k && (m = k(n, l));
				if (!h.lang.isNumber(m)) {
					m = 1 == l && (n % 4) && (n % 100 != 0 || n % 400 == 0)
							? 29
							: j[l]
				}
				return m
			},
			_getDateTableString : function() {
				var v = this, C = h.i18n.cultures[v.language].calendar, H = [
						"sun", "mon", "tue", "wed", "thu", "fri", "sat"], I = v._currDate, u = I
						.getFullYear(), w = I.getMonth(), t = new Date(u, w, 1)
						.getDay(), B = 0, D = [], x = [], A = [], j = v._disabledIds = [], E = 0, F = 0, y = H.length, z, G;
				for (; E < y; E++) {
					H[E] == v.weekStart && (B = E);
					(B > 0 ? D : A).push("<td>", C.dayNames[H[E]], "</td>")
				}
				D = D.concat(A);
				D.unshift("<tr>");
				D.push("</tr>");
				t = (t < B ? t + 7 : t) - B;
				z = Math.ceil((v._getMonthCount(u, w) + t) / y);
				v._dates = {};
				for (E = 0; E < z; E++) {
					x.push("<tr>");
					for (F = 0; F < y; F++) {
						G = v._getDateJson(new Date(u, w, E * y + F + 1 - t));
						v._dates[G.id] = G.date;
						G.disabled && j.push(G.id);
						x.push(h.string.format(v.tplDateCell, {
									id : G.id,
									"class" : G["class"],
									handler : G.handler,
									content : G.date.getDate()
								}))
					}
					x.push("</tr>")
				}
				return h.string.format(v.tplTable, {
							"class" : v.getClass("table"),
							headClass : v.getClass("week"),
							bodyClass : v.getClass("date"),
							head : D.join(""),
							body : x.join("")
						})
			},
			getString : function() {
				var j = this;
				return h.string.format(j.tplDOM, {
							id : j.getId(),
							"class" : j.getClass(),
							content : h.string.format(j.tplDOM, {
										id : j.getId("content"),
										"class" : j.getClass("content")
									})
						})
			},
			_toLocalDate : function(j) {
				return j ? h.i18n.date.toLocaleDate(j, null, this.language) : j
			},
			_renderDate : function() {
				var j = this;
				h.dom.g(j.getId("content")).innerHTML = j._getDateTableString();
				h.array.each(j._disabledIds, function(k) {
							j.setState("disabled", k)
						})
			},
			_basicFlipMonth : function(l) {
				var j = this, m = j._currDate, n = m.getMonth()
						+ (l == "prev" ? -1 : 1), k = m.getFullYear()
						+ (n < 0 ? -1 : (n > 11 ? 1 : 0));
				n = n < 0 ? 12 : (n > 11 ? 0 : n);
				m.setYear(k);
				j.gotoMonth(n);
				j.dispatchEvent(l + "month", {
							date : new Date(m.getTime())
						})
			},
			renderTitle : function() {
				var o = this, p, q, l = o._currDate, m = h.i18n.cultures[o.language].calendar, n = h.dom
						.g(o.getId("label")), k = h.string.format(m.titleNames,
						{
							yyyy : l.getFullYear(),
							MM : m.monthNames[l.getMonth()],
							dd : l.getDate()
						});
				if (n) {
					n.innerHTML = k;
					return
				}
				h.dom.insertHTML(o.getBody(), "afterBegin", h.string.format(
								o.tplTitle, {
									id : o.getId("title"),
									"class" : o.getClass("title"),
									labelId : o.getId("label"),
									labelClass : o.getClass("label"),
									text : k,
									prevId : o.getId("prev"),
									prevClass : o.getClass("prev"),
									nextId : o.getId("next"),
									nextClass : o.getClass("next")
								}));
				function j(r) {
					return {
						classPrefix : o.classPrefix + "-" + r + "btn",
						skin : o.skin ? o.skin + "-" + r : "",
						content : o.flipContent[r],
						poll : {
							time : 4
						},
						element : o.getId(r),
						autoRender : true,
						onmousedown : function() {
							o._basicFlipMonth(r)
						}
					}
				}
				p = new h.ui.Button(j("prev"));
				q = new h.ui.Button(j("next"));
				o.addEventListener("ondispose", function() {
							p.dispose();
							q.dispose()
						})
			},
			render : function(l) {
				var k = this, j = k.skin;
				if (!l || k.getMain()) {
					return
				}
				h.dom.insertHTML(k.renderMain(l), "beforeEnd", k.getString());
				k._initialize();
				k.renderTitle();
				k._renderDate();
				h.dom.g(k.getId("content")).style.height = (k.getBody().clientHeight || k
						.getBody().offsetHeight)
						- h.dom.g(k.getId("title")).offsetHeight + "px";
				k.dispatchEvent("onload")
			},
			update : function(k) {
				var j = this;
				h.object.extend(j, k || {});
				j._initialize();
				j.renderTitle();
				j._renderDate();
				j.dispatchEvent("onupdate")
			},
			gotoDate : function(k) {
				var j = this;
				j._currDate = j._toLocalDate(k);
				j._initDate = j._toLocalDate(k);
				j.renderTitle();
				j._renderDate();
				j.dispatchEvent("ongotodate")
			},
			gotoYear : function(j) {
				var n = this, l = n._currDate, m = l.getMonth(), k = l
						.getDate(), o;
				if (1 == m) {
					o = n._getMonthCount(j, m);
					k > o && l.setDate(o)
				}
				l.setFullYear(j);
				n.renderTitle();
				n._renderDate();
				n.dispatchEvent("ongotoyear")
			},
			gotoMonth : function(l) {
				var n = this, m = n._currDate, l = Math.min(Math.max(l, 0), 11), k = m
						.getDate(), j = n._getMonthCount(m.getFullYear(), l);
				k > j && m.setDate(j);
				m.setMonth(l);
				n.renderTitle();
				n._renderDate();
				n.dispatchEvent("ongotomonth")
			},
			getToday : function() {
				return me._toLocalDate(new Date())
			},
			getDate : function() {
				return new Date(this._initDate.getTime())
			},
			setDate : function(k) {
				if (h.lang.isDate(k)) {
					var j = this;
					j._initDate = k;
					j._currDate = k
				}
			},
			prevMonth : function() {
				this._basicFlipMonth("prev")
			},
			nextMonth : function() {
				this._basicFlipMonth("next")
			},
			dispose : function() {
				var j = this;
				j.dispatchEvent("dispose");
				h.dom.remove(j.getMain());
				h.lang.Class.prototype.dispose.call(j)
			}
		});
		g = h.ui.Calendar;
		e = h.date.format
	})();
	var a = function(h) {
		this.initOptions(h);
		this.initPopup();
		var i = this;
		this._calendar = new g({
					onclickdate : function(j) {
						i.fireEvent("pickdate", j.date)
					}
				})
	};
	a.prototype = {
		content : "",
		_Popup_postRender : f.prototype.postRender,
		postRender : function() {
			this._calendar.render(this.getDom("content"));
			this._Popup_postRender()
		}
	};
	d.inherits(a, f);
	var b = baidu.editor.ui.DateButton = function(h) {
		this.initOptions(h);
		this.initDateButton()
	};
	b.prototype = {
		initDateButton : function() {
			var h = this;
			this.popup = new a({
						onpickdate : function(j, i) {
							if (h.fireEvent("pickdate", e(i, "yyyy-MM-dd")) !== false) {
								h.popup.hide()
							}
						}
					});
			this.initSplitButton()
		}
	};
	d.inherits(b, c)
})();
(function() {
	var h = baidu.editor.utils;
	var g = baidu.editor.ui;
	var e = g.Dialog;
	g.Dialog = function(j) {
		var k = new e(j);
		k.addListener("hide", function() {
					if (k.editor) {
						var m = k.editor;
						try {
							if (baidu.editor.browser.ie) {
								m.selection._bakIERange.select()
							} else {
								m.focus()
							}
						} catch (l) {
						}
					}
				});
		return k
	};
	var d, c;
	var f = ["Undo", "Redo", "FormatMatch", "Bold", "Italic", "Underline",
			"StrikeThrough", "Subscript", "Superscript", "Source", "Indent",
			"Outdent", "BlockQuote", "PastePlain", "PageBreak", "SelectAll",
			"Print", "Preview", "Horizontal", "RemoveFormat", "Time", "Date",
			"Unlink", "InsertParagraphBeforeTable", "InsertRow", "InsertCol",
			"MergeRight", "MergeDown", "DeleteRow", "DeleteCol", "SplittoRows",
			"SplittoCols", "SplittoCells", "MergeCells", "DeleteTable"];
	d = f.length;
	while (d--) {
		c = f[d];
		g[c] = function(j) {
			return function(k, m) {
				m = m || k.options.labelMap[j.toLowerCase()] || "";
				var l = new g.Button({
							className : "edui-for-" + j.toLowerCase(),
							title : m,
							onclick : function() {
								k.execCommand(j)
							},
							showText : false
						});
				k.addListener("selectionchange", function() {
							var n = k.queryCommandState(j.toLowerCase());
							if (n == -1) {
								l.setDisabled(true);
								l.setChecked(false)
							} else {
								l.setDisabled(false);
								l.setChecked(n)
							}
						});
				return l
			}
		}(c)
	}
	g.ClearDoc = function(j, m) {
		var l = "ClearDoc";
		m = m || j.options.labelMap[l.toLowerCase()] || "";
		var k = new g.Button({
					className : "edui-for-" + l.toLowerCase(),
					title : m,
					onclick : function() {
						if (confirm("确定清空文档吗？")) {
							j.execCommand("cleardoc")
						}
					}
				});
		return k
	};
	g.Justify = function(k, j, m) {
		j = (j || "left").toLowerCase();
		m = m || k.options.labelMap["justify" + j.toLowerCase()] || "";
		var l = new g.Button({
					className : "edui-for-justify" + j.toLowerCase(),
					title : m,
					onclick : function() {
						k.execCommand("Justify", j)
					}
				});
		k.addListener("selectionchange", function() {
					var o = k.queryCommandState("Justify");
					l.setDisabled(o == -1);
					var n = k.queryCommandValue("Justify");
					l.setChecked(n == j)
				});
		return l
	};
	g.JustifyLeft = function(j, k) {
		return g.Justify(j, "left", k)
	};
	g.JustifyCenter = function(j, k) {
		return g.Justify(j, "center", k)
	};
	g.JustifyRight = function(j, k) {
		return g.Justify(j, "right", k)
	};
	g.JustifyJustify = function(j, k) {
		return g.Justify(j, "justify", k)
	};
	g.Directionality = function(k, j, m) {
		j = (j || "left").toLowerCase();
		m = m || k.options.labelMap["directionality" + j.toLowerCase()] || "";
		var l = new g.Button({
					className : "edui-for-directionality" + j.toLowerCase(),
					title : m,
					onclick : function() {
						k.execCommand("directionality", j)
					},
					type : j
				});
		k.addListener("selectionchange", function() {
					var o = k.queryCommandState("directionality");
					l.setDisabled(o == -1);
					var n = k.queryCommandValue("directionality");
					l.setChecked(n == l.type)
				});
		return l
	};
	g.DirectionalityLtr = function(j, k) {
		return new g.Directionality(j, "ltr", k)
	};
	g.DirectionalityRtl = function(j, k) {
		return new g.Directionality(j, "rtl", k)
	};
	var i = ["BackColor", "ForeColor"];
	d = i.length;
	while (d--) {
		c = i[d];
		g[c] = function(j) {
			return function(k, m) {
				m = m || k.options.labelMap[j.toLowerCase()] || "";
				var l = new g.ColorButton({
							className : "edui-for-" + j.toLowerCase(),
							color : "default",
							title : m,
							onpickcolor : function(o, n) {
								k.execCommand(j, n)
							},
							onpicknocolor : function() {
								k.execCommand(j, "default");
								this.setColor("transparent");
								this.color = "default"
							},
							onbuttonclick : function() {
								k.execCommand(j, this.color)
							}
						});
				k.addListener("selectionchange", function() {
							var n = k.queryCommandState(j);
							if (n == -1) {
								l.setDisabled(true)
							} else {
								l.setDisabled(false)
							}
						});
				return l
			}
		}(c)
	}
	var a = ["SearchReplace", "Help", "Spechars"];
	d = a.length;
	while (d--) {
		c = a[d];
		g[c] = function(j) {
			j = j.toLowerCase();
			return function(m, l, o) {
				l = l || m.options.iframeUrlMap[j.toLowerCase()]
						|| "about:blank";
				l = m.ui.mapUrl(l);
				o = o || m.options.labelMap[j.toLowerCase()] || "";
				var k = new g.Dialog({
							iframeUrl : l,
							autoReset : true,
							draggable : true,
							editor : m,
							className : "edui-for-" + j,
							title : o,
							onok : function() {
							},
							oncancel : function() {
							},
							onclose : function(q, p) {
								if (p) {
									return this.onok()
								} else {
									return this.oncancel()
								}
							}
						});
				k.render();
				var n = new g.Button({
							className : "edui-for-" + j,
							title : o,
							onclick : function() {
								k.open()
							}
						});
				m.addListener("selectionchange", function() {
							var p = m.queryCommandState("inserthtml");
							if (p == -1) {
								n.setDisabled(true)
							} else {
								n.setDisabled(false)
							}
						});
				return n
			}
		}(c)
	}
	var b = ["Anchor", "Link", "Image", "Map", "GMap", "Video", "TableSuper",
			"Code", "InsertFrame"];
	d = b.length;
	while (d--) {
		c = b[d];
		g[c] = function(j) {
			j = j.toLowerCase();
			return function(m, l, o) {
				l = l || m.options.iframeUrlMap[j.toLowerCase()]
						|| "about:blank";
				l = m.ui.mapUrl(l);
				o = o || m.options.labelMap[j.toLowerCase()] || "";
				var k = new g.Dialog({
							iframeUrl : l,
							autoReset : true,
							draggable : true,
							editor : m,
							className : "edui-for-" + j,
							title : o,
							buttons : [{
										className : "edui-okbutton",
										label : "确认",
										onclick : function() {
											k.close(true)
										}
									}, {
										className : "edui-cancelbutton",
										label : "取消",
										onclick : function() {
											k.close(false)
										}
									}],
							onok : function() {
							},
							oncancel : function() {
							},
							onclose : function(q, p) {
								if (p) {
									return this.onok()
								} else {
									return this.oncancel()
								}
							}
						});
				k.render();
				var n = new g.Button({
							className : "edui-for-" + j,
							title : o,
							onclick : function() {
								k.open()
							}
						});
				m.addListener("selectionchange", function() {
							var p = m.queryCommandState(j);
							if (p == -1) {
								n.setDisabled(true)
							} else {
								n.setDisabled(false)
							}
						});
				return n
			}
		}(c)
	}
	g.FontFamily = function(l, m, r) {
		m = m || l.options.listMap.fontfamily || [];
		r = r || l.options.labelMap.fontfamily || "";
		var n = [];
		for (var k = 0; k < m.length; k++) {
			var j = m[k];
			var p = l.options.fontMap[j];
			var s = '"' + j + '"';
			var q = new RegExp(j, "i");
			if (p) {
				s = '"' + p.join('","') + '"';
				q = new RegExp(p.join("[^\\s]|"), "i")
			}
			n.push({
				label : j,
				value : s,
				regex : q,
				renderLabelHtml : function() {
					return '<div class="edui-label %%-label" style="font-family:'
							+ h.unhtml(this.value)
							+ '">'
							+ (this.label || "")
							+ "</div>"
				}
			})
		}
		var o = new g.Combox({
					items : n,
					onselect : function(v, u) {
						l.execCommand("FontFamily", this.items[u].value)
					},
					onbuttonclick : function() {
						this.showPopup()
					},
					title : r,
					className : "edui-for-fontfamily",
					indexByValue : function(v) {
						v = v.replace(/,/, "|").replace(/"/g, "");
						for (var t = 0; t < this.items.length; t++) {
							var u = this.items[t];
							if (u.regex.test(v)) {
								return t
							}
						}
						return -1
					}
				});
		l.addListener("selectionchange", function() {
					var t = l.queryCommandState("FontFamily");
					if (t == -1) {
						o.setDisabled(true)
					} else {
						o.setDisabled(false);
						o.setValue(l.queryCommandValue("FontFamily"))
					}
				});
		return o
	};
	g.FontSize = function(m, o, p) {
		o = o || m.options.listMap.fontsize || [];
		p = p || m.options.labelMap.fontsize || "";
		var j = [];
		for (var l = 0; l < o.length; l++) {
			var k = o[l] + "px";
			j.push({
						label : k,
						value : k,
						renderLabelHtml : function() {
							return '<div class="edui-label %%-label" style="font-size:'
									+ this.value
									+ '">'
									+ (this.label || "")
									+ "</div>"
						}
					})
		}
		var n = new g.Combox({
					items : j,
					title : p,
					onselect : function(r, q) {
						m.execCommand("FontSize", this.items[q].value)
					},
					onbuttonclick : function() {
						this.showPopup()
					},
					className : "edui-for-fontsize"
				});
		m.addListener("selectionchange", function() {
					var r = m.queryCommandState("FontSize");
					if (r == -1) {
						n.setDisabled(true)
					} else {
						n.setDisabled(false);
						var q = m.queryCommandValue("FontSize");
						n.setValue(q)
					}
				});
		return n
	};
	g.RowSpacing = function(k, l, o) {
		l = l || k.options.listMap.rowspacing || [];
		o = o || k.options.labelMap.rowspacing || "";
		var m = [];
		for (var j = 0; j < l.length; j++) {
			var q = l[j].split(":");
			var r = q[0];
			var p = q[1];
			m.push({
				label : r,
				value : p,
				renderLabelHtml : function() {
					return '<div class="edui-label %%-label" style="font-size:12px">'
							+ (this.label || "") + "</div>"
				}
			})
		}
		var n = new g.Combox({
					items : m,
					title : o,
					onselect : function(u, s) {
						k.execCommand("RowSpacing", this.items[s].value)
					},
					onbuttonclick : function() {
						this.showPopup()
					},
					className : "edui-for-rowspacing"
				});
		k.addListener("selectionchange", function() {
					var t = k.queryCommandState("RowSpacing");
					if (t == -1) {
						n.setDisabled(true)
					} else {
						n.setDisabled(false);
						var s = k.queryCommandValue("RowSpacing");
						n.setValue(s)
					}
				});
		return n
	};
	g.Paragraph = function(k, l, o) {
		l = l || k.options.listMap.paragraph || [];
		o = o || k.options.labelMap.paragraph || "";
		var m = [];
		for (var j = 0; j < l.length; j++) {
			var q = l[j].split(":");
			var r = q[0];
			var p = q[1];
			m.push({
				label : p,
				value : r,
				renderLabelHtml : function() {
					return '<div class="edui-label %%-label"><span class="edui-for-'
							+ this.value
							+ '">'
							+ (this.label || "")
							+ "</span></div>"
				}
			})
		}
		var n = new g.Combox({
					items : m,
					title : o,
					className : "edui-for-paragraph",
					onselect : function(u, s) {
						k.execCommand("Paragraph", this.items[s].value)
					},
					onbuttonclick : function() {
						this.showPopup()
					}
				});
		k.addListener("selectionchange", function(s, u) {
					var w = k.queryCommandState("Paragraph");
					if (w == -1) {
						n.setDisabled(true)
					} else {
						n.setDisabled(false);
						var v = k.queryCommandValue("Paragraph");
						n.setValue(v)
					}
				});
		return n
	};
	g.InsertTable = function(l, k, n) {
		k = k || l.options.iframeUrlMap.inserttable || "about:blank";
		k = l.ui.mapUrl(k);
		n = n || l.options.labelMap.inserttable || "";
		var j = new g.Dialog({
					iframeUrl : k,
					autoReset : true,
					draggable : true,
					editor : l,
					className : "edui-for-inserttable",
					title : n,
					buttons : [{
								className : "edui-okbutton",
								label : "确认",
								onclick : function() {
									j.close(true)
								}
							}, {
								className : "edui-cancelbutton",
								label : "取消",
								onclick : function() {
									j.close(false)
								}
							}],
					onok : function() {
					},
					oncancel : function() {
					},
					onclose : function(p, o) {
						if (o) {
							return this.onok()
						} else {
							return this.oncancel()
						}
					}
				});
		j.render();
		l.tableDialog = j;
		var m = new g.TableButton({
					title : n,
					className : "edui-for-inserttable",
					onpicktable : function(o, q, p) {
						l.execCommand("InsertTable", {
									numRows : p,
									numCols : q
								})
					},
					onmore : function() {
						j.open()
					},
					onbuttonclick : function() {
						j.open()
					}
				});
		l.addListener("selectionchange", function() {
					var o = l.queryCommandState("inserttable");
					if (o == -1) {
						m.setDisabled(true)
					} else {
						m.setDisabled(false)
					}
				});
		return m
	};
	g.InsertOrderedList = function(j, l) {
		l = l || j.options.labelMap.insertorderedlist || "";
		var m = function() {
			j.execCommand("InsertOrderedList", this.value)
		};
		var k = new g.MenuButton({
					className : "edui-for-insertorderedlist",
					title : l,
					items : [{
								label : "1,2,3...",
								value : "decimal",
								onclick : m
							}, {
								label : "a,b,c ...",
								value : "lower-alpha",
								onclick : m
							}, {
								label : "i,ii,iii...",
								value : "lower-roman",
								onclick : m
							}, {
								label : "A,B,C",
								value : "upper-alpha",
								onclick : m
							}, {
								label : "I,II,III...",
								value : "upper-roman",
								onclick : m
							}],
					onbuttonclick : function() {
						j.execCommand("InsertOrderedList", this.value)
					}
				});
		j.addListener("selectionchange", function() {
					var o = j.queryCommandState("InsertOrderedList");
					if (o == -1) {
						k.setDisabled(true)
					} else {
						k.setDisabled(false);
						var n = j.queryCommandValue("InsertOrderedList");
						k.setValue(n);
						k.setChecked(o)
					}
				});
		return k
	};
	g.InsertUnorderedList = function(j, l) {
		l = l || j.options.labelMap.insertunorderedlist || "";
		var m = function() {
			j.execCommand("InsertUnorderedList", this.value)
		};
		var k = new g.MenuButton({
					className : "edui-for-insertunorderedlist",
					title : l,
					items : [{
								label : "○ 小圆圈",
								value : "circle",
								onclick : m
							}, {
								label : "● 小圆点",
								value : "disc",
								onclick : m
							}, {
								label : "■ 小方块",
								value : "square",
								onclick : m
							}],
					onbuttonclick : function() {
						j.execCommand("InsertUnorderedList", this.value)
					}
				});
		j.addListener("selectionchange", function() {
					var o = j.queryCommandState("InsertUnorderedList");
					if (o == -1) {
						k.setDisabled(true)
					} else {
						k.setDisabled(false);
						var n = j.queryCommandValue("InsertUnorderedList");
						k.setValue(n);
						k.setChecked(o)
					}
				});
		return k
	};
	g.FullScreen = function(j, k) {
		k = k || j.options.labelMap.fullscreen || "";
		return new g.Button({
					className : "edui-for-fullscreen",
					title : k,
					onclick : function() {
						if (j.ui) {
							j.ui.setFullScreen(!j.ui.isFullScreen())
						}
						this.setChecked(j.ui.isFullScreen())
					}
				})
	};
	g.MultiMenu = function(k, j, m) {
		m = m || k.options.labelMap.multiMenu || "";
		j = j || k.options.iframeUrlMap.multimenu || "about:blank";
		j = k.ui.mapUrl(j);
		var l = new g.MultiMenuPop({
					title : m,
					editor : k,
					className : "edui-for-multimenu",
					iframeUrl : j
				});
		k.addListener("selectionchange", function() {
					var n = k.queryCommandState("inserthtml");
					if (n == -1) {
						l.setDisabled(true)
					} else {
						l.setDisabled(false)
					}
				});
		return l
	};
	g.Date = function(j) {
		var k = new g.DateButton({
					onpickdate : function(m, l) {
						j.execCommand("inserthtml", l)
					},
					onbuttonclick : function() {
						j.execCommand("date")
					},
					className : "edui-for-date"
				});
		j.addListener("selectionchange", function() {
					var l = j.queryCommandState("inserthtml");
					if (l == -1) {
						k.setDisabled(true)
					} else {
						k.setDisabled(false)
					}
				});
		return k
	}
})();
(function() {
	var a = baidu.editor.utils, c = baidu.editor.ui.uiUtils, d = baidu.editor.ui.UIBase;
	function b(e) {
		this.initOptions(e);
		this.initEditorUI()
	}
	b.prototype = {
		uiName : "editor",
		initEditorUI : function() {
			this.editor.ui = this;
			this.initUIBase();
			this._initToolbars();
			var k = this.editor;
			k.addListener("ready", function() {
						baidu.editor.dom.domUtils.on(k.window, "scroll",
								function() {
									baidu.editor.ui.Popup.postHide()
								})
					});
			k.addListener("mousedown", function(p, o) {
						var q = o.target || o.srcElement;
						baidu.editor.ui.Popup.postHide(q)
					});
			k.addListener("contextmenu", function(p, o) {
						baidu.editor.ui.Popup.postHide()
					});
			var l = this;
			k.addListener("selectionchange", function() {
						l._updateElementPath()
					});
			k.addListener("sourcemodechanged", function(o, p) {
						if (k.options.elementPathEnabled) {
							if (p) {
								l.disableElementPath()
							} else {
								l.enableElementPath()
							}
						}
					});
			var n = new baidu.editor.ui.Dialog({
						iframeUrl : k.ui
								.mapUrl(l.editor.options.iframeUrlMap.link),
						autoReset : true,
						draggable : true,
						editor : k,
						className : "edui-for-link",
						title : "超链接",
						buttons : [{
									className : "edui-okbutton",
									label : "确认",
									onclick : function() {
										n.close(true)
									}
								}, {
									className : "edui-cancelbutton",
									label : "取消",
									onclick : function() {
										n.close(false)
									}
								}],
						onok : function() {
						},
						oncancel : function() {
						},
						onclose : function(p, o) {
							if (o) {
								return this.onok()
							} else {
								return this.oncancel()
							}
						}
					});
			n.render();
			var h = new baidu.editor.ui.Dialog({
						iframeUrl : k.ui
								.mapUrl(l.editor.options.iframeUrlMap.image),
						autoReset : true,
						draggable : true,
						editor : k,
						className : "edui-for-image",
						title : "图片",
						buttons : [{
									className : "edui-okbutton",
									label : "确认",
									onclick : function() {
										h.close(true)
									}
								}, {
									className : "edui-cancelbutton",
									label : "取消",
									onclick : function() {
										h.close(false)
									}
								}],
						onok : function() {
						},
						oncancel : function() {
						},
						onclose : function(p, o) {
							if (o) {
								return this.onok()
							} else {
								return this.oncancel()
							}
						}
					});
			h.render();
			var i = new baidu.editor.ui.Dialog({
						iframeUrl : k.ui
								.mapUrl(l.editor.options.iframeUrlMap.anchor),
						autoReset : true,
						draggable : true,
						editor : k,
						className : "edui-for-anchor",
						title : "锚点",
						buttons : [{
									className : "edui-okbutton",
									label : "确认",
									onclick : function() {
										i.close(true)
									}
								}, {
									className : "edui-cancelbutton",
									label : "取消",
									onclick : function() {
										i.close(false)
									}
								}],
						onok : function() {
						},
						oncancel : function() {
						},
						onclose : function(p, o) {
							if (o) {
								return this.onok()
							} else {
								return this.oncancel()
							}
						}
					});
			i.render();
			var g = new baidu.editor.ui.Dialog({
						iframeUrl : k.ui
								.mapUrl(l.editor.options.iframeUrlMap.video),
						autoReset : true,
						draggable : true,
						editor : k,
						className : "edui-for-video",
						title : "视频",
						buttons : [{
									className : "edui-okbutton",
									label : "确认",
									onclick : function() {
										g.close(true)
									}
								}, {
									className : "edui-cancelbutton",
									label : "取消",
									onclick : function() {
										g.close(false)
									}
								}],
						onok : function() {
						},
						oncancel : function() {
						},
						onclose : function(p, o) {
							if (o) {
								return this.onok()
							} else {
								return this.oncancel()
							}
						}
					});
			g.render();
			var f = new baidu.editor.ui.Dialog({
						iframeUrl : k.ui
								.mapUrl(l.editor.options.iframeUrlMap.map),
						autoReset : true,
						draggable : true,
						editor : k,
						className : "edui-for-map",
						title : "地图",
						buttons : [{
									className : "edui-okbutton",
									label : "确认",
									onclick : function() {
										f.close(true)
									}
								}, {
									className : "edui-cancelbutton",
									label : "取消",
									onclick : function() {
										f.close(false)
									}
								}],
						onok : function() {
						},
						oncancel : function() {
						},
						onclose : function(p, o) {
							if (o) {
								return this.onok()
							} else {
								return this.oncancel()
							}
						}
					});
			f.render();
			var j = new baidu.editor.ui.Dialog({
						iframeUrl : k.ui
								.mapUrl(l.editor.options.iframeUrlMap.gmap),
						autoReset : true,
						draggable : true,
						editor : k,
						className : "edui-for-gmap",
						title : "Google地图",
						buttons : [{
									className : "edui-okbutton",
									label : "确认",
									onclick : function() {
										j.close(true)
									}
								}, {
									className : "edui-cancelbutton",
									label : "取消",
									onclick : function() {
										j.close(false)
									}
								}],
						onok : function() {
						},
						oncancel : function() {
						},
						onclose : function(p, o) {
							if (o) {
								return this.onok()
							} else {
								return this.oncancel()
							}
						}
					});
			j.render();
			var e = new baidu.editor.ui.Popup({
				content : "",
				className : "edui-bubble",
				_onEditButtonClick : function() {
					this.hide();
					n.open()
				},
				_onImgEditButtonClick : function() {
					this.hide();
					var p = k.selection.getRange().getClosedNode();
					var o = baidu.editor.dom.domUtils.findParentByTagName(p,
							"img", true);
					if (o && o.className.indexOf("edui-faked-video") != -1) {
						g.open()
					} else {
						if (o
								&& o.src.indexOf("http://api.map.baidu.com") != -1) {
							f.open()
						} else {
							if (o
									&& o.src
											.indexOf("http://maps.google.com/maps/api/staticmap") != -1) {
								j.open()
							} else {
								if (o && o.getAttribute("anchorname")) {
									i.open()
								} else {
									h.open()
								}
							}
						}
					}
				},
				_onImgSetFloat : function(q, r) {
					var p = k.selection.getRange().getClosedNode();
					var o = baidu.editor.dom.domUtils.findParentByTagName(p,
							"img", true);
					if (o) {
						switch (r) {
							case -2 :
								if (!!window.ActiveXObject) {
									o.style.removeAttribute("display");
									o.style.styleFloat = ""
								} else {
									o.style.removeProperty("display");
									o.style.cssFloat = ""
								}
								break;
							case -1 :
								if (!!window.ActiveXObject) {
									o.style.removeAttribute("display");
									o.style.styleFloat = "left"
								} else {
									o.style.removeProperty("display");
									o.style.cssFloat = "left"
								}
								break;
							case 1 :
								if (!!window.ActiveXObject) {
									o.style.removeAttribute("display");
									o.style.styleFloat = "right"
								} else {
									o.style.removeProperty("display");
									o.style.cssFloat = "right"
								}
								break;
							case 2 :
								if (!!window.ActiveXObject) {
									o.style.styleFloat = "";
									o.style.display = "block"
								} else {
									o.style.cssFloat = "";
									o.style.display = "block"
								}
						}
						this.showAnchor(o)
					}
				},
				_setIframeAlign : function(o) {
					var p = e.anchorEl;
					var q = p.cloneNode(true);
					switch (o) {
						case -2 :
							q.setAttribute("align", "");
							break;
						case -1 :
							q.setAttribute("align", "left");
							break;
						case 1 :
							q.setAttribute("align", "right");
							break;
						case 2 :
							q.setAttribute("align", "middle");
							break
					}
					p.parentNode.insertBefore(q, p);
					baidu.editor.dom.domUtils.remove(p);
					e.anchorEl = q;
					e.showAnchor(e.anchorEl)
				},
				_updateIframe : function() {
					k._iframe = e.anchorEl;
					m.open();
					e.hide()
				},
				_onRemoveButtonClick : function() {
					var p = k.selection.getRange().getClosedNode();
					var o = baidu.editor.dom.domUtils.findParentByTagName(p,
							"img", true);
					if (o && o.getAttribute("anchorname")) {
						k.execCommand("anchor")
					} else {
						k.execCommand("unlink")
					}
					this.hide()
				},
				queryAutoHide : function(o) {
					if (o && o.ownerDocument == k.document) {
						if (o.tagName.toLowerCase() == "img"
								|| baidu.editor.dom.domUtils
										.findParentByTagName(o, "a", true)) {
							return o !== e.anchorEl
						}
					}
					return baidu.editor.ui.Popup.prototype.queryAutoHide.call(
							this, o)
				}
			});
			e.render();
			var m = new baidu.editor.ui.Dialog({
						iframeUrl : k.ui
								.mapUrl(l.editor.options.iframeUrlMap.insertframe),
						autoReset : true,
						draggable : true,
						editor : k,
						className : "edui-for-insertframe",
						title : "插入iframe",
						buttons : [{
									className : "edui-okbutton",
									label : "确认",
									onclick : function() {
										m.close(true)
									}
								}, {
									className : "edui-cancelbutton",
									label : "取消",
									onclick : function() {
										m.close(false)
									}
								}],
						onok : function() {
						},
						oncancel : function() {
						},
						onclose : function(p, o) {
							if (o) {
								return this.onok()
							} else {
								return this.oncancel()
							}
						}
					});
			m.render();
			k.addListener("mouseover", function(q, o) {
				o = o || window.event;
				var r = o.target || o.srcElement;
				if (/iframe/ig.test(r.tagName)) {
					var p = e
							.formatHtml('<nobr>属性: <span onclick=$$._setIframeAlign(-2) class="edui-clickable">默认</span>&nbsp;&nbsp;<span onclick=$$._setIframeAlign(-1) class="edui-clickable">左对齐</span>&nbsp;&nbsp;<span onclick=$$._setIframeAlign(1) class="edui-clickable">右对齐</span>&nbsp;&nbsp;<span onclick=$$._setIframeAlign(2) class="edui-clickable">居中</span> <span onclick="$$._updateIframe( this);" class="edui-clickable">修改</span></nobr>');
					if (p) {
						e.getDom("content").innerHTML = p;
						e.anchorEl = r;
						e.showAnchor(e.anchorEl)
					} else {
						e.hide()
					}
				}
			});
			k.addListener("selectionchange", function(u, r) {
				if (!r) {
					return
				}
				var s = "";
				var p = k.selection.getRange().getClosedNode();
				var w = baidu.editor.dom.domUtils.findParentByTagName(p, "a",
						true);
				if (w != null) {
					s += e
							.formatHtml('<nobr>属性: <span class="edui-unclickable">默认</span>&nbsp;&nbsp;<span class="edui-unclickable">左浮动</span>&nbsp;&nbsp;<span class="edui-unclickable">右浮动</span>&nbsp;&nbsp;<span class="edui-unclickable">独占一行</span> <span onclick="$$._onImgEditButtonClick(event, this);" class="edui-clickable">修改</span></nobr>')
				} else {
					if (p != null && p.tagName.toLowerCase() == "img") {
						if (p.getAttribute("anchorname")) {
							s += e
									.formatHtml('<nobr>属性: <span onclick=$$._onImgEditButtonClick(event) class="edui-clickable">修改</span>&nbsp;&nbsp;<span onclick=$$._onRemoveButtonClick(event) class="edui-clickable">删除</span></nobr>')
						} else {
							s += e
									.formatHtml('<nobr>属性: <span onclick=$$._onImgSetFloat(event,-2) class="edui-clickable">默认</span>&nbsp;&nbsp;<span onclick=$$._onImgSetFloat(event,-1) class="edui-clickable">左浮动</span>&nbsp;&nbsp;<span onclick=$$._onImgSetFloat(event,1) class="edui-clickable">右浮动</span>&nbsp;&nbsp;<span onclick=$$._onImgSetFloat(event,2) class="edui-clickable">独占一行</span> <span onclick="$$._onImgEditButtonClick(event, this);" class="edui-clickable">修改</span></nobr>')
						}
					}
				}
				var v;
				if (k.selection.getRange().collapsed) {
					v = k.queryCommandValue("link")
				} else {
					v = k.selection.getStart()
				}
				v = baidu.editor.dom.domUtils.findParentByTagName(v, "a", true);
				var q;
				if (v != null && (q = v.getAttribute("href", 2)) != null) {
					var o = q;
					if (q.length > 30) {
						o = q.substring(0, 20) + "..."
					}
					if (s) {
						s += '<div style="height:5px;"></div>'
					}
					s += e
							.formatHtml('<nobr>链接: <a target="_blank" href="'
									+ q
									+ '" title="'
									+ q
									+ '" >'
									+ o
									+ '</a> <span class="edui-clickable" onclick="$$._onEditButtonClick(event, this);">修改</span> <span class="edui-clickable" onclick="$$._onRemoveButtonClick(event, this);"> 清除</span></nobr>');
					e.showAnchor(v)
				}
				if (s) {
					e.getDom("content").innerHTML = s;
					e.anchorEl = p || v;
					e.showAnchor(e.anchorEl)
				} else {
					e.hide()
				}
			})
		},
		_initToolbars : function() {
			var m = this.editor;
			var o = this.toolbars || [];
			var g = [];
			for (var l = 0; l < o.length; l++) {
				var n = o[l];
				var h = new baidu.editor.ui.Toolbar();
				for (var k = 0; k < n.length; k++) {
					var e = n[k];
					var f = null;
					if (typeof e == "string") {
						if (e == "|") {
							e = "Separator"
						}
						if (baidu.editor.ui[e]) {
							f = new baidu.editor.ui[e](m)
						}
					} else {
						f = e
					}
					if (f) {
						h.add(f)
					}
				}
				g[l] = h
			}
			this.toolbars = g
		},
		getHtmlTpl : function() {
			return '<div id="##" class="%%"><div id="##_toolbarbox" class="%%-toolbarbox"><div id="##_toolbarboxouter" class="%%-toolbarboxouter"><div class="%%-toolbarboxinner">'
					+ this.renderToolbarBoxHtml()
					+ '</div></div><div id="##_toolbarmsg" class="%%-toolbarmsg" style="display:none;"><div class="%%-toolbarmsg-close" onclick="$$.hideToolbarMsg();">x</div><div id="##_toolbarmsg_label" class="%%-toolbarmsg-label"></div><div style="height:0;overflow:hidden;clear:both;"></div></div></div><div id="##_iframeholder" class="%%-iframeholder"></div><div id="##_bottombar" class="%%-bottombar"></div></div>'
		},
		renderToolbarBoxHtml : function() {
			var f = [];
			for (var e = 0; e < this.toolbars.length; e++) {
				f.push(this.toolbars[e].renderHtml())
			}
			return f.join("")
		},
		setFullScreen : function(i) {
			function g(j) {
				j.body.contentEditable = false;
				setTimeout(function() {
							j.body.contentEditable = true
						}, 200)
			}
			if (this._fullscreen != i) {
				this._fullscreen = i;
				this.editor.fireEvent("beforefullscreenchange", i);
				var h = this.editor;
				if (baidu.editor.browser.gecko) {
					var e = h.selection.getRange().createBookmark()
				}
				if (i) {
					this._bakHtmlOverflow = document.documentElement.style.overflow;
					this._bakBodyOverflow = document.body.style.overflow;
					this._bakAutoHeight = this.editor.autoHeightEnabled;
					this._bakScrollTop = Math.max(
							document.documentElement.scrollTop,
							document.body.scrollTop);
					if (this._bakAutoHeight) {
						this.editor.disableAutoHeight()
					}
					document.documentElement.style.overflow = "hidden";
					document.body.style.overflow = "hidden";
					this._bakCssText = this.getDom().style.cssText;
					this._bakCssText1 = this.getDom("iframeholder").style.cssText;
					this._updateFullScreen()
				} else {
					document.documentElement.style.overflow = this._bakHtmlOverflow;
					document.body.style.overflow = this._bakBodyOverflow;
					this.getDom().style.cssText = this._bakCssText;
					this.getDom("iframeholder").style.cssText = this._bakCssText1;
					if (this._bakAutoHeight) {
						this.editor.enableAutoHeight()
					}
					window.scrollTo(0, this._bakScrollTop)
				}
				if (baidu.editor.browser.gecko) {
					var f = document.createElement("input");
					document.body.appendChild(f);
					h.body.contentEditable = false;
					setTimeout(function() {
								f.focus();
								setTimeout(function() {
											h.body.contentEditable = true;
											h.selection.getRange()
													.moveToBookmark(e).select();
											baidu.editor.dom.domUtils.remove(f)
										})
							})
				}
				this.editor.fireEvent("fullscreenchanged", i);
				this.triggerLayout()
			}
		},
		_updateFullScreen : function() {
			if (this._fullscreen) {
				var e = c.getViewportRect();
				this.getDom().style.cssText = "border:0;position:absolute;left:0;top:0;width:"
						+ e.width + "px;height:" + e.height + "px;";
				c.setViewportOffset(this.getDom(), {
							left : 0,
							top : 0
						});
				this.editor.setHeight(e.height
						- this.getDom("toolbarbox").offsetHeight
						- this.getDom("bottombar").offsetHeight)
			}
		},
		_updateElementPath : function() {
			var e = this.getDom("bottombar");
			if (this.elementPathEnabled) {
				var h = this.editor.queryCommandValue("elementpath");
				var j = [];
				for (var g = 0, f; f = h[g]; g++) {
					j[g] = this
							.formatHtml('<span unselectable="on" onclick="$$.editor.execCommand(&quot;elementpath&quot;, &quot;'
									+ g + '&quot;);">' + f + "</span>")
				}
				e.innerHTML = '<div class="edui-editor-breadcrumb" onmousedown="return false;">path: '
						+ j.join(" &gt; ") + "</div>"
			} else {
				e.style.display = "none"
			}
		},
		disableElementPath : function() {
			var e = this.getDom("bottombar");
			e.innerHTML = "";
			e.style.display = "none";
			this.elementPathEnabled = false
		},
		enableElementPath : function() {
			var e = this.getDom("bottombar");
			e.style.display = "";
			this.elementPathEnabled = true;
			this._updateElementPath()
		},
		isFullScreen : function() {
			return this._fullscreen
		},
		postRender : function() {
			d.prototype.postRender.call(this);
			for (var f = 0; f < this.toolbars.length; f++) {
				this.toolbars[f].postRender()
			}
			var g = this;
			var e;
			baidu.editor.dom.domUtils.on(window, "resize", function() {
						clearTimeout(e);
						e = setTimeout(function() {
									g._updateFullScreen()
								})
					})
		},
		showToolbarMsg : function(e) {
			this.getDom("toolbarmsg_label").innerHTML = e;
			this.getDom("toolbarmsg").style.display = ""
		},
		hideToolbarMsg : function() {
			this.getDom("toolbarmsg").style.display = "none"
		},
		mapUrl : function(e) {
			return e.replace("~/", this.editor.options.UEDITOR_HOME_URL || "")
		},
		triggerLayout : function() {
			var e = this.getDom();
			if (e.style.zoom == "1") {
				e.style.zoom = "100%"
			} else {
				e.style.zoom = "1"
			}
		}
	};
	a.inherits(b, baidu.editor.ui.UIBase);
	baidu.editor.ui.Editor = function(e) {
		var g = new baidu.editor.Editor(e);
		g.options.editor = g;
		new b(g.options);
		var f = g.render;
		g.render = function(j) {
			if (j) {
				if (j.constructor === String) {
					j = document.getElementById(j)
				}
				if (j && j.tagName.toLowerCase() == "textarea") {
					var i = document.createElement("div");
					j.parentNode.insertBefore(i, j);
					if (j.value) {
						g.options.initialContent = j.value
					}
					i.id = j.id;
					j.parentNode.removeChild(j);
					j = i;
					j.innerHTML = ""
				}
			}
			g.ui.render(j);
			var h = g.ui.getDom("iframeholder");
			return f.call(this, h)
		};
		return g
	}
})();
(function() {
	var c = baidu.editor.utils, d = baidu.editor.ui.Popup, b = baidu.editor.ui.SplitButton, a = baidu.editor.ui.MultiMenuPop = function(
			e) {
		this.initOptions(e);
		this.initMultiMenu()
	};
	a.prototype = {
		initMultiMenu : function() {
			var e = this;
			this.popup = new d({
						content : "",
						iframe_rendered : false,
						onshow : function() {
							if (!this.iframe_rendered) {
								this.iframe_rendered = true;
								this.getDom("content").innerHTML = '<iframe id="'
										+ e.id
										+ '_iframe" src="'
										+ e.iframeUrl
										+ '" frameborder="0"></iframe>'
							}
						}
					});
			this.onbuttonclick = function() {
				this.showPopup()
			};
			this.initSplitButton()
		}
	};
	c.inherits(a, b)
})();