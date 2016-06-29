/**
 * This file contains the stages of a room's progress
 */
 const
	MINER = 'miner',
	MOVER = 'mover',
	BUILDER = 'builder',
	UPGRADER = 'upgrader',

	creepStages = require('room.stages.creep');

module.exports = [
	{
		controllerLevel: 1,
		getNextUnit: function(room) {
			var unit;
			if(!creepStages.minerReq[0](room)) {
				unit = MINER;
			} else if(!creepStages.upgraderReq[0](room)) {
				unit = UPGRADER;
			} else if(!creepStages.builderReq[0](room)) {
				unit = BUILDER;
			}
			return unit;
		},
		getNextBuildings: function(room) {
			return [];
		}
	}
];

