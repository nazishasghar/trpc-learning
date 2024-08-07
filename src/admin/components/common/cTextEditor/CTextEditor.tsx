import { Flex } from '@chakra-ui/react'
import { useMemo, useRef } from 'react'
import { Control, Controller, FieldValues, Path } from 'react-hook-form'
import ReactQuill from 'react-quill'
import { StringMap } from 'quill'
import { NsPropTypeBase } from '~/types/ns-prop-type'
import 'react-quill/dist/quill.snow.css'

export type CTextEditorProps<T extends FieldValues> = {
    name: Path<T>
    control: Control<T>
    disable?: boolean
} & NsPropTypeBase

// logic
export const useCTextEditor = () => {
    const reactQuillRef = useRef<ReactQuill | null>(null)
    const modules: StringMap = useMemo(
        () => ({
            toolbar: {
                container: [
                    [{ size: ['small', 'false', 'large'] }],
                    [{ color: [] }],
                    ['bold', 'italic', 'underline', 'strike'],
                    ['link'],
                ],
            },
        }),
        [],
    )

    const formats: string[] = [
        'font',
        'header',
        'size',
        'bold',
        'italic',
        'underline',
        'strike',
        'blockquote',
        'color',
        'script',
        'list',
        'bullet',
        'link',
        'clean',
        'code-block',
        'indent',
        'list',
        'align',
    ]
    return { modules, formats, reactQuillRef }
}

// view
export const CTextEditorView = <T extends FieldValues>(
    props: CTextEditorProps<T> & ReturnType<typeof useCTextEditor>,
) => {
    const { name, control, disable, modules, formats, reactQuillRef } = props
    return (
        <Flex
            {...(disable && { opacity: '0.4' })}
            data-testid="c-text-editor"
            border={'none'}
            h={'380px'}
            w={{ lg: '63rem', md: '45rem', sm: '30rem' }}
            maxW={'63rem'}
            textColor={'white'}
            bgColor={'black'}
        >
            <Controller
                name={name}
                control={control}
                render={({ field: { value, onChange, onBlur } }) => (
                    <ReactQuill
                        ref={reactQuillRef}
                        modules={modules}
                        formats={formats}
                        theme={'snow'}
                        value={value as string}
                        onBlur={onBlur}
                        placeholder={'Please Enter'}
                        onChange={onChange}
                        style={{
                            width: '100%',
                            maxWidth: '63rem',
                            color: 'white',
                            border: 'none',
                            height: '380px',
                            backgroundColor: 'black',
                        }}
                    />
                )}
            />
        </Flex>
    )
}

// component
export const CTextEditor = <T extends FieldValues>(props: CTextEditorProps<T>) => {
    const hookItems = useCTextEditor()
    return <CTextEditorView {...props} {...hookItems} />
}
