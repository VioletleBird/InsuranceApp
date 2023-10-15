import { View } from './view.js';

export class NewPersonView extends View {

    _generateMarkup() {
        return `
            <h2>Nový pojištěnec</h2>
            <form class="add-new-name action="">
                <div class="inputs">
                    <label for="name">Jméno</label>
                    <input type="text" id="name">
                </div>
                <div class="inputs">
                    <label for="last-name">Příjmení</label>
                    <input type="text" id="last-name">
                </div>
                <div class="inputs form-row">
                    <label for="birthDate">Datum narození</label>
                    <input type="text" id="birthDate" placeholder="DDMMRRRR">
                </div>
                <div class="inputs">
                    <label for="email">E-mail</label>
                    <input type="text" id="email">
                </div>
                <div class="inputs">
                    <label for="mobile">Telefon</label>
                    <input type="text" id="mobile" placeholder="+420">
                </div>
                <div class="inputs">
                    <label for="street">Ulice</label>
                    <input type="text" id="street">
                </div>
                <div class="inputs">
                    <label for="street-num">Č.p.</label>
                    <input type="text" id="street-num">
                </div>
                <div class="inputs">
                    <label for="zipcode">PSČ</label>
                    <input type="text" id="zipcode">
                </div>
                <div class="inputs">
                    <label for="city">Město</label>
                    <input type="text" id="city">
                </div>
                <button class="btn-submit btns" id="person-add-btn">Uložit</button>
            </form>
        `
    };
};
