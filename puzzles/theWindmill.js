import * as move from '../src/move.js';
import * as main from '../src/main.js';

// ----------------- puzzle 8 --------------------

export const puzzle8 = {
    board: [  '           ',
              '      B    ',
              '      b    ',
              '     bb    ',
              ' Bbb b     ',
              '   bbrbb   ',
              '     b bbB ',
              '    bb     ',
              '    b      ',
              '    B      ',
              '           ', ],
    robot: { x: 5, y: 5, dir: move.East},
    stars: 4,
    hole: move.noHoles,
    maxMoves: 80,
    obj: move.collectAllStarsAndEndInstructions,
    //obj: move.collectAllStars,
};

export const F1= [ ['anycolor',move.F2], ['b',move.goAhead], ['b',move.turnLeft], ['anycolor',move.F2], 
            ['b',move.turnRight], ['anycolor',move.F1] ] ;
export const F2= [ ['anycolor',move.goAhead], ['anycolor',move.goAhead], ['anycolor',move.turnRight] ] ;

export const jest8= main.playGame(puzzle8,[F1,F2],move.doNotShow);

