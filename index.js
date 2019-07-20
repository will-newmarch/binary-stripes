class BinaryStripes {

    /**
     * Construct an instance of the class
     * @param {Number} kernelSize Size of kernel to apply to array
     */
    constructor(kernelSize) {
        // Throw error if kernel size is not defined
        if(!kernelSize) throw "Please set a kernel size!";
        this.kernelSize = kernelSize;
    }

    /**
     * Take an array of 0's and 1's and apply kernel.
     * @param {Array} binary 
     */
    applyKernel(binary) {
        let value = 0;
        for(let i = 0; i < binary.length; i++) {
            value += Math.pow(2,i+1) * binary[i];
        }
        return value;
    }

    /**
     * Parse a kernel value back to an array of 0's and 1's.
     * @param {Array} value Kernel value
     * @param {Number} size Known size of binary
     */
    parseKernelValue(value,size) {
        let binary = new Array(size).fill(0);;
        while(value > 0) {
            const pow = Math.floor(Math.log2(value));
            binary[pow-1] = 1;
            value -= Math.pow(2,pow);
        }
        return binary;
    }

    /**
     * Discover patterns in an array of binary.
     * @param {Array} binary Array of 0's and 1's
     */
    discoverPatterns(binary) {
        
        let results = [];        // Array for outputting results
        let index = 0;           // Keep track of the index we're on
        let kernelValueCache = null; // Cache previous kernel values
        let patternCache = null; // Cache patterns being discovered

        // Loop until binary is all analysed
        while(binary.length > 0) {

            // Take the next chunk of binary to analyse from the beginning of the array
            const chunk = binary.splice(0,this.kernelSize);

            // Work out the kernel value of this chunk
            const kernelValue = this.applyKernel(chunk);

            // Increment the index accordingly
            index += this.kernelSize;

            // If previous kernel value is same as current then we are in a pattern
            if(kernelValue === kernelValueCache) {

                // If pattern cache is null, generate a pattern object
                if(patternCache === null) {
                    
                    patternCache = {
                        start: index - (this.kernelSize*2),
                        end: Infinity,
                        pattern: this.parseKernelValue(kernelValue,this.kernelSize),
                        trailingPattern: null,
                        count: 2
                    };

                } else {

                    patternCache.count++;

                }
            
            // Else if pattern is cached, push it to results
            } else if(patternCache !== null) {

                // Record the end of the pattern so we know it ended
                patternCache.end = index - this.kernelSize;

                // Record the trailing pattern so we can see what changed
                patternCache.trailingPattern = this.parseKernelValue(kernelValue,this.kernelSize);
                
                // Add to results
                results.push(patternCache);
                
                // Invalidate cache
                patternCache = null;

            }

            // Cache this kernel value to compare to the next
            kernelValueCache = kernelValue;

        }

        // If we have finished looping but the pattern cache isn't empty then add this pattern to the results
        if(patternCache !== null) {
            
            results.push(patternCache);

        }

        return results;
    }

}

module.exports = BinaryStripes;