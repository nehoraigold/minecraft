
var game = {};

game.bindBtn = function () {

}

game.world = {};
game.world.WORLD_HEIGHT = 20;
game.world.WORLD_WIDTH = 20;
game.world.background = [];
game.world.map = [
    ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "sun", "sun", "", ""],
    ["", "", "cloud", "cloud", "", "", "", "", "", "", "", "", "", "", "", "", "sun", "sun", "", ""],
    ["", "", "cloud", "cloud", "cloud", "cloud", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
    ["", "cloud", "cloud", "cloud", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
    ["", "", "cloud", "cloud", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", "", "", "", "tree", "tree", "tree", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", "", "", "", "tree", "tree", "tree", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", "", "", "", "tree", "tree", "tree", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", "", "", "", "", "trunk", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", "", "", "", "", "trunk", "", "", "", "", "", ""],
    ["", "", "", "rock", "rock", "", "", "", "", "", "", "", "", "trunk", "", "", "", "", "", ""],
    ["", "man", "", "rock", "rock", "rock", "", "", "", "", "", "", "", "trunk", "", "", "", "", "", ""],
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
    axe: ['tree', 'trunk'],
    shovel: ['ground', 'grass'],
    bucket: ['water'],
    sword: ['man']
}

game.init = function () {
    game.bindStartButtons()
}

game.bindStartButtons = function () {
    $('#start-btn').click(function(){
        $('#start-screen').css("display", "none");
        game.start();
    })
    $('#tutorial-btn').click(function(){
        $('#tutorial-modal-container').css('display', 'block');
    })
    $('#got-it-btn').click(function(){
        $('#tutorial-modal-container').css('display', 'none');
    })
}

game.start = function () {
    game.world.generateMap();
    game.world.displayMap();
    $('#screen').css('display', 'block');
    game.user.generateInventory();
    game.user.setDefaults();
    game.user.connectEvents();
}

game.world.generateMap = function () {
    for (var i = 0; i < this.WORLD_HEIGHT; i++) {
        game.world.background.push([]);
        for (var j = 0; j < this.WORLD_WIDTH; j++) {
            game.world.background[i].push("tile");
        }
    }
}

game.world.displayMap = function () {
    for (var i = 0; i < game.world.background.length; i++) {
        for (var j = 0; j < game.world.background[i].length; j++) {
            var tile = $('<div/>').addClass(game.world.background[i][j]);
            if (game.world.map[i][j] !== "") {
                var paintedTile = $('<div/>').addClass("painted-tile " + game.world.map[i][j]);
                paintedTile.data('type', game.world.map[i][j]);
                tile.append(paintedTile);
            }
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
    game.user.emptyTile = $(".tile");
    game.user.paintedTile = $('.painted-tile');
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
    game.user.emptyTile.click(game.user.paintTile);
    game.user.paintedTile.click(game.user.clearTile);
}

game.user.selectTool = function () {
    game.user.removeClickedClass();
    game.user.setToolDefaultData();
    $(this).addClass("is-clicked");
    game.activeTool = $(this);
    game.user.selectedTile = null;
}

game.user.setSelectedTile = function () {
    game.user.setToolDefaultData();
    game.user.removeClickedClass();
    game.user.selectedTile = $(this).data('type');
    game.activeTool = null;
    $(this).addClass("in-use");
}

game.user.removeClickedClass = function () {
    game.allTools.removeClass("is-clicked");
    game.user.selectableTiles.removeClass('in-use');
}

game.user.clearTile = function () {
    var that = $(this);
    if (game.activeTool === null) {
        return false;
    }
    if (game.toolDefinitions[game.activeTool.attr('id')].includes($(this).data('type'))) {
        game.user.removeTile(that);
    } else {
        game.user.alertButton(game.activeTool);
    }
}

game.user.removeTile = function (tile) {
    game.user.inventory[tile.data("type")]++;
    $(".selected-tile." + tile.data("type") + " span").text(game.user.inventory[tile.data("type")]);
    tile.fadeOut();
    setTimeout(() => {
        tile.remove();
    }, 400);

}

game.user.alertButton = function (btn) {
    btn.removeClass("is-clicked")
    btn.addClass("alert");
    setTimeout(function () {
        btn.removeClass("alert");
        btn.addClass("is-clicked");
    }, 100);
}

game.user.paintTile = function () {
    if (game.user.selectedTile !== null && game.user.inventory[game.user.selectedTile] > 0) {
        game.user.inventory[game.user.selectedTile]--;
        var newTile = $('<div/>').addClass('painted-tile ' + game.user.selectedTile).data('type', game.user.selectedTile).css('display','none');
        newTile.click(game.user.clearTile);
        $(this).append(newTile);
        newTile.fadeIn();
        $(".selected-tile." + game.user.selectedTile + " span").text(game.user.inventory[game.user.selectedTile]);
        // game.user.selectableTiles.removeClass("in-use");
    }
}

game.user.inventory = {
    rock: 10,
    tree: 10,
    trunk: 10,
    grass: 10,
    ground: 10,
    water: 10,
    man: 10
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
    game.init();
})
