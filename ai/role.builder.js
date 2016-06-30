var roleBuilder = {

    run: function (creep) {
        if (creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
        }
        else {
            if (creep.carry.energy == creep.carryCapacity) {
                creep.memory.building = true;
            }
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
            if (creep.harvest(source[1]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source[1]);
            }
        }
    }
};

module.exports = roleBuilder;
