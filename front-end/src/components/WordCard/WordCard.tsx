import { useAppDispatch } from 'app/hooks'
import { openModal } from 'features/dict/dictSlice'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import { IDict } from 'app/interfaces'

const WordCard = ({ _id, mean, word, detail }: IDict) => {
    const dispath = useAppDispatch()

    const handleShowModal = () => {
        dispath(openModal({ _id, word, mean, detail }))
    }

    return (
        <Card>
            <Card.Body>
                <Card.Title>{word}</Card.Title>
                <Card.Text>{mean}</Card.Text>
                <Button variant="outline-primary"
                    onClick={handleShowModal}>More</Button>
            </Card.Body>
        </Card>
    )
}

export default WordCard
