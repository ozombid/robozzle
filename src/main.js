import * as list from './list.js';
import * as move from './move.js';
import * as show from './display.js';

// game understanding functions
function noInstructionsLeft(l)            { return list.isEmpty(l); }
function headInstruction(l)               { return list.head(l); }
function otherInstructions(l)             { return list.tail(l); }
function noStarLeft(map)                  { return map.stars===0; }
function noKeysLeft(map)                  { return map.keys<=0; }
function overMoves(map)                   { return map.maxMoves <= 0;}
export function height(map)                      { return map.board.length; }
export function width(map)                       { return map.board[0].length; }

/* is robot out of puzzle ? */
function isOut(map)  {     
    return map.robot.y <= 0 || map.robot.y >= width(map) || map.robot.x <= 0 ||
           map.robot.x >= height(map) || move.robotColor(map)===' '; 
}

/* is the instruction appliable in the given map ? */
function isApplied(map,instruction) {
     return instruction[0]==='anycolor' || move.robotColor(map).toUpperCase()===instruction[0].toUpperCase() ;
}

/* Simple instructions are : turnRight, goAhead...
   F1, F2 ... are not  */
function isSimpleInstruction(instruction) { return instruction[1] < move.F1; }

/*  INPUT : Fn : an instruction 
    PRECOND : Fn is not a simple instruction 
    OUTPUT : index i such that F[i] is Fn
    EXAMPLE : idx(['r',move.F1]) = 0, because F[0] represents F1
*/
function idx(Fn)  { return Fn[1]-move.F1; }

/*  INPUTS  : a map, Fi, Fj = cons( instruction1, cons( instruction2.... 
    OUTPUT  : boolean : Fj calls itself at first instruction : infinit loop 
    PRECOND : Fi, Fj are not simple instructions
    EXAMPLE : F1 = [ ['r',F1], ... ] is an infinit loop if robot in red
*/
function isLoop(map,Fi,Fj) {
    return isApplied(map, headInstruction(Fj)) && headInstruction(Fj)[1]=== headInstruction(Fi)[1];
}
/* force a map to be infinite, when the boolean isLoop is true */
function Infinit(map) { return { board: map.board, robot: map.robot, stars: map.stars, hole: map.hole, 
    keys: map.keys, maxMoves:-1, obj: map.obj }; }

/* returns if robot is in Hole or not */
function inHole(map) { return (map.robot.x===map.hole.xe && map.robot.y===map.hole.ye)  
    || (map.robot.x===map.hole.xa && map.robot.y===map.hole.ya) ; }

/* exchanges the stack head F[i][j] by F[i][j+1] */
function newStack(stack,Fij,i,j) {
    return list.isEmpty(otherInstructions(Fij)) ? list.stackPop(stack) : list.stackExchange([i+1,j+2],stack);
}

/**  
 * TODO ************************************** MAIN ****************************************/
 
/*  INPUTS : a map: initial map
             an array F= [F1,F2,F3....] of lists Fi
             such that each list Fi= cons( instruction1, cons( instruction2....  
             such that instruction1= ['r', goAhead ] (for example) ...
             disp: booleen : if map/stack wanted to be displied
    OUTPUT :
             let eStack : a stack that contains the first instruction F1,1
             rec (initial map, eStack, first instruction, 0, 0  )

    rec INPUTS : a map: map
                 a stack: contains the first instruction F1,1
                 Fij: the j tail of F[i]
                 i,j such that head(Fij) = F[i][j]
 
    rec OUTPUT : a [map,stack] such that map doesn't have to evoluate no more for one of the reasons bellow :
                  - the robot was out of the map 
                  - the robot has eaten all stars (objetive setup) 
                  - no F1 instruction left, all F1 applied
                  - inifinit loop 
    Also displays full robot evolution in the map
*/

