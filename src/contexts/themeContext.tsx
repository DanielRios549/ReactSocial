import React, { createContext, useLayoutEffect } from 'react'
import { useLocalStorage } from '../hooks/useStorage'
import Dark from '../../public/images/themes/dark.svg'
import Dracula from '../../public/images/themes/dracula.svg'
import Light from '../../public/images/themes/light.svg'

type Theme = {
    theme: string
    ThemeIcon: React.ElementType
    handleTheme: () => void
}

export const ThemeContext = createContext({} as Theme)

export const ThemeProvider: React.FC = (props: any) => {
    const themes = {
        names: ['light', 'dark', 'dracula'],
        icons: [<Light/>, <Dark/>, <Dracula/>]
    }
    const [theme, setTheme] = useLocalStorage<string>('theme', themes.names[0])

    // Hack necessary to avoid useLayoutEffect to run on server side

    if (typeof window !== 'undefined') {
        useLayoutEffect(() => {
            document.body.setAttribute('data-theme', theme)
        }, [theme])
    }

    const handleTheme = () => {
        const current = themes.names.indexOf(theme)
        let nextTheme = ''
        
        if (current + 1 === themes.names.length) {
            nextTheme = themes.names[0]
        }
        else {
            nextTheme = themes.names[current + 1]
        }

        setTheme(nextTheme)
    }
    const ThemeIcon = () => {
        return themes.icons[themes.names.indexOf(theme)]
    }

    return (
        <ThemeContext.Provider value={{theme, ThemeIcon, handleTheme}}>
            {props.children}
        </ThemeContext.Provider>
    )
}