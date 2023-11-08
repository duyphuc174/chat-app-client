import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { UserModel } from 'src/app/modules/auth/_model/auth.model';
import { ProfileHttpService } from './profile-http.service';

@Injectable({
    providedIn: 'root',
})
export class ProfileService {
    constructor(private profileHttpService: ProfileHttpService) {}

    getUsers(): Observable<UserModel[]> {
        return this.profileHttpService.getUsers().pipe(
            map((users: UserModel[]) => {
                return users.map((user) => {
                    const u = new UserModel();
                    u.setData(user);
                    return u;
                });
            }),
            catchError(() => {
                return of([]);
            }),
        );
    }

    getUser(id: number): Observable<UserModel> {
        return this.profileHttpService.getUser(id).pipe(
            map((user) => {
                const u = new UserModel();
                u.setData(user.data);
                return u;
            }),
            catchError(() => {
                return of();
            }),
        );
    }

    updateAvatar(body): Observable<any> {
        return this.profileHttpService.updateAvatar(body).pipe(
            map((res) => {
                const user = new UserModel();
                user.setData(res.data);
                return user;
            }),
            catchError(() => {
                return of();
            }),
        );
    }
}
