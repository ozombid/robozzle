
import * as main from '../src/main.js';
import * as move from '../src/move.js';
import * as snake from '../src/generate.js';
//import * as list from '../src/list.js';
//import * as dumpsnake from '../src/dumpSnake.js'

/****************************************** RECURSED *************************************************** 
This test return random puzzles that have one commun constant solution [F1,F2],
EXAMPLE :  http://robozzle.com/js/play.aspx?puzzle=536



************************************** FUNCTIONS ******************************************/

function turnFall(map) { 
    let followDir1= move.instructionToJsFunction( ['anycolor', move.goAhead] )(map);
    return (map.moves)%2!==0 || goFall(followDir1) ; 
}
function goFall(map)   { 
    if (snake.isRightPlace(map)) return 1;
    let followDir1= move.instructionToJsFunction( ['anycolor', move.goAhead] )(map);
    return snake.isRightPlace(followDir1) && (map.moves-1)%2===0 ; 
}
function getRandomInstruction() { 
    let color= Math.floor(Math.random() * 100);
    return color===61 ? ['r',move.turnRight] : color===31 ? ['b',move.turnLeft] : ['anycolor',move.goAhead] ; 
}
function getRandomTurnInstruction() {         
    let color= Math.floor(Math.random() * 4);
    return color % 2 ===0 ? ['r',move.turnRight] : ['b',move.turnLeft] ;
}
function M(map,newMap) {
    function findMiddleWay(map) {
        function f(map,i) {
            let next= move.instructionToJsFunction(['anycolor',move.goAhead])(map);
            return i>0 ? f(next,i-1) : map.robot ;
        }
    return f(move.instructionToJsFunction(['anycolor',move.turnAround])(map),map.moves/2);
    }
    function colorMiddleWay(map,robot) {
        let newMap= { board: [], robot:map.robot, stars: map.stars, hole: map.hole, maxMoves: map.maxMoves, moves: 0, obj: map.obj };
        /* Terminal function */
        function Terminal(i) { 
            if (i<map.board.length) {
                if (i===robot.x) {
                        //let a= Math.floor(Math.random() * 4) % 2 ==0 ? 'g' : 'r' ;
                        newMap.board[i] = map.board[i].slice(0,robot.y) + 'g' + map.board[i].slice(robot.y+1) ; 
                }
                else newMap.board[i] = map.board[i];
                Terminal(i+1);
            }
        } 
        Terminal(0);
        return newMap;
    }
    return colorMiddleWay(newMap,findMiddleWay(map));
}
let T=[turnFall,goFall,getRandomInstruction,getRandomTurnInstruction,M];


/********************************** CONSOLE ********************************************* */


export const F1= [ ['anycolor',move.F2], ['r',move.turnRight], ['b',move.turnLeft],['anycolor',move.F1] ] ;
export const F2= [ ['anycolor',move.goAhead], ['b',move.F2], ['anycolor',move.goAhead] ] ;

export const randomMap= snake.CreatMap(41,51,3000,move.collectAllStars,T);

export const jest12= main.playGame(randomMap[0],[F1,F2],move.doNotShow);


/*
let F=[F1,F2];
let F_list= F.map( list.arrayToList );
let randomMap= dumpsnake.AnotherCreatingMap(21,15,30,move.collectAllStars,F_list,1);
console.log(main.playGame(randomMap,F));
*/
