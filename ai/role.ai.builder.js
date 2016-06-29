var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

	    if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
	    }
	    if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.building = true;
	    }

	    if(creep.memory.building) {
            var closestMostDamagedStructure,
    	    closestDamagedStructure = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => structure.hits < structure.hitsMax
            });
    	    for(var i = 0; !closestMostDamagedStructure && i < 100; i = i + 10) {
        	    closestDamagedStructure = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => structure.hits < structure.hitsMax && structure.hits < i
                });
            }
            for(var i = 0; !closestMostDamagedStructure && i < 1000; i = i + 100) {
        	    closestDamagedStructure = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => structure.hits < structure.hitsMax && structure.hits < i
                });
            }
            for(var i = 0; !closestDamagedStructure && i < 10000; i = i + 1000) {
        	    closestDamagedStructure = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => structure.hits < structure.hitsMax && structure.hits < i
                });
            }
            closestDamagedStructure = closestMostDamagedStructure || closestDamagedStructure;
            if(closestDamagedStructure) {
                if(creep.repair(closestDamagedStructure) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0]);
                }
            } else {
                var target = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
                if(target) {
                    if(creep.build(target) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target);
                    }
                }
            }
	    } else {
	        var source = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: function(structure) {
                    return (structure.structureType == STRUCTURE_EXTENSION ||
                    structure.structureType == STRUCTURE_SPAWN ||
                    structure.structureType == STRUCTURE_CONTAINER ||
                    structure.structureType == STRUCTURE_STORAGE) && 
                    structure.energy;
                }
            });
            if(source.structureType == STRUCTURE_SPAWN ? source.transferEnergy(creep) == ERR_NOT_IN_RANGE :
                source.transfer(creep, RESOURCE_ENERGY)) {
                creep.moveTo(source);
            }
	    }
	}
};

module.exports = roleBuilder;