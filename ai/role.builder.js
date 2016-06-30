var roleBuilder = {

    run: function (creep) {
        if (creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
        }

        if (creep.memory.building == false && creep.carry.energy == creep.carryCapacity) {
            creep.memory.building = true;
            creep.memory.source = -1;
        }

        if (creep.memory.upgrading == false && creep.memory.source == -1) {
            creep.memory.upgrading = true;
        }

        if (creep.memory.building == true) {
            var targets = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
            if (targets != null) {
                if (creep.build(targets) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets);
                }
            }

        }
        else {
            var source = creep.room.find(FIND_SOURCES);
            if (creep.harvest(source[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source[0]);
            }
        }
    }
};

module.exports = roleBuilder;
