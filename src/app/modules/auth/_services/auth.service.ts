import { Injectable } from '@angular/core';
import { AuthHttpService } from './auth-http.service';
import { BehaviorSubject, Observable, catchError, finalize, map, of } from 'rxjs';
import { UserModel } from '../_model/auth.model';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';

// const a = environment.appVersion;
// const b = environment.USERDATA_KEY;

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    authLocalStorageToken: string = 'v1.0-auth174';

    isLoadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    isLoading$: Observable<boolean> = this.isLoadingSubject.asObservable();

    currentUserSubject: BehaviorSubject<UserModel> = new BehaviorSubject<UserModel>(null);
    get currentUserValue(): UserModel {
        return this.currentUserSubject.value;
    }

    constructor(private authHttpService: AuthHttpService, private router: Router) {}

    login(body: { account: string; password: string }): Observable<any> {
        this.isLoadingSubject.next(true);
        return this.authHttpService.login(body).pipe(
            map((res) => {
                const user = new UserModel();
                user.setData(res.user);
                this.currentUserSubject.next(user);
                this.setAuthToLocalStorage(user);
                return user;
            }),
            catchError((err) => {
                return of(err);
            }),
            finalize(() => this.isLoadingSubject.next(false)),
        );
    }

    logout() {
        localStorage.removeItem(this.authLocalStorageToken);
        this.router.navigate(['/auth/login']).then();
    }

    private setAuthToLocalStorage(user: UserModel): boolean {
        if (user) {
            localStorage.setItem(this.authLocalStorageToken, JSON.stringify(user));
            return true;
        }
        return false;
    }

    getAuthFromLocalStorage(): UserModel {
        try {
            const value = localStorage.getItem(this.authLocalStorageToken);
            if (!value) {
                return undefined;
            }
            const user = JSON.parse(value) as UserModel;
            this.currentUserSubject.next(user);
            return user;
        } catch (error) {
            console.log(error);

            return undefined;
        }
    }
}
