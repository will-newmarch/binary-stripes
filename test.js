
'use strict';

const BinaryStripes = require('./index.js');

test('discovers patterns and when they end', () => {

    // Whether they have or haven't bought a coffee each day for the last few weeks
    const charliesCoffeeData = [1,0,1,0,0,0,0,1,0,1,0,0,0,0,1,0,1,0,0,0,0,1,0,0,0,0,0,0];

    const kernelSize = 7; // 7 days in a week, let's discover weekly patterns.

    const binaryStripes = new BinaryStripes(kernelSize);

    const results = binaryStripes.discoverPatterns(charliesCoffeeData)
    
    expect(results[0].start).toBe(0);
    expect(results[0].end).toBe(21);
    expect(results[0].pattern).toStrictEqual([ 1, 0, 1, 0, 0, 0, 0 ]);
    expect(results[0].trailingPattern).toStrictEqual([ 1, 0, 0, 0, 0, 0, 0 ]);
    expect(results[0].count).toBe(3);

});