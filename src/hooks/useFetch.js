import { useReducer } from 'react';

const initialState = {
    status: 'idle',
    data: [],
    error: null,
}

const presetOptions = {
    mode: 'cors',
    credentials: 'include',
    headers: {
        'Content-Type': 'application/json'
    }
}

export default function useFetch() {

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

    const callFetch = async (url, options) => {
        const fetchOptions = {...presetOptions, ...options};

        dispatch({ type: "FETCHING" });

        try {
            const response = await fetch(url, fetchOptions);

            if (!response.ok) {
                dispatch({ type: "ERROR", payload: `Error: ${response.status}` });
            }

            const data = await response.json();
            dispatch({ type: "SUCCESS", payload: data })
        } catch (error) {
            dispatch({ type: "ERROR", payload: error.message });
        }
    }

    return { callFetch, fetchState };
}