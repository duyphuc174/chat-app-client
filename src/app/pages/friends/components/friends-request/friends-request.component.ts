import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FriendModel } from '../../_models/friend.model';
import { FriendService } from '../../_services/friend.service';

@Component({
    selector: 'app-friends-request',
    templateUrl: './friends-request.component.html',
    styleUrls: ['./friends-request.component.scss'],
})
export class FriendsRequestComponent implements OnInit {
    friendsRequest: FriendModel[];

    isLoadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    isLoading$: Observable<boolean> = this.isLoadingSubject.asObservable();

    constructor(private friendService: FriendService) {}

    ngOnInit(): void {
        this.loadData();
    }

    loadData() {
        this.isLoadingSubject.next(true);
        this.friendService.getFriends().subscribe((res) => {
            if (res) {
                this.friendsRequest = this.friendService.friendsRequest;
            }
            this.isLoadingSubject.next(false);
        });
    }
}
