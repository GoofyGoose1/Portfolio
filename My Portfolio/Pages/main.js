function init() {
    const main = document.getElementById('main-content');
    main.classList.add('fade-in');

    const links = document.querySelectorAll('a[href]');

    links.forEach(link => {
    link.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (!href || href.startsWith('#') || href.startsWith('mailto:')){
            return;
        }
        e.preventDefault();
        main.classList.remove('fade-in');
        main.classList.add('fade-out');

        setTimeout(() => {
            window.location.href = href;
        }, 700); 
    });
});
}

document.addEventListener('DOMContentLoaded', init);