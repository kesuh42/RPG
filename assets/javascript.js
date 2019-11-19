var playerPosition = [0,0]
var exploredTiles

//Retreiving explored tiles array on page startup, or setting default values
if (localStorage.getItem("exploredtiles") === null) {
    exploredTiles = []
}
if (localStorage.getItem("exploredtiles") !== null) {
    exploredTiles = JSON.parse(localStorage.getItem("exploredtiles"))
}

//Retrieving player position
if (localStorage.getItem("playerposition") === null) {
    playerPosition = [0,0]
}
if (localStorage.getItem("playerposition") !== null) {
    playerPosition = JSON.parse(localStorage.getItem("playerposition"))
}

//Converts hexadecimal div ids to numbers
function hexadecimalToDecimal(x) {
    if (x === "A") {
        return 10
    }
    else if (x === "B") {
        return 11
    }
    else if (x === "C") {
        return 12
    }
    else if (x === "D") {
        return 13
    }
    else if (x === "E") {
        return 14
    }
    else if (x === "F") {
        return 15
    }
    else {
        return x
    }
}

//With parameters exploredTiles and coordinates, finds the index of coordinates in exploredTiles
function indexFinder(x, y) {
    var index = 0
    for (i of x) {
        var xCoordinate = x[index].blockID[0]
        var yCoordinate = x[index].blockID[1]
        var xCoordinateCurrent = y[0]
        var yCoordinateCurrent = y[1]
        if (xCoordinate === xCoordinateCurrent && yCoordinate === yCoordinateCurrent) {
            return index
        }
        else {
            index++
        }
    }
}

//Renders map grid
function renderGrid() {
    for (i of [1,2,3,4,5,6,7,8,9,"A","B","C","D"]){
        var x = i
        var xConv = hexadecimalToDecimal(i)
        for (i of [1,2,3,4,5,6,7,8,9,"A","B","C","D"]){
            var y = i
            var yConv = hexadecimalToDecimal(i)
            var blockID = "block" + x + y
            var blockCoordinates = [playerPosition[0] - 7 + xConv, 7 + playerPosition[1] - yConv]
            var targetBlock = document.getElementById(blockID)
            //Player Model
            if (x===7 && y===7) {
                var tileImg = document.createElement("img")
                targetBlock.innerHTML = ""
                tileImg.setAttribute("src", "assets/playermodel.png")
                tileImg.setAttribute("class", "tileimg")
                targetBlock.appendChild(tileImg)
            }
            //Other tiles are randomly generated
            else {
                var exploredCoordinatesArray = []
                for (i of exploredTiles) {
                    exploredCoordinatesArray.push(i.blockID)
                }
                //Array comparison doesn't work, so will stringify here
                var exploredCoordinatesArrayString = JSON.stringify(exploredCoordinatesArray)
                var blockCoordinatesString = JSON.stringify(blockCoordinates)
                //If the coordinates have already been explored, pulls the tile type from the exploredTiles array
                if (exploredCoordinatesArrayString.includes(blockCoordinatesString)) {
                    var tileImg = document.createElement("img")
                    targetBlock.innerHTML = ""
                    tileImg.setAttribute("src", exploredTiles[indexFinder(exploredTiles, blockCoordinates)].content)
                    tileImg.setAttribute("class", "tileimg")
                    targetBlock.appendChild(tileImg)
                }
                //Otherwise, randomly generates a new tile
                else {
                    var tileImg = document.createElement("img")
                    function tileContentGenerator() {
                        var rng = Math.random()
                        if (rng < .1) {
                            return "assets/groundtilewithdude.png"
                        }
                        else if (rng < .15 && rng > .1) {
                            return "assets/lootbox.png"
                        }
                        else {
                            return "assets/groundtile.png"
                        }
                    }
                    targetBlock.innerHTML = ""
                    tileImg.setAttribute("src", tileContentGenerator())
                    tileImg.setAttribute("class", "tileimg")
                    targetBlock.appendChild(tileImg)
                    //Save new coordinate to array and update local storage
                    exploredTiles.push({"blockID": blockCoordinates, "content": tileImg.getAttribute("src")})
                    exploredCoordinatesArray.push(blockCoordinates)
                    localStorage.setItem("exploredtiles", JSON.stringify(exploredTiles))
                }

            }
        }
    }
}

//Movement functions
function left() {
    playerPosition[0] = playerPosition[0] - 1
    renderGrid()
    localStorage.setItem("playerposition", JSON.stringify(playerPosition))
}

function right() {
    playerPosition[0] = playerPosition[0] + 1
    renderGrid()
    localStorage.setItem("playerposition", JSON.stringify(playerPosition))

}

