import { View } from './view.js';

export class LoginView extends View {
    _errorMessage = '';

    _generateMarkup() {
        return `
            <div class="login">
                <h3>Pro zobrazení dat se přihlaste.</h3>
                <form class="login-form" action="">
                    <input type="text" name="username" placeholder="Username" required>
                    <input type="password" name="password" placeholder="Password" required>
                    <button class="btn-submit btns">Přihlásit se</button>
                </form>
                <p>Pokud ještě nejste uživatelem, registrujte se <span><button class="btns btn-submit-sm">ZDE</button></span></p>
            </div>
        `
    };
};
