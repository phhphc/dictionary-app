import { useAppSelector, useAppDispatch } from 'app/hooks'
import { closeModal, addDict, deleteDict } from 'features/dict/dictSlice'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import WordDetail from './WordDetail'

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

    if (!dict || !isOpen) {
        return <></>
    }

    return (
        <Modal lg
            show={isOpen}
            onHide={handleClose}
            centered
            size="xl"
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    {dict.word}
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {<p>{dict.mean}</p>}

                <WordDetail detail={dict.detail} />
            </Modal.Body>

            <Modal.Footer>
                {isSaved ? (
                    <Button variant="outline-danger"
                        onClick={handleDeleteDict}
                    >Delete</Button>
                ) : (
                    <Button variant="outline-success"
                        onClick={handleAddDict}
                    >Save</Button>
                )}

                <Button variant="outline-primary" onClick={handleClose}
                >Close</Button>
            </Modal.Footer>
        </Modal>

    )
}

export default WordModal
