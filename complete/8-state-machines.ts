import {
    createMachine,
    invoke,
    reduce,
    state,
    transition,
    action,
    interpret,
} from 'robot3';

type Product = {
    id: string;
    name: string;
};

type Context = {
    products?: Product[];
    error?: Error;
};

namespace EventType {
    export type FetchedEvent = {
        data: Product[];
        type: 'done';
    };

    export type FailedEvent = {
        error: Error;
        type: 'FAILED';
    };

    export type FetchEvent = {
        type: 'FETCH';
    };
}

const initialContext = (): Context => ({});

const fetchProducts = async (): Promise<Product[]> => [
    { id: '1', name: 'Jeans' },
    { id: '2', name: 'Jacket' },
];

const trackEvent = (ctx: Context) => {
    console.log('Tracker: Products fetch requested');
};

const productsFetchStateMachine = createMachine(
    'initial',
    {
        initial: state(transition('FETCH', 'loading', action(trackEvent))),
        loading: invoke(
            fetchProducts,
            transition<Context, EventType.FetchedEvent>(
                'done',
                'fetched',
                reduce((ctx, ev) => ({ ...ctx, products: ev.data })),
            ),
            transition<Context, EventType.FailedEvent>(
                'error',
                'failed',
                reduce((ctx, ev) => ({
                    ...ctx,
                    products: undefined,
                    error: ev.error,
                })),
            ),
        ),
        fetched: state(transition('FETCH', 'loading')),
        failed: state(transition('FETCH', 'loading')),
    },
    initialContext,
);

test('state machine', async () => {
    const productsFetchStateService = interpret(
        productsFetchStateMachine,
        ({ machine, context }) => {},
    );

    productsFetchStateService.send('FETCH');

    await new Promise((res) => setTimeout(res, 0));

    expect(productsFetchStateService.machine.state.name).toEqual('fetched')

    expect(productsFetchStateService.context.products).toEqual([
        {
            id: '1',
            name: 'Jeans',
        },
        {
            id: '2',
            name: 'Jacket',
        },
    ]);
});
