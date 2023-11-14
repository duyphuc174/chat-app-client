import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FriendModel } from '../../_models/friend.model';
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
                this.friendsSubject.next(res);
            }
            this.isLoadingSubject.next(false);
        });
    }
}
