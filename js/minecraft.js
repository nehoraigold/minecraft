
var game = {};

game.world = {};
game.world.WORLD_HEIGHT = 20;
game.world.WORLD_WIDTH = 20;
game.world.map = [
    ["sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky"],
    ["sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky"],
    ["sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky"],
    ["sky", "sky", "cloud", "cloud", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky"],
    ["sky", "sky", "cloud", "cloud", "cloud", "cloud", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky"],
    ["sky", "cloud", "cloud", "cloud", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky"],
    ["sky", "sky", "cloud", "cloud", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky"],
    ["sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "tree", "tree", "tree", "sky", "sky", "sky", "sky"],
    ["sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "tree", "tree", "tree", "sky", "sky", "sky", "sky"],
    ["sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "tree", "tree", "tree", "sky", "sky", "sky", "sky"],
    ["sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "trunk", "sky", "sky", "sky", "sky", "sky"],
    ["sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "trunk", "sky", "sky", "sky", "sky", "sky"],
    ["sky", "sky", "sky", "rock", "rock", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "trunk", "sky", "sky", "sky", "sky", "sky"],
    ["sky", "sky", "sky", "rock", "rock", "rock", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "trunk", "sky", "sky", "sky", "sky", "sky"],
    ["grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass"],
    ["ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground"],
    ["ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground"],
    ["ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground"],
    ["ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground"],
    ["ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground"]
];

game.user = {};


game.start = function () {
    game.world.display();
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
    game.user.axeBtnIsClicked = false;
    game.user.pickaxeBtnIsClicked = false;
    game.user.shovelBtnIsClicked = false;
    game.user.selectedTileIsClicked = false;
}

game.user.connectEvents = function() {
    $("#axe").click(function () {
        game.user.axeBtnIsClicked = true;
    })
    
    $("#pickaxe").click(function () {
        game.user.pickaxeBtnIsClicked = true;
    })
    
    $("#shovel").click(function () {
        game.user.shovelBtnIsClicked = true;
    })
    
    $(".selected-tile").click(function () {
        game.user.selectedTileIsClicked = true;
        $(this).addClass("in-use");
    });
    $(".tile").on("click", game.user.clickOnTile);
    $(".sky").on("click", game.user.settingBackTheTile);
}


game.user.clickOnTile = function () {
    var that = $(this);
    if (game.user.axeBtnIsClicked) {
        if ($(this).data("type") === "tree" || $(this).data("type") === "trunk") {
            game.user.takingOutTheTile(that);
        }
        else {
            game.user.alertButton($("#axe"));
        }
    }
    if (game.user.pickaxeBtnIsClicked) {
        if ($(this).data("type") === "rock") {
            game.user.takingOutTheTile(that);
        }
        else {
            game.user.alertButton($("#pickaxe"));
        }
    }
    if (game.user.shovelBtnIsClicked) {
        if ($(this).data("type") === "grass" || $(this).data("type") === "ground") {
            game.user.takingOutTheTile(that);
        }
        else {
            game.user.alertButton($("#shoval"));
        }
    }
}

game.user.takingOutTheTile = function (tile) {
    tile.removeClass(tile.data("type"));
    tile.addClass("sky");
    $(".selected-tile").removeClass($(".selected-tile").data("type"));
    $(".selected-tile").data("type", tile.data("type"));
    $(".selected-tile").addClass(tile.data("type"));
}

game.user.alertButton = function (btn) {
    btn.addClass("alert");
    setTimeout(function () {
        btn.removeClass("alert");
    }, 100);
}

game.user.settingBackTheTile = function () {
    if (game.user.selectedTileIsClicked) {
        $(this).addClass($(".selected-tile").data("type"));
        $(".selected-tile").removeClass($(".selected-tile").data("type"));
        $(".selected-tile").removeClass("in-use");
        game.user.setDefaults();
    }
}


$(document).ready(function () {
    game.start();
})
