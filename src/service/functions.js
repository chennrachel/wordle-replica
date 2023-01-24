// return true if guess has 5 valid letters
export const checkNumberOfLetters = (currentRow) => {
    return (
        Array.from(currentRow).filter((letter) => letter.value !== '')
            .length === 5
    );
};

// transform guess to an uppercase string
export const stringGuess = (array) => {
    return Array.from(array)
        .map((letter) => letter.value.toUpperCase())
        .join('');
};

// check each letter for inclusion and placement in this order: green (right letter, right placement), yellow (right letter, wrong placement), grey (wrong letter). checkGreen and checkYellow are both impure functions that remove the letter from the array after the colour is applied so that the letters aren't counted twice
export const colours = (guess, word, row) => {
    let wordArr = word.split('');
    let guessArr = guess.split('');
    checkGreen(guessArr, wordArr, row);
    checkYellow(guessArr, wordArr, row);
    checkGrey(guessArr, row);
};

// if the letter in the guess is in the word and in the right spot, make box and key green
const checkGreen = (guessArr, wordArr, row) => {
    guessArr.forEach((letter, i) => {
        if (
            letter === wordArr[i] &&
            guessArr[i] != null &&
            wordArr[i] != null
        ) {
            let box = document.getElementById(`r${row - 1}b${i + 1}`);
            let key = document.getElementById(letter);
            if (box && key) {
                box.classList.add(`Box_Green__jrt9A`);
                key.classList.remove(`Key_Yellow__WvU9f`);
                key.classList.add(`Key_Green__06Wgu`);
            }
            delete wordArr[i];
            delete guessArr[i];
        }
    });
};

// if the letter in the guess is in the word but not in the right spot, make box and key yellow
const checkYellow = (guessArr, wordArr, row) => {
    guessArr.forEach((letter, i) => {
        if (typeof letter !== 'undefined') {
            if (wordArr.includes(letter)) {
                let box = document.getElementById(`r${row - 1}b${i + 1}`);
                if (box) {
                    box.classList.add(`Box_Yellow__qwC6Z`);
                }
                let key = document.getElementById(guessArr[i]);
                if (key) {
                    key.classList.add(`Key_Yellow__WvU9f`);
                }
                delete wordArr[wordArr.findIndex((e) => e === letter)];
                delete guessArr[i];
            }
        }
    });
};

// if the letter in the guess is not in the word, make box and key grey
const checkGrey = (guessArr, row) => {
    guessArr.forEach((letter, i) => {
        let box = document.getElementById(`r${row - 1}b${i + 1}`);
        if (box) {
            box.classList.add(`Box_Grey__m3sas`);
        }
        let key = document.getElementById(letter);
        if (key) {
            key.classList.add(`Key_Grey__NqvJl`);
        }
    });
};

// remove colours from all boxes and keys
export const resetGridAndKeys = () => {
    let boxes = document.getElementsByClassName(`Box_Box__phHmZ`);
    Array.from(boxes).forEach((box) => {
        box.classList.remove(
            `Box_Green__jrt9A`,
            `Box_Yellow__qwC6Z`,
            `Box_Grey__m3sas`
        );
        box.value = '';
    });
    let keys = document.getElementsByClassName(`Key_Key__nyx1z`);
    Array.from(keys).forEach((key) => {
        key.classList.remove(
            `Key_Green__06Wgu`,
            `Key_Yellow__WvU9f`,
            `Key_Grey__NqvJl`
        );
    });
};

// find the first empty box in the row
export const findFirstEmpty = (activeRow) => {
    return Array.from(activeRow).findIndex((box) => box.value === '') + 1;
};
