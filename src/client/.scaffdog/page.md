---
name: "page"
root: "./routes"
output: "!*"
ignore: []
questions:
    path: |-
        ページコンポーネントのベースパスを入力してください 
        e.g. news/index -> src/pages/news/index.tsx
        ルーティングテーブルは手動で生成しているため、ページを追加した場合はsrc/pages/_app.tsxの更新が必要です
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
