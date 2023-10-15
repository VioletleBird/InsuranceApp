import { View } from './view.js';

export class PersonsListView extends View {
    _errorMessage = '';

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
                                <th>Jméno</th>
                                <th>Datum narození</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            ${this._data.map(this._generateMarkupPerson).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        `
    };

    _generateMarkupPerson(person) {
        return `
            <tr>
                <td>${person.name} ${person.lastName}</td>
                <td>${person.birthDate}</td>
                <td>
                    <button class="btn-submit-sm btns" id="person-detail-btn">detail</button>
                </td>
            </tr>
        `;
    };
};
