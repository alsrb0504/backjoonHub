let input = require('fs').readFileSync('/dev/stdin').toString().split("\n");

const colors ={
    black: {
        val: 0,
        mul: 1,
    },
    brown: {
        val: 1,
        mul: 10,
    },
    red: {
        val: 2,
        mul: 100,
    },
    orange: {
        val: 3,
        mul: 1000,
    },
    yellow: {
        val: 4,
        mul: 10000,
    },
    green: {
        val: 5,
        mul: 100000,
    },
    blue: {
        val: 6,
        mul: 1000000,
    },
    violet: {
        val: 7,
        mul: 10000000,
    },
    grey: {
        val: 8,
        mul: 100000000,
    },
    white: {
        val: 9,
        mul: 1000000000,
    },
}

const data = input.slice(0, 3).map(el => el.trimEnd());

console.log(Number(colors[data[0]].val.toString() + colors[data[1]].val.toString()) * colors[data[2]].mul);

