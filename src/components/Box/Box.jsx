import style from './Box.module.scss';
import CheckContext from '../context/CheckContext/CheckContext';
import { useContext } from 'react';

const Box = ({ id }) => {
    const [check, setCheck] = useContext(CheckContext);

    const keyDownHandler = (event) => {
        let currentRow = event.target.parentElement;
        let previousBox = event.target.previousSibling;
        let nextBox = event.target.nextSibling;
        currentRow.contentEditable = true;

        // logic for directional keys
        if (event.key === 'Backspace') {
            if (event.target.value === '' && previousBox) {
                previousBox.value = '';
                previousBox.focus();
            }
        } else if (event.key === 'Delete' && nextBox) {
            event.preventDefault();
            nextBox.focus();
            nextBox.value = '';
        } else if (event.key === 'ArrowLeft') {
            event.preventDefault();
            previousBox.focus();
        } else if (event.key === 'ArrowRight' && event.target.nextSibling) {
            nextBox.focus();
        }
        // check A-Z using keyCode
        else if (event.keyCode > 64 && event.keyCode < 91) {
            event.preventDefault();
            if (event.target.value === '') {
                event.target.value = event.key.toUpperCase();
            }
            if (nextBox) {
                nextBox.focus();
            }
        }
        // enter key -> check
        else if (event.key === 'Enter') {
            setCheck(true);
        }
        // prevent all other characters from being typed
        else {
            event.preventDefault();
        }
    };

    return (
        <>
            <input
                className={style.Box}
                maxLength={1}
                onKeyDown={keyDownHandler}
                id={id}
                name={`Box`}
                blurInputOnSelect={true}
            />
        </>
    );
};

export default Box;
