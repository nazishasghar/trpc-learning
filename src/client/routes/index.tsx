import { trpc } from '~/utils/trpc'
const Test = () => {
    const { data } = trpc.health.list.useQuery()
    return <h1>{data}</h1>
}
export default Test
