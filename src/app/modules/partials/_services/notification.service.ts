import { Injectable } from '@angular/core';
import { NotificationHttpService } from './notification-http.service';
import { BehaviorSubject, Observable, catchError, map, of, tap } from 'rxjs';
import { NotificationModel } from '../_models/partial.model';

@Injectable({
    providedIn: 'root',
})
export class NotificationService {
    countSubject: BehaviorSubject<number> = new BehaviorSubject<number>(null);
    count: number = 0;

    get notReadNotificationCount() {
        return this.countSubject.value;
    }

    get noficationNotReadTotal() {
        return this.countSubject.value;
    }

    constructor(private notificationHttpService: NotificationHttpService) {}

    getNotifications(): Observable<any> {
        return this.notificationHttpService.getNotifications().pipe(
            tap((res) => {
                this.count =
                    res.data.filter((noti) => {
                        return !noti.isRead;
                    })?.length || 0;
                this.countSubject.next(this.count);
            }),
            map((res) => {
                const listNoti = res.data;
                return listNoti.map((noti) => {
                    const n = new NotificationModel();
                    n.setData(noti);
                    return n;
                });
            }),
            catchError(() => of()),
        );
    }

    markIsReadNotification(id: number): Observable<any> {
        return this.notificationHttpService.markIsReadNotification(id).pipe(
            map((res) => {
                return res;
            }),
            catchError(() => of()),
        );
    }
}
