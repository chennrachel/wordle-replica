import Key from '../../components/Key/Key';
import style from './KeyboardRow.module.scss';
import React from 'react';
import keyboard from '../../service/keyboard';

const KeyboardRow = ({ lowLim, highLim }) => {
    return (
        <div className={style.KeyboardRow}>
            {keyboard
                .filter((l, index) => index >= lowLim && index <= highLim)
                .map((letter, index) => (
                    <Key letter={letter} key={index} />
                ))}
        </div>
    );
};

export default KeyboardRow;
