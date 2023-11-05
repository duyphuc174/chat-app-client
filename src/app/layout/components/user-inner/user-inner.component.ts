import { Component } from '@angular/core';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-user-inner',
    templateUrl: './user-inner.component.html',
    styleUrls: ['./user-inner.component.scss'],
})
export class UserInnerComponent {
    constructor(config: NgbDropdownConfig) {
        config.placement = 'end-bottom';
        config.autoClose = true;
    }
}
