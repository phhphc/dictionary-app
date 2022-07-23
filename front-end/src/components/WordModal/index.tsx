import { useAppSelector, useAppDispatch } from 'app/hooks'
import { closeModal, addDict, deleteDict, updateDict } from 'features/dict/dictSlice'
import Dropdown from 'react-bootstrap/Dropdown'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

import WordDetail from './WordDetail'
import { IDict } from 'app/interfaces'

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
    const newHandleHideWord = (date: number) => () => {
        const hideUntil = new Date()
        hideUntil.setDate(hideUntil.getDate() + date)
        dispatch(updateDict({ ...dict as any, hideUntil }))
    }

    console.log(dict?._id)

    if (!dict || !isOpen) {
        return <></>
    }

    return (
        <Modal show={isOpen} onHide={handleClose} centered size="xl">
            <Modal.Header closeButton>
                <Modal.Title>{dict.word}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {<p>{dict.mean}</p>}

                <WordDetail detail={dict.detail} />
            </Modal.Body>

            <Modal.Footer>
                {isSaved ? (
                    <>
                        <Button variant="outline-danger" onClick={handleDeleteDict}>
                            Delete
                        </Button>
                        <Dropdown>
                            <Dropdown.Toggle variant='outline-success'>
                                Hide
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={newHandleHideWord(1)}>1 day</Dropdown.Item>
                                <Dropdown.Item onClick={newHandleHideWord(3)}>3 day</Dropdown.Item>
                                <Dropdown.Item onClick={newHandleHideWord(7)}>7 day</Dropdown.Item>
                                <Dropdown.Item onClick={newHandleHideWord(30)}>30 day</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </>
                ) : (
                    <Button variant="outline-success" onClick={handleAddDict}>
                        Save
                    </Button>
                )}

                <Button variant="outline-primary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default WordModal
