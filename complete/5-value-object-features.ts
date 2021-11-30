export class Tax {
    private readonly _value: number;

    private validateValue(value: number) {
        if (value > 1 || value < 0) {
            throw new Error('Tax expects value between 0.0 and 1.0');
        }
    }

    private constructor(value: number) {
        this.validateValue(value);

        this._value = value;
    }

    get value() {
        return this._value;
    }

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
