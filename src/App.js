import style from './App.module.scss';
import {
    colours,
    checkNumberOfLetters,
    findFirstEmpty,
    stringGuess,
} from './service/functions';
import { fetchWord, checkWordExists } from './service/fetches';
import { useEffect, useState } from 'react';
import RowContext from './components/context/RowContext/RowContext';
import Replay from './components/Replay/Replay';
import Button from './components/Button/Button';
import Grid from './containers/Grid/Grid';
import KeyboardRow from './containers/KeyboardRow/KeyboardRow';
import CheckContext from './components/context/CheckContext/CheckContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
    const [word, setWord] = useState('');
    const [row, setRow] = useState(1);
    const [guess, setGuess] = useState('');
    const [gameStatus, setGameStatus] = useState('playing');
    const [gameReset, setGameReset] = useState(0);
    const [check, setCheck] = useState(false);

    // useEffect - fetch word from API
    useEffect(() => {
        const getResult = async () => {
            const result = await fetchWord();
            setWord(result.toUpperCase());
        };
        getResult();
    }, [gameReset]);

    // useEffect - on start and game restart, focus on first box
    useEffect(() => {
        let firstBox = document.getElementById(`r1b1`);
        let firstRow = firstBox.parentElement;
        firstBox.focus();
        firstRow.contentEditable = true;
    }, [gameReset]);

    // useEffect - check row guess against word, set game status
    useEffect(() => {
        colours(guess, word, row);
        if (guess === word && guess !== '') {
            setGameStatus('won');
        } else if (row > 6) {
            setGameStatus('lost');
        }
    }, [row]);

    // useEffect - if game status is not 'playing' ie. if it is 'lost' or 'won', make grid not editable
    useEffect(() => {
        if (gameStatus !== 'playing') {
            document.activeElement.parentElement.contentEditable = false;
            document.activeElement.blur();
        }
    }, [gameStatus]);

    const notify = (notification) => {
        toast.error(notification, { position: toast.POSITION.TOP_CENTER });
    };

    // useEffect - after 'check for 5' set guess and row + 1 (focus on next first box of next row after guess)
    useEffect(() => {
        const checkGuess = async () => {
            if (check && row <= 6) {
                let activeRow = document.getElementById(
                    `r${row}b1`
                ).parentElement;
                let nextRow = activeRow.nextSibling;
                let currentRowsBoxes = activeRow.children;
                // check number of letters to stop the following happening on first render and twice after check submit
                if (checkNumberOfLetters(currentRowsBoxes)) {
                    let status = await checkWordExists(
                        stringGuess(Array.from(currentRowsBoxes))
                    );
                    if (status === 200) {
                        if (row <= 5) {
                            activeRow.contentEditable = false;
                            nextRow.contentEditable = true;
                            nextRow.firstChild.focus();
                        }
                        setRow(row + 1);
                        setGuess(stringGuess(currentRowsBoxes));
                    } else notify('word does not exist');
                } else notify('not enough letters');
            }
        };
        checkGuess();
        setCheck(false);
    }, [check]);

    const handleCheck = () => {
        setCheck(true);
    };

    const handleBackSpace = (event) => {
        let activeRow = document.getElementById(`r${row}b1`).parentElement;
        let firstBoxInActiveRow = activeRow.firstChild;
        let activeBox = document.getElementById(
            `r${row}b${findFirstEmpty(activeRow.children)}`
        );
        if (firstBoxInActiveRow.value !== '') {
            if (activeBox) {
                let previousBox = activeBox.previousSibling;
                if (activeBox.value === '') {
                    previousBox.value = '';
                    previousBox.focus();
                }
            } else {
                activeRow.lastChild.value = '';
                activeRow.lastChild.focus();
            }
        }
    };

    return (
        <>
            <RowContext.Provider value={[row, setRow]}>
                <CheckContext.Provider value={[check, setCheck]}>
                    <header className={style.Header}>WORDLE REPLICA</header>
                    <ToastContainer autoClose={1500} />
                    <Grid />
                    <div className={style.Info}>
                        <div className={style.Keyboard}>
                            <KeyboardRow lowLim={0} highLim={9} />
                            <KeyboardRow lowLim={10} highLim={18} />
                            <div className={style.lastKeyboardRow}>
                                <Button
                                    value={'fa-solid fa-spell-check'}
                                    onClick={handleCheck}
                                />
                                <KeyboardRow lowLim={19} highLim={26} />
                                <Button
                                    value={'fa-solid fa-delete-left'}
                                    onClick={handleBackSpace}
                                />
                            </div>
                        </div>
                        {gameStatus === 'won' || gameStatus === 'lost' ? (
                            <>
                                <p>
                                    You {gameStatus}! The word was {word}.
                                </p>
                                <Replay
                                    setGameReset={setGameReset}
                                    gameReset={gameReset}
                                    setGameStatus={setGameStatus}
                                    setGuess={setGuess}
                                />
                            </>
                        ) : (
                            ''
                        )}
                    </div>
                </CheckContext.Provider>
            </RowContext.Provider>
        </>
    );
}

export default App;
