import type { FC } from 'react'

// logic
const useHelloIndexPage = () => {
    return {}
}

// view
const HelloIndexPageView: FC<ReturnType<typeof useHelloIndexPage>> = (props) => {
    const {} = props
    
    return (
        <>
            <span>this page is HelloIndexPage</span>
        </>
    )
}


const HelloIndexPage: FC = () => {
    const hookItems = useHelloIndexPage()
    return <HelloIndexPageView {...hookItems}/>
}

export default HelloIndexPage
