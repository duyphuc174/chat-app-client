import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-search-input',
    templateUrl: './search-input.component.html',
    styleUrls: ['./search-input.component.scss'],
})
export class SearchInputComponent {
    @Input() placeholder: string = 'Tìm kiếm...';
    @Input() customClass: string = 'border-gray-300 bg-gray-300 w-100 rounded-2 ps-12 py-3 pe-3 fs-4';
    @Output() searchChange: EventEmitter<string> = new EventEmitter<string>();

    search($event) {
        this.searchChange.emit($event.target.value);
    }
}
