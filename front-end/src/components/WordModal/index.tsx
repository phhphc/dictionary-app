import { useAppSelector, useAppDispatch } from 'app/hooks'
import { closeModal, addDict, deleteDict } from 'features/dict/dictSlice'

import style from './wordmodal.module.scss'
import WordDetail from './WordDetail'
import { CloseBtn, DeleteBtn, SaveBtn } from 'components/Buttons'

const WordModal = () => {
    const { dict, isOpen, isSaved } = useAppSelector(
        (state) => state.dict.modalState
    )

    const dispatch = useAppDispatch()

    const handleClose = () => {
        dispatch(closeModal())
    }
    const handleAddDict = () => {
        if (dict) dispatch(addDict(dict))
    }
    const handleDeleteDict = () => {
        if (dict && dict._id) dispatch(deleteDict(dict._id))
        console.log('delete dict')
    }

    console.log(dict?._id)

    if (isOpen)
        return (
            <div className={style.overlay}>
                <div className={style.modal}>
                    <div className={style.modalHeader}>
                        <div className={style.modalTitle}>{dict?.word}</div>
                    </div>

                    <div className={style.modalBody}>
                        <div>{dict?.mean}</div>

                        {dict && <WordDetail detail={dict.detail} />}
                    </div>

                    <div className={style.modalFooter}>
                        <CloseBtn onClick={handleClose}>Close</CloseBtn>

                        {isSaved ? (
                            <DeleteBtn onClick={handleDeleteDict}>
                                Delete
                            </DeleteBtn>
                        ) : (
                            <SaveBtn onClick={handleAddDict}>Save</SaveBtn>
                        )}
                    </div>
                </div>
            </div>
        )
    else return <></>
}

export default WordModal
