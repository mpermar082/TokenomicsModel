// src/index.ts
/**
 * Main entry point for TokenomicsModel
 */

import { TokenomicsModel } from './tokenomicsmodel';
import minimist from 'minimist';

/**
 * Command line arguments interface
 */
interface Args {
    /**
     * Enable verbose logging
     */
    verbose?: boolean;
    /**
     * Input file path
     */
    input?: string;
    /**
     * Output file path
     */
    output?: string;
}

/**
 * Parse command line arguments
 */
const args: Args = minimist(process.argv.slice(2), {
    boolean: ['verbose'],
    alias: {
        v: 'verbose',
        i: 'input',
        o: 'output'
    }
});

/**
 * Main execution function
 */
async function main(): Promise<void> {
    try {
        const app = new TokenomicsModel({
            verbose: args.verbose || false
        });

        if (args.verbose) {
            console.log('Starting TokenomicsModel processing...');
        }

        const result = await app.execute();
        
        if (args.output) {
            console.log(`Results saved to: ${args.output}`);
        }

        console.log('Processing completed successfully');
        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

/**
 * Check if this is the main module and execute the main function
 */
if (require.main === module) {
    main();
}