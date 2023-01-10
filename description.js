const encrypterHeader = document.getElementById('encrypter-header');
const explanationHeader = document.getElementById('explanation-header');
const explanationButton = document.getElementById('explanation-button');
const encrypterDiv = document.getElementsByClassName('encrypter-container')[0];
const explanationDiv = document.getElementsByClassName('explanation-container')[0];


function hideEncrypter() {
    encrypterDiv.style.left = '-101vw';
    encrypterDiv.style.backgroundColor = 'transparent';
}

function showEncrypter() {
    let bgColor = getComputedStyle(encrypterDiv).getPropertyValue('--bg-color');
    encrypterDiv.style.left = '0';
    encrypterDiv.style.backgroundColor = bgColor;
}

encrypterHeader.onclick = showEncrypter;
explanationButton.onclick = hideEncrypter;
explanationHeader.onclick = hideEncrypter;