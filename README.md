# Rebel Reader

Rebel Reader lets you learn languages with the texts you love.

## Features

* Read in any language
* Generate active practice
* Use Google Translate for seamless, on-demand translation in context

## Setup

You will need node.js and npm to run Rebel Reader. Download [here](https://nodejs.org/en/download).

1. Clone this git repository. `$ git clone https://github.com/Arongil/Rebel-Reader`
2. Install all the node dependencies stored in package.json. `$ npm i`
3. Get the server running. `$ node server.js`

Visit `localhost:3000` on a browser. You're all set up.

## Usage

1. **Load a `.txt` file.** The first chapter of Harry Potter translated by Google into six languages is available in the `/texts` folder. Go find new texts to read as well! Project Gutenberg has a large database of .txt files of books in many languages.
2. **Set the source and target language.** Source language is the language of the text you are reading, and target language is your native language (or any other the program should translate into).
3. **Read.** Use the "next line" and "prev line" buttons to traverse the text paragraph by paragraph.
4. **Practice.** Press the "practice" button to auto-generate practice based on the paragraph you are currently reading.

Enjoy seamless learning!

## Hosting

The web app is hosted with Heroku. To deploy the latest version, press "Deploy Branch" under "Manual Deploy" in the Heroku Dashboard. One common use case is if the Google Translate API needs to be updated to the latest version. To fix this, update `package.json` to require the latest version. Then run `npm install` to update `package-lock.json`. Before committing changes to the master branch, test to be sure the app works. Then run a manual deploy to complete the update cycle.

## License

MIT
