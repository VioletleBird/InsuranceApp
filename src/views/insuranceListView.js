import { View } from './view.js';

export class InsuranceListView extends View {
    _errorMessage = 'Pojištění nenalezena.';

    _generateMarkup() {
        return `
            <div class="people">
                <h2>Pojištěnci</h2>
                <div class="table-center">
                    <div class="btn-center">
                        <button class="btn-add btns" id="person-add-btn">Přidat pojištěnce</button>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>Druh</th>
                                <th>Částka</th>
                                <th>Osoba</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${this._data.map(this._generateMarkupInsurance).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        `
    };

    _generateMarkupInsurance(ins) {
        return `
            <tr>
                <td>${ins.name}</td>
                <td>${ins.value}</td>
                <td>${ins.person.name} ${ins.person.lastName}</td>
                <td>
                    <button class="btn-submit-sm btns" id="person-detail-btn">detail</button>
                </td>
            </tr>
        `;
    };
};
