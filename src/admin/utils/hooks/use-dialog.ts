import { atom, useAtom } from 'jotai'
import { v4 } from 'uuid'

// キューに追加するときのペイロードの型
export type ConfirmationDialogQueueType = {
    type: 'alert' | 'confirm' | 'delete'
    text: string
    cancelButtonHandler?: () => void
    confirmButtonHandler?: () => void
    uuid?: string
}

export type ConfirmationDialogQueueTypeImpl = ConfirmationDialogQueueType & {
    callback: (res: boolean) => void
    uuid: string
}

export type ConfirmationDialogStateType = {
    queue: ConfirmationDialogQueueTypeImpl[]
    currentItem?: ConfirmationDialogQueueTypeImpl
}

// ステート
const stateAtom = atom<ConfirmationDialogStateType>({
    queue: [],
    currentItem: undefined,
})
const currentItemAtom = atom((get) => get(stateAtom).currentItem)

// hooks
export const useConfirmationDialog = () => {
    const [dialogState, setDialogState] = useAtom(stateAtom)
    const [currentItem] = useAtom(currentItemAtom)

    /**
     * ステート操作
     */
    // キューからUUIDで1件検索
    const findQueueItem = (uuid: string): ConfirmationDialogQueueTypeImpl | undefined => {
        return dialogState.queue.find((item) => item.uuid === uuid)
    }
    // キューに追加
    const addQueueItem = (payload: ConfirmationDialogQueueTypeImpl) => {
        setDialogState({ ...dialogState, queue: [...dialogState.queue, payload] })
    }
    // ダイアログの表示をセット
    // undefinedを渡すと非表示にする
    const setCurrentItem = (item?: ConfirmationDialogQueueTypeImpl) => {
        setDialogState({ ...dialogState, currentItem: item })
    }
    // キューをUUIDで指定して削除
    const deleteQueueItem = (uuid: string): void => {
        setDialogState({ ...dialogState, queue: dialogState.queue.filter((item) => item.uuid !== uuid) })
    }

    /**
     * useConfirmationDialogのインターフェース
     */
    // ダイアログを表示してPromiseを返す
    const queueDialog = (payload: ConfirmationDialogQueueType): Promise<boolean> => {
        return new Promise((resolve, reject) => {
            try {
                // IDが重複するなら登録しない
                if (!!payload.uuid && findQueueItem(payload.uuid)) return

                const dialogImpl = {
                    ...payload,
                    uuid: payload.uuid || v4(),
                    callback: (res: boolean) => {
                        resolve(res)
                    },
                }

                addQueueItem(dialogImpl)
                if (!currentItem) setCurrentItem(dialogImpl)
            } catch (e) {
                reject(e)
            }
        })
    }

    // 現在表示中のダイアログを完了する
    const dequeueDialog = () => {
        if (!currentItem || !currentItem.uuid) return

        deleteQueueItem(currentItem.uuid)
        setCurrentItem(undefined)
    }

    return {
        queueDialog,
        dequeueDialog,
        currentItem,
    }
}
