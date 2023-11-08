import { Injectable } from '@angular/core';
import { AuthHttpService } from './auth-http.service';
import { BehaviorSubject, Observable, catchError, finalize, map, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ICreateUser, UserModel } from '../_model/auth.model';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

// const a = environment.appVersion;
// const b = environment.USERDATA_KEY;

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    authLocalStorageToken: string = 'user_token';

    isLoadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    isLoading$: Observable<boolean> = this.isLoadingSubject.asObservable();

    currentUserSubject: BehaviorSubject<UserModel> = new BehaviorSubject<UserModel>(null);
    get currentUserValue(): UserModel {
        return this.currentUserSubject.value;
    }

    constructor(private authHttpService: AuthHttpService, private router: Router, private cookie: CookieService) {}

    login(body: { account: string; password: string }): Observable<any> {
        this.isLoadingSubject.next(true);
        return this.authHttpService.login(body).pipe(
            map((res) => {
                const user = new UserModel();
                user.setData(res.user);
                this.currentUserSubject.next(user);
                this.setTokenToLocalStorage(res.access_token);
                return user;
            }),
            catchError((err) => {
                return of(err);
            }),
            finalize(() => {
                this.isLoadingSubject.next(false);
            }),
        );
    }

    register(body: ICreateUser): Observable<any> {
        this.isLoadingSubject.next(true);
        return this.authHttpService.register(body).pipe(
            map((res) => {
                this.isLoadingSubject.next(false);
                return res;
            }),
            catchError((err) => {
                return of(undefined);
            }),
            finalize(() => {
                this.isLoadingSubject.next(false);
            }),
        );
    }

    logout() {
        this.cookie.delete('user_token');
        localStorage.removeItem('user_token');
        this.router.navigate(['/auth/login']).then();
    }

    getUserByToken(): Observable<any> {
        const token = this.getTokenFromLocalStorage();
        if (!token) {
            return of(undefined);
        }
        this.isLoadingSubject.next(true);
        return this.authHttpService.getUserByToken(token).pipe(
            map((user) => {
                if (user) {
                    const u = new UserModel();
                    u.setData(user);
                    this.currentUserSubject.next(u);
                } else {
                    this.logout();
                }
                return user;
            }),
            finalize(() => this.isLoadingSubject.next(false)),
        );
    }

    private getTokenFromLocalStorage(): string {
        try {
            const token = localStorage.getItem(this.authLocalStorageToken);
            if (token) {
                return token;
            }
            return undefined;
        } catch {
            return undefined;
        }
    }

    private setTokenToLocalStorage(token): boolean {
        if (token) {
            localStorage.setItem(this.authLocalStorageToken, token);
            this.cookie.set(this.authLocalStorageToken, token);
            return true;
        }
        return false;
    }
}
