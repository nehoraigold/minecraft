
var game = {};

game.world = {};
game.world.WORLD_HEIGHT = 20;
game.world.WORLD_WIDTH = 20;
game.world.map = [
    ["sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky"],
    ["sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky"],
    ["sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sun", "sun", "sky", "sky"],
    ["sky", "sky", "cloud", "cloud", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sun", "sun", "sky", "sky"],
    ["sky", "sky", "cloud", "cloud", "cloud", "cloud", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky"],
    ["sky", "cloud", "cloud", "cloud", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky"],
    ["sky", "sky", "cloud", "cloud", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky"],
    ["sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "tree", "tree", "tree", "sky", "sky", "sky", "sky", "sky"],
    ["sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "tree", "tree", "tree", "sky", "sky", "sky", "sky", "sky"],
    ["sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "tree", "tree", "tree", "sky", "sky", "sky", "sky", "sky"],
    ["sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "trunk", "sky", "sky", "sky", "sky", "sky", "sky"],
    ["sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "trunk", "sky", "sky", "sky", "sky", "sky", "sky"],
    ["sky", "sky", "sky", "rock", "rock", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "trunk", "sky", "sky", "sky", "sky", "sky", "sky"],
    ["sky", "man", "sky", "rock", "rock", "rock", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "trunk", "sky", "sky", "sky", "sky", "sky", "sky"],
    ["grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "water", "water", "water", "water"],
    ["ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "water", "water", "water"],
    ["ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "water", "water"],
    ["ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground"],
    ["ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground"],
    ["ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground"]
];

game.user = {};

game.toolDefinitions = {
    pickaxe: ['rock'],
    axe:['tree','trunk'],
    shovel:['ground','grass'],
    bucket:['water']
}

game.start = function () {
    game.world.display();
    game.user.generateInventory();
    game.user.setDefaults();
    game.user.connectEvents();
}

game.world.display = function () {
    for (var i = 0; i < game.world.map.length; i++) {
        for (var j = 0; j < game.world.map[i].length; j++) {
            var tile = $('<div/>').addClass("tile " + game.world.map[i][j]);
            tile.data("type", game.world.map[i][j]);
            $('#world').append(tile);
        }
    }
}

game.user.setDefaults = function () {
    game.allTools = $(".tool");
    game.activeTool = null;
    game.user.axe = $("#axe");
    game.user.pickaxe = $("#pickaxe");
    game.user.shovel = $("#shovel");
    game.user.bucket = $("#bucket");
    game.user.tile = $(".tile");
    game.user.sky = $(".sky");
    game.user.setToolDefaultData();
    game.user.selectedTile = null;
    game.user.selectableTiles = $(".selected-tile");
}

game.user.setToolDefaultData = function () {
    game.activeTool = null;
}

game.user.connectEvents = function () {
    game.allTools.click(game.user.selectTool);
    game.user.selectableTiles.click(game.user.setSelectedTile)
    game.user.tile.click(game.user.clickOnTile);
    game.user.sky.click(game.user.settingBackTheTile);
}

game.user.selectTool = function () {
    game.user.removeClickedClass();
    game.user.setToolDefaultData();
    $(this).addClass("is-clicked");
    game.activeTool = $(this);
}

game.user.setSelectedTile = function () {
    game.user.setToolDefaultData();
    game.user.removeClickedClass();
    game.user.selectedTile = $(this).data('type');
    $(this).addClass("in-use");
}

game.user.removeClickedClass = function () {
    game.allTools.removeClass("is-clicked");
}

game.user.clickOnTile = function () {
    var that = $(this);
    if (game.toolDefinitions[game.activeTool.attr('id')].includes($(this).data('type'))) {
        game.user.removeTile(that);
    } else {
        game.user.alertButton(game.activeTool);
    }
}

game.user.removeTile = function (tile) {
    game.user.inventory[tile.data("type")]++;
    tile.removeClass(tile.data("type"));
    tile.addClass("sky");
    tile.on('click', game.user.settingBackTheTile);
    $(".selected-tile." + tile.data("type") + " span").text(game.user.inventory[tile.data("type")]);
}

game.user.alertButton = function (btn) {
    btn.removeClass("is-clicked")
    btn.addClass("alert");
    setTimeout(function () {
        btn.removeClass("alert");
        btn.addClass("is-clicked");
    }, 100);
}

game.user.settingBackTheTile = function () {
    if (game.user.selectedTile !== null && game.user.inventory[game.user.selectedTile] > 0) {
        game.user.inventory[game.user.selectedTile]--;
        $(this).addClass(game.user.selectedTile);
        $(".selected-tile." + game.user.selectedTile + " span").text(game.user.inventory[game.user.selectedTile]);
        game.user.selectableTiles.removeClass("in-use");
    }
}

game.user.inventory = {
    rock: 0,
    tree: 0,
    trunk: 0,
    grass: 0,
    ground: 0,
    water: 0,
    man: 0
}

game.user.generateInventory = function () {
    for (var item in game.user.inventory) {
        var div = $('<div />').addClass(item).addClass('selected-tile').data('type', item);
        var span = $('<span/>').text(game.user.inventory[item]);
        div.append(span);
        $('#inventory').append(div);
    }
}


$(document).ready(function () {
    game.start();
})
