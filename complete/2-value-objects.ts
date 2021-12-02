export class Tax {
	value: number;

	constructor(value: number) {
		if (value > 1 || value < 0) {
			throw new Error('Tax expects value between 0.0 and 1.0');
		}

		this.value = value;
	}
}

// maybe premature, be now we can protect from 0 and float
class ProductCount {
	value: number;

	constructor(value: number) {
		if (value === 0) {
			throw new Error('ProductCount expects at least 1');
		}

		if (!Number.isInteger(value)) {
			throw new Error('ProductCount must be an integer');
		}

		this.value = value;
	}
}

// we can test it
describe('ProductCount', function () {
	test('Product count cant have value 0', () => {
		expect(() => new ProductCount(0)).toThrow();
	});

	test('Product count cant have floating value', () => {
		expect(() => new ProductCount(1.5)).toThrow();
	});

	test('Product count works for integer value: 2', () => {
		expect(new ProductCount(2).value).toBe(2);
	});
});

abstract class Price {
	value: number;
	abstract currency: string;

	constructor(value: number) {
		if (value <= 0) {
			throw new Error('Price cant be less than 0');
		}

		this.value = value;
	}
}

class UsdPrice extends Price {
	currency = 'USD';

	constructor(value: number) {
		super(value);
	}
}

test('Price cant be less than 0', () => {
	expect(() => new UsdPrice(-100)).toThrow();
});

export function calculateCartItem(price: Price, count: ProductCount, tax: Tax) {
	const basePrice = price.value * count.value;

	return basePrice + basePrice * tax.value;
}

// Usage

const someProduct = {
	price: new UsdPrice(500),
	tax: new Tax(23),
};

const productsCount = new ProductCount(2);

const threeProductsGrossValue = calculateCartItem(
	someProduct.price,
	productsCount, //the same as tax
	someProduct.tax, // the same object as count
);

// Oops

const invalidValueOooops = calculateCartItem(
	{
		value: 500,
		currency: 'INVALID',
	},
	{
		value: 0,
	},
	{
		value: -123,
	},
);
