import { NominalTax } from './4-parse-and-serialize';

it('Tax prints private field', () => {
    const instance = new NominalTax(0.23);

    expect(instance).toMatchInlineSnapshot(`
        NominalTax {
          "__type": "TheTax",
          "value": 0.23,
        }
    `);
});
