import { Injectable } from '@angular/core';
import { FriendHttpService } from './friend-http.service';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class FriendService {
    constructor(private friendHttpService: FriendHttpService) {}

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
