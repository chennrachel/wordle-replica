## Wordle-replica

I created this replica of the New York Times Game: Wordle. I played this game a little when it first came out and thought it would be a great game to try to recreate because of it's simplicity. The tech stack for this project includes:

-   React
-   Javascript
-   API calls to a dictionary and random word generator APIs

The premise of the game is that a 5-letter word is chosen and players have 6 attempts to guess the word correctly using valid 5-letter words. After every guess, each letter is marked as either green, yellow or grey depending on whether the letter is in the word and whether the placement of the letter is correct.

-   Green: correct letter in the correct position
-   Yellow: correct letter but incorrect position
-   Grey: incorrect letter

I tried to make the components reusable and broke them down to their smallest unit (some components are just a collection of a smaller component) ie: the grid is a collection of rows, which is a collection of boxes and the keyboard is a collection of a row of letters, which is a collection of letters. I added in some logic to listen for keydown of the player's keyboard or mouse click of the onscreen keyboard. The logic behind comparing the guess and the word calls another API to make sure the word exists before colour coding the box and the equivalent key on the onscreen keyboard.

I originally used useContext to hold almost all of the state variables but decided to dial it down to only the checkContext and rowContext as I didn't want to pass those down multiple levels as props. I recognise there's still a little bit of code duplication but I'm happy with the logic for now.

For future:

-   The words chosen by the word API (although technically English words) are sometimes pretty obscure. This makes the game a lot harder and a bit less fun
-   The API called when a guess is submitted is different to the API that fetches the initial word. That means (although rare), its possible that the initial word will return invalid for the guess
-   Add type safety by converting the project to TypeScript
-   Include indication of loading while fetching from API
