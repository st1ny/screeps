const 
    harvester = 'harvester',
    upgrader = 'upgrader',
    builder = 'builder';

module.exports = {
    assigned: [
        {
            title: harvester,
            condition: function(assignments, buildings) {
                return assignments.harvester < 2 && 
                       buildings.emptyStorage.length;
            }
        },
        {
            title: upgrader,
            condition: function(assignments) {
                return assignments.upgrader < 1;
            }
        },
        {
            title: builder,
            condition: function(assignments) {
                return assignments.builder < 1;
            }
        }
    ],
    unassigned: [
        {
            title: harvester,
            condition: function(assignments) {
                return assignments.harvester < 4 && 
                       buildings.emptyStorage.length;
            }
        },
        {
            title: upgrader,
            condition: function(assignments) {
                return assignments.upgrader < 4;
            }
        },
        {
            title: harvester,
            condition: function(assignments) {
                return assignments.harvester < 6 && 
                       buildings.emptyStorage.length;
            }
        },
        {
            title: builder,
            condition: function(assignments) {
                return assignments.builder < 6;
            }
        }
    ]
};