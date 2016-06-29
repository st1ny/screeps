module.exports = function(room) {
    const
        util = require('util');

    var roomMem = Memory.rooms[room.name];   
    if(!roomMem) {
        roomMem = Memory.rooms[room.name] = {};
    }
    
    if(!roomMem.init) {
        var sources = {};
        room.find(FIND_SOURCES).forEach(function(source) {
            sources[source.id] = {
                assigned: 0,
                capacity: getSourceCapacity(source),
                containers: [],
                storages: []
            };
        });

        var creeps = {};
        room.find(FIND_MY_CREEPS).forEach(function(creep) {
            creeps[creep.name] = {};
        });
        roomMem.assignments = {
            miner: 0,
            builder: 0,
            mover: 0,
            upgrader: 0
        }
        roomMem.sources = sources;
        roomMem.creeps = creeps;
        roomMem.stage = 1;
        roomMem.init = true;
    }

    function getSourceCapacity(source) {
        var terrain = util.getSurroundingTerrain(source),
            count = 0;
        terrain.forEach(function(square) {
            if(square.terrain === 'swamp' || square.terrain === 'plain') {
                count++;
            }
        });
        return count;
    }

    if(!roomMem.initSpawn) {
        var spawns = room.find(FIND_MY_SPAWNS),
            spawn;
        if(spawns.length) {
            spawn = spawns[0];
            var sources = room.memory.sources,
                sourceMem;
            room.find(FIND_SOURCES).forEach(function(source) {
                sourceMem = sources[source.id];
                sourceMem.distanceToSpawn = spawn.pos.findPathTo(source).length;
            });
            room.memory.controllerDistance = room.controller.pos.findPathTo(spawn).length;
            roomMem.initSpawn = true;
        }
    }
};