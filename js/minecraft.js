function main() {

    game = {};

    /////////////WORLD FEATURES///////////////////

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
        ["sky", "sky", "sky", "rock", "rock", "rock", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "trunk", "sky", "sky", "sky", "sky", "sky"]
        ["grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass"],
        ["ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground"],
        ["ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground"],
        ["ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground"],
        ["ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground"],
        ["ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground"]
    ];

    game.world.display = function () {
        for (var i = 0; i < game.world.map.length; i++) {
            for (var j = 0; j < game.world.map[i].length; j++) {
                var tile = $('<div/>').addClass("tile " + game.world.map[i][j]);
                tile.data("type", game.world.map[i][j]);
                $('#world').append(tile);
            }
        }
    }

    game.world.display();

    //////////////////////USER FEATURES////////////////////////

    game.user = {};

    game.user.axeBtnIsClicked = false; //change to true when user click the button and back into false when user clicks another div
    game.user.pickaxeBtnIsClicked = false; //relevant only to rocks
    game.user.shovelBtnIsClicked = false; //relevent only for ground
    game.user.selectedTileIsClicked = false;

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
    });

    $(".tile").click(game.user.clickOnTile);
    $(".tile").click(game.user.settingBackTheTile);


    //this function will connect to all the divs in the world to the mousedown event:
    game.user.clickOnTile = function () {
        if (game.user.axeBtnIsClicked) {
            if ($(this.data("type") === "tree" || this.data("type") === "trunk")) {
                game.user.takingOutTheTile();
            }
            else {
                game.user.alertButton($("#axe"));
            }
        }
        if (game.user.pickaxeBtnIsClicked) {
            if ($(this).data("type") === "rock") {
                game.user.takingOutTheTile();
            }
            else {
                game.user.alertButton($("#pickaxe"));
            }
        }
        if (game.user.shovelBtnIsClicked) {
            if ($(this).data("type") === "grass" || $(this).data("type") === "ground") {
                game.user.takingOutTheTile();
            }
            else {
                game.user.alertButton($("#shoval"));
            }
        }
    }

    game.user.takingOutTheTile() = function () {
        $(this).removeClass($(this).data);
        $(this).addClass("sky");
        $(".selected-tile").data("type", $(this).data);
        $(".selected-tile").addClass($(this).data);
    }

    game.user.settingBackTheTile() = function () {
        if (game.user.selectedTileIsClicked) {
            $(this).addClass($(".selected-tile").data("type"));
            $(".selected-tile").removeClass($(".selected-tile").data("type"));
            game.user.axeBtnIsClicked = false;
            game.user.pickaxeBtnIsClicked = false;
            game.user.shovelBtnIsClicked = false;
        }
    }

    game.user.alertButton = function (btn) {
        btn.addClass($(".alert"));
        setTimeout(function () {
            btn.removeClass($(".alert"));
        }, 500);
    }

}

$(document).ready(function () {
    main();
})
