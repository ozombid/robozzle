import * as move from '../src/move.js';
import * as main from '../src/main.js';

// ----------------- puzzle 10 --------------------

export const puzzle10 = {
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

export const F1= [ ['anycolor',move.goAhead], ['anycolor',move.F2], ['anycolor',move.turnAround ]] ;
export const F2= [ ['b',move.F2], ['anycolor',move.goAhead], ['anycolor',move.turnAround ]] ;

export const jest10= main.playGame(puzzle10,[F1,F2],move.doNotShow);
