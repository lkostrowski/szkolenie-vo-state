export class Tax {
	value: number;

	constructor(value: number) {
		if (value > 1 || value < 0) {
			throw new Error('Tax expects value between 0.0 and 1.0');
		}

		this.value = value;
	}
}

// Its ok for TS - duck typing!
const incorrectTax: Tax = {
	value: 0,
};

export class TheTax {
	private __type = 'TheTax'; // ✅

	value: number;

	constructor(value: number) {
		if (value > 1 || value < 0) {
			throw new Error('Tax expects value between 0.0 and 1.0');
		}

		this.value = value;
	}
}

// Doent work, good
const correctTax: TheTax = {
	value: 0,
	__type: 'TheTax',
};

// ✅
const anotherTax = new TheTax(23);
