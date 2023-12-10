import React from 'react';

export const useLocalStorageState = (localStorageKey, initialValue) => {
    const [state, setState] = React.useState(() => {
        try {
            const item = window.localStorage.getItem(localStorageKey);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            return initialValue;
        }
    });

    const prevKeyRef = React.useRef(localStorageKey);

    React.useEffect(() => {
        const prevKey = prevKeyRef.current;
        if (prevKey !== localStorageKey) {
            window.localStorage.removeItem(prevKey);
        }
        prevKeyRef.current = localStorageKey;
        window.localStorage.setItem(localStorageKey, JSON.stringify(state));
    }, [localStorageKey, state]);

    return [state, setState];
}