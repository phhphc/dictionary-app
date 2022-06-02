
import { IWDetail } from "app/interfaces";

import style from "./worddetail.module.scss";

type WordDetailProps = {
    detail: IWDetail[]
}
const WordDetail = ({ detail }: WordDetailProps) => {
    return (<div>
        {detail.map((d, index) => (
            <div key={index} className={style.detailBlock}>
                <div className={style.word}>
                    {d.word}
                </div>

                <div className={style.posWrapper}>
                    {d.pos.map((p, index) => (
                        <div key={index} className={style.pos}>{p}</div>
                    ))}
                </div>

                <div className={style.ipaWrapper}>
                    {d.ipa_uk && <div className={style.ipaLabel}>UK: /<span className={style.ipa}>{d.ipa_uk}</span>/</div>}
                    {d.ipa_us && <div className={style.ipaLabel}>US: /<span className={style.ipa}>{d.ipa_us}</span>/</div>}
                </div>

                <div className={style.sensesWrapper}>
                    {d.senses.map((s, index) => (
                        <div key={index} className={style.senses}>
                            <div className={style.def}>
                                {s.def}
                            </div>

                            <ul className={style.expWrapper}>
                                {s.examples.map((e, index) => (
                                    <li key={index} className={style.exp}>
                                        {e}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

            </div>
        ))}
    </div>)
}

export default WordDetail;