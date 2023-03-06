/** 
* TODO ************************************ CONSTANTS *************************************/

// robozzle moves 
export const goAhead=0, turnRight=1, turnAround=2, turnLeft=3, jump=4;
// robozzle functions
export const F1=5,  F2=6, F3=7, F4=8, F5=9;
// directions 
export const North=0, East=1, South=2, West=3;
// play in order to win when no star and no instruction left
export const collectAllStarsAndEndInstructions=1;
// play in order to win when only no star is left
export const collectAllStars=0;
// no instructions const 
export const noInstructions = [];
// no holes used
export const noHoles = 0;
// if map/stack wanted to be showed 
export const show= 1;
// if else
export const doNotShow= 0;

/** 
* TODO ************************************ LINKINGS *************************************/

/* returns color of robot position in a given map */
export function robotColor(map)    { return map.board[map.robot.x][map.robot.y]; }    

/* INPUTS : a move (example: turnRight ), a direction (example: West) 
   OUTPUT : new direction after moving the robot: example above => (turnRight + West)%4 = South
*/
function changeDirection(move,dir) { return (move+dir)%4 ; }                     

/*  INPUT  : a direction
    OUTPUT : a displacement, by which a robot can follow this direction,          -------------------->  y          N
    example : the direction '->' moves the robot to the right : y++              |                               W  .  E 
              ie: (dx,dy)=(0,1)                                                x |    fixed map frame               S           
    So, dx, dy are the displacement on x, y                                      v
*/
function dx(newDir)          { return newDir===North ? -1 : newDir===South ? 1 : 0 ; }  // move on x
function dy(newDir)          { return newDir===West  ? -1 : newDir===East  ? 1 : 0 ; }  // move on y


/* is robot landing on a star ? */
function isStar(map)  { 
    return robotColor(map)!==' ' && robotColor(map)===robotColor(map).toUpperCase(); }

/*  INPUT   : instruction : arrays[2], example: [ 'r', goAhead ] : it means if robot in red, then robot goes ahead
    OUTPUT  : a js function f, of INPUT : map, and OUTPUT : map
              f(map) = a new map where robot have moved by the instruction given in arguments
              if there is a star in the new robot place, the number of stars of new map will be decremented
    PRECOND : condition is verified and will be applied,
              in given example there is no need to check if robot is in red or not.
*/
export function instructionToJsFunction(instruction) {
    function func(map) { 
        let newDir = changeDirection(instruction[1],map.robot.dir) ;
        // FACT: the only instructions that can displaces a robot are 'goAhead' and 'jump'
        if ( instruction[1]===goAhead || instruction[1]===jump ) {
            // then return the new displaced robot in a new map
            // goAhead has 1 step, jump has 2 steps, so 
            let steps= 1 + instruction[1]/4;
            let newRobot= { x: map.robot.x + steps*dx(newDir), y: map.robot.y + steps*dy(newDir), dir: map.robot.dir };
            let newMap= { ...map, robot: newRobot, maxMoves: map.maxMoves -1, moves: map.moves+steps };
            if (isStar(newMap))   return removeStar(newMap);          // robot eats the star
            else                  return newMap;                      // keep my stars number
        }
        // else, just change the direction, (example: turnRight)
        return { ...map, robot: { x: map.robot.x, y: map.robot.y, dir: newDir }, maxMoves: map.maxMoves-1 };
    }
    // my function is ready !
    return func;
}

/* INPUT   : a map 
   OUTPUT  : same map, but one star was removed 
   PRECOND : robot is landind on that star  
*/
function removeStar(map) {  
    let newMap= { ...map, board: [], stars: map.stars-1 };
    /* Terminal function */
    function Terminal(i) { 
        if (i!==map.board.length) {
            if (i===map.robot.x) {
                newMap.board[i] = map.board[i].slice(0,map.robot.y) + robotColor(map).toLowerCase() 
                                 + map.board[i].slice(map.robot.y+1) ; }
            else newMap.board[i] = map.board[i];
            Terminal(i+1);
        }
    }
    Terminal(0);
    return newMap;
}

/* INPUT   : a map 
   OUTPUT  : same map, but one star was added 
   PRECOND : robot is landing on that star  
*/
export function putStar(map) {  
    let newMap= { ...map, board: [], stars: map.stars+1, hole: -1 };
    /* Terminal function */
    function Terminal(i) { 
        if (i!==map.board.length) {
            if (i===map.robot.x) {
                let r= robotColor(map)===' ' ? 'B' : robotColor(map).toUpperCase() ;
                newMap.board[i] = map.board[i].slice(0,map.robot.y) + r 
                                 + map.board[i].slice(map.robot.y+1) ; }
            else newMap.board[i] = map.board[i];
            Terminal(i+1);
        }
    }
    Terminal(0);
    return newMap;
}



/************************************************** HOLE *********************************************** */

/* return a map, where the robot is teleported */
export function holeTeleport(map) {
    if ( map.robot.x===map.hole.xe && map.robot.y===map.hole.ye ) {
        let newRobot= { x: map.hole.xa+dx(map.hole.dirA), y: map.hole.ya+dy(map.hole.dirA), dir: map.hole.dirA };
        let newMap= { ...map, robot: newRobot, maxMoves: map.maxMoves-1 };
        return newMap;
    }
    else {
        let newRobot= { x: map.hole.xe+dx(map.hole.dirE), y: map.hole.ye+dy(map.hole.dirE), dir: map.hole.dirE };
        let newMap= { ...map, robot: newRobot, maxMoves: map.maxMoves-1 };
        return newMap; 
    }
}
