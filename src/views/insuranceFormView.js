import { View } from './view.js';

export class NewInsuranceView extends View {
    _errorMessage = 'Formulář nelze zobrazit.';

    _generateMarkup() {
        return `
            <h2>Nové pojištění</h2>
            <form class="add-new-contract action="">
                <div class="inputs form-row">
                    <label for="form-type">Druh pojištění</label>
                    <select id="form-type">
                        <option value="nemovitost">pojištění nemovitosti</option>
                        <option value="domacnost">pojištění domácnosti</option>
                        <option value="odpovednost">pojištění odpovědnosti</option>
                        <option value="povinne">povinné ručení</option>
                        <option value="havarijni">havarijní pojištění</option>
                        <option value="cestovni">cestovní pojištění</option>
                        <option value="urazove">úrazové pojištění</option>
                        <option value="zivotni">pojištění odpovědnosti</option>
                    </select>
                </div>
                <div class="inputs">
                    <label for="value">Částka</label>
                    <input type="text" id="value">
                </div>
                <div class="inputs">
                    <label for="property">Předmět</label>
                    <input type="text" id="property">
                </div>
                <div class="inputs">
                    <label for="date-from">Platnost od</label>
                    <input type="date" id="date-from">
                </div>
                <div class="inputs">
                    <label for="date-to">Platnost do</label>
                    <input type="date">
                </div>
                <div class="inputs form-row">
                    <label for="risks">Rizika</label>
                    <input type="text" id="risks" class="input-wide">
                </div>
                <div class="inputs form-row">
                    <label for="notes">Poznámka</label>
                    <input type="text" id="notes" class="input-wide">
                </div>
                <button class="btn-submit btns" id="insurance-save-btn">Uložit</button>
            </form>
        `
    };
};
