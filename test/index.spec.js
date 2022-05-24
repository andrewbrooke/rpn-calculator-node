import mockStdin from 'mock-stdin';
const stdin = mockStdin.stdin();

import { read, quit } from '../index.js';
import * as arithmetic from '#handlers/arithmetic';
import * as input from '#handlers/input';

describe('CLI', () => {
    let exitMock, logSpy, getStackMock;
    beforeEach(() => {
        exitMock = jest.spyOn(process, 'exit').mockImplementation(() => {});
        logSpy = jest.spyOn(console, 'log');
        getStackMock = jest.spyOn(arithmetic, 'getStack');
        arithmetic.clearStack();

        read();
    });

    afterEach(() => {
        quit();

        exitMock.mockRestore();
        getStackMock.mockRestore();
        logSpy.mockClear();
    });

    test('Should exit the program when "q" is provided to stdin', () => {
        stdin.send('q\r');

        expect(process.exit).toHaveBeenCalledWith(0);
    });

    test('Should exit the program when "quit" is provided to stdin', () => {
        stdin.send('quit\r');

        expect(process.exit).toHaveBeenCalledWith(0);
    });

    test('Should do nothing when an empty string is provided to stdin', () => {
        stdin.send('\r');

        expect(arithmetic.getStack()).toStrictEqual([]);
    });

    test('Should log the stack when "s" is provided to stdin', () => {
        const expected = [5, 5];
        getStackMock.mockImplementation(() => expected);

        stdin.send('s\r');

        expect(getStackMock).toHaveBeenCalled();
        expect(logSpy).toHaveBeenCalledWith(expected);
    });

    test('Should log the stack when "stack" is provided to stdin', () => {
        const expected = [5, 5];
        getStackMock.mockImplementation(() => expected);

        stdin.send('stack\r');

        expect(getStackMock).toHaveBeenCalled();
        expect(logSpy).toHaveBeenCalledWith(expected);
    });

    test('Should clear the stack when "c" is provided to stdin', () => {
        const originalStack = [5, 5];
        getStackMock.mockImplementationOnce(() => originalStack);

        expect(arithmetic.getStack()).toStrictEqual(originalStack);

        stdin.send('c\r');

        expect(arithmetic.getStack()).toStrictEqual([]);
    });

    test('Should clear the stack when "clear" is provided to stdin', () => {
        const originalStack = [5, 5];
        getStackMock.mockImplementationOnce(() => originalStack);

        expect(arithmetic.getStack()).toStrictEqual(originalStack);

        stdin.send('clear\r');

        expect(arithmetic.getStack()).toStrictEqual([]);
    });

    test('Should display help when "h" is provided to stdin', () => {
        const helpSpy = jest.spyOn(input, 'displayHelpMessage');
        const expected = input.displayHelpMessage();

        stdin.send('h\r');

        expect(helpSpy).toHaveBeenCalled();
        expect(logSpy).toHaveBeenCalledWith(expected);
    });

    test('Should display help when "help" is provided to stdin', () => {
        const helpSpy = jest.spyOn(input, 'displayHelpMessage');
        const expected = input.displayHelpMessage();

        stdin.send('help\r');

        expect(helpSpy).toHaveBeenCalled();
        expect(logSpy).toHaveBeenCalledWith(expected);
    });

    test('Should log an error when an expression with an invalid RPN order is provided', () => {
        stdin.send('5 + 5\r');

        expect(logSpy).toHaveBeenCalledWith('Error: Invalid expression order. Current left side: undefined, right side: 5');
        expect(arithmetic.getStack()).toStrictEqual([]);
    });

    test('Should log an error when an expression with an invalid token is provided', () => {
        stdin.send('a\r');

        expect(logSpy).toHaveBeenCalledWith('Error: Invalid token: a');
        expect(arithmetic.getStack()).toStrictEqual([]);
    });

    test('Should print the expected value when a simple expression is provided', () => {
        stdin.send('5 5 +\r');

        expect(logSpy).toHaveBeenCalledWith('10');
        expect(arithmetic.getStack()).toStrictEqual([10]);
    });

    test('Should print the expected value when multiple incomplete expressions are provided', () => {
        stdin.send('5 5\r');

        expect(logSpy).toHaveBeenCalledWith('5');
        expect(arithmetic.getStack()).toStrictEqual([5, 5]);

        stdin.send('+\r');

        expect(logSpy).toHaveBeenCalledWith('10');
        expect(arithmetic.getStack()).toStrictEqual([10]);
    });
});
