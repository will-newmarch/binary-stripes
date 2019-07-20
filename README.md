
# binary-stripes
Discover behaviour patterns and when they change.

## An Example of Usage
We can represent every day Charlie does and does not buy a coffee as binary.

Here's the last 4 weeks of data:
```
[1,0,1,0,0,0,0,1,0,1,0,0,0,0,1,0,1,0,0,0,0,1,0,0,0,0,0,0]
```
We want to discover if Charlie has a weekly habit of coffee buying.

Charlie buys a coffee on a Monday and a Wednesday every week as we can see from the binary.

We can discover this by asking the algorithm to discover patterns with intervals of 7.
```
const  BinaryStripes  =  require('binary-stripes');
const  charliesCoffeeData   = [1,0,1,0,0,0,0,1,0,1,0,0,0,0,1,0,1,0,0,0,0,1,0,0,0,0,0,0];
const  kernelSize           =  7; // 7 days in a week, let's discover weekly patterns.
const  binaryStripes        =  new BinaryStripes(kernelSize);
const  results              =  binaryStripes.discoverPatterns(charliesCoffeeData);
```
The results will be the following:
```
[ { 
	start: 0, 									// The index the pattern starts
	end: 21, 									// The index the pattern ends
	pattern: [ 1, 0, 1, 0, 0, 0, 0 ], 			// The pattern
	trailingPattern: [ 1, 0, 0, 0, 0, 0, 0 ], 	// binary found when the pattern ceased
	count: 3 									// The length of the pattern
} ]
```
But oh no! It looks like Charlie's coffee buying habit changed after 3 weeks.

The algorithm has told us when it changed and we can analyse how.

With the algorithm, not only can we discover users with patterns of behaviour, we can, more importantly, discover when those patterns of behaviour change.

In Charlie's case we can now send them an email or show them a subtle advert saying "We missed you last Wednesday! Have 20% off on your next coffee on Monday!"

Creepy I know. But think of how powerful this could be in the right hands!
 ...or wrong hands depending on your perspective.