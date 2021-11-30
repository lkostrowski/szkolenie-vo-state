type Tax = number;
type Count = number;
type Price = number;

export function calculateCartItem(price: Price, count: Count, tax: Tax) {
    const basePrice = price * count;

    return basePrice + (basePrice * tax);
}

const price = 50
const tax = 0.23
const count = 2

calculateCartItem(price, count, tax)