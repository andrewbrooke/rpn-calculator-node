import { getStack, clearStack } from '../arithmetic';

/**
 * Handles a line of input to the calculator, provided by node:readline.
 * @param {Object} rl readline object from node:readline
 * @param {string} line String input
 * @returns {boolean} Returns false if the commands dictate that we should move to the next prompt or quit the program, true otherwise
 */
export const handleLine = (rl, line) => {
    if (!line) { // Prompt again when user enters an empty expression
        rl.prompt();
    } else if (line === 'q' || line === 'quit') { // Fire close event when user enters q
        rl.close();
    } else if (line === 's' || line === 'stack') { // Show the user the current stack and prompt again
        console.log(getStack());
        rl.prompt();
    } else if (line === 'c' || line === 'clear') { // Clear the current stack and prompt again
        clearStack();
        rl.prompt();
    } else {
        return true;
    }

    return false;
};
