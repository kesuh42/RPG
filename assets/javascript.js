var playerPosition = [0,0]
var exploredTiles

//Retreiving explored tiles array on page startup
if (localStorage.getItem("exploredtiles") === null) {
    exploredTiles = []
}
if (localStorage.getItem("exploredtiles") !== null) {
    exploredTiles = JSON.parse(localStorage.getItem("exploredtiles"))
}

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
                //array comparison doesn't work, so will stringify here
                var exploredCoordinatesArrayString = JSON.stringify(exploredCoordinatesArray)
                var blockCoordinatesString = JSON.stringify(blockCoordinates)
                if (exploredCoordinatesArrayString.includes(blockCoordinatesString)) {
                    var tileImg = document.createElement("img")
                    //need to find the index of the block in the explored tiles array
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
                    targetBlock.innerHTML = ""
                    tileImg.setAttribute("src", exploredTiles[indexFinder(exploredTiles, blockCoordinates)].content)
                    tileImg.setAttribute("class", "tileimg")
                    targetBlock.appendChild(tileImg)
                }
                else {
                    var tileImg = document.createElement("img")
                    function tileContentGenerator() {
                        var rng = Math.random()
                        if (rng > .1) {
                            return "assets/groundtile.png"
                        }
                        else {
                            return "assets/groundtilewithdude.png"
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
//Upon new exploration

//Movement functions
function left() {
    playerPosition[0] = playerPosition[0] - 1
    renderGrid()
}

function right() {
    playerPosition[0] = playerPosition[0] + 1
    renderGrid()
}

function up() {
    playerPosition[1] = playerPosition[1] + 1
    renderGrid()
}

function down() {
    playerPosition[1] = playerPosition[1] - 1
    renderGrid()
}

renderGrid()

//Movement buttons
document.addEventListener("click", function(){
    if (event.target.getAttribute("id") === "left") {
        left()
    }
    else if (event.target.getAttribute("id") === "right") {
        right()
    }
    else if (event.target.getAttribute("id") === "up") {
        up()
    }
    else if (event.target.getAttribute("id") === "down") {
        down()
    }
})