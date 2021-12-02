import { useState } from 'react';

type Product = {
	id: string;
	name: string;
};

namespace ProductsFetchState {
	export type Initial = {
		type: 'INITIAL';
	};

	export type Fetched = {
		type: 'FETCHED';
		products: Product[];
	};

	export type Loading = {
		type: 'LOADING';
	};

	export type ErrorFetching = {
		type: 'ERROR';
		error: Error;
	};

	export type AllStates = Initial | Fetched | Loading | ErrorFetching;
}

const useFetchProductList = () => {
	const [state, setState] = useState<ProductsFetchState.AllStates>({
		type: 'INITIAL',
	});

	const fetch = () => {
		setState({
			type: 'LOADING',
		});

		window
			.fetch('/products')
			.then((r) => r.json())
			.then((data) => {
				setState({
					type: 'FETCHED',
					products: data as Product[],
				});
			})
			.catch((e) => {
				setState({
					type: 'ERROR',
					error: e as Error,
				});
			});
	};

	// Optional convenience selectors
	const isLoading = state.type === 'LOADING';

	return { fetch, state, isLoading };
};

const ProductsList = () => {
	const { fetch, state } = useFetchProductList();

	if (state.type === 'INITIAL') {
		return <button onClick={fetch}>Fetch</button>;
	}
	if (state.type === 'LOADING') {
		return <span>Loading</span>;
	}

	if (state.type === 'ERROR') {
		return <span>Error: {state.error.message}</span>;
	}

	if (state.type === 'FETCHED') {
		return state.products.map((p) => <div key={p.id}>{p.name}</div>);
	}

	throw new Error(
		// @ts-expect-error
		`ProductsList state is invalid. Received state type: ${state.type}`,
	);
};

/**
 * - Clear branching
 * - Fail fast on incorrect data
 * - Easy to add more states
 * - Impossible to model impossible state
 * - State type can be replaced with class and state factory
 */
