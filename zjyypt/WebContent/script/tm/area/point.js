var Coordinate = function(o) {
	this._x = 0.0, this._y = 0.0;
	if (o) {
		var gps = o.split(",");
		this._x = parseFloat(gps[0]);
		this._y = parseFloat(gps[1]);
	}
	this.get_x = function() {
		return this._x;
	}
	this.get_y = function() {
		return this._y;
	}
}

var MathTool = {
	GetQuadrantAngle : function(p1, p2) {
		return this.GetQuadrantAngleUtil(parseFloat(p2.get_x())
						- parseFloat(p1.get_x()), parseFloat(p2.get_y())
						- parseFloat(p1.get_y()));
	},
	GetQuadrantAngleUtil : function(x, y) {
		var theta = Math.atan(y / x);
		if (x > 0 && y > 0)
			return theta;
		if (x > 0 && y < 0)
			return Math.PI * 2 + theta;
		if (x < 0 && y > 0)
			return theta + Math.PI;
		if (x < 0 && y < 0)
			return theta + Math.PI;
		return theta;
	},
	GetIncludedAngel : function(preCoord, midCoord, nextCoord) {
		var innerProduct = (midCoord.get_x() - preCoord.get_x())
				* (nextCoord.get_x() - midCoord.get_x())
				+ (midCoord.get_y() - preCoord.get_y())
				* (nextCoord.get_y() - midCoord.get_y());
		var mode1 = Math.sqrt(Math.pow((midCoord.get_x() - preCoord.get_x()),
				2.0)
				+ Math.pow((midCoord.get_y() - preCoord.get_y()), 2.0));
		var mode2 = Math.sqrt(Math.pow((nextCoord.get_x() - midCoord.get_x()),
				2.0)
				+ Math.pow((nextCoord.get_y() - midCoord.get_y()), 2.0));
		return Math.acos(innerProduct / (mode1 * mode2));
	},
	GetDistance : function(preCoord, nextCoord) {
		return Math.sqrt(Math.pow((nextCoord.get_x() - preCoord.get_x()), 2)
				+ Math.pow((nextCoord.get_y() - preCoord.get_y()), 2));
	}
}

var PointBuffer = new function() {
	// / <summary>
	// / 用于近似表示点缓冲区边界的内接正多边形的边数N
	// / </summary>
	this.N = 12;

	// / <summary>
	// / 根据一个给定点的坐标，生成基于这个点的点缓冲区边界点坐标串(逆时针)
	// / </summary>
	// / <param name="center">一个给定点的坐标</param>
	// / <param name="radius">缓冲区的半径</param>
	// / <returns>点缓冲区边界点坐标串(逆时针)</returns>
	this.GetBufferEdgeCoords = function(center, radius) {
		var alpha = 0.0;// Math.PI / 6;
		var gamma = (2 * Math.PI) / this.N;

		var strCoords = "";
		var x = 0.0, y = 0.0;
		for (var phi = 0; phi < (this.N - 1) * gamma; phi += gamma) {
			x = center.get_x() + radius * Math.cos(alpha + phi);
			y = center.get_y() + radius * Math.sin(alpha + phi);
			if (strCoords)
				strCoords+= ";";
			strCoords += (x + "," + y);
		}
		return strCoords;
	}
}

