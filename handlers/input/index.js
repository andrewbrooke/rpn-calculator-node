import Debug from 'debug';
const debug = Debug('rpn-calculator-node:handlers:input');

import { getStack, clearStack } from '../arithmetic';

// Commands and aliases
const COMMAND_MAPPINGS = {
    Quit: ['q', 'quit'], // Quit the program
    Stack: ['s', 'stack'], // Show the stack
    Clear: ['c', 'clear'] // Clear the stack
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
    } else if (COMMAND_MAPPINGS.Quit.includes(line)) { // Fire close event when user enters quit command
        debug('User entered QUIT command, exiting program');
        rl.close();
    } else if (COMMAND_MAPPINGS.Stack.includes(line)) { // Show the user the current stack and prompt again
        const stack = getStack();
        debug(`User entered STACK command, displaying stack: ${stack}`);
        console.log(stack);
        rl.prompt();
    } else if (COMMAND_MAPPINGS.Clear.includes(line)) { // Clear the current stack and prompt again
        debug('User entered CLEAR command, clearing stack');
        clearStack();
        rl.prompt();
    } else {
        debug('Input handled, passing input expression to arithmetic logic');
        return true;
    }

    debug('Input handled, moving to next prompt');

    return false;
};
