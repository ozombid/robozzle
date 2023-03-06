import * as move from '../src/move.js';
import * as main from '../src/main.js';
// ----------------- puzzle 5 --------------------

export const puzzle5 = {
    board: [ '                 ',
             ' bbbbbbbrbbbbbbb ',
             '               b ',
             ' bbbbbbrbbbbbb b ',
             ' b           b b ',
             ' b bbbbrbbbb b b ',
             ' b b       r g r ',
             ' r g Bbbgbbb b b ',
             ' b b         b b ',
             ' b bbbbbrbbbbb b ',
             ' b             b ',
             ' bbbbbbbgbbbbbbb ',
             '                 ', ],
    robot: { x: 1, y: 1, dir: move.East},
    stars: 1,
    hole: move.noHoles,
    maxMoves: 120,
    //obj: move.collectAllStars,
    obj: move.collectAllStarsAndEndInstructions,
};

export const F1= [ ['anycolor',move.F2], ['b',move.turnRight],['b',move.F1] ] ;
export const F2= [ ['anycolor',move.goAhead], ['b',move.F2], ['anycolor',move.goAhead] ] ;

export const jest5= main.playGame(puzzle5,[F1,F2],move.doNotShow);

