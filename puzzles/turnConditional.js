
import * as main from '../src/main.js';
import * as move from '../src/move.js';
import * as snake from '../src/generate.js';
//import * as list from '../src/list.js';

/****************************************** TURN CONDITIONAL *************************************************** 
This test return random puzzles that have one commun constant solution [F1]


************************************** FUNCTIONS ******************************************/

function turnFall(map) { 
    let followDir1= move.instructionToJsFunction( ['anycolor', move.goAhead] )(map);
    return goFall(followDir1) ; 
}
function goFall(map)   { 
    return snake.isRightPlace(map); 
}
function getRandomInstruction() { 
    /* returns random color: blue very often */
    function getRandomColor() { 
        let color= Math.floor(Math.random() * 100);
        return color%2===0 ? 'b' : 'anycolor' ;
    }
    let color= Math.floor(Math.random() * 100);
    return color===61 ? ['g',move.turnRight] : color===31 ? ['r',move.turnLeft] : [getRandomColor(),move.goAhead] ; 
}
function getRandomTurnInstruction() {         
    let color= Math.floor(Math.random() * 4);
    return color % 2 ===0 ? ['g',move.turnRight] : ['r',move.turnLeft] ;
}
function M(map,newMap) {
    return newMap;
}
let T=[turnFall,goFall,getRandomInstruction,getRandomTurnInstruction,M];


/********************************** CONSOLE ********************************************* */

export const randomMap= snake.CreatMap(21,31,3000,move.collectAllStars,T);

export const F1= [['anycolor',move.goAhead],['r',move.turnLeft],['g',move.turnRight],['anycolor',move.F1]];

export const jest11= main.playGame(randomMap[0],[F1],move.doNotShow);

//console.log(main.playGame(C[0],C[1]));


/*
let F=[F1];
let F_list= F.map( list.arrayToList );
console.log(snake.mapEvoluate(21,15,3000,move.collectAllStars,F_list,0));
*/
