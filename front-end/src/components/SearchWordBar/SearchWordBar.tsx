import React, { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup'

import { useAppDispatch, useAppSelector } from 'app/hooks'
import { openModal } from 'features/dict/dictSlice'
import {
    IAutoComplete,
    autoComplete,
    lookUpDict,
} from 'features/dict/dictServices'

import style from './searchWordbar.module.scss'

const SearchWordBar = () => {
    const dispatch = useAppDispatch()

    const [searchTerm, setSearchTerm] = useState('')
    const [showList, setShowList] = useState(false)
    const [autoCompleteList, setAutoCompleteList] = useState<IAutoComplete[]>([])

    const dict = useAppSelector((state) => state.dict.dict)

    useEffect(() => {
        autoComplete(searchTerm).then(setAutoCompleteList)
    }, [searchTerm])

    const searchDict = async (word: string) => {
        if (!searchTerm) return

        let _dict = dict.find((d) => d.word === word)
        if (!_dict) _dict = await lookUpDict(word)

        dispatch(openModal(_dict))
    }

    const hangleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.currentTarget.value)
    }
    const handleCompleteClick = (event: React.MouseEvent<HTMLElement>) => {
        setShowList(false)
        setSearchTerm(event.currentTarget.innerText)
        searchDict(event.currentTarget.innerText)
    }
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        searchDict(searchTerm)
    }
    const handleFocus = () => {
        setShowList(true)
    }
    const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
            setShowList(false)
        }
    }

    return (
        <div className={style.searchBar}
            onFocus={handleFocus}
            onBlur={handleBlur}>
            <Form className="d-flex"
                onSubmit={handleSubmit}>
                <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search English"
                    value={searchTerm}
                    onChange={hangleChange}
                />
                <Button variant="outline-success">Search</Button>
            </Form>

            {showList &&
                <div className={style.searchList}>
                    <ListGroup>
                        {autoCompleteList.map(({ word }) => (
                            <ListGroup.Item
                                action
                                key={word}
                                onClick={handleCompleteClick}>
                                {word}
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </div>
            }
        </div>
    )
}

export default SearchWordBar
