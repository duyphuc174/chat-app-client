import { Component, HostBinding } from '@angular/core';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-notification',
    templateUrl: './notification.component.html',
    styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent {
    @HostBinding('class') class = 'd-content';
    menuIsOpen: boolean = false;

    constructor(config: NgbDropdownConfig) {
        config.placement = 'end-bottom';
        config.autoClose = true;
    }
}
