import { Tax } from './5-value-object-features';

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
