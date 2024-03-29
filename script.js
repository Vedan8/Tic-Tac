const gameInfo=document.querySelector(".gameInfo")
const boxes=document.querySelectorAll(".box")
const newGame=document.querySelector(".newGame")

let  currentPlayer
let gameGrid
let xPositions=[]
let oPositions=[]
const winningPositions=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

function initGame(){
    currentPlayer="X"
    gameGrid=["","","","","","","","",""]
    newGame.setAttribute('style','opacity:0')
    gameInfo.innerText=`Current Player - ${currentPlayer}`

}
initGame()

boxes.forEach((box,index)=>{
    box.addEventListener("click",()=>{
        handleClick(box,index)
    })
})

function handleClick(box,index){
    if(gameGrid[index]==""){
        gameGrid[index]=currentPlayer
        box.innerText=`${currentPlayer}`
        for(let win of winningPositions){
            if((gameGrid[win[0]]!=="" && gameGrid[win[0]]===gameGrid[win[1]] && gameGrid[win[1]]===gameGrid[win[2]])){
                newGame.setAttribute('style','opacity:1')
                gameInfo.innerText=`Winner - ${currentPlayer}`
                boxes[win[0]].setAttribute('style','background-color:green')
                boxes[win[1]].setAttribute('style','background-color:green')
                boxes[win[2]].setAttribute('style','background-color:green')
                boxes.forEach((box)=>{
                    box.style.pointerEvents="none"
                })
                return 
            }
            let count=0
            for(let i=0;i<9;i++){
                if(gameGrid[i]!="") count++
            }
            if(count==9) {
                newGame.setAttribute('style','opacity:1')
                gameInfo.innerText=`Game Draw`
                return 
            }
        }
        if(currentPlayer==="X"){
            currentPlayer="O"
        }
        else {
            currentPlayer="X"
        }
        gameInfo.innerText=`Current Player - ${currentPlayer}`
    }
}

newGame.addEventListener("click",()=>{
    gameGrid=["","","","","","","",""]
    boxes.forEach((box)=>{
        box.setAttribute('style','background-color:none')
        box.innerText=""
    })
    initGame()
})
