

import {jest1} from './puzzles/helloRobozzle.js';
import {jest2} from './puzzles/simpleRecursive.js';
import {jest3} from './puzzles/learningStack.js';
import {jest4} from './puzzles/learningStack2.js';
import {jest5} from './puzzles/recursed.js';
import {jest6} from './puzzles/oneStar.js';
import {jest7} from './puzzles/hypnotize.js';
import {jest8} from './puzzles/theWindmill.js';
import {jest9} from './puzzles/jumpToHole.js';
import {jest10} from './puzzles/infinity.js';
import {jest11} from './puzzles/turnConditional.js';
import {jest12} from './puzzles/randomRecursed.js';
import {jest13} from './puzzles/puzzle_13';


const win= 'puzzle complete';
const gameOver = 'fell off puzzle';
const infinit = 'infinit loop';


describe('helloRobozzle', () => {
    test('must return fell of puzzle', () => {
        expect(jest1).toContain(gameOver);
    });
});

describe('simpleRecursive', () => {
    test('should win and empty stack', () => {
        expect(jest2).toContain(win);
    });
});

describe('learningStack', () => {
    test('should win and empty stack', () => {
        expect(jest3).toContain(win);
    });
});

describe('learningStack2', () => {
    test('should win and empty stack', () => {
        expect(jest4).toContain(win);
    });
});

describe('recursed', () => {
    test('should not win for emptying stack', () => {
        expect(jest5).toContain(gameOver);
    });
});

describe('oneStar', () => {
    test('should not win for emptying stack', () => {
        expect(jest6).toContain(gameOver);
    });
});

describe('hypnotize', () => {
    test('should not win for emptying stack', () => {
        expect(jest7).toContain(gameOver);
    });
});

describe('theWindmill', () => {
    test('should dive in infinit loop', () => {
        expect(jest8).toContain(infinit);
    });
});

describe('jumpToHole', () => {
    test('should win and empty stack', () => {
        expect(jest9).toContain(win);
    });
});

describe('infinity', () => {
    test('should dive in infinit loop', () => {
        expect(jest10).toContain(infinit);
    });
});

describe('turnConditional', () => {
    test('should win without empty stack', () => {
        expect(jest11).toContain(win);
    });
});

describe('randomRecursed', () => {
    test('should win without empty stack', () => {
        expect(jest12).toContain(win);
    });
});

describe('Rollet', () => {
    test('should win and empty stack', () => {
        expect(jest13).toContain(win);
    });
});




