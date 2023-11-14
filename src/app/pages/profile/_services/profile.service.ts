import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { UserModel } from 'src/app/modules/auth/_model/auth.model';
import { ProfileHttpService } from './profile-http.service';
import { IUserUpdate } from '../_models/profile.model';
import { FriendModel } from '../../friends/_models/friend.model';

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

    getUser(id: number): Observable<FriendModel> {
        return this.profileHttpService.getUser(id).pipe(
            map((res) => {
                const friend = new FriendModel();
                friend.setData(res.data);
                return friend;
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

    updateProfile(body: IUserUpdate): Observable<any> {
        return this.profileHttpService.updateProfile(body).pipe(
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

    changePassword(body): Observable<any> {
        return this.profileHttpService.changePassword(body).pipe(
            map((res) => {
                return res;
            }),
            catchError(() => {
                return of();
            }),
        );
    }
}
