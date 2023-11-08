import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-friends-item',
    templateUrl: './friends-item.component.html',
    styleUrls: ['./friends-item.component.scss'],
})
export class FriendsItemComponent {
    @Input() firstButtonTitle: string;
    @Input() secondButtonTitle: string;
    @Input() customClass: string = '';
    @Input() customBody: string = '';
    @Input() avatarSize: number = 50;
    @Output() clickFirstButton: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() clickSecondButton: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor(private router: Router) {}

    goToChat() {
        this.router.navigate(['chat/messages/4']).then();
    }

    clickFirstBtn() {
        this.clickFirstButton.emit(true);
    }

    clickSecondBtn() {
        this.clickSecondButton.emit(true);
        this.goToChat();
    }
}
