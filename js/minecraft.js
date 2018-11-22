
var game = {};

game.world = {};
game.world.WORLD_HEIGHT = 20;
game.world.WORLD_WIDTH = 20;
game.world.season = "autumn";
game.world.background = [];


game.user = {};

game.user.inventory = {
    rock: 10,
    tree: 10,
    trunk: 10,
    grass: 10,
    ground: 10,
    water: 10,
    man: 10
}

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
        $('#tutorial-modal-container').css('display', 'block');
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
    $('#start-new-game-btn').click(function() {
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
    game.world.generateWorld();
    game.world.displayMap();
    game.generateTools();
    $('#screen').css('display', 'block');
    game.user.generateInventory();
    game.user.setDefaults();
    game.user.bindEvents();
}

game.world.generateMap = function () {
    for (var i = 0; i < this.WORLD_HEIGHT; i++) {
        game.world.background.push([]);
        for (var j = 0; j < this.WORLD_WIDTH; j++) {
            game.world.background[i].push("tile");
        }
    }
}

game.world.generateWorld = function () {
    game.world.matrix = [];
    var sunIndex = Math.floor(Math.random() * (game.world.WORLD_WIDTH - 2));
    var cloudIndex;
    do {
        cloudIndex = Math.floor(Math.random() * (game.world.WORLD_WIDTH - 5) + 1);
    }
    while (Math.abs(sunIndex - cloudIndex) < 3);
    var rockIndex = Math.floor(Math.random() * (game.world.WORLD_WIDTH - 3) +1);
    var trunkIndex;
    do {
        trunkIndex = Math.floor(Math.random() * (game.world.WORLD_WIDTH - 3) + 2);
    }
    while (Math.abs(rockIndex - trunkIndex) < 2);
    var waterIndex;
    do {
        waterIndex = Math.floor(Math.random() * (game.world.WORLD_WIDTH));
    }
    while (Math.abs(rockIndex - waterIndex) < 5 || Math.abs(trunkIndex - waterIndex) < 4);
    var manIndex;
    do {
        manIndex = Math.floor(Math.random() * (game.world.WORLD_WIDTH));
    }
    while (Math.abs(waterIndex - manIndex) < 3 || Math.abs(rockIndex - manIndex) < 2 || trunkIndex !== manIndex);
    for (var r = 0; r < game.world.WORLD_HEIGHT; r++) {
        game.world.matrix.push([]);
        for (var c = 0; c < game.world.WORLD_WIDTH; c++) {
            if (r === 1) {
                if (c === sunIndex) {
                    game.world.matrix[r][c] = "sun";
                }
                else if (c === sunIndex + 1) {
                    game.world.matrix[r][c] = "sun";
                }
            }
            else if (r === 2) {
                if (c === sunIndex) {
                    game.world.matrix[r][c] = "sun";
                }
                else if (c === sunIndex + 1) {
                    game.world.matrix[r][c] = "sun";
                }
                else if (c === cloudIndex) {
                    game.world.matrix[r][c] = "cloud";
                }
                else if (c === cloudIndex + 1) {
                    game.world.matrix[r][c] = "cloud";
                }
                else if (c === cloudIndex + 2) {
                    game.world.matrix[r][c] = "cloud";
                }
            }
            else if (r === 3) {
                if (c === cloudIndex - 1) {
                    game.world.matrix[r][c] = "cloud";
                }
                else if (c === cloudIndex) {
                    game.world.matrix[r][c] = "cloud";
                }
                else if (c === cloudIndex + 1) {
                    game.world.matrix[r][c] = "cloud";
                }
                else if (c === cloudIndex + 2) {
                    game.world.matrix[r][c] = "cloud";
                }
                else if (c === cloudIndex + 3) {
                    game.world.matrix[r][c] = "cloud";
                }
                else if (c === cloudIndex + 4) {
                    game.world.matrix[r][c] = "cloud";
                }
            }
            else if (r === 4) {
                if (c === cloudIndex) {
                    game.world.matrix[r][c] = "cloud";
                }
                else if (c === cloudIndex + 1) {
                    game.world.matrix[r][c] = "cloud";
                }
                else if (c === cloudIndex + 2) {
                    game.world.matrix[r][c] = "cloud";
                }
                else if (c === cloudIndex + 3) {
                    game.world.matrix[r][c] = "cloud";
                }
            }
            else if (r === 5) {
                if (c === cloudIndex + 2) {
                    game.world.matrix[r][c] = "cloud";
                }
            }
            else if (r === 7) {
                if (c === trunkIndex - 1) {
                    game.world.matrix[r][c] = "tree";
                }
                else if (c === trunkIndex) {
                    game.world.matrix[r][c] = "tree";
                }
                else if (c === trunkIndex + 1) {
                    game.world.matrix[r][c] = "tree";
                }
            }
            else if (r === 8) {
                if (c === trunkIndex - 1) {
                    game.world.matrix[r][c] = "tree";
                }
                else if (c === trunkIndex) {
                    game.world.matrix[r][c] = "tree";
                }
                else if (c === trunkIndex + 1) {
                    game.world.matrix[r][c] = "tree";
                }
            }
            else if (r === 9) {
                if (c === trunkIndex - 1) {
                    game.world.matrix[r][c] = "tree";
                }
                else if (c === trunkIndex) {
                    game.world.matrix[r][c] = "tree";
                }
                else if (c === trunkIndex + 1) {
                    game.world.matrix[r][c] = "tree";
                }
            }
            else if (r === 10) {
                if (c === trunkIndex) {
                    game.world.matrix[r][c] = "trunk";
                }
            }
            else if (r === 11) {
                if (c === trunkIndex) {
                    game.world.matrix[r][c] = "trunk";
                }
            }
            else if (r === 12) {
                if (c === rockIndex) {
                    game.world.matrix[r][c] = "rock";
                }
                else if (c === rockIndex + 1) {
                    game.world.matrix[r][c] = "rock";
                }
                else if (c === trunkIndex) {
                    game.world.matrix[r][c] = "trunk";
                }
            }
            else if (r === 13) {
                if (c === rockIndex -1) {
                    game.world.matrix[r][c] = "rock";
                }
                else if (c === rockIndex) {
                    game.world.matrix[r][c] = "rock";
                }
                else if (c === rockIndex + 1) {
                    game.world.matrix[r][c] = "rock";
                }
                else if (c === trunkIndex) {
                    game.world.matrix[r][c] = "trunk";
                }
                else if (c === manIndex) {
                    game.world.matrix[r][c] = "man";
                }
            }
            else if (r === 14) {
                if (c === waterIndex - 2) {
                    game.world.matrix[r][c] = "water";
                }
                else if (c === waterIndex - 1) {
                    game.world.matrix[r][c] = "water";
                }
                else if (c === waterIndex) {
                    game.world.matrix[r][c] = "water";
                }
                else if (c === waterIndex + 1) {
                    game.world.matrix[r][c] = "water";
                }
                else if (c === waterIndex + 2) {
                    game.world.matrix[r][c] = "water";
                }
                else {
                    game.world.matrix[r][c] = "grass";
                }
            }
            else if (r === 15) {
                if (c === waterIndex - 2 && waterIndex < 3) {
                    game.world.matrix[r][c] = "water";
                }
                else if (c === waterIndex - 1) {
                    game.world.matrix[r][c] = "water";
                }
                else if (c === waterIndex) {
                    game.world.matrix[r][c] = "water";
                }
                else if (c === waterIndex + 1) {
                    game.world.matrix[r][c] = "water";
                }
                else if (c === waterIndex + 2 && waterIndex > game.world.WORLD_WIDTH - 4) {
                    game.world.matrix[r][c] = "water";
                }
                else {
                    game.world.matrix[r][c] = "ground";
                }
            }
            else if (r === 16) {
                if (c === waterIndex - 2 && waterIndex < 3) {
                    game.world.matrix[r][c] = "water";
                }
                else if (c === waterIndex - 1 && waterIndex < 3) {
                    game.world.matrix[r][c] = "water";
                }
                else if (c === waterIndex) {
                    game.world.matrix[r][c] = "water";
                }
                else if (c === waterIndex + 1 && waterIndex > game.world.WORLD_WIDTH - 4) {
                    game.world.matrix[r][c] = "water";
                }
                else if (c === waterIndex + 2 && waterIndex > game.world.WORLD_WIDTH - 4) {
                    game.world.matrix[r][c] = "water";
                }
                else {
                    game.world.matrix[r][c] = "ground";
                }
            }
            else if (r >= 15 && r <= 20) {
                game.world.matrix[r][c] = "ground";
            }
        }
    }
}


game.world.displayMap = function () {
    for (var i = 0; i < game.world.background.length; i++) {
        for (var j = 0; j < game.world.background[i].length; j++) {
            var tile = $('<div/>').addClass('tile');
            if (game.world.matrix[i][j] !== "" && game.world.matrix[i][j] != undefined) {
                var paintedTile = $('<div/>').addClass("painted-tile");
                paintedTile.css('background-image',`url(./img/${game.world.season}/${game.world.matrix[i][j]}.png)`);
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
        var div = $('<div />').addClass(item).addClass('selected-tile').data('type', item);
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
