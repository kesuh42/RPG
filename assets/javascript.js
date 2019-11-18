var playerPosition = [0,0]
function renderGrid() {
    for (i of [1,2,3,4,5,6,7,8,9,"A","B","C"]){
        var x = i
        for (i of [1,2,3,4,5,6,7,8,9,"A","B","C"]){
            var y = i
            var blockID = "block" + x + y
            var targetBlock = document.getElementById(blockID)
            var tileImg = document.createElement("img")
            function tileContent() {
                var rng = Math.random()
                if (rng > .1) {
                    return "assets/groundtile.png"
                }
                else {
                    return "assets/groundtilewithdude.png"
                }
            }
            tileImg.setAttribute("src", tileContent())
            tileImg.setAttribute("class", "tileimg")
            targetBlock.appendChild(tileImg)
        }
    }
}
renderGrid()