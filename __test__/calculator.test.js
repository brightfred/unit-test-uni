///src/calculator.test.js
const { add, subtract, multiply, divide } = require('../src/calculator');


describe('Calculator', () => {
    test('Add 2 numbers', () => {
        expect(add(1, 2)).toBe(3);
    });
    
    test('Subtract 2 numbers', () => {
        expect(subtract(2, 1)).toBe(1);
    });
    
    test('Multiply 2 numbers', () => {
        expect(multiply(2, 3)).toBe(6);
    });
    
    test('Divide 2 numbers', () => {
        expect(divide(6, 3)).toBe(2);
    });


    test('Divide by zero', () => {
    expect(() => divide(6, 0)).toThrow('Cannot divide by zero');
});

});

