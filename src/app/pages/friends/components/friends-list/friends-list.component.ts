import { Component, HostBinding } from '@angular/core';
import { FriendModel } from '../../_models/friend.model';
import { FriendService } from '../../_services/friend.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
    selector: 'app-friends-list',
    templateUrl: './friends-list.component.html',
    styleUrls: ['./friends-list.component.scss'],
})
export class FriendsListComponent {
    @HostBinding('class') class = 'd-content';
    friendsList: FriendModel[];

    isLoadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    isLoading$: Observable<boolean> = this.isLoadingSubject.asObservable();

    constructor(private friendService: FriendService) {
        this.loadData();
    }

    loadData() {
        this.isLoadingSubject.next(true);
        this.friendService.getFriends().subscribe((res) => {
            if (res) {
                this.friendsList = this.friendService.friendsList;
            }
            this.isLoadingSubject.next(false);
        });
    }
}
