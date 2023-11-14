import { Injectable } from '@angular/core';
import { FriendHttpService } from './friend-http.service';
import { BehaviorSubject, Observable, catchError, map, of, tap } from 'rxjs';
import { FriendModel, FriendStatus } from '../_models/friend.model';
import { UserModel } from 'src/app/modules/auth/_model/auth.model';

@Injectable({
    providedIn: 'root',
})
export class FriendService {
    friendsRequestSubject: BehaviorSubject<FriendModel[]> = new BehaviorSubject<FriendModel[]>([]);
    friendsListSubject: BehaviorSubject<FriendModel[]> = new BehaviorSubject<FriendModel[]>([]);

    get friendsRequest() {
        return this.friendsRequestSubject.value;
    }

    get friendsList() {
        return this.friendsListSubject.value;
    }

    constructor(private friendHttpService: FriendHttpService) {}

    getFriends(): Observable<FriendModel[]> {
        return this.friendHttpService.getFriends().pipe(
            tap((res) => {
                const data = res.map((r) => {
                    const f = new FriendModel();
                    f.setData(r);
                    return f;
                });
                const frRequest = data.filter((d) => {
                    return d.friendStatus === FriendStatus.GET_AN_INVITATION;
                });
                this.friendsRequestSubject.next(frRequest);

                const frList = data.filter((d) => {
                    return d.friendStatus === FriendStatus.ACCEPTED;
                });
                this.friendsListSubject.next(frList);
            }),
            map((res) => {
                return res.map((r) => {
                    const friend = new FriendModel();
                    friend.setData(r);
                    return friend;
                });
            }),
            catchError(() => {
                return of();
            }),
        );
    }

    addFriend(id: number): Observable<any> {
        return this.friendHttpService.addFriend(id).pipe(
            map((res) => {
                if (!res.status) {
                    return of(true);
                }
                return of(false);
            }),
            catchError(() => of(false)),
        );
    }

    acceptFriend(id: number): Observable<any> {
        return this.friendHttpService.acceptFriend(id).pipe(
            map((res) => {
                if (!res.status) {
                    return of(true);
                }
                return of(false);
            }),
            catchError(() => of(false)),
        );
    }
}
