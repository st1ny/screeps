module.exports = {
	getSurroundingTerrain: function(roomObj) {
		return roomObj.room.lookForAtArea(LOOK_TERRAIN, 
            roomObj.pos.y - 1, 
            roomObj.pos.x - 1, 
            roomObj.pos.y + 1, 
            roomObj.pos.x + 1, {asArray: true})
	}
};