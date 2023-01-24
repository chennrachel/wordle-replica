import Key from '../../components/Key/Key';
import style from './KeyboardRow.module.scss';
import React from 'react';

const KeyboardRow = ({ lowLim, highLim }) => {
    const keyboard = [
        'Q',
        'W',
        'E',
        'R',
        'T',
        'Y',
        'U',
        'I',
        'O',
        'P',
        'A',
        'S',
        'D',
        'F',
        'G',
        'H',
        'J',
        'K',
        'L',
        'Z',
        'X',
        'C',
        'V',
        'B',
        'N',
        'M',
    ];

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
