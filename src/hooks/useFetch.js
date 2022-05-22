import { useReducer, useEffect } from 'react';

const initialState = {
    status: 'idle',
    data: [],
    error: null,
}

export default function useFetch(url, options) {

    const [fetchState, dispatch] = useReducer((state, action) => {
        switch (action.type) {
            case "FETCHING":
                return {...initialState, status: 'fetching'};
            case "SUCCESS":
                return {...initialState, status: 'success', data: action.payload};
            case "ERROR":
                return {...initialState, status: 'error', error: action.payload};
            default:
                return state;
        }
    }, initialState)

    useEffect(() => {
        let cancelFetch = false;
        if (!url || !url.trim()) return;

        const handleFetch = async () => {
            dispatch({ type: "FETCHING" });

            try {
                const response = await fetch(url, options);

                if (!response.ok) {
                    throw new Error(`HTTP error: ${response.status}`);
                }

                const data = await response.json();
                if (cancelFetch) return;
                dispatch({ type: "SUCCESS", payload: data });
            } catch (error) {
                if (cancelFetch) return;
                dispatch({ type: "ERROR", payload: error.message });
            }
        }

        handleFetch();

        return () => {
            cancelFetch = true;
        }
    }, [url, options])

    return { fetchState };
}