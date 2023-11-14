import { Component, Input } from '@angular/core';
import { MessageContainer } from '../../../_models/chat.model';
import { AuthService } from 'src/app/modules/auth';
import { UserModel } from 'src/app/modules/auth/_model/auth.model';

@Component({
    selector: 'app-chat-box-message',
    templateUrl: './chat-box-message.component.html',
    styleUrls: ['./chat-box-message.component.scss'],
})
export class ChatBoxMessageComponent {
    @Input() id!: number;
    @Input() isOwner!: boolean;
    @Input() messages: any;
    @Input() data: any;
    @Input() messageContainer: MessageContainer;
    ownerId: number;

    constructor(private auth: AuthService) {
        this.ownerId = this.auth.currentUserValue.id;
    }
}
