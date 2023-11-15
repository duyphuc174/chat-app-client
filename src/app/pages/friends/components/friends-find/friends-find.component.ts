import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FriendModel, FriendStatus } from '../../_models/friend.model';
import { FriendService } from '../../_services/friend.service';

@Component({
    selector: 'app-friends-find',
    templateUrl: './friends-find.component.html',
    styleUrls: ['./friends-find.component.scss'],
})
export class FriendsFindComponent implements OnInit {
    isLoadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    isLoading$: Observable<boolean> = this.isLoadingSubject.asObservable();

    friendsSubject: BehaviorSubject<FriendModel[]> = new BehaviorSubject<FriendModel[]>([]);
    friends$: Observable<FriendModel[]> = this.friendsSubject.asObservable();

    constructor(private friendService: FriendService) {}

    ngOnInit(): void {
        this.loadData();
    }

    loadData() {
        this.isLoadingSubject.next(true);
        this.friendService.getFriends().subscribe((res) => {
            if (res) {
                this.friendsSubject.next(this.friendService.friends);
            }
            this.isLoadingSubject.next(false);
        });
    }

    submitFriend(friend: FriendModel) {
        if (friend.friendStatus === FriendStatus.WAITING_FOR_ACCEPT) {
            this.friendService.deleteFriend(friend.user.id).subscribe((res) => {
                this.loadData();
            });
        }
        if (friend.friendStatus === FriendStatus.NO_RELATIVE) {
            this.friendService.addFriend(friend.user.id).subscribe((res) => {
                this.loadData();
            });
        }
    }
}
