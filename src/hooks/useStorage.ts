import { useState, useCallback, Dispatch, SetStateAction } from 'react'

export function useLocalStorage<S = undefined>(key: string, value: string | [] | {}) {
    return useStorage<S>(key, value, true)
}

export function useSessionStorage<S = undefined>(key: string, value: string | [] | {}) {
    return useStorage<S>(key, value, false)
}

function useStorage<S>(key: string, value: string | [] | {}, persist: boolean): [S, Dispatch<SetStateAction<S>>] {
    const [state, setState] = useState<S>(() => {
        try {
            const stored = persist === true ? localStorage.getItem(key) : sessionStorage.getItem(key)
            return stored ? JSON.parse(stored) : value
        }
        catch {
            return value
        }
    });
    
    const setValue = useCallback((newValue) => {
        try {
            setState(newValue)
            persist == true ? localStorage.setItem(key, JSON.stringify(newValue)) : sessionStorage.setItem(key, JSON.stringify(newValue))
        }
        catch(error) {
            console.error(error)
        }
    }, [key]);
    
    return [state, setValue]
}