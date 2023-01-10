const encryptCode = {
    'e': 'enter',
    'i': 'imes',
    'a': 'ai',
    'o': 'ober',
    'u': 'ufat'
}

const userInput = document.getElementById('user-input');
const outputText = document.getElementById('output-text');
const encryptButton = document.getElementById('encrypt-button');
const decryptButton = document.getElementById('decrypt-button');
const crossIcon = document.getElementById('cross-icon');
const copyIcon = document.getElementById('copy-icon');
const checkIcon = document.getElementById('check-icon');
const mainContainer = document.getElementsByClassName('main-container')[0];
const outputSideContainer = document.getElementsByClassName('side-container')[1];
const toggleModeButton = document.getElementById('toggle-mode');

let activeFunction = '';
let darkMode = false;

function encrypt(text) {
    const message = [];
    for (let i = 0; i < text.length; i++) {
        let character = text[i];
        if (encryptCode[character]) {
            message.push(encryptCode[character]);
        } else {
            message.push(character);
        }
    }
    return message.join('');
}

function decrypt(text) {
    const message = [];
    for (let i = 0; i < text.length; i++) {
        let character = text[i];
        let keyword = encryptCode[character];
        if (typeof keyword !== 'undefined') {
            let charactersToCompare = keyword.length;
            let substring = text.slice(i, i + charactersToCompare);
            if (substring.match(new RegExp(keyword, 'g'))) {
                i += charactersToCompare - 1;
            }
        }
        message.push(character);
    }
    return message.join('');
}

function showOutput() {
    let output = '';
    let text = userInput.value.trim();
    if (text === '') {
        outputText.value = output;
        return;
    }
    if (activeFunction === '') {
        return;
    }
    const charactersOtherThanLowercaseOrSpaces = /[^a-z ]/g;
    if (text.match(charactersOtherThanLowercaseOrSpaces)) {
        outputText.value = 'El texto contiene caracteres ilegales.';
        return;
    }
    if (activeFunction === 'encrypt') {
        output = encrypt(text);
    } else if (activeFunction === 'decrypt') {
        output = decrypt(text);
    }
    outputText.value = output;
}

function clearButtonStyle() {
    encryptButton.style.cssText = '';
    decryptButton.style.cssText = '';
}

function changeButtonStyle(activeFunction) {
    let emphasisColor = getComputedStyle(mainContainer).getPropertyValue('--emphasis-color');
    clearButtonStyle();
    if (activeFunction === 'encrypt') {
        encryptButton.style.borderBottomStyle = 'solid';
        encryptButton.style.color = emphasisColor;
    } else if (activeFunction === 'decrypt') {
        decryptButton.style.borderBottom = 'solid';
        decryptButton.style.color = emphasisColor;
    }
}

function toggleCrossIcon() {
    if (userInput.value !== '') {
        crossIcon.style.display = 'block';
    } else {
        crossIcon.style.display = 'none';
    }
}

function toggleCopyIcon() {
    let outputIsNotEmpty = outputText.value !== '';
    let checkIconIsNotEnabled = checkIcon.style.display !== 'block';
    if (outputIsNotEmpty && checkIconIsNotEnabled) {
        copyIcon.style.display = 'block';
    } else {
        copyIcon.style.display = 'none';
    }
}

function copyToClipboard() {
    navigator.permissions.query({ name: "clipboard-write" }).then((result) => {
        if (result.state === "granted" || result.state === "prompt") {
            navigator.clipboard.writeText(outputText.value);
        }
    });
}

function showCopiedToClipboardAdvice() {
    copyIcon.style.display = 'none';
    checkIcon.style.display = 'block';
    setTimeout(() => {
        checkIcon.style.display = 'none';
        toggleCopyIcon();
    }, 1500);
}

function hideCopiedToClipboardAdvice() {
    checkIcon.style.display = 'none';
}

function cleanTextAreas() {
    userInput.value = '';
    outputText.value = '';
}

function changeDisplayOfOutputSideContainer() {
    if (window.screen.width >= 720) {
        mainContainer.style.height = '80%';
        outputSideContainer.style.display = 'block';
        return;
    }
    if (outputText.value !== '') {
        mainContainer.style.height = '80%';
        outputSideContainer.style.display = 'block';
    } else {
        mainContainer.style.height = '40%';
        outputSideContainer.style.display = 'none';
    }
}

function loadStylesheet(file, disable) {
    let link = document.querySelector(`link[href="${file}"]`);
    if (!link) {
        link = document.createElement('link');
        link.href = file;
        link.rel = 'stylesheet';
        document.head.appendChild(link);
    }
    link.disabled = disable;
}

userInput.oninput = () => {
    showOutput();
    toggleCrossIcon();
    toggleCopyIcon();
    changeDisplayOfOutputSideContainer();
};

crossIcon.onclick = () => {
    cleanTextAreas();
    toggleCrossIcon();
    toggleCopyIcon();
    hideCopiedToClipboardAdvice();
    changeDisplayOfOutputSideContainer();
};

copyIcon.onclick = () => {
    copyToClipboard();
    showCopiedToClipboardAdvice();
};

checkIcon.onclick = copyToClipboard;

encryptButton.onclick = () => {
    activeFunction = 'encrypt';
    showOutput();
    changeButtonStyle(activeFunction);
    changeDisplayOfOutputSideContainer();
    toggleCopyIcon();
};

decryptButton.onclick = () => {
    activeFunction = 'decrypt';
    showOutput();
    changeButtonStyle(activeFunction);
    changeDisplayOfOutputSideContainer();
    toggleCopyIcon();
};

toggleModeButton.onclick = () => {
    loadStylesheet('./css/dark.css', darkMode);
    darkMode = !darkMode;
    changeButtonStyle(activeFunction);
};

window.onresize = changeDisplayOfOutputSideContainer;