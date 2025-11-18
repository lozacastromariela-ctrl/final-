window.addEventListener('load', function() {
    const loaderWrapper = document.getElementById('loader-wrapper');
    const loaderElements = document.querySelectorAll('#loader-wrapper > *');
    const unabLetters = document.querySelectorAll('.unab-letter');

    setTimeout(() => {
        loaderElements.forEach(element => {
            element.style.animation = 'fadeOut 0.8s ease-in forwards';
        });

        unabLetters.forEach(letter => {
            letter.style.animation = 'fadeOut 0.8s ease-in forwards';
        });

        setTimeout(() => {
            loaderWrapper.classList.add('hidden');
            loaderWrapper.addEventListener('transitionend', function() {
                loaderWrapper.style.display = 'none';
                document.body.style.overflow = 'auto';
            });
        }, 800);

    }, 2000);

});
