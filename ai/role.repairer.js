/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.repairer');
 * mod.thing == 'a thing'; // true
 */

module.exports = {

    run: function (creep) {


        var needsRepair = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_ROAD || structure.structureType == STRUCTURE_CONTAINER) && structure.hits < structure.hitsMax;

            }
        });


        if (creep.memory.isRepairing == true && creep.carry.energy == 0) {
            creep.memory.isRepairing = false;
        }
        else if (creep.memory.isRepairing == false && creep.carry.energy == creep.carryCapacity) {
            creep.memory.isRepairing = true;
        }

        if (creep.memory.isRepairing == true) {
            if (needsRepair.length && needsRepair.length > 0) {
                if (creep.repair(needsRepair[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(needsRepair[0]);
                }
            }
            else {
            }
        }
        else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_SPAWN) && structure.energy > 0;
                }
            });


            if (targets.length > 0) {
                var max = 0;
                var use;
                for (var i in targets) {

                    if (targets[i].energy > max) {
                        max = targets[i].energy;
                        use = targets[i];
                    }

                }
                if (use.transferEnergy(creep, use.energy) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(use);
                }
            }
        }

    }

};
