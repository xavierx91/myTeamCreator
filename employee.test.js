const { expressionStatement } = require('@babel/types');
const { test, expect } = require('@jest/globals');
const Employee = require('./employee'); 


test('Employee class instance', () => {
    const test1 = new Employee('bob', 123, 'sdlfj@lsdjf.com'); 

    expect(test1).toBeInstanceOf(Employee); 
    expect(test1.name).toEqual('bob')
})