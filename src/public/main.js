'use strict'

// toggle menu
const navToggle = document.querySelector('.nav-toggle');
const links = document.querySelector('.nav-links');

navToggle.addEventListener('click', function () {
    if (links.classList.contains('show-links')) {
        links.classList.remove('show-links');
    }
    else {
        links.classList.add('show-links');
    }
});

//login button
const loginBtn = document.querySelector('.btn-log');
const changeLogButton = function(status) {
    if (status) {
        loginBtn.innerText = 'Odhlásit se';
        loginBtn.classList.remove('btn-login-form');
        loginBtn.classList.add('btn-logout');
    } else {
        loginBtn.innerText = 'Přihlásit se';
        loginBtn.classList.remove('btn-logout');
        loginBtn.classList.add('btn-login-form');
    }
};

// main functions
const container = document.querySelector('.container');
const nav = document.querySelector('nav');

const clear = function () {
    container.innerHTML = '';
};

const render = function (data) {
    if (!data || data.length === 0) {
        return renderError('Data nelze načíst.');
    };
    clear();
    container.insertAdjacentHTML('afterbegin', data);
};

const renderSpinner = function() {
    const markup = `
        <div class="spinner">
            <svg>
                <use href="spinner-solid.svg"></use>
            </svg>
        </div>
    `;
    clear();
    container.insertAdjacentHTML('afterbegin', markup);
};

const renderError = function (message) {
    const markup = `
        <div class="error">
            <p>${message}</p>
        </div>
    `;
    clear();
    container.insertAdjacentHTML('afterbegin', markup);
};

const fetchAndRender = async function(title, url, request) {
    historyChange(title, url);
    await fetch(url, { method: `${request}` })
        .then(res => res.text())
        .then(data => {
            renderSpinner();
            render(data);
        })
        .catch(error => {
            renderError('Data nelze načíst.')
            console.error(error);
        })
};

const renderIndex = async function() {
    await fetch('/')
        .then(res => res.text())
        .then(historyChange('index', 'index', '/'))
        .then(clear())
};

//updating url in browser
const historyChange = function(title, url) {
    history.pushState( { page: `${title}` }, title, url );
};

//browser back and forward buttons
window.addEventListener('popstate', function() {
    const url = window.location.pathname;
    fetchAndRender('', url, 'GET');
});

nav.addEventListener('click', async (e) => {
    //index
    if (e.target.classList.contains('btn-index')) {
        renderIndex();
    };

    // list of persons
    if (e.target.classList.contains('btn-person-list')) {
        const url = `/pojistenci`;
        fetchAndRender('pojistenci', url, 'GET');
    };

    // list of insurances
    if (e.target.classList.contains('btn-insurance-list')) {
        const url = `/pojisteni`;
        fetchAndRender('pojisteni' ,url, 'GET');
    };

    //login form
    if (e.target.classList.contains('btn-login-form')) {
        const url = `/login`;
        fetchAndRender('login', url, 'GET');
    };

    //logout
    if (e.target.classList.contains('btn-logout')) {
        try {
            const res = await fetch('/logout', { method: 'DELETE' });
            if (!res.ok) {
                renderError('Odhlášení se nezdařilo.');
            } else {
                changeLogButton(false);
                renderIndex();
            }
        } catch (error) {
            renderError('Chyba na straně serveru')
        };
    };
});

container.addEventListener('click', async function(e) {
    //login
    if (e.target.classList.contains('btn-login')) {
        e.preventDefault();
        const data = {
            email: email.value,
            password: password.value,
        };

        try {
            const res = await fetch('/login', { 
                method: 'POST', 
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data) });
            if (!res.ok) {
                const errorData = await res.json();
                renderError(errorData.error);
                return;
            } else {
                renderIndex();
                changeLogButton(true);
            }
        } catch (error) {
            renderError('Chyba na straně serveru.');
        }
    };

    //register form
    if (e.target.classList.contains('btn-register-form')) {
        const url = `/register`;
        fetchAndRender('registrace', url, 'GET');
        };

    //register
    if (e.target.classList.contains('btn-register')) {
        const data = {
            email: email.value,
            password: password.value,
        };

        try {
            const res = await fetch('/register', { 
                method: 'POST', 
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data) });
            if (!res.ok) {
                const errorData = await res.json();
                renderError(errorData.error);
                return;
            } else {
                renderIndex();
                changeLogButton(false);

            }
        } catch (error) {
            renderError('Chyba na straně serveru.');
        }
    };

    //form for adding new person
    if (e.target.classList.contains('btn-person-form')) {
        const url = `/pojistenci/novy`;
        fetchAndRender('novy-pojistenec', url, 'GET');
    };

    //form for adding new insurance
    if (e.target.classList.contains('btn-insurance-form')) {
        const id = e.target.value;
        const url = `/pojistenci/${id}/nove-pojisteni`;
        fetchAndRender('nove-pojisteni', url, 'GET');
    };
    
    //detail of person
    if (e.target.classList.contains('btn-person-detail')) {
        const id = e.target.value;
        const url = `/pojistenci/${id}`;
        fetchAndRender('pojistenec', url, 'GET');
    };

    //detail of insurance
    if (e.target.classList.contains('btn-insurance-detail')) {
        const id = e.target.value;
        const url = `/pojisteni/${id}`;
        fetchAndRender('pojisteni', url, 'GET');
    };

    //save new person
    if (e.target.classList.contains('btn-person-new')) {
        
    };

    //save new insurance
    if (e.target.classList.contains('btn-insurance-new')) {

    };

    //edit person
    if (e.target.classList.contains('btn-person-edit')) {

    };

    //edit insurance
    if (e.target.classList.contains('btn-insurance-edit')) {

    };

    //delete person
    if (e.target.classList.contains('btn-person-delete')) {

    };

    //delete insurance
    if (e.target.classList.contains('btn-insurance-delete')) {

    };
});
