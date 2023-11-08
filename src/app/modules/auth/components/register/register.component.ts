import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../_services/auth.service';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ConfirmPasswordValidator } from './confirm-password.validator';
import { ICreateUser } from '../../_model/auth.model';
import * as moment from 'moment';
import { eightYearsOldValidator } from './age.validator';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
    hasError: boolean = false;
    form!: UntypedFormGroup;
    isLoadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    isLoading$: Observable<boolean> = this.isLoadingSubject.asObservable();

    get controls() {
        return this.form.controls;
    }

    constructor(private auth: AuthService, private fb: UntypedFormBuilder, private router: Router) {}

    ngOnInit(): void {
        this.initForm();
    }

    initForm() {
        this.form = this.fb.group(
            {
                account: [
                    '',
                    Validators.compose([
                        Validators.required,
                        Validators.minLength(3),
                        Validators.maxLength(50),
                        Validators.email,
                    ]),
                ],
                password: [
                    '',
                    Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(16)]),
                ],
                cPassword: [
                    '',
                    Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(16)]),
                ],
                name: [
                    '',
                    Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
                ],
                birthday: ['', Validators.required],
            },
            {
                validator: ConfirmPasswordValidator.MatchPassword,
            },
        );
    }

    submit() {
        this.isLoadingSubject.next(true);
        this.hasError = false;
        const result: {
            [key: string]: string;
        } = {};
        Object.keys(this.controls).forEach((key) => {
            result[key] = this.controls[key].value;
        });

        let newUser: ICreateUser = {
            fullName: result.name,
            password: result.password,
            account: result.account,
            password_confirmation: result.cPassword,
            dateOfBirth: moment(result.birthday).format('DD-MM-YYYY'),
        };

        this.auth.register(newUser).subscribe((res) => {
            if (res) {
                this.auth.login({ account: newUser.account, password: newUser.password }).subscribe((res) => {
                    this.router.navigate(['chat']).then();
                });
                this.isLoadingSubject.next(false);
            } else {
                this.hasError = true;
            }
        });
    }
}
