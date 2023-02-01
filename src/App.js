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

    // useEffect - check row guess against word, set game status
    useEffect(() => {
        colours(guess, word, row);
        if (guess === word && guess !== '') {
            setGameStatus('won');
            setRow(10);
        } else if (row > 6) {
            setGameStatus('lost');
        }
    }, [row]);

    // notification for invalid guess (not enough letters or invalid word) or API error
    const notify = (notification) => {
        toast.error(notification, { position: toast.POSITION.TOP_CENTER });
    };

    // fx's for getting reused elements
    const getActiveRow = () => {
        return document.getElementById(`r${row}b1`).parentElement;
    };
    const getNextBox = (children) => {
        return document.getElementById(`r${row}b${findFirstEmpty(children)}`);
    };

    // useEffect - check # of letters in guess, if 5, check word exists. handle errors.
    useEffect(() => {
        const checkGuess = async () => {
            if (check && row <= 6) {
                let activeRow = getActiveRow();
                let currentRowsBoxes = activeRow.children;
                // check number of letters
                if (checkNumberOfLetters(currentRowsBoxes)) {
                    let status = await checkWordExists(
                        stringGuess(Array.from(currentRowsBoxes))
                    );
                    if (status === 200) {
                        setRow(row + 1);
                        setGuess(stringGuess(currentRowsBoxes));
                    }
                    // handle errors
                    if (status === 404) {
                        notify(`Word does not exist`);
                    }
                    if (status === 500) {
                        notify(
                            `Error! Something went wrong but it's not your fault. Sorry- try again later!`
                        );
                    }
                } else notify(`Not enough letters`);
            }
        };
        checkGuess();
        setCheck(false);
    }, [check]);

    // fx - handle onscreen on keypress backspace
    const handleBackSpace = () => {
        let activeRow = getActiveRow();
        let firstBoxInActiveRow = activeRow.firstChild;
        let nextBox = getNextBox(activeRow.children);
        if (firstBoxInActiveRow.value !== '') {
            if (nextBox) {
                let previousBox = nextBox.previousSibling;
                if (nextBox.value === '') {
                    previousBox.value = '';
                }
            } else {
                activeRow.lastChild.value = '';
            }
        }
    };

    useEffect(() => {
        const keyDownHandler = (event) => {
            let activeRow = getActiveRow();
            let nextBox = getNextBox(activeRow.children);
            // equivalent to regex for [a-zA-Z]
            if (nextBox && event.keyCode > 64 && event.keyCode < 91) {
                nextBox.value = event.key.toUpperCase();
            }
            // call backspace fx
            if (event.key === 'Backspace') {
                handleBackSpace();
            }
            // call checkGuess fx
            else if (event.key === 'Enter') {
                setCheck(true);
            }
        };

        if (row <= 6) {
            document.addEventListener('keydown', keyDownHandler);
        }
        return () => {
            document.removeEventListener('keydown', keyDownHandler);
        };
    }, [row]);

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
                                    onClick={() => setCheck(true)}
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
