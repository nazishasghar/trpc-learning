import dayjs from 'dayjs'

export const splitDateTime = (value: string | undefined | null): string | null => {
    if (!value || !dayjs(value).isValid()) return null

    return value.split('T')[0]
}
