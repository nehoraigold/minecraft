function main() {

    Game = {};

    Game.WORLD_HEIGHT = 10;
    Game.WORLD_WIDTH = 10;

    Game.world = {};
    
    Game.world.map = [
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

    Game.world.display = function() {
        for (var i = 0; i < Game.world.map.length; i++) {
            for (var j = 0; j < Game.world.map[i].length; j++) {
                var tile = $('<div/>').addClass("tile " + Game.world.map[i][j]);
                $('#world').append(tile);
            }
        }
    }

    Game.world.display();
}

$(document).ready(function() {
    main();
})