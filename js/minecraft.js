
var game = {};
game.world = {};
game.user = {};

game.init = function () {
    game.setDefaultData()
    game.bindStartButtons()
}

game.setDefaultData = function () {
    game.world.worldHeight = 20;
    game.world.worldWidth = 20;
    game.world.season = "spring";
    game.world.background = [];
    game.user.inventory = {
        rock: 0,
        tree: 0,
        trunk: 0,
        grass: 0,
        ground: 0,
        water: 0,
        man: 0
    }
    game.toolDefinitions = {
        pickaxe: ['rock'],
        axe: ['tree', 'trunk'],
        shovel: ['ground', 'grass'],
        bucket: ['water'],
        sword: ['man']
    }
}

game.bindStartButtons = function () {
    $('#start-btn').click(function () {
        $('#start-screen').css("display", "none");
        game.start();
    })
    $('#tutorial-btn').click(function () {
        game.showModal('tutorial-modal')
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
    $('#start-new-game-btn').click(function () {
        location.reload();
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
    var worldSize = $('input[name="size"]:checked').val()
    if (worldSize === "big") {
        game.world.worldWidth = 30;
        $('#world').addClass(worldSize);
    }
    game.world.season = $('input[name="season"]:checked').val();
    game.hideModal();
}

game.start = function () {
    game.world.generateMap();
    game.world.generateWorld();
    game.world.displayMap();
    game.generateTools();
    $('#screen').css('display', 'block');
    game.user.generateInventory();
    game.user.setDefaults();
    game.user.bindEvents();
}

game.world.generateMap = function () {
    for (var i = 0; i < this.worldHeight; i++) {
        game.world.background.push([]);
        for (var j = 0; j < this.worldWidth; j++) {
            game.world.background[i].push("tile");
        }
    }
}

game.world.generateWorld = function () {
    game.world.matrix = [];
    var sunIndex = Math.floor(Math.random() * (game.world.worldWidth - 2));
    var cloudIndex;
    do {
        cloudIndex = Math.floor(Math.random() * (game.world.worldWidth - 5) + 1);
    }
    while (Math.abs(sunIndex - cloudIndex) < 3);
    var rockIndex = Math.floor(Math.random() * (game.world.worldWidth - 3) + 1);
    var trunkIndex;
    do {
        trunkIndex = Math.floor(Math.random() * (game.world.worldWidth - 3) + 2);
    }
    while (Math.abs(rockIndex - trunkIndex) < 2);
    var waterIndex;
    do {
        waterIndex = Math.floor(Math.random() * (game.world.worldWidth));
    }
    while (Math.abs(rockIndex - waterIndex) < 5 || Math.abs(trunkIndex - waterIndex) < 4);
    var manIndex;
    do {
        manIndex = Math.floor(Math.random() * (game.world.worldWidth));
    }
    while (Math.abs(waterIndex - manIndex) < 3 || Math.abs(rockIndex - manIndex) < 2 || trunkIndex === manIndex);
    for (let r = 0; r < game.world.worldHeight; r++) {
        game.world.matrix.push([]);
    }
    if (game.world.season !== "winter" && game.world.season !== "autumn") {
        game.world.matrix[1][sunIndex] = "sun";
        game.world.matrix[1][sunIndex + 1] = "sun";
        game.world.matrix[2][sunIndex] = "sun";
        game.world.matrix[2][sunIndex + 1] = "sun";
    }
    game.world.matrix[2][cloudIndex] = "cloud";
    game.world.matrix[2][cloudIndex + 1] = "cloud";
    game.world.matrix[2][cloudIndex + 2] = "cloud";
    game.world.matrix[3][cloudIndex - 1] = "cloud";
    game.world.matrix[3][cloudIndex] = "cloud";
    game.world.matrix[3][cloudIndex + 1] = "cloud";
    game.world.matrix[3][cloudIndex + 2] = "cloud";
    game.world.matrix[3][cloudIndex + 3] = "cloud";
    game.world.matrix[3][cloudIndex + 4] = "cloud";
    game.world.matrix[4][cloudIndex] = "cloud";
    game.world.matrix[4][cloudIndex + 1] = "cloud";
    game.world.matrix[4][cloudIndex + 2] = "cloud";
    game.world.matrix[4][cloudIndex + 3] = "cloud";
    game.world.matrix[5][cloudIndex + 2] = "cloud";
    game.world.matrix[7][trunkIndex - 1] = "tree";
    game.world.matrix[7][trunkIndex] = "tree";
    game.world.matrix[7][trunkIndex + 1] = "tree";
    game.world.matrix[8][trunkIndex - 1] = "tree";
    game.world.matrix[8][trunkIndex] = "tree";
    game.world.matrix[8][trunkIndex + 1] = "tree";
    game.world.matrix[9][trunkIndex - 1] = "tree";
    game.world.matrix[9][trunkIndex] = "tree";
    game.world.matrix[9][trunkIndex + 1] = "tree";
    game.world.matrix[10][trunkIndex] = "trunk";
    game.world.matrix[11][trunkIndex] = "trunk";
    game.world.matrix[12][trunkIndex] = "trunk";
    game.world.matrix[12][rockIndex] = "rock";
    game.world.matrix[13][rockIndex - 1] = "rock";
    game.world.matrix[13][rockIndex] = "rock";
    game.world.matrix[13][rockIndex + 1] = "rock";
    game.world.matrix[13][trunkIndex] = "trunk";
    game.world.matrix[13][manIndex] = "man";
    if (game.world.worldWidth === 30) {
        var cloudIndex2;
        do {
            cloudIndex2 = Math.floor(Math.random() * (game.world.worldWidth - 2))
        }
        while (Math.abs(cloudIndex2 - sunIndex) < 2 || Math.abs(cloudIndex2 - cloudIndex) < 5);
        var rockIndex2;
        do {
            rockIndex2 = Math.floor(Math.random() * (game.world.worldWidth - 3) + 1)
        }
        while (Math.abs(trunkIndex - rockIndex2) < 2 || manIndex === rockIndex2);
        var trunkIndex2;
        do {
            trunkIndex2 = Math.floor(Math.random() * (game.world.worldWidth - 3) + 2)
        }
        while (Math.abs(rockIndex - trunkIndex2) < 2 || Math.abs(rockIndex2 - trunkIndex2) < 2 || Math.abs(trunkIndex - trunkIndex2) < 3);
        var manIndex2;
        do {
            manIndex2 = Math.floor(Math.random() * (game.world.worldWidth))
        }
        while (Math.abs(waterIndex - manIndex2) < 3 || Math.abs(rockIndex - manIndex2) < 2 || Math.abs(rockIndex2 - manIndex2) < 2 || trunkIndex === manIndex2 || trunkIndex2 === manIndex2 || manIndex === manIndex2);
        var manIndex3;
        do {
            manIndex3 = Math.floor(Math.random() * (game.world.worldWidth))
        }
        while (Math.abs(waterIndex - manIndex3) < 3 || Math.abs(rockIndex - manIndex3) < 2 || Math.abs(rockIndex2 - manIndex3) < 2 || trunkIndex === manIndex3 || trunkIndex2 === manIndex3 || manIndex === manIndex3 || manIndex2 === manIndex3);
        game.world.matrix[2][cloudIndex2] = "cloud";
        game.world.matrix[2][cloudIndex2 + 1] = "cloud";
        game.world.matrix[3][cloudIndex2] = "cloud";
        game.world.matrix[3][cloudIndex2 + 1] = "cloud";
        game.world.matrix[3][cloudIndex2 + 2] = "cloud";
        game.world.matrix[4][cloudIndex2 + 1] = "cloud";
        game.world.matrix[7][trunkIndex2 - 1] = "tree";
        game.world.matrix[7][trunkIndex2] = "tree";
        game.world.matrix[7][trunkIndex2 + 1] = "tree";
        game.world.matrix[8][trunkIndex2 - 1] = "tree";
        game.world.matrix[8][trunkIndex2] = "tree";
        game.world.matrix[8][trunkIndex2 + 1] = "tree";
        game.world.matrix[9][trunkIndex2 - 1] = "tree";
        game.world.matrix[9][trunkIndex2] = "tree";
        game.world.matrix[9][trunkIndex2 + 1] = "tree";
        game.world.matrix[10][trunkIndex2] = "trunk";
        game.world.matrix[12][trunkIndex2] = "trunk";
        game.world.matrix[12][rockIndex + 1] = "rock";
        game.world.matrix[11][trunkIndex2] = "trunk";
        game.world.matrix[12][rockIndex2] = "rock";
        game.world.matrix[12][rockIndex2 + 1] = "rock";
        game.world.matrix[13][rockIndex2] = "rock";
        game.world.matrix[13][rockIndex2 + 1] = "rock";
        game.world.matrix[13][trunkIndex2] = "trunk";
        game.world.matrix[13][manIndex2] = "man";
        game.world.matrix[13][manIndex3] = "man";
    }
    for (let r = 14; r < game.world.worldHeight; r++) {
        for (let c = 0; c < game.world.worldWidth; c++) {
            if (r === 14) {
                if (c === waterIndex - 1 || c === waterIndex || c === waterIndex + 1) {
                    game.world.matrix[r][c] = "water";
                }
                else {
                    game.world.matrix[r][c] = "grass";
                }
            }
            else if (r === 15) {
                if (c === waterIndex - 1 || c === waterIndex || c === waterIndex + 1) {
                    game.world.matrix[r][c] = "water";
                }
                else {
                    game.world.matrix[r][c] = "ground";
                }
            }
            else if (r === 16) {
                if (c === waterIndex - 1 || c === waterIndex || c === waterIndex + 1) {
                    game.world.matrix[r][c] = "water";
                }
                else {
                    game.world.matrix[r][c] = "ground";
                }
            }
            else if (r === 17) {
                if (c === waterIndex - 1 || c === waterIndex || c === waterIndex + 1) {
                    game.world.matrix[r][c] = "water";
                }
                else {
                    game.world.matrix[r][c] = "ground";
                }
            }
            else if (r === 18) {
                if (c === waterIndex - 1 || c === waterIndex || c === waterIndex + 1) {
                    game.world.matrix[r][c] = "water";
                }
                else {
                    game.world.matrix[r][c] = "ground";
                }
            }
            else if (r === 19) {
                if (c === waterIndex - 1 || c === waterIndex || c === waterIndex + 1) {
                    game.world.matrix[r][c] = "water";
                }
                else {
                    game.world.matrix[r][c] = "ground";
                }
            }
            else {
                game.world.matrix[r][c] = "ground";
            }
        }
    }
}


game.world.displayMap = function () {
    for (var i = 0; i < game.world.background.length; i++) {
        for (var j = 0; j < game.world.background[i].length; j++) {
            var tile = $('<div/>').addClass(`tile ${game.world.season}`);
            if (game.world.matrix[i][j] !== "" && game.world.matrix[i][j] != undefined) {
                var paintedTile = $('<div/>').addClass(`painted-tile ${game.world.season}`);
                paintedTile.css('background-image', `url(./img/${game.world.season}/${game.world.matrix[i][j]}.png)`);
                paintedTile.data('type', game.world.matrix[i][j]);
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

game.user.generateInventory = function () {
    for (var item in game.user.inventory) {
        var div = $('<div />').addClass('selected-tile').data('type', item).attr('id', 'selected-tile-' + item);
        div.css('background-image', `url(./img/${game.world.season}/${item}.png)`);
        var span = $('<span/>').text(game.user.inventory[item]);
        div.append(span);
        $('#inventory').append(div);
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

game.user.bindEvents = function () {
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
    $(`#selected-tile-${tile.data("type")} span`).text(game.user.inventory[tile.data("type")]);
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
            'background-image': `url(./img/${game.world.season}/${game.user.selectedTile}.png)`,
            "display": "none"
        });
        newTile.click(game.user.clearTile);
        $(this).append(newTile);
        newTile.fadeIn();
        $(`#selected-tile-${game.user.selectedTile} span`).text(game.user.inventory[game.user.selectedTile]);
    }
}




$(document).ready(function () {
    game.init();
})
