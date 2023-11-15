import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { UserModel } from 'src/app/modules/auth/_model/auth.model';
import { ProfileService } from '../_services/profile.service';
import { IUserUpdate } from '../_models/profile.model';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AuthService } from 'src/app/modules/auth';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
    selector: 'app-profile-update-modal',
    templateUrl: './profile-update-modal.component.html',
    styleUrls: ['./profile-update-modal.component.scss'],
})
export class ProfileUpdateModalComponent implements OnInit {
    userLogged: UserModel;
    form: UntypedFormGroup;

    isLoadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    isLoading$: Observable<boolean> = new Observable<boolean>();

    constructor(
        private fb: UntypedFormBuilder,
        private profileService: ProfileService,
        public bsModelRef: BsModalRef,
        private auth: AuthService,
    ) {}

    ngOnInit(): void {
        this.initForm();
    }

    initForm() {
        this.form = this.fb.group({
            fullName: [
                this.userLogged.name,
                Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
            ],
            dateOfBirth: [new Date(this.userLogged.birthday), Validators.compose([Validators.required])],
            description: [
                this.userLogged.description,
                Validators.compose([Validators.required, Validators.maxLength(250)]),
            ],
        });
    }

    submit() {
        this.isLoadingSubject.next(true);
        const formValue = this.form.value;
        const newUserInfo: IUserUpdate = {
            fullName: formValue.fullName,
            dateOfBirth: moment(formValue.dateOfBirth).format('DD-MM-YYYY'),
            description: formValue.description,
        };

        this.profileService.updateProfile(newUserInfo).subscribe((res) => {
            if (res) {
                this.auth.currentUserSubject.next(res);
                this.bsModelRef.hide();
            }
            this.isLoadingSubject.next(false);
        });
    }
}
