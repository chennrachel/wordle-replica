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
                box.style.backgroundColor = `#90ec69`;
                key.style.backgroundColor = `#90ec69`;
                // box.classList.add(`Box_Green__jrt9A`);
                // key.classList.remove(`Key_Yellow__WvU9f`);
                // key.classList.add(`Key_Green__06Wgu`);
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
                let key = document.getElementById(guessArr[i]);
                if (box && key) {
                    box.style.backgroundColor = `#f0f09a`;
                    key.style.backgroundColor = `#f0f09a`;
                }
                // if (key) {
                //     key.classList.add(`Key_Yellow__WvU9f`);
                // }
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
        let key = document.getElementById(letter);
        if (box && key) {
            box.style.backgroundColor = `#7a7a77`;
            key.style.backgroundColor = `#7a7a77`;
        }
    });
};

// remove colours from all boxes and keys
export const resetGridAndKeys = () => {
    let boxes = document.getElementsByName(`Box`);
    Array.from(boxes).forEach((box) => {
        box.style.backgroundColor = '';
        box.value = '';
    });
    let keys = document.getElementsByName(`Key`);
    Array.from(keys).forEach((key) => {
        key.style.backgroundColor = '';
    });
};

// find the first empty box in the row
export const findFirstEmpty = (activeRow) => {
    return Array.from(activeRow).findIndex((box) => box.value === '') + 1;
};
