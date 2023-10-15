import { View } from './view.js';

export class PersonCardView extends View {
    _errorMessage = 'Osobu nelze zobrazit.';

    _generateMarkup() {
        return `
            <div class="card">
                <div class="card-header">
                    <img class="profile-pic" src="/src/public/no_profile.jpg" alt="profile picture">
                    <div class="card-info">
                        <h3>jméno příjmení</h3>
                        <h4>nar. datum</h4>
                        <div class="card-contact">
                            <p><b>adresa </b>ulice, č.p., psč, město</p>
                            <p><b>email </b>email@email.cz</p>
                            <p><b>telefon </b>mobilní číslo</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card-btns">
                <button class="btn-edit btns" id="person-edit-btn">Upravit</button>
                <button class="btn-delete btns" id="person-delete-btn">Smazat</button>
            </div>

            <h3>Sjednané pojištění</h3>
            <table>
                <thead>
                    <tr>
                        <th>Pojištění</th>
                        <th>Částka</th>
                        <th>Předmět</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    ${this._data.insurance.map(this._generateMarkupInsurance).join('')} 
                </tbody>
            </table>
            <div class="btn-center">
                <button class="btn-add btns" id="insurance-add-btn">Přidat pojištění</button>
            </div>
        `
    };

    _generateMarkupInsurance(ins) {
        return `
            <tr>
                <td>${ins.name}</td>
                <td>${ins.value} Kč</td>
                <td>${ins.subject}</td>
                <td>
                    <button class="btn-submit-sm btns" id="insurance-detail-btn">Upravit</button>
                </td>
            </tr>
        `;
    };
};
