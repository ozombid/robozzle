import * as move from '../src/move.js';
import * as main from '../src/main.js';

// ----------------- puzzle 6 --------------------

export const puzzle_6 = {
    board: [ '              ',
             '          bgR ',
             '         bgrb ',
             '        bgrb  ',
             '       bgrb   ',
             ' bbbbbbbrb    ',
             '              ', ],
    robot: { x: 5, y: 1, dir: move.West},
    stars: 1,
    hole: move.noHoles,
    maxMoves: 80,
    obj: move.collectAllStarsAndEndInstructions,
    //obj: move.collectAllStars,
};


export const F1= [ ['b',move.turnLeft], ['b',move.turnLeft], ['anycolor',move.F2], ['anycolor',move.F1]] ;
export const F2= [ ['anycolor',move.goAhead], ['b',move.F2], ['r',move.turnLeft],
                             ['anycolor',move.goAhead], ['g',move.turnRight] ] ;


export const jest6 =main.playGame(puzzle_6,[F1,F2],move.doNotShow);


