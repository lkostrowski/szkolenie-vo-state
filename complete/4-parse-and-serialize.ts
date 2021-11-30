// Clean validation for simplicity
export class NominalTax {
    static tag = 'TheTax';
    private __type = NominalTax.tag;

    constructor(public value: number) {}
}

it('Tax prints private field', () => {
    const instance = new NominalTax(0.23);

    expect(instance).toMatchInlineSnapshot(`
        NominalTax {
          "__type": "TheTax",
          "value": 0.23,
        }
    `);
});

// problem with losing type after serialization

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

test('Serialization', () => {
    const serializer = new TaxSerializer();
    const taxToSerialize = new NominalTax(0.23);

    const serializedTax = serializer.serialize(taxToSerialize);

    expect(serializedTax).toMatchInlineSnapshot(
        `"{\\"value\\":0.23,\\"__type\\":\\"TheTax\\"}"`,
    );

    const parsed = taxSerializer.deserialize(JSON.parse(serializedTax));

    expect(parsed.value).toBe(taxToSerialize.value);
});

// example local storage

const taxSerializer = new TaxSerializer();

localStorage.setItem('cache', taxSerializer.serialize(vat23));

const vatFromCacheParsed = taxSerializer.deserialize(
    JSON.parse(localStorage.getItem('cache')!),
); // proper type
