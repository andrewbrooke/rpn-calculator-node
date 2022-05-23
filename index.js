import * as readline from 'readline/promises';
import { stdin as input, stdout as output } from 'process';
import { create, all } from 'mathjs';

const math = create(all);

// Define supported arithmetic functions, may be expanded later
const arithmetic = {
    '+': (l, r) => math.add(l, r),
    '-': (l, r) => math.subtract(l, r),
    '*': (l, r) => math.multiply(l, r),
    '/': (l, r) => math.divide(l, r),
};

// Set up CLI prompt and read events
const rl = readline.createInterface({ input, output });
rl.setPrompt('> ');
rl.prompt();

const stack = [];
rl.on('line', (line) => {
    // Handle commands and input edge cases
    if (!line) { // Prompt again when user enters an empty expression
        return rl.prompt(); 
    } else if (line === 'q') { // Fire close event when user enters q
        return rl.close();
    } else if (line === 's' || line === 'stack') { // Show the user the current stack and prompt again
        console.log(stack);
        return rl.prompt();
    } else if (line === 'c' || line === 'clear') { // Clear the current stack and prompt again
        stack.splice(0, stack.length);
        return rl.prompt();
    }

    // Iterate tokens provided by the user
    const tokens = line.trim().split(/\s+/);
    while (tokens.length) {
        const token = tokens.shift();

        if (!isNaN(parseInt(token))) { // Value
            stack.push(+token);
        } else if (token in arithmetic) { // Expression
            const r = stack.pop(), l = stack.pop();
            if (!l || !r) {
                console.log(`Invalid expression order. Current left side: ${l}, right side: ${r}`);
                return rl.prompt();
            }
            stack.push(arithmetic[token](l, r));
        } else { // Something else
            console.log(`Invalid token: ${token}`);
            return rl.prompt();
        }
    }

    const output = stack[stack.length - 1];
    console.log(math.format(output, { precision: 15 })); // Use mathjs when formatting output to prevent rounding errors

    rl.prompt();
}).on('close', () => {
    process.exit(0);
});
