WORLD_HEIGHT = 10;
WORLD_WIDTH = 10;

var world = [
    ["sky","sky","sky","sky","sky","sky","sky","sky","sky","sky"],
    ["sky","sky","cloud","cloud","sky","sky","tree","tree","tree","sky"],
    ["sky","cloud","cloud","cloud","cloud","sky","tree","tree","tree","sky"],
    ["sky","sky","cloud","cloud","sky","sky","sky","trunk","sky","sky"],
    ["sky","sky","sky","sky","sky","sky","sky","trunk","sky","sky"],
    ["sky","rock","sky","rock","rock","sky","sky","trunk","sky","sky"],
    ["grass","grass","grass","grass","grass","grass","grass","grass","grass","grass"],
    ["ground","ground","ground","ground","ground","ground","ground","ground","ground","ground"],
    ["ground","ground","ground","ground","ground","ground","ground","ground","ground","ground"],
    ["ground","ground","ground","ground","ground","ground","ground","ground","ground","ground"]
];

function displayWorld() {
    for (var i = 0; i < world.length; i++) {
        for (var j = 0; j < world[i].length; j++) {
            var tile = $('<div/>').addClass("tile " + world[i][j]);
            $('#world').append(tile);
        }
    }
}

displayWorld();