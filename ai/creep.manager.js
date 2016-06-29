module.exports = function(room, roomData) {
	const
		miner = require('role.ai.miner'),
		builder = require('role.ai.builder'),
		upgrader = require('role.ai.upgrader'),
		populationManager = require('creep.population.manager');

	for(var name in room.memory.creeps) {
		var creep = Game.creeps[name];
		if(creep) {
			updateCreep(creep);
		} else {
			removeCreep(name);
		}
	}

	populationManager(room, roomData);

	function updateCreep(creep) {
		switch(creep.memory.role) {
			case 'miner':
				miner(creep, roomData);
				break;
			case 'mover':
				break;
			case 'builder':
				builder.run(creep);
				break;
			case 'upgrader':
				upgrader.run(creep);
				break;
		}
	}

	function removeCreep(name) {
		var role = room.memory.creeps[name].role;
		switch(role) {
			case 'miner':
				removeMiner(name);
				break;
			case 'mover':
				break;
			case 'builder':
				break;
		}
		room.memory.assignments[role]--;
		delete room.memory.creeps[name];
		delete Memory.creeps[name];
	}

	function removeMiner(name) {
		var sourceId = room.memory.creeps[name].sourceId;
		if(sourceId) {
			room.memory.sources[sourceId].assigned--;
		}
	}
};