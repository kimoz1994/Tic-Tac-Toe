                        //tic tac toe game logic


//variable to keep track of every box on the table
var origboard;

//constants for the human player and the AI player

const huplayer = "O";
const aiplayer = "X";

//next is array of all winning combinations, arrays full of arrays 

const wincombos = [
    
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [6,4,2],
    
]

//selecting all the sells by usging its class 
const cells = document.querySelectorAll(".cell");

startgame();


function startgame(){
    //hiding the endgame message 
    document.querySelector(".endgame").style.display="none";
//    creating array from 0-9
    origboard = Array.from(Array(9).keys());
    
//    clearing each cell at the beginning of the game 
    for(var i = 0 ; i<cells.length;i++){
//        removing the X and o
       cells[i].innerText = '';
//        removing the highlight of the winning combination
        cells[i].style.removeProperty("background-color");
        cells[i].addEventListener('click',turnClick,false);
    }
    
    
}


function turnClick(square){
    if(typeof origboard[square.target.id] == 'number'){
        
    turn(square.target.id , huplayer);
    if(!checktie()) turn(bestspot(),aiplayer);
        
    }
    
}

function turn(squareId,player){
    origboard[squareId] = player;
    document.getElementById(squareId).innerText=player;
    let gamewon = checkwin(origboard,player)
    
    if (gamewon) gameover(gamewon)
}

function checkwin(board,player){
    
    
    let plays = board.reduce((a,e,i)=>
      (e === player)? a.concat(i): a, []);
    let gamewon = null;
    for(let[index,win] of wincombos.entries()){
        
        if(win.every(elem =>plays.indexOf(elem) > -1)){
            
            gamewon = {index:index,player:player};
            break;
        }
        
    }
    
    return gamewon;
}



function gameover(gamewon){
    
    
    for(let index of wincombos[gamewon.index]){
        
        document.getElementById(index).style.backgroundColor=gamewon.player == huplayer ? "blue" :"red";
        
    }
    for(var i = 0; i <cells.length; i++){
        
        cells[i].removeEventListener('click' , turnClick ,false);
        
        
    }
    declarewinner(gamewon.player == huplayer ? "you win" : "you lose");
}

function declarewinner(who){
    
    document.querySelector('.endgame').style.display = "block";
    document.querySelector('.endgame .text').innerText = who;
    
    
}
function emptysquares(){
    return origboard.filter(s=>typeof s == "number");
    
}
function bestspot(){
    
    //the next logic will just return the next available space for the ai to play in 
//    return emptysquares()[0];
    
    //however the next logic will use the min an max AI algorithm to decide the best available space
    return minimax(origboard,aiplayer).index;
    
}

function checktie(){
    
    if(emptysquares().length == 0){
        for(var i = 0; i<cells.length ; i++){
            
            
            cells[i].style.backgroundColor = "green";
            cells[i].removeEventListener('click',turnClick,false);
            
            
        }
        
        declarewinner("Tie Game!");
        return true;
    }
    return false;
}


//definning the minimax function the ai funtion


function minimax(newboard,player){
    
    
    var availspots = emptysquares(newboard);
    
    if(checkwin(newboard,player)){
        
        return{score:-10};
    
    }
    else if (checkwin(newboard,aiplayer)){
        return{score:20};
        
    }
    
    else if (availspots.length === 0){
        
        return{score:0}
    }
    
    
    var moves = [];
    
    for(var i = 0; i < availspots.length;i++){
        
        
        var move = {};
        move.index = newboard[availspots[i]];
        newboard[availspots[i] ] = player;
        
        if(player == aiplayer){
            
            var result = minimax(newboard,huplayer);
            move.score = result.score;
            
        }
        else {
            var result = minimax(newboard,aiplayer);
            move.score=result.score;
            
            
        }
        
        
        newboard[availspots[i] = move.index];
        
        moves.push(move);
        
    }
    
    
    var bestmove;
    if(player === aiplayer){
        
        var bestscore = -10000;
        for(var i=0; i <moves.length;i++){
            
            if(moves[i].score > bestscore){
                bestscore = moves[i].score;
                bestmove = i;
            }
        }
        
}
    else{
     var bestscore = 10000;
        for(var i=0; i <moves.length;i++){
            
            if(moves[i].score < bestscore){
                bestscore = moves[i].score;
                bestmove = i;
            }
        }
    
    
    
    
    
    
}
    
    return moves[bestmove]; 
}








