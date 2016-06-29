module.exports = function(room) {

	function getRoadPath(from, to) {
		return room.findPath(from, to, {
			ignoreCreeps: true,
			ignoreRoads: true,
		});
	};

	function extendRoad(x, y, direction, extendedWidth) {
		switch(direction) {
			case RIGHT:
			case LEFT:
				
				break;
			case TOP:
			case BOTTOM:
				break;
			case BOTTOM_RIGHT:
			case TOP_LEFT:
				break;
			case BOTTOM_LEFT:
			case TOP_RIGHT:
				break;

		}
	}

	function buildRoad(from, to, extendedWidth) {
		var path = getRoadPath(from, to);
		path.forEach(function(point) {
			createConstructionSite(point.x, point.y, STRUCTURE_ROAD);
			extend(point.x, point.y, point. extendedWidth);
		});
	}
};