import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
    selector: 'app-modal-footer',
    templateUrl: './modal-footer.component.html',
    styleUrls: ['./modal-footer.component.scss'],
})
export class ModalFooterComponent {
    @HostBinding('class') class = 'd-content';
    @Input() buttonName: string;
    @Output() submitModal: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor(public bsModalRef: BsModalRef) {}

    submit() {
        this.submitModal.emit(true);
    }
}
