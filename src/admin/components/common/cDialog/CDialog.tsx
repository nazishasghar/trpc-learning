import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogOverlay,
    Button,
} from '@chakra-ui/react'
import { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useConfirmationDialog } from '~/utils/hooks/use-dialog'

// logic
export const useCDialog = () => {
    // ダイアログ表示内容
    // 表示するときは中身(ConfirmationDialogQueueTypeImpl)が入る
    // 表示しないときはundefinedになる
    const { currentItem, dequeueDialog } = useConfirmationDialog()
    // ダイアログの表示状態管理
    const [showDialog, setShowDialog] = useState(false)

    // currentItemが差し替わったらダイアログの表示を切り替える
    useEffect(() => {
        if (!currentItem) setShowDialog(false)
        else setShowDialog(true)
    }, [currentItem])

    // ダイアログが閉じるときの共通処理
    const dialogCloseProcess = useCallback(
        (result: boolean) => {
            // guard
            if (!currentItem) return
            setShowDialog(false)
            // resolveを実行
            currentItem.callback(result)
            // キューの削除
            dequeueDialog()
        },
        [currentItem, dequeueDialog],
    )

    // 確認ボタンが押されたとき
    const confirmButtonHandler = useCallback(() => {
        if (currentItem && currentItem.confirmButtonHandler) currentItem.confirmButtonHandler()
        dialogCloseProcess(true)
    }, [dialogCloseProcess, currentItem])

    // キャンセルボタンが押されたとき
    const cancelButtonHandler = useCallback(() => {
        if (currentItem && currentItem.cancelButtonHandler) currentItem.cancelButtonHandler()
        dialogCloseProcess(false)
    }, [dialogCloseProcess, currentItem])

    const buttonGroups = useMemo(() => {
        if (!currentItem) return <></>
        if (currentItem.type === 'delete') {
            return (
                <>
                    <Button onClick={confirmButtonHandler}>Confirm</Button>
                    <Button onClick={cancelButtonHandler}>Cancel</Button>
                </>
            )
        }
        if (currentItem.type === 'confirm') {
            return (
                <>
                    <Button onClick={cancelButtonHandler}>Cancel</Button>
                    <Button onClick={confirmButtonHandler}>Confirm</Button>
                </>
            )
        }
        return <Button onClick={cancelButtonHandler}>Close</Button>
    }, [cancelButtonHandler, confirmButtonHandler, currentItem])
    return {
        currentItem,
        cancelButtonHandler,
        showDialog,
        buttonGroups,
    }
}

// view
export const CDialog: FC = () => {
    const { showDialog, currentItem, buttonGroups, cancelButtonHandler } = useCDialog()
    const cancelRef = useRef(null)
    return (
        <AlertDialog
            motionPreset="scale"
            onClose={cancelButtonHandler}
            isOpen={showDialog}
            isCentered
            closeOnEsc={true}
            data-testid="c-dialog"
            leastDestructiveRef={cancelRef}
        >
            <AlertDialogOverlay />
            <AlertDialogContent
                flex={'column'}
                justifyContent={'center'}
                alignItems={'center'}
                p={'5rem'}
                bgColor={'black'}
                minW={'45rem'}
                maxH={'22rem'}
            >
                <AlertDialogBody
                    mx={'6.25rem'}
                    fontWeight={'normal'}
                    fontSize={'2xl'}
                    lineHeight={'2.25rem'}
                    textColor={'white'}
                    textAlign={'center'}
                >
                    {currentItem?.text}
                </AlertDialogBody>
                <AlertDialogFooter flex={'row'} gap={'1rem'} mt={'2.5rem'}>
                    {buttonGroups}
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
