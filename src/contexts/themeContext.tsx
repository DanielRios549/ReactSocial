import React, { createContext, useLayoutEffect } from 'react'
import { useLocalStorage } from '../hooks/useStorage'

type Theme = {
    theme: string
    handleTheme: () => void
}

export const ThemeContext = createContext({} as Theme)

export const ThemeProvider: React.FC = (props: any) => {
    const themes = ['dark', 'light']
    const [theme, setTheme] = useLocalStorage<string>('theme', themes[0])

    // Hack necessary to avoid useLayoutEffect to run on server side

    if (typeof window !== 'undefined') {
        useLayoutEffect(() => {
            document.body.setAttribute('data-theme', theme)
        }, [theme])
    }

    const handleTheme = () => {
        const current = themes.indexOf(theme)
        let nextTheme = ''
        
        if (current + 1 === themes.length) {
            nextTheme = themes[0]
        }
        else {
            nextTheme = themes[current + 1]
        }

        setTheme(nextTheme)
    }

    return (
        <ThemeContext.Provider value={{theme, handleTheme}}>
            {props.children}
        </ThemeContext.Provider>
    )
}