var PolylineBuffer = {

	// / <summary>
	// / 根据给定的一系列有顺序的坐标，逆时针生成缓冲区的边界坐标。
	// / </summary>
	// / <param name="strPolyLineCoords">一系列有顺序的坐标</param>
	// / <param name="radius">缓冲区半径</param>
	// / <returns>缓冲区的边界坐标</returns>
	GetBufferEdgeCoords : function(strPolyLineCoords, radius) {
		// 参数处理
		if (!strPolyLineCoords)
			return "";
		var strCoords = strPolyLineCoords.split(";");
		var coords = [];

		for (var i=0;i<strCoords.length;i++) {			
			coords.push(new Coordinate(strCoords[i]));
		}

		// 分别生成左侧和右侧的缓冲区边界点坐标串
		var leftBufferCoords = this.GetLeftBufferEdgeCoords(coords, radius);
		// Collections.sort(coords, Collections.reverseOrder());
		coords = coords.reverse();
		var rightBufferCoords = this.GetLeftBufferEdgeCoords(coords, radius);
		return leftBufferCoords + ";" + rightBufferCoords;
	},
	// / <summary>
	// / 根据给定的一系列有顺序的坐标，逆时针生成轴线左侧的缓冲区边界点
	// / </summary>
	// / <param name="coords">一系列有顺序的坐标</param>
	// / <param name="radius">缓冲区半径</param>
	// / <returns>缓冲区的边界坐标</returns>
	GetLeftBufferEdgeCoords : function(coords, radius) {

		// var coords= [];
		// 参数处理
		if (coords.length < 1)
			return "";
		else if (coords.length < 2)
			return PointBuffer.GetBufferEdgeCoords(coords[0], radius);

		// 计算时所需变量
		var alpha = 0.0;// 向量绕起始点沿顺时针方向旋转到X轴正半轴所扫过的角度
		var delta = 0.0;// 前后线段所形成的向量之间的夹角
		var l = 0.0;// 前后线段所形成的向量的叉积

		// 辅助变量
		var strCoords = "";
		var startRadian = 0.0;
		var endRadian = 0.0;
		var beta = 0.0;
		var x = 0.0, y = 0.0;

		// 第一节点的缓冲区
		{
			alpha = MathTool.GetQuadrantAngle(coords[0], coords[1]);
			startRadian = alpha + Math.PI;
			endRadian = alpha + (3 * Math.PI) / 2;
			strCoords += (this.GetBufferCoordsByRadian(coords[0], startRadian,
					endRadian, radius));
		}

		// 中间节点
		for (var i = 1; i < coords.length - 1; i++) {
			alpha = MathTool.GetQuadrantAngle(coords[i], coords[i + 1]);
			delta = MathTool.GetIncludedAngel(coords[i - 1], coords[i],
					coords[i + 1]);
			l = this.GetVectorProduct(coords[i - 1], coords[i], coords[i + 1]);
			if (l > 0) {
				startRadian = alpha + (3 * Math.PI) / 2 - delta;
				endRadian = alpha + (3 * Math.PI) / 2;
				if (strCoords)
					strCoords += (";");
				strCoords += (this.GetBufferCoordsByRadian(coords[i],
						startRadian, endRadian, radius));
			} else if (l < 0) {
				beta = alpha - (Math.PI - delta) / 2;
				x = coords[i].get_x() + radius * Math.cos(beta);
				y = coords[i].get_y() + radius * Math.sin(beta);
				if (strCoords)
					strCoords += (";");
				strCoords += (x + "," + y);
			}
		}

		// 最后一个点
		{
			alpha = MathTool.GetQuadrantAngle(coords[coords.length - 2],
					coords[coords.length - 1]);
			startRadian = alpha + (3 * Math.PI) / 2;
			endRadian = alpha + 2 * Math.PI;
			if (strCoords)
				strCoords += (";");
			strCoords += (this.GetBufferCoordsByRadian(
					coords[coords.length - 1], startRadian, endRadian, radius));
		}

		return strCoords;
	},

	// / <summary>
	// / 获取指定弧度范围之间的缓冲区圆弧拟合边界点
	// / </summary>
	// / <param name="center">指定拟合圆弧的原点</param>
	// / <param name="startRadian">开始弧度</param>
	// / <param name="endRadian">结束弧度</param>
	// / <param name="radius">缓冲区半径</param>
	// / <returns>缓冲区的边界坐标</returns>
	GetBufferCoordsByRadian : function(center, startRadian, endRadian, radius) {
		var gamma = Math.PI / 6;

		var strCoords = "";
		var x = 0.0, y = 0.0;
		for (var phi = startRadian; phi <= endRadian + 0.000000000000001; phi += gamma) {
			x = center.get_x() + radius * Math.cos(phi);
			y = center.get_y() + radius * Math.sin(phi);
			if (strCoords)
				strCoords += (";");
			strCoords += (x + "," + y);
		}
		return strCoords;
	},
	// / <summary>
	// / 获取相邻三个点所形成的两个向量的交叉乘积
	// / </summary>
	// / <param name="preCoord">第一个节点坐标</param>
	// / <param name="midCoord">第二个节点坐标</param>
	// / <param name="nextCoord">第三个节点坐标</param>
	// / <returns>相邻三个点所形成的两个向量的交叉乘积</returns>
	GetVectorProduct : function(preCoord, midCoord, nextCoord) {
		return (midCoord.get_x() - preCoord.get_x())
				* (nextCoord.get_y() - midCoord.get_y())
				- (nextCoord.get_x() - midCoord.get_x())
				* (midCoord.get_y() - preCoord.get_y());
	}
}



var Test = function() {
	// TODO Auto-generated method stub
	// 点
	var coord = new Coordinate("117.9761419921875,36.7177825");
	// 线
	var coords = "117.3469162109375,36.552475;118.77600527343749,36.56047375;118.49871933593751,37.11772;117.5442158203125,37.000405;117.680192578125,37.405675;119.1386099609375,37.15238125;119.162605859375,36.45649;118.89865097656251,36.28851625;118.63736230468748,36.19253125;118.5093841796875,36.189865";

	var radius = 0.0058633144143721562925090295041981;

	var strCoordsPoint = PointBuffer.GetBufferEdgeCoords(coord, radius);
	alert("将点缓冲成面：" + strCoordsPoint);

	var strCoordsLine = PolylineBuffer.GetBufferEdgeCoords(coords, radius);

	alert("将线缓冲成面：" + strCoordsLine);

}