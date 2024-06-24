---
name: "page"
root: "./routes"
output: "!*"
ignore: []
questions:
    path: |-
        Enter page component path
        e.g. news/index -> src/pages/news/index.tsx
        The routing table is manually generated, so if you add pages, you need to update src/pages/_app.tsx
        > 
---

# `{{ inputs.path }}.tsx`

```tsx
{{- inputs.path | replace "/" "-" | replace "[\[\]]" "-" | replace "--" "-" | pascal | define "path" -}}

import type { FC } from 'react'

// logic
const use{{ path }}Page = () => {
    return {}
}

// view
const {{ path }}PageView: FC<ReturnType<typeof use{{ path }}Page>> = (props) => {
    const {} = props
    
    return (
        <>
            <span>this page is {{ path }}Page</span>
        </>
    )
}


const {{ path }}Page: FC = () => {
    const hookItems = use{{ path }}Page()
    return <{{ path }}PageView {...hookItems}/>
}

export default {{ path }}Page

```
