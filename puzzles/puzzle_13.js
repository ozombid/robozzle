import * as move from '../src/move.js';
import * as main from '../src/main.js';

// ----------------- puzzle 13 --------------------

export const puzzle13 = {
    board: [ '     ',
             ' rbg ',
             ' b B ',
             ' b   ',
             '     ', ],
    robot: { x: 3, y: 1, dir: move.North},
    stars: 1,
    hole: move.noHoles,
    maxMoves: 500,
    obj: move.collectAllStarsAndEndInstructions,
};

export const F1= [ ['anycolor',move.goAhead], ['r',move.turnRight], ['b',move.F1],['anycolor',move.goAhead],['g',move.F2] ] ;
export const F2= [ ['anycolor',move.turnRight], ['anycolor',move.goAhead] ] ;

export const jest13= main.playGame(puzzle13 ,[F1,F2],move.doNotShow);
