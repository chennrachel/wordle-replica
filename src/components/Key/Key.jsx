import { useContext } from 'react';
import { findFirstEmpty } from '../../service/functions';
import RowContext from '../context/RowContext/RowContext';
import style from './Key.module.scss';

const Key = ({ letter }) => {
    const [row, setRow] = useContext(RowContext);

    const handleKeyClick = (event) => {
        let activeRow = document.getElementById(`r${row}b1`).parentElement;
        if (activeRow) {
            activeRow.contentEditable = true;
            let nextBox = document.getElementById(
                `r${row}b${findFirstEmpty(activeRow.children)}`
            );
            nextBox.focus();
            nextBox.value = event.target.innerText;
        }
    };

    return (
        <div className={style.Key} id={letter} onClick={handleKeyClick}>
            <p>{letter}</p>
        </div>
    );
};

export default Key;
