
var game = {};

game.world = {};
game.world.WORLD_HEIGHT = 20;
game.world.WORLD_WIDTH = 20;
game.world.season = "autumn";
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
    $('#start-btn').click(function () {
        $('#start-screen').css("display", "none");
        game.start();
    })
    $('#tutorial-btn').click(function () {
        game.showModal("tutorial-modal");
    })
    $('.modal-button').click(function () {
        if ($(this).attr('id') === "options-save") {
            game.saveOptions();
        } else {
            game.hideModal()
        }
    })
    $('#options-btn').click(function () {
        game.showModal('options-modal');
    })
}

game.showModal = function (modalID) {
    $('#modal-container').css('display', 'block');
    $(`#${modalID}`).css('display', 'block');
}

game.hideModal = function () {
    $('#modal-container').css('display', 'none');
    $('.modal').css('display', 'none');
}

game.saveOptions = function () {
    var userWidth = $('#world-width').val();
    var userHeight = $('#world-height').val();
    var errorMsg = $('#error-message');
    if (userWidth < 1 || userHeight < 1) {
        errorMsg.text("Please enter a valid height and width.")
        return false;
    }
    game.world.WORLD_WIDTH = Math.floor(parseInt($('#world-width').val()));
    game.world.WORLD_HEIGHT = Math.floor(parseInt($('#world-height').val()));
    game.world.season = $('input[name="season"]:checked').val();
    errorMsg.empty();
    game.hideModal();
}

game.start = function () {
    game.world.generateMap();
    game.world.displayMap();
    game.generateTools();
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
            var tile = $('<div/>').addClass('tile');
            if (game.world.map[i][j] !== "") {
                var paintedTile = $('<div/>').addClass("painted-tile");
                paintedTile.css('background-image',`url(./img/${game.world.season}/${game.world.map[i][j]}.png)`);
                paintedTile.data('type', game.world.map[i][j]);
                tile.append(paintedTile);
            }
            $('#world').append(tile);
        }
    }
}

game.generateTools = function () {
    var tools = $('#tools');
    for (var tool in game.toolDefinitions) {
        var toolDiv = $('<div/>').addClass('tool').attr('id', tool);
        var toolImage = $('<img/>').attr('src', `./img/${tool}.png`).attr('alt', tool);
        var toolText = $('<span/>').text(tool);
        toolDiv.append(toolImage).append(toolText);
        tools.append(toolDiv);
    }
}

game.user.setDefaults = function () {
    game.allTools = $(".tool");
    game.activeTool = null;
    for (var tool in game.toolDefinitions) {
        game.user[tool] = $(`#${tool}`);
    }
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
    $(`#selected-tile-${game.user.selectedTile} span`).text(game.user.inventory[tile.data("type")]);
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
        var newTile = $('<div/>').addClass('painted-tile').data('type', game.user.selectedTile).css({
            'background-image':`url(./img/${game.world.season}/${game.user.selectedTile}.png)`,
            "display":"none"
        });
        newTile.click(game.user.clearTile);
        $(this).append(newTile);
        newTile.fadeIn();
        $(`#selected-tile-${game.user.selectedTile} span`).text(game.user.inventory[game.user.selectedTile]);
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
        var div = $('<div />').addClass('selected-tile').data('type', item).attr('id','selected-tile-' + item);
        div.css('background-image',`url(./img/${game.world.season}/${item}.png)`);
        var span = $('<span/>').text(game.user.inventory[item]);
        div.append(span);
        $('#inventory').append(div);
    }
}


$(document).ready(function () {
    game.init();
})
