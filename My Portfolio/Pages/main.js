function init() {
    const main = document.getElementById('main-content');
    const parent = document.querySelector('.parent');

    if (main) {
        main.classList.add('fade-in');
    }
    if (parent) {
        parent.classList.add('fade-in');
    }
    
    const links = document.querySelectorAll('a[href]');

    links.forEach(link => {
    link.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (!href || href.startsWith('#') || href.startsWith('mailto:')){
            return;
        }
        e.preventDefault();

        if (main) {
        main.classList.remove('fade-in');
        main.classList.add('fade-out');
        }
        
        if (parent) {
        parent.classList.remove('fade-in');
        parent.classList.add('fade-out');
        }

        setTimeout(() => {
            window.location.href = href;
        }, 700); 
    });
});
}

document.addEventListener('DOMContentLoaded', init);