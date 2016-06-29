module.exports = function(room, roomData) {
	if(roomData.buildings.spawns.length) {
		const
			MINER = 'miner',
			MOVER = 'mover',
			BUILDER = 'builder';

		var role = roomData.stage.getNextUnit(room);

		if(role) {
			const
				roleProperties = require('role.properties')[role],
				extensions = room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return structure.structureType == STRUCTURE_EXTENSION;
                    }
            	});

			var spawn,
				creep;
			for(var i = 0; i < roomData.buildings.spawns.length; i++) {
				spawn = roomData.buildings.spawns[i],
				creep = spawn.createCreep(roleProperties[extensions.length] || roleProperties[roleProperties.length - 1],
						undefined, {role: role});
				if(typeof(creep) === 'string') {
					room.memory.creeps[creep] = {role: role};
					room.memory.assignments[role]++;
					break;
				}
			}
		}
	}
}