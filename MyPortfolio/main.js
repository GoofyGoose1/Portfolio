function init() {
    const main = document.getElementById('main-content');
    const parent = document.querySelector('.parent');
    const project = document.querySelector('.project-section');

    if (main) {
        main.classList.add('fade-in');
    }
    if (parent) {
        parent.classList.add('fade-in');
    }
    if(project) {
        project.classList.add('fade-in');
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

        if (project) {
        project.classList.remove('fade-in');
        project.classList.add('fade-out');
;        }

        setTimeout(() => {
            window.location.href = href;
        }, 700); 
    });
});
}

async function loadGitHubProjects() {
    const container = document.getElementById('projects-container');
    const githubSection = document.getElementById('github-projects');

     if (!container || !githubSection) {
        console.warn('GitHub projects section or container not found.');
        return;
    }

    const username = 'GoofyGoose1';
    const singleRepo = githubSection.dataset.repo;
    const multipleRepos = githubSection.dataset.repos;

    async function renderRepo(repoName) {
        try {
            
            const response = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
            if (!response.ok) throw new Error(`Failed to load ${repoName}`);
            const repo = await response.json();

            const languagesRes = await fetch(repo.languages_url);
            const languages = await languagesRes.json();
            const languagesList = Object.keys(languages).join(', ') || 'No specified languages';

            const card = document.createElement('div');
            card.classList.add('project-card');
            card.innerHTML = `
                <h3>${repo.name}</h3>
                <p>${repo.description || 'No description'}</p>
                <p><strong>Languages:</strong> ${languagesList}</p>
                <a href="${repo.html_url}" target="_blank">GitHub</a>
            `;
            container.appendChild(card);
        } catch (error) {
            console.error(error);
            const errorCard = document.createElement('div');
            errorCard.classList.add('project-card');
            errorCard.innerHTML = `<p>Cannot load Project: ${repoName}</p>`;
            container.appendChild(errorCard);
        }
    }

    container.innerHTML = '';
   
    if (singleRepo) {
        renderRepo(singleRepo.trim());
    } else if (multipleRepos) {
        const repoNames = multipleRepos.split(',').map(name => name.trim());
        for (const repoName of repoNames) {
            await renderRepo(repoName);
        }
    } else {
        container.innerHTML = '<p>Repositories not found</p>';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    init();
    loadGitHubProjects();
});
