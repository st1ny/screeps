var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');

module.exports.loop = function () {

    // Always place this memory cleaning code at the very top of your main loop!

    for (var dead in Memory.creeps) {
        if (!Game.creeps[dead]) {
            delete Memory.creeps[dead];
        }
    }

    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    if (harvesters.length < 4) {
        Game.spawns.Spawn1.createCreep([WORK, CARRY, MOVE], undefined, {role: 'harvester'});
    }

    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    if (builders.length < 4) {
        Game.spawns.Spawn1.createCreep([WORK, CARRY, MOVE], undefined, {role: 'builder'});
    }

    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    if (upgraders.length < 4) {
        Game.spawns.Spawn1.createCreep([WORK, CARRY, MOVE], undefined, {role: 'upgrader'});
    }
    
    if(upgraders > builders)
    {
        var myUpgraders = Game.creeps.find(FIND_MY_CREEPS, {filter : (creep) => creep.role = 'upgrader'});
        myUpgraders[0].role = 'builder';
    }

    for (var c in Game.creeps) {
        var creep = Game.creeps[c];
        if (creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if (creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if (creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
    }
};
