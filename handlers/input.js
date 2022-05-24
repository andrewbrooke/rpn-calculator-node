import Debug from 'debug';
const debug = Debug('rpn-calculator-node:handlers:input');

import { arithmetic, getStack, clearStack } from '#handlers/arithmetic';

// Commands and aliases
const COMMAND_MAPPINGS = {
    Quit: { args: ['q', 'quit'], help: 'Quit the program' }, // Quit the program
    Stack: { args: ['s', 'stack'], help: 'Show the current stack' }, // Show the stack
    Clear: { args: ['c', 'clear'], help: 'Clear the current stack' }, // Clear the stack, // Show the stack
    Help: { args: ['h', 'help'], help: 'Show this screen' } // Clear the stack
};

/**
 * Handles a line of input to the calculator, provided by node:readline.
 * @param {Object} rl readline object from node:readline
 * @param {string} line String input
 * @returns {boolean} Returns false if the commands dictate that we should move to the next prompt or quit the program, true otherwise
 */
export const handleLine = (rl, line) => {
    if (!line) { // Prompt again when user enters an empty expression
        rl.prompt();
    } else if (COMMAND_MAPPINGS.Quit.args.includes(line)) { // Fire close event when user enters quit command
        debug('User entered QUIT command, exiting program');
        rl.close();
    } else if (COMMAND_MAPPINGS.Stack.args.includes(line)) { // Show the user the current stack and prompt again
        const stack = getStack();
        debug(`User entered STACK command, displaying stack: ${stack}`);
        console.log(stack);
        rl.prompt();
    } else if (COMMAND_MAPPINGS.Clear.args.includes(line)) { // Clear the current stack and prompt again
        debug('User entered CLEAR command, clearing stack');
        clearStack();
        rl.prompt();
    } else if (COMMAND_MAPPINGS.Help.args.includes(line)) { // Clear the current stack and prompt again
        debug('User entered HELP command, displaying help');
        displayHelpMessage();
        rl.prompt();
    } else {
        debug('Input handled, passing input expression to arithmetic logic');
        return true;
    }

    debug('Input handled, moving to next prompt');

    return false;
};

export const displayHelpMessage = () => {
    let msg =
`Basic Usage:
This calculator is build to compute arithmetic expressions provided in Reverse Polish notation.
For example, the expression "5 5 +" will resolve to "10".
Enter your expression or command followed by return to see the result.

Find more examples in the README of this module's repo.

Supported Operands:
${Object.keys(arithmetic).join(' ')}

Commands:\n`;

    for (const command of Object.values(COMMAND_MAPPINGS)) {
        msg += `"${command.args[0]}" (aliases: ${command.args.slice(1).map((a) => `"${a}"`).join(', ')}) ${command.help}\n`;
    }

    console.log(msg);

    return msg;
};
