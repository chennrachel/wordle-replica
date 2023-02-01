import style from './Box.module.scss';

const Box = ({ id }) => {
    return (
        <input
            className={style.Box}
            maxLength={1}
            id={id}
            name={`Box`}
            inputMode={'none'}
            readOnly
        />
    );
};

export default Box;
