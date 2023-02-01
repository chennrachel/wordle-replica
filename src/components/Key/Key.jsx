import { useContext } from 'react';
import { findFirstEmpty } from '../../service/functions';
import RowContext from '../context/RowContext/RowContext';
import style from './Key.module.scss';

const Key = ({ letter }) => {
    const [row, setRow] = useContext(RowContext);

    const handleKeyClick = (event) => {
        if (row <= 6) {
            let activeRow = document.getElementById(`r${row}b1`).parentElement;
            let nextBox = document.getElementById(
                `r${row}b${findFirstEmpty(activeRow.children)}`
            );
            if (nextBox) {
                nextBox.value = event.target.innerText;
            }
        }
    };

    return (
        <div
            className={style.Key}
            id={letter}
            onClick={handleKeyClick}
            name={`Key`}
        >
            <p>{letter}</p>
        </div>
    );
};

export default Key;
