import { useAppSelector } from 'app/hooks'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import WordModal from 'components/WordModal'
import WordCard from 'components/WordCard/WordCard'

import SearchWordBar from 'components/SearchWordBar/SearchWordBar'
import { IDict } from 'app/interfaces'

const Dashboard = () => {
    const dict = useAppSelector((state) => state.dict.dict)
    console.debug(dict)

    const now = Date.now()
    const filterFunc = ({ hideUntil }: IDict) => {
        return !hideUntil || (new Date(hideUntil)).getTime() < now
    }

    return (
        <Container className="mt-4">
            <WordModal />

            <Row>
                <Col xs={6}>
                    <SearchWordBar />
                </Col>
            </Row>

            <Row>
                {dict?.filter(filterFunc)
                    .map((wDict) => (
                        <Col key={wDict._id}
                            sm={6} md={4} lg={3} className="mt-4"
                        >
                            <WordCard {...wDict} />
                        </Col>
                    ))}
            </Row>
        </Container>
    )
}

export default Dashboard
