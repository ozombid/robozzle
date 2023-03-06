import * as move from '../src/move.js';
import * as main from '../src/main.js';

// ----------------- puzzle 2 --------------------

export const puzzle2 = {
    board: [ '     ',
             ' rbB ',
             ' b   ',
             ' b   ',
             '     ', ],
    robot: { x: 3, y: 1, dir: move.North},
    stars: 1,
    hole: move.noHoles,
    maxMoves: 20,
    obj: move.collectAllStarsAndEndInstructions,
    //obj: move.collectAllStars,
};

export const F1= [ ['anycolor',move.goAhead], ['r',move.turnRight], ['b',move.F1], ['anycolor',move.goAhead] ] ;
export const F2= move.noInstructions;

export const jest2= main.playGame(puzzle2,[F1,F2],move.doNotShow);
