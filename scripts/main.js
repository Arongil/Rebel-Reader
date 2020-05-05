var lines = [];
var displayLine = 0, displayedLines = 1;

document.getElementById("file").onchange = async function() {
    const file = this.files[0];
    const text = await readFile(file);
    if (text == "") { return; }
    lines = text.split(/\r\n|\n/);
    displayLine = 0;
    update();
}

function getDisplayedText() {
    var text = "", line;
    for (var i = 0; i < displayedLines && i < lines.length; i++) {
        line = lines[i + displayLine];
        if (line !== "") {
            text += line + " ";
        } else {
            text += "<br><br>";
        }
    }
    return text;
}
function next() {
    if (displayLine + displayedLines >= lines.length) {
        return;
    }
    do {
        displayLine++;
    } while (lines[displayLine] == "");
    update();
}
function prev() {
    if (displayLine <= 0) {
        return;
    }
    do {
        displayLine--;
    } while (lines[displayLine] == "");
    update();
}

const source = document.getElementById("source");
const target = document.getElementById("target");
function update() {
    source.textContent = getDisplayedText();
    target.textContent = "";
    updateSentences();
}

const sourceLangSelector = document.getElementById("sourceLangSelector");
const targetLangSelector = document.getElementById("targetLangSelector");
const supportedLanguages = {
    'English': 'en',
    'Spanish': 'es',
    'French': 'fr',
    'Italian': 'it',
    'German': 'de',
    'Russian': 'ru',
};
// Initialize the options in the selectors.
var keys = Object.keys(supportedLanguages), key;
for (i in keys) {
    key = keys[i];
    sourceLangSelector.innerHTML += "<option value='" + supportedLanguages[key] + "'>" + key + "</option>";
    targetLangSelector.innerHTML += "<option value='" + supportedLanguages[key] + "'>" + key + "</option>";
}
sourceLangSelector.value = 'es';
targetLangSelector.value = 'en';
function changeLanguage() {
    const sourceLanguage = sourceLangSelector.value.toString();
    const targetLanguage = targetLangSelector.value.toString();
    const values = Object.values(supportedLanguages);
    if (values.indexOf(sourceLanguage) === -1 || values.indexOf(targetLanguage) === -1) {
        // Must have valid source-target pair.
        return;
    }
    postData('/change-language', { sourceLang: sourceLanguage, targetLang: targetLanguage });
}


function getSelectionText() {
    if (window.getSelection) {
        return window.getSelection().toString();
    } else if (document.selection && document.selection.type != "Control") {
        return document.selection.createRange().text;
    }
    return "";
}

var translateBox = document.getElementById('translate');
document.onmouseup = function() {
    const selection = getSelectionText().trim();
    if (selection != "") {
        postData('/translate', { text: selection }).then((translation) => {
            if (selection.split(" ").length < 5) {
                // If the selection is shorter than 5 words, write it as X = Y.
                translateBox.innerHTML = selection + " = " + translation.text;
            } else {
                translateBox.innerHTML = "TRANSLATION:<br><br>" + translation.text;
            }
        });
    }
};
