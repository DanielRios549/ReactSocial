import React, { createContext, useLayoutEffect } from 'react'
import { useLocalStorage } from '../hooks/useStorage'

type Theme = {
    theme: string
    setTheme: React.Dispatch<React.SetStateAction<string>>
    handleTheme: () => void
    setButton: () => boolean
}

export const ThemeContext = createContext({} as Theme)

export const ThemeProvider: React.FC = (props: any) => {
    const [theme, setTheme] = useLocalStorage<string>('theme', 'dark')

    // Hack necessary to avoid useLayoutEffect to run on server side

    if (typeof window !== 'undefined') {
        useLayoutEffect(() => {
            document.body.setAttribute('data-theme', theme)
        }, [theme])
    }

    const handleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light')
    }
    const setButton = () => {
        return theme === 'dark' ? true : false
    }
    return (
        <ThemeContext.Provider value={{theme, setTheme, handleTheme, setButton}}>
            {props.children}
        </ThemeContext.Provider>
    )
}