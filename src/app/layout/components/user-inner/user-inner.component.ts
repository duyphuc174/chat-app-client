import { Component, OnInit } from '@angular/core';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/modules/auth';
import { UserModel } from 'src/app/modules/auth/_model/auth.model';
import { NotificationComponent } from 'src/app/modules/partials/notification/notification.component';
import { ChangePasswordModalComponent } from 'src/app/pages/profile/change-password-modal/change-password-modal.component';

@Component({
    selector: 'app-user-inner',
    templateUrl: './user-inner.component.html',
    styleUrls: ['./user-inner.component.scss'],
})
export class UserInnerComponent implements OnInit {
    user$: Observable<UserModel>;

    constructor(config: NgbDropdownConfig, private authService: AuthService, private bsModalService: BsModalService) {
        config.placement = 'end-bottom';
        config.autoClose = true;
    }

    ngOnInit(): void {
        this.user$ = this.authService.currentUserSubject.asObservable();
        // this.showChangePasswordModal();
    }

    showChangePasswordModal() {
        this.bsModalService.show(ChangePasswordModalComponent);
    }

    logout() {
        this.authService.logout();
    }
}
