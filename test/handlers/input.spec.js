import * as input from '#handlers/input';
import * as arithmetic from '#handlers/arithmetic';

describe('Input Handler', () => {
    const mockReadline = () => {
        const rl = {};
        rl.prompt = jest.fn().mockReturnValue(rl);
        rl.close = jest.fn().mockReturnValue(rl);
        return rl;
    };

    let logSpy;

    beforeEach(() => {
        arithmetic.clearStack();
        logSpy = jest.spyOn(console, 'log');
    });

    afterEach(() => {
        logSpy.mockClear();
    });

    test('Should prompt the user when an empty line is received', () => {
        const rl = mockReadline();

        const result = input.handleLine(rl, '');

        expect(rl.prompt).toHaveBeenCalled();
        expect(arithmetic.getStack()).toStrictEqual([]);
        expect(result).toBe(false);
    });

    test('Should fire close event when "q" is received', () => {
        const rl = mockReadline();

        const result = input.handleLine(rl, 'q');

        expect(rl.close).toHaveBeenCalled();
        expect(arithmetic.getStack()).toStrictEqual([]);
        expect(result).toBe(false);
    });

    test('Should fire close event when "quit" is received', () => {
        const rl = mockReadline();

        const result = input.handleLine(rl, 'quit');

        expect(rl.close).toHaveBeenCalled();
        expect(arithmetic.getStack()).toStrictEqual([]);
        expect(result).toBe(false);
    });

    test('Should log the stack when "s" is received', () => {
        const stackSpy = jest.spyOn(arithmetic, 'getStack');
        const rl = mockReadline();

        const result = input.handleLine(rl, 's');

        expect(rl.prompt).toHaveBeenCalled();
        expect(stackSpy).toHaveBeenCalled();
        expect(arithmetic.getStack()).toStrictEqual([]);
        expect(result).toBe(false);
    });

    test('Should log the stack when "stack" is received', () => {
        const stackSpy = jest.spyOn(arithmetic, 'getStack');
        const rl = mockReadline();

        const result = input.handleLine(rl, 'stack');

        expect(rl.prompt).toHaveBeenCalled();
        expect(stackSpy).toHaveBeenCalled();
        expect(arithmetic.getStack()).toStrictEqual([]);
        expect(result).toBe(false);
    });

    test('Should clear the stack when "c" is received', () => {
        const stackSpy = jest.spyOn(arithmetic, 'clearStack');
        const rl = mockReadline();

        const result = input.handleLine(rl, 'c');

        expect(rl.prompt).toHaveBeenCalled();
        expect(stackSpy).toHaveBeenCalled();
        expect(arithmetic.getStack()).toStrictEqual([]);
        expect(result).toBe(false);
    });

    test('Should clear the stack when "clear" is received', () => {
        const stackSpy = jest.spyOn(arithmetic, 'clearStack');
        const rl = mockReadline();

        const result = input.handleLine(rl, 'clear');

        expect(rl.prompt).toHaveBeenCalled();
        expect(stackSpy).toHaveBeenCalled();
        expect(arithmetic.getStack()).toStrictEqual([]);
        expect(result).toBe(false);
    });

    test('Should display help when "h" is received', () => {
        const rl = mockReadline();

        const result = input.handleLine(rl, 'h');

        expect(logSpy).toHaveBeenCalledWith(input.displayHelpMessage());
        expect(result).toBe(false);
    });

    test('Should display help when "help" is received', () => {
        const rl = mockReadline();

        const result = input.handleLine(rl, 'help');

        expect(logSpy).toHaveBeenCalledWith(input.displayHelpMessage());
        expect(result).toBe(false);
    });

    test('Should return true when a valid expression is received', () => {
        const rl = mockReadline();

        const result = input.handleLine(rl, '5 5 +');

        expect(result).toBe(true);
    });
});
