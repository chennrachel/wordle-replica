import { useContext } from 'react';
import { resetGridAndKeys } from '../../service/functions';
import RowContext from '../context/RowContext/RowContext';
import style from './Replay.module.scss';

const Replay = ({ setGameReset, gameReset, setGameStatus, setGuess }) => {
    const [row, setRow] = useContext(RowContext);

    const handleClick = () => {
        setGameStatus('playing');
        setGameReset(gameReset + 1);
        setRow(1);
        setGuess('');
        resetGridAndKeys();
        document.getElementById(`r1b1`).focus();
    };

    return (
        <button className={style.Btn} onClick={handleClick}>
            <i className='fa-solid fa-rotate-left' />
        </button>
    );
};

export default Replay;
