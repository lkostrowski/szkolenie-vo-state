import { interpret } from 'xstate';
import { productsFetchMachine } from './8-state-machines';

it('Works', () => {
    const productsFetchState = interpret(productsFetchMachine).start();

    productsFetchState.send('FETCH');
    productsFetchState.send('SUCCESS', {
        products: [{ id: '1', name: 'Jeans' }],
    });

    const state = productsFetchState.getSnapshot();

    if (state.matches('fetched')) {
        expect(state.context.products).toEqual([{ id: '1', name: 'Jeans' }]);
    }
});
