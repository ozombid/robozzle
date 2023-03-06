import * as move from '../src/move.js';
import * as main from '../src/main.js';

// ----------------- puzzle 9 --------------------

export const puzzle9 = {
    board: [ '              ',
             ' rbbbbbbbbbbb ',
             ' b          B ',
             ' b            ',
             ' b            ',
             ' b            ',
             ' b            ',
             ' b            ',
             ' b            ',
             ' b            ',
             ' b            ',
             ' b            ',
             ' b            ',
             '              ', ],
    robot: { x: 12, y: 1, dir: move.North },
    stars: 1,
    hole:  { xe:10, ye:1,  dirE: move.North,
             xa: 1, ya: 9, dirA: move.East },
    keys: 0,
    maxMoves: 80,
    obj: move.collectAllStarsAndEndInstructions,
};

export const F1= [ ['anycolor', move.jump], ['anycolor', move.jump], ['anycolor', move.turnRight], ['anycolor', move.goAhead] ] ;

export const jest9 = main.playGame(puzzle9,[F1],move.doNotShow); 
