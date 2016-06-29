const 
    init = require('init'),
    roomManager = require('room.manager');
    
//sets required memory variables if not set
init();

//iterate through all available rooms
for(var name in Game.rooms){
    roomManager(Game.rooms[name]);
}