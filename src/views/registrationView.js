import { View } from './view.js';

export class RegistrationView extends View {
    _errorMessage = '';

    _generateMarkup() {
        return `
            <div class="login">
                <h3>Nový uživatel</h3>
                <form class="login-form" action="">
                    <input type="text" name="username" placeholder="email" required>
                    <input type="password" name="password" placeholder="heslo" required>
                    <button class="btn-submit btns">Registrovat se</button>
                </form>
            </div>
        `
    };
};
