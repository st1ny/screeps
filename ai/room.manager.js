module.exports = function(room) {
	const
		init = require('room.init'),
		creepManager = require('creep.manager'),
        roomStages = require('room.stages');

	//initialize memory for room if not yet initialized
	init(room);

	const
		roomMem = Memory.rooms[room.name],
		roomData = {
			buildings: {},
			sources: roomMem.sources,
            stage: roomStages[roomMem.stage] || roomStages[roomStages.length - 1]
		};
    roomData.controller = room.controller;
	roomData.buildings.spawns = room.find(FIND_MY_SPAWNS);
	roomData.buildings.emptyContainers = room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return (structure.structureType == STRUCTURE_EXTENSION ||
                    structure.structureType == STRUCTURE_SPAWN ||
                    structure.structureType == STRUCTURE_TOWER) && 
            		structure.energy < structure.energyCapacity;
        }
    });
    roomData.buildings.construction = room.find(FIND_MY_CONSTRUCTION_SITES);
    roomData.buildings.repairs = room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return structure.hits < structure.hitsMax;
        }
    });

    creepManager(room, roomData);
    if(!roomData.stage.getNextUnit(room) && 
        (!room.controller || room.controller.level >= roomData.stage.controllerLevel) &&
        !roomData.stage.getNextBuildings().length && roomMem.stage < roomStages.length){
        roomMem.stage++;
    }

};