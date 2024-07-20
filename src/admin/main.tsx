import { FC } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import { PageShell } from '~/renderer/PageShell'

export const Root: FC = () => {
    return (
        <BrowserRouter>
            <PageShell />
        </BrowserRouter>
    )
}

const container = document.getElementById('root')
const root = createRoot(container!)
root.render(<Root />)
