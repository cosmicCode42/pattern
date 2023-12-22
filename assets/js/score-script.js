const highScore = document.querySelector('#highscore');
const longest = document.querySelector('#maxlength');

if (localStorage.highScore) {
    highScore.innerHTML = localStorage.highScore;
}

if (localStorage.maxLength) {
    longest.innerHTML = localStorage.maxLength;
}