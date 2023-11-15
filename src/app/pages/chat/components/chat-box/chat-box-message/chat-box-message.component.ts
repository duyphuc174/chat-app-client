import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MessageContainer, MessageType } from '../../../_models/chat.model';
import { AuthService } from 'src/app/modules/auth';
import { UserModel } from 'src/app/modules/auth/_model/auth.model';
import { ChatService } from '../../../_services/chat.service';

@Component({
    selector: 'app-chat-box-message',
    templateUrl: './chat-box-message.component.html',
    styleUrls: ['./chat-box-message.component.scss'],
})
export class ChatBoxMessageComponent {
    @Output() sentMessageResponse: EventEmitter<any> = new EventEmitter<any>();
    @Input() id!: number;
    @Input() isOwner!: boolean;
    @Input() messages: any;
    @Input() data: any;
    @Input() messageContainer: MessageContainer;
    ownerId: number;
    messageType = MessageType;

    constructor(private auth: AuthService, private chatService: ChatService) {
        this.ownerId = this.auth.currentUserValue.id;
    }

    send(e) {
        this.sentMessageResponse.emit(e);
    }

    sendReaction(reaction) {
        // this.chatService
    }
}
