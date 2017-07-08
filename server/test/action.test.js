const expect = require('expect');
const actions = require('../action');

describe('Server Messages', () => {
	it('should generate message object', () => {
		let from = "Daniel",
			text = "Some Text";
		let msgObj = {
			from,
			text,
		}
		let res = actions.generateMessage(from, text);
		expect(res).toInclude(msgObj);
		expect(res.createdAt).toBeA('number');
		expect(res.text).toBe(text);
	})
})
