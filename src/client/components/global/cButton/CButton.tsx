import type { FC, ReactNode } from 'react'
import React from 'react'



export type CButtonProps = {
    children?: ReactNode
} 

// logic
export const useCButton= (props: CButtonProps) => {
    return {}
}

// view
export const CButtonView: FC<CButtonProps & ReturnType<typeof useCButton>> = (props) => {
    const { children} = props

    return (
        <>
            <span data-testid="c-button"></span>
        </>
    )
}

// component
export const CButton: FC<CButtonProps> = (props: CButtonProps) => {
    const hookItems = useCButton(props)
    return <CButtonView {...props} {...hookItems} />
}
