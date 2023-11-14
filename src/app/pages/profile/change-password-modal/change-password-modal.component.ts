import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ConfirmPasswordValidator } from 'src/app/modules/auth/components/register/confirm-password.validator';
import { ProfileService } from '../_services/profile.service';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
    selector: 'app-change-password-modal',
    templateUrl: './change-password-modal.component.html',
    styleUrls: ['./change-password-modal.component.scss'],
})
export class ChangePasswordModalComponent implements OnInit {
    form: UntypedFormGroup;

    get controls() {
        return this.form.controls;
    }

    constructor(
        private fb: UntypedFormBuilder,
        private profileService: ProfileService,
        public bsModalRef: BsModalRef,
    ) {}

    ngOnInit(): void {
        this.initForm();
    }

    initForm() {
        this.form = this.fb.group(
            {
                oldPassword: [
                    '',
                    Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(16)]),
                ],
                password: [
                    '',
                    Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(16)]),
                ],
                cPassword: [
                    '',
                    Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(16)]),
                ],
            },
            {
                validator: ConfirmPasswordValidator.MatchPassword,
            },
        );
    }

    submit() {
        const formValue = this.form.value;
        const oldPassword = formValue.oldPassword;
        const newPassword = formValue.password;

        this.profileService
            .changePassword({ current_password: oldPassword, new_password: newPassword })
            .subscribe((res) => {
                console.log(res);
                this.bsModalRef?.hide();
            });
    }
}
