const encrypterHeader = document.getElementById('encrypter-header');
const explanationHeader = document.getElementById('explanation-header');
const explanationButton = document.getElementById('explanation-button');
const encrypterDiv = document.getElementsByClassName('encrypter-container')[0];
const explanationDiv = document.getElementsByClassName('explanation-container')[0];


function hideEncrypter() {
    encrypterDiv.style.left = '-101vw';
    explanationDiv.style.opacity = '1';
}

function showEncrypter() {
    encrypterDiv.style.left = '0';
    explanationDiv.style.opacity = '0';
}

encrypterHeader.onclick = showEncrypter;
explanationButton.onclick = hideEncrypter;
explanationHeader.onclick = hideEncrypter;