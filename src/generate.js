
import * as list from './list.js';
import * as move from './move.js';
import { height, width } from './main.js';
//import * as show from './display.js';


/* verify is robot is out map */
export function isOutDim(map) { return map.robot.y < 1 || map.robot.y > width(map)-2 || map.robot.x < 1 ||
    map.robot.x > height(map)-2; }

/* verify if robot is in a right place, ie: it can go freely ahead, go right and left
   example :                             .            .
      . means empty cell                 > .        . ^ .       . v . 
                                         .                        .
*/
export function isRightPlace(map) {
    if (isOutDim(map)) return isOutDim(map);
    let n1= move.instructionToJsFunction( ['anycolor', move.goAhead] )(map) ;
    let n2= move.instructionToJsFunction( ['anycolor', move.turnRight] )(map) ;
    let n3= move.instructionToJsFunction( ['anycolor', move.turnLeft] )(map) ;
    let nR= move.instructionToJsFunction( ['anycolor', move.goAhead] )(n2) ;
    let nL= move.instructionToJsFunction( ['anycolor', move.goAhead] )(n3) ;
    return move.robotColor(n1)!==' ' || move.robotColor(nL)!==' ' || move.robotColor(nR)!==' ' ;
}

/* returns random robot */
function getRandomRobot(height,width) { 
    let rx= Math.floor(Math.random() * (height-6)) +3 ;
    let ry= Math.floor(Math.random() * (width -6)) +3 ;
    let rdir= Math.floor(Math.random() * 4) ;
    return {x: rx, y: ry, dir: rdir} ; 
}

/* INPUTS : height, width of a map 
            n : maximum allowed moves 
   OUTPUT : empty mad : board with ' '
*/
export function emptyMap(height,width,n,obj) {
    function emptyRow(w) { return w===0 ? '' : ' ' + emptyRow(w-1); }
    let emptyMap= { board: [], robot: getRandomRobot(10,17), stars:0, 
                    hole: move.noHoles, maxMoves: n, moves:0, obj: obj };
    function Terminal(i) { 
        if (i<height) {
            emptyMap.board[i] = emptyRow(width);
            Terminal(i+1);
        }
    }
    Terminal(0);
    return emptyMap;
}


/* colors the robot position with color */
export function colorMap(map,color) {
    let newMap= { ...map, board: [] };
    /* Terminal function */
    function Terminal(i) { 
        if (i<map.board.length) {
            if (i===map.robot.x) {
                if (color==='anycolor')
                    newMap.board[i] = map.board[i].slice(0,map.robot.y) + 'b' + map.board[i].slice(map.robot.y+1) ; 
                else 
                    newMap.board[i] = map.board[i].slice(0,map.robot.y) + color + map.board[i].slice(map.robot.y+1) ; 
            }
            else newMap.board[i] = map.board[i];
            Terminal(i+1);
        }
    }
    Terminal(0);
    return newMap;
}

/* INPUTS : 
    - h,w : height and width of map
    -  n  : maximum allowed moves
    - obj : map objetive
    - functions : table of 5 functions, described bellow
   OUTPUT : 
       an inital map with solution of simple instructions 
*/
export function CreatMap(h,w,n,obj,functions) {

    let turnFall=functions[0]; // 1 argument (map) > boolean : instruction can't be added 
    let goFall=functions[1];  //  1 argument (map) > boolean : instruction can't be added 
    let getRandomInstruction=functions[2]; // no arguments > random instruction
    let getRandomTurnInstruction=functions[3]; // no arguments > random turning instruction 
    let M=functions[4]; // 2 arguments (map, newMap) > do something with map and newMap

    function isLocked(map) { // > boolean : game over 
        let n1= move.instructionToJsFunction( ['anycolor', move.goAhead] )(map) ;
        let n2= move.instructionToJsFunction( ['anycolor', move.turnRight] )(map) ;
        let n3= move.instructionToJsFunction( ['anycolor', move.turnLeft] )(map) ;
        return ( goFall(n1) ) && ( turnFall(n2) ) && ( turnFall(n3) ) ;
    }

    /* Terminal rec
        INPUTS : emptymap, first instruction, empty list F
        OUTPUT : [ map, F ]
            - map : initial map with star at the end 
            - F   : solution : all needed instruction to reach the star 
    */
    function rec(map,instruction,F) {
        if (isLocked(map)) return [move.putStar(map),F] ; 
        let nmap= move.robotColor(map)===' ' ? colorMap(map,instruction[0]) :map ;
        let newMap= move.instructionToJsFunction( instruction )(nmap) ;
        if (instruction[1]===move.goAhead) { 
            if (goFall(newMap))     return rec(map, getRandomTurnInstruction(),F);
            return rec( newMap, getRandomInstruction(), list.listAppend(F,instruction) ); 
        }
        else  {
            if (turnFall(newMap)) return rec(map, getRandomInstruction(),F);
            return rec( M(map,newMap), ['anycolor', move.goAhead], list.listAppend(F,instruction));
        }   
    }     

    let eMap= emptyMap(h,w,n,obj);
    let C= rec(eMap, ['anycolor',move.goAhead], list.emptyList());   
    let map= { ...eMap, board: C[0].board, stars: 1 };
               
    return [map,[C[1]]];

}


