import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Observable, first } from 'rxjs';
import { AuthService } from '../../_services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
    form: UntypedFormGroup;
    isLoadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    isLoading$: Observable<boolean> = this.isLoadingSubject.asObservable();

    get controls() {
        return this.form.controls;
    }

    constructor(private fb: UntypedFormBuilder, private authService: AuthService, private router: Router) {}

    ngOnInit(): void {
        this.initForm();
    }

    initForm() {
        this.form = this.fb.group({
            account: [
                '',
                Validators.compose([
                    Validators.required,
                    Validators.email,
                    Validators.minLength(6),
                    Validators.maxLength(50),
                ]),
            ],
            password: [
                '',
                Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(50)]),
            ],
        });
    }

    show() {
        console.log(this.authService.currentUserValue);
    }

    submit() {
        this.isLoadingSubject.next(true);
        const account = this.form.value.account;
        const password = this.form.value.password;
        this.authService.login({ account, password }).subscribe((res) => {
            if (res) {
                this.router.navigate(['/home']).then();
                this.isLoadingSubject.next(false);
            }
        });
    }
}
