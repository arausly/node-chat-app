const expect = require('expect');

const {isValid} = require('../validate');

describe('Validate',()=>{
	it('should not reject invalid string',()=>{
		let string = "   ";
		let instance = isValid(string);
		expect(instance).toBeA('boolean').toBe(false);
	});
	
	it('should not reject valid string',()=>{
		let string ="something";
		 let instance = isValid(string);
		expect(instance).toBeA('boolean').toBe(true);
	});
});