const
	util = require('util');

module.exports = {
	getContainers: [
		function(room) {
			var currentSource,
				source,
				consumer;
			for(var id in room.memory.sources) {
				currentSource = room.memory.sources[id];
				if(currentSource.assigned >= currentSource.capacity) {
					source = Game.getObjectById(id);
					consumer = Game.getObjectById(currentSource.consumer);
					break;
				}
			}
			if(source) {
				var path = source.pos.findPathTo(consumer);
				getContainerPlacement(path, 1);
			}
		}
	]
}

function getContainerPlacement(path, amount) {
	var pos, 
		x, 
		y;
	for(var i = 2; i < path.length; i++) {
		pos = path[i];

	}
}

function checkSurroundingArea(path, ) {
	for(var i = x-1; i < x + 1; i++) {
		if(i >= 0 && i < 50 && i%2 === 0) {
			for(var j = y-1; j < y + 1; j++) {
				if(j >= 0 && j < 50 && j%2 === 0 && (i != x || j != y)) {
					if(!isInPath(i, j, path)) {

					}
				}
			}
		}
	}
}

function isInPath(x, y, path) {
	var pos,
		found;
	for(var i = 0; !found && i < path.length; i++) {
		pos = path[i];
		found = path.x === x && path.y === y;
	}
	return found;
}