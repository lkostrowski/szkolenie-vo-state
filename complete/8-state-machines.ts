import { createMachine, interpret, assign } from 'xstate';

type Product = {
    id: string;
    name: string;
};

type Action =
    | { type: 'FETCH' }
    | { type: 'SUCCESS'; products: Product[] }
    | { type: 'FAIL'; error: Error };

namespace ProductsFetchState {
    export type Initial = {
        value: 'initial';
        context: {};
    };

    export type Fetched = {
        value: 'fetched';
        context: {
            products: Product[];
        };
    };

    export type Loading = {
        value: 'loading';
        context: {};
    };

    export type ErrorFetching = {
        value: 'error';
        context: {
            error: Error;
        };
    };

    export type AllStates = Initial | Fetched | Loading | ErrorFetching;
}

export const productsFetchMachine = createMachine<
    | ProductsFetchState.Fetched['context']
    | ProductsFetchState.ErrorFetching['context']
    | {},
    Action,
    ProductsFetchState.AllStates
>({
    id: 'PRODUCTS_FETCH',
    initial: 'initial' as const,
    context: {},
    states: {
        initial: {
            on: {
                FETCH: 'loading' as const,
            },
        },
        loading: {
            // @ts-ignore
            on: {
                FAIL: 'error' as const,
                SUCCESS: {
                    target: 'fetched' as const,
                    actions: assign({
                        products: (context, event) => {
                            return event.products;
                        },
                    }),
                },
            },
        },
        fetched: {
            on: {
                FETCH: 'loading' as const,
            },
        },
        error: {
            on: {
                FETCH: 'loading' as const,
            },
        },
    },
});
