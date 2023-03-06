import * as move from '../src/move.js';
import * as main from '../src/main.js';

// ----------------- puzzle 4 --------------------

export const puzzle4 = {
    board: [ '                 ',
             ' bbbbbbbrbbbbbbb ',
             '               b ',
             '               b ',
             '               r ',
             '               b ',
             '               b ',
             '               G ',
             '                 ', ],
    robot: { x: 1, y: 1, dir: move.East},
    stars: 1,
    hole: move.noHoles,
    maxMoves: 80,
    //obj: move.collectAllStars,
    obj: move.collectAllStarsAndEndInstructions,
};

export const F1= [ ['anycolor',move.F2],['b',move.turnRight], ['b',move.F1] ] ;
export const F2= [ ['anycolor',move.goAhead], ['b',move.F2], ['anycolor',move.goAhead] ] ;

export const jest4= main.playGame(puzzle4,[F1,F2],move.doNotShow);




/*
const F1= [ ['r',move.turnRight], ['anycolor',move.F2] ] ;
const F2= [ ['anycolor',move.F3],['b',move.turnRight], ['b',move.F2]  ] ;
const F3= [ ['anycolor',move.goAhead], ['b',move.F3], ['anycolor',move.goAhead] ] ;
*/