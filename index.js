import readline from 'readline/promises';
import { stdin as input, stdout as output } from 'process';

import { handleLine } from './handlers/input';
import { handleExpression } from './handlers/arithmetic';

// Set up CLI prompt and read events
let rl;
export const read = () => {
    rl = readline.createInterface({ input, output });
    rl.setPrompt('> ');
    rl.prompt();
    rl.on('line', (line) => {
        try {
            // Check for existence of commands, and handle the RPN expression
            if (!handleLine(rl, line)) return;
    
            const result = handleExpression(line);
            console.log(result);
        } catch (err) {
            console.log(`Error: ${err.message}`);
        }
    
        // If we should continue and have not already, prompt the user again
        rl.prompt();
    }).on('close', () => {
        process.exit(0);
    });
};

export const quit = () => {
    rl.close();
};

read();
