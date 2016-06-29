module.exports = function(creep, assignments, buildings, populationCheck) {
	const
		priorities = require('role.priorities')
		roles = {
			harvester: require('role.ai.harvester'),
			upgrader: require('role.ai.upgrader'),
			builder: require('role.ai.builder')
		},
		prevAssignment = creep.memory.assignment;

	function assignRole(role) {
		creep.memory.assignment = role;
		if(!populationCheck) {
		    Memory.rooms[creep.room.name].creeps[creep.name].assignment = role;
			assignments[prevAssignment]--;
			assignments[role]++;
			roles[role].run(creep);
		}
	}

	function conditionallyAssignRole(role, condition) {
		//if the condition is true
		if(condition(assignments, buildings)) {
			//assign the role to the creep
			assignRole(role);
		}
	}

	function loopRolesAndConditionallyAssign(roleList) {
		var role;
		for(var i = 0; !creep.memory.assignment && i < roleList.length; i++) {
			role = roleList[i];
			conditionallyAssignRole(role.title, role.condition);
		}
	}

    //delete the creep's previous assignment from memory
	delete creep.memory.assignment;
	//try to assign roles that must be filled regardless of whether the creep
	//already has a role assigned to them
	loopRolesAndConditionallyAssign(priorities.assigned);
	//if all of the highest priority roles regardless of assigments were assigned
	//and the creep already had an assignment prior to this check
	if(!creep.memory.assignment && prevAssignment) {
		//reassign the creep their previous role
		assignRole(prevAssignment);
	} else {
		//otherwise assign the highest priority role available 
		loopRolesAndConditionallyAssign(priorities.unassigned);
		//if all roles are assigned
		if(!creep.memory.assignment && !populationCheck) {
			//assign the upgrader role by default
			assignRole('upgrader');
		}
	}
};