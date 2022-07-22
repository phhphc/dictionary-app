import { useAppSelector } from 'app/hooks'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import WordModal from 'components/WordModal'
import WordCard from 'components/WordCard/WordCard'

import SearchWordBar from 'components/SearchWordBar/SearchWordBar'

const Dashboard = () => {
    const dict = useAppSelector((state) => state.dict.dict)
    console.debug(dict)

    return (
        <Container className='mt-4'>
            <WordModal />

            <Row>
                <Col xs={6}>
                    <SearchWordBar />
                </Col>
            </Row>

            <Row>
                {dict?.map((wDict) => (
                    <Col sm={6} md={4} lg={3} className='mt-4'>
                        <WordCard key={wDict._id} {...wDict} />
                    </Col>
                ))}
            </Row>
        </Container>
    )
}

export default Dashboard
