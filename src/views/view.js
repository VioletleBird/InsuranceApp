export class View {
        _data;
        _parentElement = document.querySelector('.container');

    addHandlerRender(handler) {
        ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, handler));
      }

    _clear() {
        this._parentElement.innerHTML = '';
    };

    renderSpinner() {
        const markup = `
            <div class="spinner">
                <svg>
                    <use href=""></use>
                </svg>
              </div>
        `;
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    };

    renderError(message = this._message) {
        const markup = `
            <div class="error">
                <p>${message}</p>
            </div>
        `;
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    };

    render(data, render = true) {
        if (!data || data.length === 0) {
            return this.renderError();
        };

        this._data = data;
        const markup = this._generateMarkup();
    
        if (!render) return markup;

        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    };
};
