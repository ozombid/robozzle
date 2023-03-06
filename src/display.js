/**
 * TODO ******************************** GRAPHICS **********************************/

import * as list from './list.js';
import * as move from './move.js';

/* displays directions */
function dirDisp(dir)  { 
    return dir===move.North ? '^' : dir===move.East ? '>' : dir===move.South ? 'v' : '<' ; }

/* displays hole directions */
function holeDisp(dir) { 
    return dir===move.North ? 'n' : dir===move.East ? 'e' : dir===move.South ? 's' : 'w' ; }

export function stackDispIdx(stack) {
    let blancF= '  ' + `\x1b[47m${'            '}\x1b[0m` + '  ';
    let blanc= '  ' + `\x1b[47m${' '}\x1b[0m` + '  ';
    console.log("\n");
    function rec(s) {
        if (list.stackIsEmpty(s)) console.log(blancF," \n");
        else {
            let a= list.head(s);
            console.log(blanc,'F' + `${a[0]}` + ',' + `${a[1]}`,blanc);
            rec(list.tail(s));
        }
    }
    rec(stack);
}

/* displays a new map, where the robot is shown by its direcition : > or v or < or ^  */
export function mapDisp(map) {
    function t(j,i,str) {
        if (str.length===j) return '';
        if (i===map.robot.x && j===map.robot.y) 
            return dirDisp(map.robot.dir) + t(j+1,i,str);
        else if (i===map.hole.xe && j===map.hole.ye) 
            return holeDisp(map.hole.dirE) + t(j+1,i,str);
        else if (i===map.hole.xa && j===map.hole.ya) 
            return holeDisp(map.hole.dirA) + t(j+1,i,str);  
        else return map.board[i][j] + t(j+1,i,str);
    }
    /* Terminal function */
    function Terminal(i) { 
        if (i < map.board.length) {
            let str= t(0,i,map.board[i]);
            console.log(strDisp(str,map)); 
            Terminal(i+1);
        }
    }
    Terminal(0);
}


/* returns color of robot position in a given map */
function robotColor(map)    { return map.board[map.robot.x][map.robot.y]; }    

/* returns if robot is in Hole or not */
function inHole(map) { return (map.robot.x===map.hole.xe && map.robot.y===map.hole.ye)  
    || (map.robot.x===map.hole.xa && map.robot.y===map.hole.ya) ; }


/* displays colored string */
function strDisp(str,map) {
    function disp(color) {
        const nothing=' '; 
        const robotDir= dirDisp(map.robot.dir);
        const holerobot= `\x1b[31m${robotDir}\x1b[0m`;
        const star=  `\x1b[35m${'o'}\x1b[0m`;
        const north= `\x1b[35m${'N'}\x1b[0m`;
        const south= `\x1b[35m${'S'}\x1b[0m`;
        const west=  `\x1b[35m${'W'}\x1b[0m`;
        const east=  `\x1b[35m${'E'}\x1b[0m`;
        // simple cells
        if (color==='r')       return `\x1b[41m${nothing}\x1b[0m`;
        else if (color==='b')  return `\x1b[44m${nothing}\x1b[0m` ;
        else if (color==='g')  return `\x1b[42m${nothing}\x1b[0m`;
        // stars
        else if (color==='R')  return `\x1b[41m${star}\x1b[0m`;
        else if (color==='B')  return `\x1b[44m${star}\x1b[0m` ;
        else if (color==='G')  return `\x1b[42m${star}\x1b[0m`;
        // holes
        else if (color==='n')  return `\x1b[47m${north}\x1b[0m`;
        else if (color==='s')  return `\x1b[47m${south}\x1b[0m`;
        else if (color==='w')  return `\x1b[47m${west}\x1b[0m`;
        else if (color==='e')  return `\x1b[47m${east}\x1b[0m`;
        // robot
        else if (color===robotDir) {
            if (inHole(map))                               return `\x1b[47m${holerobot}\x1b[0m`;
            if (robotColor(map).toUpperCase()==='R')       return `\x1b[41m${color}\x1b[0m` ;
            else if (robotColor(map).toUpperCase()==='B')  return `\x1b[44m${color}\x1b[0m` ;
            else if (robotColor(map).toUpperCase()==='G')  return `\x1b[42m${color}\x1b[0m` ;
            else return `${color}`;
        } 
        else return `${color}`;
    }
    if (str.length===0) return '|';
    else return disp(str[0]) + strDisp(str.slice(1),map); 
}






/*

// displays move 
function moveDisp(inst) { 
    return inst===move.goAhead ? 'goAhead' : inst===move.turnRight ? 'turnRight' : 
           inst===move.turnLeft ? 'turnLeft' : inst===move.turnAround ? 'turnAround' : 
           inst===move.jump ? 'jump' : inst===move.F1 ? 'F1' : inst===move.F2 ? 'F2' :
           inst===move.F3 ? 'F3' : inst===move.F4 ? 'F4' : 'F5' ;
}

// displays instruction 
export function instructionDisp(instruction) {
    let moving= instruction[1];
    let a= moving<5 ? '  ' : ' ';
    let blancL= '  ' + `\x1b[47m${' '}\x1b[0m` + '  ';
    let blancR= a + `\x1b[47m${' '}\x1b[0m` + '  ';
    let moveDisp= moving===move.goAhead ? '^' : moving===move.turnRight ? '>' :
                  moving===move.turnAround ? 'v' : moving===move.turnLeft ? '<' :
                  moving===move.F1 ? 'F1' : moving===move.F2 ? 'F2' :
                  moving===move.F3 ? 'F3' : moving===move.F4 ? 'F4' : 'F5' ;
    let color= instruction[0];
    let colorDisp= color==='r' ? `\x1b[41m${moveDisp}\x1b[0m` : color==='g' ? `\x1b[42m${moveDisp}\x1b[0m`
                : color==='b' ? `\x1b[44m${moveDisp}\x1b[0m` : `\x1b[50m${moveDisp}\x1b[0m`;
    console.log( blancL,colorDisp,blancR );
}

export function stackDisp(stack) {
    console.log("\n");
    let blanc= '  ' + `\x1b[47m${'         '}\x1b[0m` + '  ';
    function rec(s) {
        if (list.stackIsEmpty(s)) console.log(blanc,"\n");
        else {
            instructionDisp(list.head(s));
            rec(list.tail(s));
        }
    }
    rec(stack);
}

*/