import { Component, HostBinding } from '@angular/core';

@Component({
    selector: 'app-friends-list',
    templateUrl: './friends-list.component.html',
    styleUrls: ['./friends-list.component.scss'],
})
export class FriendsListComponent {
    @HostBinding('class') class = 'd-content';
}