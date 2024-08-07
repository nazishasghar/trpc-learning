import { extendTheme, theme as baseTheme } from '@chakra-ui/react'
const breakpoints = {
    base: '0em', // 0px
    sm: '30em', // 480px~
    md: '48em', // 768px~
    lg: '62em', // 992px~
    xl: '80em', // 1280px~
    '2xl': '96em', // 1536px~
}

// Chakra標準テーマに無い値を追加したいときに使う
const originalTheme = {} as const

export const theme = extendTheme({ ...originalTheme, ...breakpoints }) as typeof baseTheme & typeof originalTheme
