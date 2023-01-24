import style from './Button.module.scss';

const Button = ({ value, onClick }) => {
    return (
        <button className={style.Btn} onClick={onClick}>
            <i className={value} />
        </button>
    );
};

export default Button;
