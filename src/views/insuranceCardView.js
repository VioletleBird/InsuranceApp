import { View } from './view.js';

export class InsuranceCardView extends View {
    _errorMessage = 'Pojištění nelze zobrazit.';

    _generateMarkup() {
        return `
            <div class="card">
                <div class="card-insurance">
                    <div class="card-info">
                        <h4>${this._data.person.name} ${this._data.person.lastName}</h4>
                        <p>${this._data.person.birthDate}</p>
                    </div>
                    <button class="btn-submit btns" id="person-detail-btn">detail pojištěnce</button>
                </div>

                <h3>Sjednané pojištění</h3>
                <div class="card-details">
                    <p><b>Hodnota pojistky: </b>${this._data.value} Kč</p>
                    <p><b>Objekt pojištění: </b>${this._data.subject}</p>
                    <p><b>Rizika: </b>${this._data.risks}</p>
                    <p><b>Pojistné události: </b>${this._data.events}</p>
                    <br>
                    <p><b>Poznámky: </b>${this._data.notes}</p>
                </div>

                <div class="card-btns">
                    <button class="btn-edit btns" id="person-edit-btn">Upravit</button>
                    <button class="btn-delete btns" id="person-delete-btn">Smazat</button>
                </div>
            </div>
        `
    };
};
