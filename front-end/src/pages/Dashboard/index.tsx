import { useAppSelector } from "app/hooks"

import WordModal from "components/WordModal"
import WordCard from "components/WordCard"

import style from "./dashboard.module.scss"

const Dashboard = () => {
    const dict = useAppSelector(state => state.dict.dict)
    console.debug(dict)

    return (<div className={style.wrapper}>

        <WordModal />

        <div className={style.cardContainer}>
            {
                dict?.map(wDict =>
                    <WordCard key={wDict._id} {...wDict} />)
            }
        </div>

    </div>)
}

export default Dashboard
