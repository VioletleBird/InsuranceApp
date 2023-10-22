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
const userName = document.querySelector('.user-name');
const changeLogButton = async function(status) {
    if (status) {
        loginBtn.innerText = 'Odhlásit se';
        loginBtn.classList.remove('btn-login-form');
        loginBtn.classList.add('btn-logout');
        try {
            const res = await fetch('/user', { method: 'GET' });
            if (!res.ok) {
                const errorData = await res.json();
                return renderError(errorData.error);
            } else {
                const user = await res.json();
                userName.innerText = user.email;
            }
        } catch (error) {
            renderError('Chyba na straně serveru.');
        }
    } else {
        loginBtn.innerText = 'Přihlásit se';
        loginBtn.classList.remove('btn-logout');
        loginBtn.classList.add('btn-login-form');
        userName.innerText = '';
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

const renderError = function (message) {
    const markup = `
        <div class="error">
            <p>${message}</p>
        </div>
    `;
    clear();
    container.insertAdjacentHTML('afterbegin', markup);
};

const notifyBar = function (message) {
    if (!document.querySelector('.alert-box')) {
        const alertBox = document.createElement('div');
        alertBox.className = 'alert-box';
        alertBox.textContent = `${message}`;

        const mainElement = document.querySelector('main');
        mainElement.parentNode.insertBefore(alertBox, mainElement);
  
        setTimeout(function () {
            alertBox.style.display = 'none';
            alertBox.remove();
        }, 3000);
    }
};

const getAndRender = async function(title, url) {
    historyChange(title, url);
    await fetch(url, { method: 'GET' })
        .then(res => res.text())
        .then(data => {
            render(data);
        })
        .catch(error => {
            renderError('Data nelze načíst.')
        })
};

const removeEmptyProperties = function(obj) {
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
                removeEmptyProperties(obj[key]);
                if (Object.keys(obj[key]).length === 0) {
                    delete obj[key];
                }
            } else if (obj[key] === '') {
                delete obj[key];
            }
        }
    }
};

const handleFormSubmit = async function(e, url, method, resource) {
    e.preventDefault();
        let newData = {};
        if (resource === 'pojistenci') {
            newData = {
                firstName: firstName.value,
                lastName: lastName.value,
                birthDate: birthDate.value,
                email: email.value,
                mobile: mobile.value,
                address: [ 
                    street.value,
                    streetNum.value, 
                    zipcode.value,
                    city.value,
                ]
            };
        } else if (resource === 'pojisteni') {
            newData = {
                insType: insType.value,
                insValue: insValue.value,
                subject: subject.value,
                fromDate: fromDate.value,
                toDate: toDate.value,
                risks: risks.value,
                notes: notes.value
            };
        } else {
            renderError('Neplatné údaje.');
        };
        removeEmptyProperties(newData);

    try {
        const res = await fetch(url, {
            method: `${method}`,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newData),
        });
        if (!res.ok) {
            renderError('Neplatné údaje.')
        } else {
            const newObject = await res.json();
            const newObjectId = newObject._id;
            getAndRender(resource, `/${resource}/${newObjectId}`);
            notifyBar('Data uložena')
        }
    } catch (error) {
        renderError('Chyba na straně serveru.');
    }
};

const handleDelete = async function(e, resource) {
    const id = e.target.value;
    const url = `/${resource}/${id}`;
    try {
        const res = await fetch(url, { method: 'DELETE' });
        if (!res.ok) {
            return renderError('Data se nepodařilo smazat.');
        };
        getAndRender(resource, `/${resource}`);
        notifyBar('Data vymazána')
    } catch (error) {
        renderError('Chyba na straně serveru.');
    }
};

const renderIndex = async function() {
    await fetch('/')
        .then(res => res.text())
        .then(() => {
            renderSpinner();
            historyChange('', '', '/')
        })
        .then(clear())
};

const handleAuthentication = async function(e, action) {
    e.preventDefault();
    const data = {
        email: email.value,
        password: password.value,
    };

    try {
        const res = await fetch(`/${action}`, { 
            method: 'POST', 
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        });

        if (!res.ok) {
            const errorData = await res.json();
            renderError(errorData.error);
            return;
        } else {
            renderIndex();
            changeLogButton(action === 'login')
        }
    } catch (error) {
        renderError('Chyba na straně serveru.');
    }
};


//updating url in browser
const historyChange = function(title, url) {
    history.pushState( { page: `${title}` }, title, url );
};

//browser back and forward buttons
window.addEventListener('popstate', function() {
    const url = window.location.pathname;
    getAndRender('', url);
});

nav.addEventListener('click', async (e) => {
    //index
    if (e.target.classList.contains('btn-index')) {
        renderIndex();
    };
    // list of persons
    if (e.target.classList.contains('btn-person-list')) {
        getAndRender('pojistenci', '/pojistenci');
    };
    // list of insurances
    if (e.target.classList.contains('btn-insurance-list')) {
        getAndRender('pojisteni', '/pojisteni');
    };
    //login form
    if (e.target.classList.contains('btn-login-form')) {
        getAndRender('login', '/login');
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
            renderError('Chyba na straně serveru.')
        };
    };
});

container.addEventListener('click', async function(e) {
    //login
    if (e.target.classList.contains('btn-login')) {
        handleAuthentication(e, 'login');
    };
    //register form
    if (e.target.classList.contains('btn-register-form')) {
        getAndRender('registrace', '/register');
    };
    //register
    if (e.target.classList.contains('btn-register')) {
        handleAuthentication(e, 'register');
    };
    //form for adding new person
    if (e.target.classList.contains('btn-person-form')) {
        getAndRender('novy-pojistenec', '/pojistenci/novy');
    };
    //form for adding new insurance
    if (e.target.classList.contains('btn-insurance-form')) {
        getAndRender('nove-pojisteni', `/pojistenci/${e.target.value}/nove-pojisteni`);
    };
    //detail of person
    if (e.target.classList.contains('btn-person-detail')) {
        getAndRender('pojistenec', `/pojistenci/${e.target.value}`);
    };
    //detail of insurance
    if (e.target.classList.contains('btn-insurance-detail')) {
        getAndRender('pojisteni', `/pojisteni/${e.target.value}`);
    };
    //save new person
    if (e.target.classList.contains('btn-person-new')) {
        handleFormSubmit(e, '/pojistenci/novy', 'POST', 'pojistenci');
    };
   //save new insurance -OK
    if (e.target.classList.contains('btn-insurance-new')) {
        handleFormSubmit(e, `/pojistenci/${e.target.value}/nove-pojisteni`, 'POST', 'pojisteni');
    };
    //edit person form -OK
    if (e.target.classList.contains('btn-person-edit-form')) {
        getAndRender('edit', `/pojistenci/${e.target.value}/edit`);
    };
    //edit person
    if (e.target.classList.contains('btn-person-edit')) {
        handleFormSubmit(e, `/pojistenci/${e.target.value}/edit`, 'PUT', 'pojistenci');
    };
    //edit insurance form
    if (e.target.classList.contains('btn-insurance-edit-form')) {
        getAndRender('edit', `/pojisteni/${e.target.value}/edit`);
    };
    //edit insurance
    if (e.target.classList.contains('btn-insurance-edit')) {
        handleFormSubmit(e, `/pojisteni/${e.target.value}/edit`, 'PUT', 'pojisteni');
    };
    //delete person -OK
    if (e.target.classList.contains('btn-person-delete')) {
        handleDelete(e, 'pojistenci')
    };
    //delete insurance -OK
    if (e.target.classList.contains('btn-insurance-delete')) {
        handleDelete(e, 'pojisteni')
    };
});
