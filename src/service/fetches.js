// call api to fetch random 5 letter word
export const fetchWord = async () => {
    let url = `https://random-word-api.herokuapp.com/word?length=5`;
    let response = await fetch(url);
    let json = await response.json();
    return json[0];
};

// call api to check guess is a real word
export const checkWordExists = async (guess) => {
    let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${guess}`;
    let response = await fetch(url);
    if (response.ok) {
        return response.status;
    }

};
