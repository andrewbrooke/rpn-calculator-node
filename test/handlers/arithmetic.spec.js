import { faker } from '@faker-js/faker';
import { create, all } from 'mathjs';

import { getStack, clearStack, handleExpression } from '../../handlers/arithmetic';

describe('Arithmetic Handler', () => {
    let math;
    beforeEach(() => {
        math = create(all);
        clearStack();
    });

    test('Should throw an error when an invalid RPN order is provided', () => {
        const expected = 'Invalid expression order. Current left side: undefined, right side: 5';

        try {
            handleExpression('5 + 5');
        } catch (err) {
            expect(err.message).toBe(expected);
            expect(getStack()).toStrictEqual([]);
        }
    });

    test('Should throw an error when an invalid token is provided', () => {
        const expected = 'Invalid token: a';

        try {
            handleExpression('a');
        } catch (err) {
            expect(err.message).toBe(expected);
            expect(getStack()).toStrictEqual([]);
        }
    });

    test('Should perform a simple add operation', () => {
        const expected = '10';

        const result = handleExpression('5 5 +');

        expect(result).toBe(expected);
        expect(getStack()).toStrictEqual([10]);
    });

    test('Should perform a simple subtract operation', () => {
        const expected = '-1';

        const result = handleExpression('5 6 -');

        expect(result).toBe(expected);
        expect(getStack()).toStrictEqual([-1]);
    });

    test('Should perform a simple multiplication operation', () => {
        const expected = '25';

        const result = handleExpression('5 5 *');

        expect(result).toBe(expected);
        expect(getStack()).toStrictEqual([25]);
    });

    test('Should perform a simple division operation', () => {
        const expected = '5';

        const result = handleExpression('10 2 /');

        expect(result).toBe(expected);
        expect(getStack()).toStrictEqual([5]);
    });

    test('Should clear the stack after an operation', () => {
        const expected = '10';

        const result = handleExpression('5 5 +');

        expect(result).toBe(expected);
        expect(getStack()).toStrictEqual([10]);

        clearStack();
        expect(getStack()).toStrictEqual([]);
    });

    test('Should perform a complex operation in one expression', () => {
        const expected = '-13';

        const result = handleExpression('5 5 5 8 + + -');

        expect(result).toBe(expected);
        expect(getStack()).toStrictEqual([-13]);
    });

    test('Should perform a complex operation in two expressions', () => {
        let expected = '-13', result;

        result = handleExpression('5 5 5 8 + + -');

        expect(result).toBe(expected);
        expect(getStack()).toStrictEqual([-13]);

        expected = '0';

        result = handleExpression('13 +');

        expect(result).toBe(expected);
        expect(getStack()).toStrictEqual([0]);
    });

    test('Should perform a complex operation in many expressions', () => {
        let expected = '-3', result;

        result = handleExpression('-3');

        expect(result).toBe(expected);
        expect(getStack()).toStrictEqual([-3]);

        expected = '-2';

        result = handleExpression('-2');

        expect(result).toBe(expected);
        expect(getStack()).toStrictEqual([-3, -2]);

        expected = '6';

        result = handleExpression('*');

        expect(result).toBe(expected);
        expect(getStack()).toStrictEqual([6]);

        expected = '5';

        result = handleExpression('5');

        expect(result).toBe(expected);
        expect(getStack()).toStrictEqual([6, 5]);

        expected = '11';

        result = handleExpression('+');

        expect(result).toBe(expected);
        expect(getStack()).toStrictEqual([11]);
    });

    test('Should validate the result of a random complex expression', () => {
        const firstAdd = faker.datatype.number();
        const secondAdd = faker.datatype.number();
        const subtract = faker.datatype.number();
        const multiply = faker.datatype.number();
        const divide = faker.datatype.number();

        const expression = `${firstAdd} ${secondAdd} + ${subtract} - ${multiply} * ${divide} /`;
        const expected = math
            .chain(firstAdd)
            .add(secondAdd)
            .subtract(subtract)
            .multiply(multiply)
            .divide(divide)
            .done();

        const result = handleExpression(expression);

        expect(+result).toBeCloseTo(expected);
    });
});
