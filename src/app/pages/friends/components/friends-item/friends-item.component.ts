import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { FriendModel, FriendStatus, getTextFriendStatus } from '../../_models/friend.model';

@Component({
    selector: 'app-friends-item',
    templateUrl: './friends-item.component.html',
    styleUrls: ['./friends-item.component.scss'],
})
export class FriendsItemComponent implements OnInit, OnChanges {
    @Input() friend: FriendModel;
    @Input() firstButtonTitle: string;
    @Input() secondButtonTitle: string;
    @Input() customClass: string = '';
    @Input() customBody: string = '';
    @Input() avatarSize: number = 50;
    @Output() clickFirstButton: EventEmitter<any> = new EventEmitter<any>();
    @Output() clickSecondButton: EventEmitter<any> = new EventEmitter<any>();
    friendStatus = FriendStatus;

    constructor(private router: Router) {}

    ngOnInit(): void {}

    goToChat() {
        // this.router.navigate(['chat/messages/4']).then();
    }

    clickFirstBtn() {
        this.clickFirstButton.emit(this.friend);
    }

    clickSecondBtn() {
        this.clickSecondButton.emit(this.friend);
        // this.goToChat();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (this.friend.friendStatus) {
            this.firstButtonTitle = getTextFriendStatus(this.friend.friendStatus);
        }
    }
}
