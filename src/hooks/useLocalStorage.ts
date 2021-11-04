import { useState, useCallback, Dispatch, SetStateAction } from "react"

export function useLocalStorage<S = undefined>(key: string, value: string | [] | {}): [S, Dispatch<SetStateAction<S>>] {
    const [state, setState] = useState<S>(() => {
        try {
            const stored = localStorage.getItem(key)
            return stored ? JSON.parse(stored) : value
        }
        catch {
            return value
        }
    });

    const setValue = useCallback((newValue) => {
        try {
            setState(newValue)
            localStorage.setItem(key, JSON.stringify(newValue))
        }
        catch(error) {
            console.error(error)
        }
    }, [key]);

    return [state, setValue]
}