function init() {
    const main = document.getElementById('main-content');
    const parent = document.querySelector('.parent');
    const project = document.querySelector('.project-section');

    function fadeInElement(el) {
        if (!el) return;
        el.style.opacity = '1';
        el.classList.remove('fade-out');
        el.classList.remove('fade-in');
        el.classList.add('roll-in');
    }

    fadeInElement(main, true);
    fadeInElement(parent);
    fadeInElement(project, true);

    const links = document.querySelectorAll('a[href]');
    links.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (!href || href.startsWith('#') || href.startsWith('mailto:')) return;

            e.preventDefault();
            [main, parent, project].forEach(el => {
                if (!el) return;
                el.classList.remove('fade-in');
                el.classList.add('fade-out');
            });

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
            
            const entries = Object.entries(languages).sort((a,b) => b[1]-a[1]);
            const total = entries.reduce((s,[,v]) => s+v, 0);

              const COLORS = {
                "JavaScript":"#f1e05a", CSS:"#563d7c", HTML:"#e34c26",
                TypeScript:"#3178c6", Python:"#3572A5", Java:"#b07219",
                "C#":"#178600", "C++":"#f34b7d", C:"#555555",
                Go:"#00ADD8", PHP:"#4F5D95", Ruby:"#701516",
                Rust:"#dea584", Kotlin:"#A97BFF", Swift:"#F05138"
            };

            const bars = entries.map(([name, bytes]) => {
            const pct = total ? (bytes/total*100) : 0;
            const color = COLORS[name] || "rgba(0,0,0,.15)";
                return `<span class="lang-seg" style="width:${pct.toFixed(2)}%;background:${color}" title="${name} ${pct.toFixed(1)}%"></span>`;
        }).join("");

            const legendItems = entries.map(([name, bytes]) => {
            const pct = total ? (bytes/total*100) : 0;
            const color = COLORS[name] || "rgba(0,0,0,.15)";
                return `<li><span class="lang-dot" style="background:${color}"></span>${name} ${pct.toFixed(1)}%</li>`;
        });
            const legend = `<ul class="lang-legend">${legendItems.join("")}</ul>`;

            const card = document.createElement('div');
            card.classList.add('project-card');
            card.innerHTML = `
                <h3>${repo.name}</h3>
                <p>${repo.description || 'No description'}</p>
                
                 <div class="lang">
                    <span class="lang-label">Languages</span>
                    <div class="lang-bar">
                        ${bars || `<span class="lang-seg" style="width:100%;background:rgba(0,0,0,.1)" title="No languages detected"></span>`}
                    </div>
                    ${entries.length ? legend : ""} 
                </div>

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

window.addEventListener('pageshow', () => {
    console.log('pageshow fired');
    init();
});

