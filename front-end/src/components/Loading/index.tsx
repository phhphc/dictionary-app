
import style from "./loading.module.scss"

const Loading = () => {
    return (
        <div className={style.overlay}>
            
            <div className={style.outerSquare}>
                <div className={style.innerSquare}></div>
            </div>

        </div>
    );
};

export default Loading;