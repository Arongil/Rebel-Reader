function getSentences() {
    var text = getDisplayedText();
    if (text.indexOf(".") === -1 && text.indexOf("?") === -1 && text.indexOf("!") === -1) {
        // If there's only one sentence, return everything unsplit.
        return [text];
    }
    // Map '.', '?', and '!' to new sentences.
    // As an example, "Hello? Hello... Hello! Hello." --> ["Hello?", "Hello...", "Hello!", "Hello."]
    var sentences = text.split(". ").map( (block, i, arr) => block + (i < arr.length - 1 ? ". " : "") ).map( block => {
        return block.split("! ").map( (block, i, arr) => block + (i < arr.length - 1 ? "! " : "") ).map( block => {
            return block.split("? ").map( (block, i, arr) => block + (i < arr.length - 1 ? "? " : "") )
        })
    });
    sentences = [].concat(...([].concat(...sentences))).map(sentence => sentence.trim()).filter(sentence => sentence !== "");
    return sentences;
}

var displayedSentences = [""], practiceIndex = 0;
function updateSentences() {
    displayedSentences = getSentences();
    practiceIndex = 0;
}

function getSentence() {
    var sentence = displayedSentences[practiceIndex];
    practiceIndex = (practiceIndex + 1) % displayedSentences.length;
    return sentence;
}

var sentence;
function highlight() {
    // Note: if the sentence appears multiple times in the text, then only the first
    // instance will ever be chosen. This never affects the user, as it's only removing
    // randomness against equivalent sentences, which are all the same anyway.
    var parts = getDisplayedText().split(sentence);
    // Reconstruct the passage.
    var text = parts[0] + "<strong>" + sentence + "</strong>" + parts[1];
    source.innerHTML = text;
}

function revealTranslation() {
    attemptedTranslation = document.getElementById('translation-attempt').value;
    // Get example translation by Google.
    postData('/translate', { text: sentence }).then((translation) => {
        target.innerHTML += "<br><br>" + translation.text;
        target.innerHTML += "<br><br><button onclick='practice()'>Next Sentence</button>";
        document.getElementById('translation-attempt').value = attemptedTranslation;
    });
}

function createWorkspace() {
    var targetLanguage = Object.keys(supportedLanguages).filter( lang => supportedLanguages[lang] == targetLangSelector.value.toString() )[0];
    target.innerHTML = "";
    target.innerHTML += "<strong>Write the highlighted sentence in " + targetLanguage + "!</strong>";
    target.innerHTML += "<br><br>";
    target.innerHTML += "<textarea rows='4' cols='50' id='translation-attempt'></textarea>";
    target.innerHTML += "<br><br>";
    target.innerHTML += "<p>When you're done, check out how Google does it:</p";
    target.innerHTML += "<button onclick='revealTranslation();'>Press Me!</button>";
}

function practice() {
    sentence = getSentence();
    highlight();
    createWorkspace();
}
