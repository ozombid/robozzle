import * as move from '../src/move.js';
import * as main from '../src/main.js';

// ----------------- puzzle 1 --------------------

// Define your puzzle, including your robot and objectve
export const puzzle1 = {
    board: [ '     ',
             ' rbB ',
             ' b   ',
             ' b   ',
             '     ', ],
    robot: { x: 3, y: 1, dir: move.North},
    stars: 1,
    hole: move.noHoles,
    maxMoves: 80,
    obj: move.collectAllStars,
};

// Put your instructions, anycolor means no condition
export const F1= [ ['anycolor',move.goAhead], ['b',move.goAhead], ['b',move.turnLeft], ['r',move.turnLeft], 
                    ['r',move.turnRight], ['r',move.goAhead], ['b',move.goAhead] ] ;


export const jest1= main.playGame(puzzle1,[F1],move.doNotShow);



