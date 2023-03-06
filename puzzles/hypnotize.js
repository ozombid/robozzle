import * as move from '../src/move.js';
import * as main from '../src/main.js';

// ----------------- puzzle 7 --------------------

export const puzzle7 = {
    board: [  '                 ',
             ' rbbbbbbbbbbbbbbr ',
             ' b              b ',
             ' b rbbbbbbbbbbr b ',
             ' b b          b b ',            
             ' b b rbbbbbbr b b ',
             ' b b b      b b b ',
             ' b b b    G b b b ',     
             ' b b rbbbbr b b b ',
             ' b b        b b b ',
             ' b rbbbbbbbbr b b ',
             ' b            b b ',
             ' rbbbbbbbbbbbbr G ',
             '                 ', ],
    robot: { x: 12, y: 16, dir: move.North},
    stars: 2,
    hole: move.noHoles,
    maxMoves: 250,
    //obj: move.collectAllStars,
    obj: move.collectAllStarsAndEndInstructions,
};

export const F1= [ ['anycolor',move.goAhead], ['r',move.turnLeft], ['g',move.F2], ['anycolor',move.F1] ] ;
export const F2= [ ['g',move.turnRight], ['g',move.turnRight], ['anycolor',move.F3] ] ;
export const F3= [ ['anycolor',move.goAhead], ['r',move.turnRight], ['anycolor',move.F3] ] ;

export const jest7= main.playGame(puzzle7,[F1,F2,F3],move.doNotShow);
