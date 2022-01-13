# Wordle Archive

🔗 https://www.devangthakkar.com/wordle_archive/

An archive for [Wordle](https://www.powerlanguage.co.uk/wordle/) by [Josh Wardle](https://twitter.com/powerlanguish) and built on top of [Word Master](https://octokatherine.github.io/word-master/) created by [Katherine Peterson](https://twitter.com/katherinecodes), Wordle Archive is ... simply a remembrance of wordles past. I created this because I wanted to go back to Wordles that I had missed.

## How did I do it?

This project would not have been possible without [Selenium](https://github.com/SeleniumHQ/selenium). I figured out that if I changed my computer time to a previous date, I could trick Wordle into allowing me to access the Wordle for the day. I used Selenium to go back in time and obtain answers, but I have since been told the answers were already in the correct order in the original source code. I have the answers in plain text in the source code as well because I don't care, especially since there are many ways to cheat already.

## Rules

You have 6 guesses to guess the correct word.
Each guess can be any valid word.

After submitting a guess, the letters will turn gray, green, or yellow.

- Green: The letter is correct, in the correct position.
- Yellow: The letter is correct, but in the wrong position.
- Gray: The letter is incorrect.

## Contributing

Feel free to open an issue for any bugs or feature requests.

To contribute to the code, see [CONTRIBUTING.md](https://github.com/octokatherine/word-master/blob/main/CONTRIBUTING.md)
