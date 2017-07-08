const expect = require('expect');
const {
	generateMessage,
	generateLocationMessage
} = require('../action');

describe('Server Messages', () => {
	it('should generate message object', () => {
		let from = "Daniel",
			text = "Some Text";
		let msgObj = {
			from,
			text,
		}
		
		let res = generateMessage(from, text);
		expect(res).toInclude(msgObj);
		expect(res.createdAt).toBeA('number');
		expect(res.text).toBe(text);
	})

	it('should generate location message', () => {
		let from ='Admin',lat = 334, lng =234;
		let res = generateLocationMessage(from,lat,lng);
		expect(res.url).toInclude(lat);
		expect(res).toInclude({from});
		expect(res.createdAt).toBeA('number');
		expect(res).toBeAn('object');
	})
})
