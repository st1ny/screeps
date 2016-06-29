module.exports = function(room) {
    var towers = room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return structure.structureType == STRUCTURE_TOWER;
                    }
            });
    towers.forEach(function(tower){
       var closestMostDamagedStructure,
    	    closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => structure.hits < structure.hitsMax
            });
	    for(var i = 0; !closestMostDamagedStructure && i < 100; i = i + 10) {
    	    closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => structure.hits < structure.hitsMax && structure.hits < i
            });
        }
        for(var i = 0; !closestMostDamagedStructure && i < 1000; i = i + 100) {
    	    closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => structure.hits < structure.hitsMax && structure.hits < i
            });
        }
        for(var i = 0; !closestDamagedStructure && i < 10000; i = i + 1000) {
    	    closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => structure.hits < structure.hitsMax && structure.hits < i
            });
        }
        closestDamagedStructure = closestMostDamagedStructure || closestDamagedStructure;
        if(closestDamagedStructure) {
            tower.repair(closestDamagedStructure);
        }

        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            tower.attack(closestHostile);
        }
    });
};