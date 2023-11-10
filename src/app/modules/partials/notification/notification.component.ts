import { Component, HostBinding, OnInit } from '@angular/core';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { NotificationService } from '../_services/notification.service';
import { PusherService } from '../_services/pusher.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { NotificationModel, transformDateToText } from '../_models/partial.model';
import { AuthService } from '../../auth';
import { UserModel } from '../../auth/_model/auth.model';

@Component({
    selector: 'app-notification',
    templateUrl: './notification.component.html',
    styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnInit {
    @HostBinding('class') class = 'd-content';
    menuIsOpen: boolean = false;
    pusherChannelName: string = 'notifications';
    pusherChannelEvents: string = '';
    userLogged: UserModel;

    isLoadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    isLoading$ = this.isLoadingSubject.asObservable();

    notificationsSubject: BehaviorSubject<NotificationModel[]> = new BehaviorSubject<NotificationModel[]>([]);
    notifications$: Observable<NotificationModel[]> = this.notificationsSubject.asObservable();
    notificationNotReadTotal: number;

    transformDate = transformDateToText;

    constructor(
        config: NgbDropdownConfig,
        private notificationService: NotificationService,
        private pusherService: PusherService,
        private auth: AuthService,
    ) {
        config.placement = 'end-bottom';
        config.autoClose = true;
        this.loadPusher();
    }

    ngOnInit(): void {
        this.isLoadingSubject.next(true);
        this.notificationService.getNotifications().subscribe((res) => {
            if (res) {
                this.notificationsSubject.next(res);
                this.notificationNotReadTotal = this.notificationService.noficationNotReadTotal;
                this.isLoadingSubject.next(false);
            }
        });
    }

    loadPusher() {
        this.pusherService.setChannel(this.pusherChannelName);
        this.userLogged = this.auth.currentUserValue;
        const id = this.userLogged.id;
        this.pusherChannelEvents = `new-notification-${this.userLogged.id}`;
        this.pusherService.bind(this.pusherChannelEvents, (res) => {
            if (res) {
                const newNotification = new NotificationModel();
                newNotification.setData(res.message);
                this.notificationNotReadTotal++;
                this.notificationsSubject.next([newNotification, ...this.notificationsSubject.value]);
            }
        });
    }
}
