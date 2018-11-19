
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
    game.user.setDefaultButtons();
    game.user.selectedTileIsClicked = false;
    game.user.axe = $("#axe");
    game.user.pickaxe = $("#pickaxe");
    game.user.shovel = $("#shovel");
    game.user.selectedTile = $(".selected-tile");
}

game.user.setDefaultButtons = function(){
    game.user.axeBtnIsClicked = false;
    game.user.pickaxeBtnIsClicked = false;
    game.user.shovelBtnIsClicked = false;
}

game.user.connectEvents = function() {
    game.user.axe.click(function () {
        game.user.axeBtnIsClicked = true;
        $(this).addClass("is-clicked");
    })
    
    game.user.pickaxe.click(function () {
        game.user.pickaxeBtnIsClicked = true;
        $(this).addClass("is-clicked");
    })
    
    game.user.shovel.click(function () {
        game.user.shovelBtnIsClicked = true;
        $(this).addClass("is-clicked");
    })
    
    game.user.selectedTile.click(function () {
        game.user.setDefaultButtons();
        game.user.axe.removeClass("is-clicked");
        game.user.pickaxe.removeClass("is-clicked");
        game.user.shovel.removeClass("is-clicked");
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
            game.user.alertButton(game.user.axe);
        }
    }
    if (game.user.pickaxeBtnIsClicked) {
        if ($(this).data("type") === "rock") {
            game.user.takingOutTheTile(that);
        }
        else {
            game.user.alertButton(game.user.pickaxe);
        }
    }
    if (game.user.shovelBtnIsClicked) {
        if ($(this).data("type") === "grass" || $(this).data("type") === "ground") {
            game.user.takingOutTheTile(that);
        }
        else {
            game.user.alertButton(game.user.shovel);
        }
    }
}

game.user.takingOutTheTile = function (tile) {
    tile.removeClass(tile.data("type"));
    tile.addClass("sky");
    game.user.selectedTile.removeClass(game.user.selectedTile.data("type"));
    game.user.selectedTile.data("type", tile.data("type"));
    game.user.selectedTile.addClass(tile.data("type"));
    
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
    if (game.user.selectedTileIsClicked) {
        $(this).addClass(game.user.selectedTile.data("type"));
        game.user.selectedTile.removeClass(game.user.selectedTile.data("type"));
        game.user.selectedTile.removeClass("in-use");
        
    }
}


$(document).ready(function () {
    game.start();
})
