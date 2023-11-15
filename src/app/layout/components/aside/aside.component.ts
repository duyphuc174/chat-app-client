import { Component } from '@angular/core';
import { FriendService } from 'src/app/pages/friends/_services/friend.service';

@Component({
    selector: 'app-aside',
    templateUrl: './aside.component.html',
    styleUrls: ['./aside.component.scss'],
})
export class AsideComponent {
    friendRequestCount: number;

    constructor(private friendService: FriendService) {
        this.friendService.getFriends().subscribe((res) => {
            this.friendRequestCount = this.friendService.friendsRequest.length;
        });
    }

    mode: string = localStorage.getItem('app-mode') || 'light';
    changeMode() {
        if (this.mode === 'light') {
            this.mode = 'dark';
            localStorage.setItem('app-mode', this.mode);
        } else if (this.mode === 'dark') {
            this.mode = 'light';
            localStorage.setItem('app-mode', this.mode);
        }
        document.documentElement.setAttribute('data-bs-theme', this.mode);
    }
}