function up() {
    playerPosition[1] = playerPosition[1] + 1
    renderGrid()
    localStorage.setItem("playerposition", JSON.stringify(playerPosition))

}

function down() {
    playerPosition[1] = playerPosition[1] - 1
    renderGrid()
    localStorage.setItem("playerposition", JSON.stringify(playerPosition))

}

renderGrid()

//Movement buttons, renders combat or item screens accordingly
document.addEventListener("click", function(){
    var combat = false
    var item = false
    if (event.target.getAttribute("id") === "left") {
        var leftTileContent = document.getElementById("block67").childNodes[0].getAttribute("src")
        if (leftTileContent === "assets/groundtilewithdude.png") {
            combat = true
        }
        else if (leftTileContent === "assets/lootbox.png") {
            item = true
        }
        left()
        if (combat) {
            renderCombat()
            combat = false
        }
        else if (item) {
            renderItem()
            item = false
        }
    }
    else if (event.target.getAttribute("id") === "right") {
        var rightTileContent = document.getElementById("block87").childNodes[0].getAttribute("src")
        if (rightTileContent === "assets/groundtilewithdude.png") {
            combat = true
        }
        else if (rightTileContent === "assets/lootbox.png") {
            item = true
        }
        right()
        if (combat) {
            renderCombat()
            combat = false
        }
        else if (item) {
            renderItem()
            item = false
        }
    }
    else if (event.target.getAttribute("id") === "up") {
        var upTileContent = document.getElementById("block76").childNodes[0].getAttribute("src")
        if (upTileContent === "assets/groundtilewithdude.png") {
            combat = true
        }
        else if (upTileContent === "assets/lootbox.png") {
            item = true
        }
        up()
        if (combat) {
            renderCombat()
            combat = false
        }
        else if (item) {
            renderItem()
            item = false
        }
    }
    else if (event.target.getAttribute("id") === "down") {
        var downTileContent = document.getElementById("block78").childNodes[0].getAttribute("src")
        if (downTileContent === "assets/groundtilewithdude.png") {
            combat = true
        }
        else if (downTileContent === "assets/lootbox.png") {
            item = true
        }
        down()
        if (combat) {
            renderCombat()
            combat = false
        }
        else if (item) {
            renderItem()
            item = false
        }
    }
    else if (event.target.textContent === "Return to Map") {
        endEncounter()
    }
})

function clearBody() {
    document.querySelector("body").innerHTML = ""
}

//Probably should find a way to make this variable non-global
var bodySnapshot

function saveBody() {
    bodySnapshot = document.querySelector("body").innerHTML
}

function restoreBody() {
    document.querySelector("body").outerHTML = bodySnapshot
}

function renderCombat() {
    saveBody()
    clearBody()
    var combatScreen = document.createElement("div")
    combatScreen.setAttribute("class", "combatscreen")
    combatScreen.textContent = "Combat isn't implemented yet, so let's just say you absolutely destroyed that bad guy"
    document.querySelector("body").appendChild(combatScreen)
    var endCombatButton = document.createElement("button")
    endCombatButton.textContent = "Return to Map"
    document.querySelector("body").appendChild(endCombatButton)
}

function renderItem() {
    saveBody()
    clearBody()
    rng = Math.random()
    function generateItem() {
        if (rng < .1) {
            return "10 gp"
        }
        else if (rng > .1 && rng < .2) {
            return "20 gp"
        }
        else if (rng > .2 && rng < .3) {
            return "30 gp"
        }
        else if (rng > .3 && rng < .4) {
            return "40 gp"
        }
        else if (rng > .4 && rng < .5) {
            return "50 gp"
        }
        else if (rng > .5 && rng < .6) {
            return "60 gp"
        }
        else if (rng > .6 && rng < .7) {
            return "70 gp"
        }
        else if (rng > .7 && rng < .8) {
            return "80 gp"
        }
        else if (rng > .8 && rng < .9) {
            return "90 gp"
        }
        else if (rng > .9 && rng < 1) {
            return "100 gp"
        }
    }
    var itemScreen = document.createElement("div")
    itemScreen.setAttribute("class", "itemscreen")
    itemScreen.textContent = "You found " + generateItem() + "! But you absent-mindedly drop the loot down a sewer grate. How unfortunate!"
    document.querySelector("body").appendChild(itemScreen)
    var endItemButton = document.createElement("button")
    endItemButton.textContent = "Return to Map"
    document.querySelector("body").appendChild(endItemButton)
}

function endEncounter() {
    //Replaces person tile with blank tile upon killing enemy
    exploredTiles[indexFinder(exploredTiles, playerPosition)].content = "assets/groundtile.png"
    localStorage.setItem("exploredtiles", JSON.stringify(exploredTiles))
    //Returns to map
    restoreBody()
}