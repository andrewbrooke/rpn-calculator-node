import { create, all } from 'mathjs';
const math = create(all);

// Supported arithmetic functions
// TODO: add additional functions like exponent, sqrt, etc.
export const arithmetic = {
    '+': (l, r) => math.add(l, r),
    '-': (l, r) => math.subtract(l, r),
    '*': (l, r) => math.multiply(l, r),
    '/': (l, r) => math.divide(l, r),
};
const stack = [];

/**
 * Returns the current stack
 * @returns {Array} in memory stack
 */
export const getStack = () => stack;

/**
 * Clears the current stack
 * @returns {Array} the stack at the time of calling
 */
export const clearStack = () => stack.splice(0, stack.length);

/**
 * Takes a string representing a Reverse Polish notation arithmetic expression and returns the resulting final element in the stack after evaluating the expression.
 * Modifies the stack variable in memory to hold the result for further expressions provided by the user.
 * @param {string} expression 
 * @returns {string} String representation of the result (final stack element)
 */
export const handleExpression = (expression) => {
    // Iterate tokens provided by the user
    const tokens = expression.trim().split(/\s+/);
    while (tokens.length) {
        const token = tokens.shift();

        if (!isNaN(parseInt(token))) { // Current token is a Value
            stack.push(+token);
        } else if (token in arithmetic) { // Current token is an Expression
            const r = stack.pop(), l = stack.pop();
            if (l === undefined || r === undefined) {
                throw new Error(`Invalid expression order. Current left side: ${l}, right side: ${r}`);
            }
            stack.push(arithmetic[token](l, r));
        } else { // Something else
            throw new Error(`Invalid token: ${token}`);
        }
    }

    return math.format(stack[stack.length - 1], { precision: 15 }); // Use mathjs when formatting output to prevent rounding errors
};
