import React, { useState, useEffect } from "react";

import { useAppDispatch, useAppSelector } from "app/hooks";
import { openModal } from "features/dict/dictSlice";
import { IAutoComplete, autoComplete, lookUpDict } from "features/dict/dictServices";
import style from "./searchbar.module.scss";


const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [autoCompleteList, setAutoCompleteList] = useState<IAutoComplete[]>([]);
    const [isFocus, setIsFocus] = useState(false);

    const dispatch = useAppDispatch();
    const dict = useAppSelector(state => state.dict.dict);

    useEffect(() => {
        autoComplete(searchTerm).then(setAutoCompleteList);
    }, [searchTerm])

    const searchDict = async (word: string) => {
        if (!searchTerm) return;

        let _dict = dict.find(d => d.word === word);
        if (!_dict) _dict = await lookUpDict(word);

        dispatch(openModal(_dict));
    }

    const hangleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.currentTarget.value);
    }
    const handleCompleteClick = (event: React.MouseEvent<HTMLElement>) => {
        setSearchTerm(event.currentTarget.innerText);
        searchDict(event.currentTarget.innerText);
    }
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        searchDict(searchTerm);
    }

    const formClass = isFocus && autoCompleteList.length > 0 ?
        style.searchForm + ' ' + style.expand : style.searchForm;

    return (
        <div
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            tabIndex={10}
        >

            <form onSubmit={handleSubmit}
                className={formClass}>

                <input type='text' value={searchTerm} placeholder='Search English'
                    onChange={hangleChange}
                    className={style.search} />


                <button className={style.submit}>
                    <svg className={style.submitImg} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                    </svg>
                </button>

                <div className={style.dropdown}>
                    {autoCompleteList.map(({ word }) =>
                    (<div key={word} onClick={handleCompleteClick}
                        className={style.dropdownItem}>{word}</div>))}
                </div>

            </form>

        </div>
    );
};


export default SearchBar;