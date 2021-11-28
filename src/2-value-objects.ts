class Tax {
    value: number;

    constructor(value: number) {
        if (value > 1 || value < 0) {
            throw new Error('Tax expects value between 0.0 and 1.0');
        }

        this.value = value;
    }
}

class ProductCount {
    value: number;

    constructor(value: number) {
        if (value === 0) {
            throw new Error('ProductCount expects at least 1');
        }

        this.value = value;
    }
}

abstract class Price {
    value: number;
    abstract currency: string;

    constructor(value: number) {
        this.value = value;
    }
}

class UsdPrice extends Price {
    currency = 'USD';

    constructor(value: number) {
        super(value);
    }
}

export function calculateCartItem(price: Price, count: ProductCount, tax: Tax) {
    const basePrice = price.value * count.value;

    return basePrice + basePrice * tax.value;
}

// Usage

const someProduct = {
    price: new UsdPrice(500),
    tax: new Tax(23),
};

const threeProductsGrossValue = calculateCartItem(
    someProduct.price,
    new ProductCount(3),
    someProduct.tax,
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
