// Clean validation for simplicity
export class NominalTax {
    static tag = 'TheTax';
    private __type = NominalTax.tag;

    constructor(public value: number) {}
}

const vat23 = new NominalTax(23);

localStorage.setItem('cache', JSON.stringify(vat23));

const vatFromCache = JSON.parse(localStorage.getItem('cache')!); // type any!

// Serialization

class TaxSerializer {
    serialize(tax: NominalTax) {
        return JSON.stringify(tax);
    }

    deserialize(data: Record<string, unknown>): NominalTax {
        if (
            '__type' in data &&
            'value' in data &&
            typeof data['value'] === 'number'
        ) {
            return new NominalTax(data.value);
        }

        throw new Error('Invalid Tax data to parse');
    }
}

const taxSerializer = new TaxSerializer();

localStorage.setItem('cache', taxSerializer.serialize(vat23));

const vatFromCacheParsed = taxSerializer.deserialize(
    JSON.parse(localStorage.getItem('cache')!),
); // proper type
