import type { FC } from 'react'
import { DefaultLayout } from '~/layout/default'

// logic
const useIndexPage = () => {
    return {}
}

// view
const IndexPageView: FC<ReturnType<typeof useIndexPage>> = (props) => {
    const {} = props

    return (
        <DefaultLayout>
            <span>this page is IndexPage</span>
        </DefaultLayout>
    )
}

const IndexPage: FC = () => {
    const hookItems = useIndexPage()
    return <IndexPageView {...hookItems} />
}

export default IndexPage
