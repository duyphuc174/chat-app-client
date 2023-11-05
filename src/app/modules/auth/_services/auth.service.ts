import { Injectable } from '@angular/core';
import { AuthHttpService } from './auth-http.service';
import { BehaviorSubject, Observable, catchError, finalize, map, of } from 'rxjs';
import { UserModel } from '../_model/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoading$: Observable<boolean> = this.isLoadingSubject.asObservable();

  currentUserSubject: BehaviorSubject<UserModel> = new BehaviorSubject<UserModel>(null);
  get currentUserValue(): UserModel {
    return this.currentUserSubject.value;
  }

  constructor(private authHttpService: AuthHttpService) { }

  login(body: {account: string, password: string}): Observable<any> {
    this.isLoadingSubject.next(true);
    return this.authHttpService.login(body).pipe(
      map((res) => {
        const user = new UserModel();
        user.setData(res.user)
        this.currentUserSubject.next(user);
        return user;
      }),
      catchError((err) => {
        return of(err);
      }),
      finalize(() => this.isLoadingSubject.next(false))
    )
  }
}
