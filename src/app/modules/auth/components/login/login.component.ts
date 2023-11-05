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
    form!: UntypedFormGroup;
    isLoadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    isLoading$: Observable<boolean> = this.isLoadingSubject.asObservable();

    constructor(private fb: UntypedFormBuilder, private authService: AuthService, private router: Router) {}

    ngOnInit(): void {
        this.initForm();
    }

    initForm() {
        this.form = this.fb.group({
            account: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    show() {
        console.log(this.authService.currentUserValue);
        
    }

    submit() {
        const account = this.form.value.account;
        const password = this.form.value.password;
        this.authService.login({account, password}).pipe(first()).subscribe((res) => {
            if(res) {
                console.log(res);
                
                this.router.navigate(['/home']).then();
            }
        })
    }


}
