import { useAppDispatch } from 'app/hooks'
import { openModal } from 'features/dict/dictSlice'

import { IDict } from 'app/interfaces'
import style from './wordcard.module.scss'

const WordCard = ({ _id, mean, word, detail }: IDict) => {
    const dispath = useAppDispatch()

    const handleShowModal = () => {
        dispath(openModal({ _id, word, mean, detail }))
    }

    return (
        <div className={style.card} onClick={handleShowModal}>
            <div className={style.header}>{word}</div>
            <div className={style.body}>{mean}</div>
            <div className={style.action}></div>
        </div>
    )
}

export default WordCard
