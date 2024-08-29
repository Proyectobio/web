document.addEventListener('DOMContentLoaded', () => {
    const backButton = document.querySelector('.back-button');

    backButton.addEventListener('click', () => {
        window.location.href = 'memoria.html';
    });
});
