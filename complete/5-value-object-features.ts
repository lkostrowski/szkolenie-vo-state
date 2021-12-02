export class Tax {
	private readonly _value: number;

	private validateValue(value: number) {
		if (value > 1 || value < 0) {
			throw new Error('Tax expects value between 0.0 and 1.0');
		}
	}

	constructor(value: number) {
		this.validateValue(value);

		this._value = value;
	}
	//
	// private constructor(value: number) {
	//     this.validateValue(value);
	//
	//     this._value = value;
	// }

	get value() {
		return this._value;
	}

	// pokazac wczesniej czemu nie działa porównywanie
	equals(compareTo: Tax) {
		return compareTo.value === this.value;
	}

	static createFromFloat(floatingTaxRate: number) {
		if (floatingTaxRate >= 0 && floatingTaxRate <= 1) {
			return new Tax(floatingTaxRate);
		}

		throw new Error(
			'Invalid rate. "createFromFloat" factory requires value from 0.0 to 1.0',
		);
	}

	static createFromPercentageInt(percentageInt: number) {
		if (percentageInt >= 1 && percentageInt <= 100) {
			return new Tax(percentageInt / 100);
		}

		throw new Error(
			'Invalid rate. "createFromPercentageInt" factory requires value from 1 to 100',
		);
	}

	static createFromSerializedObject(serializedValue: { _value: number }) {
		return new Tax(serializedValue._value);
	}
}

test('equality', () => {
	expect(
		Tax.createFromPercentageInt(1).equals(Tax.createFromPercentageInt(1)),
	).toBeFalsy();
});

describe('Tax value object full features', function () {
	it('Creates from float', () => {
		const instanceOk = Tax.createFromFloat(0.23);
		expect(instanceOk.value).toBe(0.23);
	});

	it('Throw from float if value bigger is 50', () => {
		expect(() => Tax.createFromFloat(50)).toThrow();
	});

	it('Creates from int', () => {
		const instanceOk = Tax.createFromPercentageInt(23);
		expect(instanceOk.value).toBe(0.23);
	});

	it('Throw from float if value bigger is 50', () => {
		expect(() => Tax.createFromPercentageInt(0.23)).toThrow();
	});

	it('Can compare 2 value objects properly', () => {
		const tax1 = Tax.createFromPercentageInt(23);
		const tax2 = Tax.createFromFloat(0.23);

		expect(tax1 === tax2).toBeFalsy();

		expect(tax1.equals(tax2)).toBe(true);
	});

	it('Can create from serialized object', () => {
		const tax = Tax.createFromPercentageInt(23);
		const serialized = JSON.stringify(tax);

		const deserialized = Tax.createFromSerializedObject(
			JSON.parse(serialized),
		);

		expect(deserialized.value).toBe(0.23);
		expect(deserialized.equals(tax)).toBe(true);
	});
});
