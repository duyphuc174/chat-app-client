import { Component } from '@angular/core';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/modules/auth';

@Component({
    selector: 'app-user-inner',
    templateUrl: './user-inner.component.html',
    styleUrls: ['./user-inner.component.scss'],
})
export class UserInnerComponent {
    constructor(config: NgbDropdownConfig, private authService: AuthService) {
        config.placement = 'end-bottom';
        config.autoClose = true;
    }

    logout() {
        this.authService.logout();
    }
}