function mapStackEvoluate(initialMap,F,disp) {
    function rec(map,stack,Fij,i,j) {
        // if robot is out the map, or no star left, or no instructions left 
        if ( isOut(map) || (noStarLeft(map)  && map.obj===move.collectAllStars) 
             || overMoves(map) || noInstructionsLeft(Fij) )  return [map,stack];
        if (disp) show.stackDispIdx(stack);
        // when a robot dive in a hole without keys, it teleports to another positionke 
        if ( inHole(map) && noKeysLeft(map) ) {
            let newMap= move.holeTeleport(map);
            if (disp) show.mapDisp(newMap);
            return rec(newMap, stack, Fij, i, j);
        }
        // if condition cannot be applied, then jump to other instructions 
        if ( !isApplied(map, headInstruction(Fij)) )  {
            let nStack= newStack(stack,Fij,i,j);
            return rec(map, nStack, otherInstructions(Fij), i, j+1 ); 
        }
        // if it calls recursively an Fj, go apply it , when it's done, carry on left instructions of Fij 
        else if ( !isSimpleInstruction( headInstruction(Fij) ) ) { 
            let newIdx= idx(headInstruction(Fij));
            let Fj= F[ newIdx ];
            if ( isLoop(map,Fij,Fj) ) return [Infinit(map),stack];
            let nStack= newStack(stack,Fij,i,j);
            let a= rec(map, list.stackPush([newIdx+1,1], nStack), Fj, newIdx, 0);
            let afterMap = a[0], afterStack=a[1];
            return rec( afterMap, afterStack, otherInstructions(Fij), i, j+1); } 
        // if it is a simple applied instruction:
        else { 
            let newMap= move.instructionToJsFunction( headInstruction(Fij) )(map);    // apply it 
            if (disp) show.mapDisp(newMap);                                           // display new robot
            let nStack= newStack(stack,Fij,i,j);                                      // put next inst in stack 
            return rec( newMap, nStack, otherInstructions(Fij), i, j+1 ); }           // next instruction
    }
    // remind of initial part  
    if (disp) {
        console.log('Play the game ! \n');
        show.mapDisp(initialMap); }
    let eStack= list.stackPush([1,1], list.stackCreateEmpty());
    return rec(initialMap, eStack, F[0], 0,0);
}


/**************************************** GAME ENVIRONEMNT ************************************* */

/* Game Environment
    INPUTS : initial map, an array F= [F1,F2,F3....] of arrays Fi
             such that each array Fi= [instruction1, instruction2....]
             such that instruction1= ['r', goAhead ] (for example) ... 
             disp: booleen: if map/stack wanted to be showed 
    OUTPUT : game results 
*/
export function playGame(initialMap, F, disp) {
    // 1- check if instructions are all valid
    if (!checkIsValid(F)) return `\x1b[31m${'Syntaxe Error'}\x1b[0m`;
    // 2- convert arrays Fi to lists
    let F_list= F.map( list.arrayToList );
    // 3- Let the game begin !
    let finalMap= mapStackEvoluate(initialMap, F_list, disp)[0];
    let moves= initialMap.maxMoves - finalMap.maxMoves;
    // 4- Game results 
    if (initialMap.obj===move.collectAllStars) {
        return isOut(finalMap) ? gameOver : overMoves(finalMap) ? infinit :
               noStarLeft(finalMap) ? win(moves) : 
               gameOver; 
    }
    else {
        return isOut(finalMap) ? noStarLeft(finalMap) ? noStarBut+gameOver : gameOver : 
               overMoves(finalMap) ? noStarLeft(finalMap) ? noStarBut+infinit : infinit :
               noStarLeft(finalMap) ? win(moves) : 
               gameOver; 
    }
}

// coloring results 
function win(moves) { return `\x1b[32m${'puzzle complete in ' + `${moves}` +' steps'}\x1b[0m`; }
export const gameOver= `\x1b[31m${'fell off puzzle'}\x1b[0m`;
export const noStarBut = `\x1b[33m${'collected all stars but '}\x1b[0m`;
export const infinit= `\x1b[31m${'infinit loop'}\x1b[0m`;

/* Checks if F is a valid array of arrays of instructions */
function checkIsValid(F) {
    // F must be an array
    if (!Array.isArray(F)) return 0; 
    // all F[i] must be an array  
    function isArray(i) {
        if (i===F.length) return 1; 
        else if (!Array.isArray(F[i])) return 0;
        else return isArray(i+1);
    }
    if (!isArray(0)) return 0;
    // now we can convert each F[i] to a list
    let F_list= F.map( list.arrayToList ); // array of lists 
    // instruction must be like [color,move] with valid color and move
    function isStxError(inst) {
        return !Array.isArray(inst) || !Number.isInteger(inst[1]) || inst[1] < move.goAhead ||
               inst[1] > move.F5 || (inst[1] - move.F1 >= F.length) ||
               (inst[0]!=='r' && inst[0]!=='b' && inst[0]!=='g' && inst[0]!=='anycolor');
    }
    // all instrucitons of F[i] must be valid 
    function isValid(Fi) {
        if (list.isEmpty(Fi)) return 1;
        else if (isStxError(headInstruction(Fi))) return 0;
        return isValid(otherInstructions(Fi));            
    }
    // all instrucitons of each F[i] must be valid 
    function Terminal(i) {
        if (i===F_list.length) return 1;
        else if (!isValid(F_list[i])) return 0;
        else return Terminal(i+1);
    }
    return Terminal(0);
}
