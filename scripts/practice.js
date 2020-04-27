function getSentence() {
    var text = getDisplayedText();
    if (text.indexOf(".") === -1 && text.indexOf("?") === -1) {
        // If there's only one sentence, return everything unsplit.
        return text;
    }
    // Map periods, question marks, and exclamation marks to new sentences.
    // As an example, "Hello? Hello! Hello." --> ["Hello?", "Hello!", "Hello."]
    var sentences = text.split(".").map( (block, i, arr) => block + (i < arr.length - 1 ? "." : "") ).map( block => {
        return block.split("!").map( (block, i, arr) => block + (i < arr.length - 1 ? "!" : "") ).map( block => {
            return block.split("?").map( (block, i, arr) => block + (i < arr.length - 1 ? "?" : "") )})
    });
    sentences = [].concat(...([].concat(...sentences))).map(sentence => sentence.trim()).filter(sentence => sentence !== "");
    return sentences[Math.floor(Math.random() * sentences.length)];
}

var sentence;
function highlight() {
    // Note: if the sentence appears multiple times in the text, then only the first
    // instance will ever be chosen. This never affects the user, as it's only removing
    // randomness against equivalent sentences, which are all the same anyway.
    var parts = getDisplayedText().split(sentence);
    var text = parts[0] + "<strong>" + sentence + "</strong>" + parts[1];
    source.innerHTML = text;
}

function revealTranslation() {
    attemptedTranslation = document.getElementById('translation-attempt').value;
    // Get example translation by Google.
    postData('/translate', { text: sentence }).then((translation) => {
        target.innerHTML += "<br><br>" + translation.text;
        document.getElementById('translation-attempt').value = attemptedTranslation;
    });
}

function createWorkspace() {
    target.innerHTML = "";
    target.innerHTML += "<strong>Write the highlighted sentence in English!</strong>";
    target.innerHTML += "<br><br>";
    target.innerHTML += "<textarea rows='4' cols='50' id='translation-attempt'></textarea>";
    target.innerHTML += "<br><br>";
    target.innerHTML += "<p>When you're done, check out how we did it:</p";
    target.innerHTML += "<button onclick='revealTranslation();'>Press Me!</button>";
}

function practice() {
    sentence = getSentence();
    highlight();
    createWorkspace();
}
