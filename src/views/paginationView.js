import { View } from './view.js';

export class PaginationView extends View {
    _errorMessage = '';

    _generateMarkup() {
        return `
            <div class="pagination">
                <button class="btns btn-page-prev">
                    <span>předchozí</span>
                </button>
                <button class="btns btn-page-next">
                    <span>další</span>
                </button>
            </div>
        `
    };
};
