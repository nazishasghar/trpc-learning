import type { FC } from 'react'
import { NsPropTypeBase } from '~/types/ns-prop-type'
import { ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { RouterOutputs } from '~/utils/trpc'
import dayjs from 'dayjs'

export type CGraphProps = {
    feedbackList: RouterOutputs['admin']['feedback']['employeeFeedbackList']
} & NsPropTypeBase

// logic
export const useCGraph = (props: CGraphProps) => {
    const { feedbackList } = props
    const lastSixFeedback = feedbackList[0].slice(-6)
    const data = lastSixFeedback.map((i) => ({ date: dayjs(i.feedBackDate).format('MM/DD/YYYY'), point: i.points }))
    return { data }
}

// view
export const CGraphView: FC<CGraphProps & ReturnType<typeof useCGraph>> = (props) => {
    const { data } = props

    return (
        <ResponsiveContainer width={'100%'} height={400}>
            <ComposedChart width={730} height={250} data={data}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <CartesianGrid stroke="#f5f5f5" />
                <Bar dataKey="point" barSize={20} fill="#413ea0" />
                <Line type="monotone" dataKey="point" stroke="#ff7300" />
            </ComposedChart>
        </ResponsiveContainer>
    )
}

// component
export const CGraph: FC<CGraphProps> = (props: CGraphProps) => {
    const hookItems = useCGraph(props)
    return <CGraphView {...props} {...hookItems} />
}
