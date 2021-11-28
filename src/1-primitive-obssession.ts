type Tax = number;
type Count = number;
type Price = number;

export function calculateCartItem(price: Price, count: Count, tax: Tax) {
    const basePrice = price * count;

    return basePrice * (basePrice * tax);
}
