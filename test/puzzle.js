import * as move from '../src/move.js';
import * as main from '../src/main.js';

// ----------------- puzzle --------------------

const puzzle = {
    board: [ '                 ',
             '                 ',
             '                 ',
             '                 ',
             '                 ',
             '                 ',
             '                 ',
             '                 ',
             '                 ',
             '                 ', ],
    robot: { x: 0, y: 0, dir: move.North},
    stars: 0,
    //hole: move.noHoles,
    hole:  { xe: 0, ye: 0, dirE: move.North,
             xa: 0, ya: 0, dirA: move.North },
    maxMoves: 0,
    //obj: move.collectAllStars,
    //obj: move.collectAllStarsAndEndInstructions,
};

const F1= [ ['anycolor',move.F1], ['anycolor',move.F1], ['anycolor',move.F1] ] ;
const F2= [ ['anycolor',move.F2], ['anycolor',move.F2], ['anycolor',move.F2] ] ;

console.log(main.playGame(puzzle,[F1,F2]));