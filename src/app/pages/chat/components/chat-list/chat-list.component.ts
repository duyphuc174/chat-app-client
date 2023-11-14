import { Component } from '@angular/core';
import { AuthService } from 'src/app/modules/auth';
import { UserModel } from 'src/app/modules/auth/_model/auth.model';

@Component({
    selector: 'app-chat-list',
    templateUrl: './chat-list.component.html',
    styleUrls: ['./chat-list.component.scss'],
})
export class ChatListComponent {
    ownerId: number;

    constructor(private auth: AuthService) {
        this.ownerId = this.auth.currentUserValue.id;
    }
}
