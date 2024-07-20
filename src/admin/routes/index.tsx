import { Button } from '@chakra-ui/react'
import { useEffect, type FC } from 'react'
import { RouterInputs, trpc } from '~/utils/trpc'

// logic
const useIndexPage = () => {
    return {}
}

// view
const IndexPageView: FC<ReturnType<typeof useIndexPage>> = (props) => {
    return <>Admin Side</>
}

const IndexPage: FC = () => {
    const hookItems = useIndexPage()
    return <IndexPageView {...hookItems} />
}

export default IndexPage
