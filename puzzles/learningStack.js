import * as move from '../src/move.js';
import * as main from '../src/main.js';
// ----------------- puzzle 3 --------------------

export const puzzle3 = {
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
    hole: move.noHoles,
    keys: 0,
    maxMoves: 80,
    obj: move.collectAllStarsAndEndInstructions,
};

export const F1= [ ['b', move.F2], ['b', move.turnRight], ['anycolor', move.goAhead] ] ;
export const F2= [ ['b', move.goAhead], ['r', move.turnRight], ['b', move.F2], 
            ['anycolor', move.goAhead] ] ;


export const jest3= main.playGame(puzzle3,[F1,F2],move.doNotShow);

