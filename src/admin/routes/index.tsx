import { Button } from '@chakra-ui/react'
import { useEffect, type FC } from 'react'
import { RouterInputs, trpc } from '~/utils/trpc'

// logic
const useIndexPage = () => {
    const { data } = trpc.user.list.useQuery()
    const utils = trpc.useUtils()
    const list = data?.[0].map((i) => i)

    const mutate = trpc.user.create.useMutation()

    const onCreateHandler = async () => {
        mutate.mutate(
            {
                name: 'Nazish',
                email: `madara+004@notespace.jp`,
                address: 'Patna, India',
            },
            { onSuccess: () => utils.user.list.refetch() },
        )
    }
    return {
        list,
        onCreateHandler,
    }
}

// view
const IndexPageView: FC<ReturnType<typeof useIndexPage>> = (props) => {
    const { list, onCreateHandler } = props

    return (
        <>
            {list?.map((i) => (
                <h1 key={i.uuid}>{JSON.stringify(i)}</h1>
            ))}
            <Button colorScheme="blue" onClick={onCreateHandler}>
                Add
            </Button>
        </>
    )
}

const IndexPage: FC = () => {
    const hookItems = useIndexPage()
    return <IndexPageView {...hookItems} />
}

export default IndexPage
