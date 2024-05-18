import React from 'react';

export type UseCounterOptions = {
    min: number;
    max: number;
};

export type UseCounterResult = {
    count: number;
    set: (value: number) => void;
    increment: (value: number) => void;
    decrement: (value: number) => void;
    reset: (value: number) => void;
};

export type UseCounter = {
    (initialValue?: number, options?: UseCounterOptions): UseCounterResult;
    ({ initialValue, min, max }: { initialValue?: number } & UseCounterOptions, options: never): UseCounterResult;
};

export const useCounter: UseCounter = (...params) => {
    const initialValue = typeof params[0] === 'number' ? params[0] : params[0]?.initialValue;
    const { 
        min = Number.NEGATIVE_INFINITY, 
        max = Number.POSITIVE_INFINITY 
    } = typeof params[0] === 'number' ? params[1] ?? {} : params[0] ?? {};
    const [count, setCount] = React.useState(initialValue ?? min ?? 0);

    const increment = (value = 1) => {
        setCount((prevCount) => {
            if(typeof max === "number" && prevCount === max) return prevCount;

            return Math.max(Math.min(max, prevCount + value), min)
        });
    };

    const decrement = (value = 1) => {
        setCount((prevCount) => {
            if(typeof min === "number" && prevCount === min) return prevCount;

            return Math.min(Math.max(min, prevCount - value), max)
        });
    };

    const reset = (value = initialValue ?? 0) => {
        if(typeof min === "number" && value < min) return setCount(min);
        if(typeof max === "number" && value > max) return setCount(max);

        setCount(value);
    }

    const set = (value: number) => setCount(Math.max(min, Math.min(max, value)));

    return { count, set, increment, decrement, reset };
};

