import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
    selector: 'app-modal-header',
    templateUrl: './modal-header.component.html',
    styleUrls: ['./modal-header.component.scss'],
})
export class ModalHeaderComponent {
    @HostBinding('class') class = 'd-content';
    @Input() title: string;
    @Output() closeModal: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor(public bsModalRef: BsModalRef) {}

    close() {
        this.closeModal.emit(true);
    }
}
