import { Component } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ChatConversationCreateComponent } from '../../chat-conversation-create/chat-conversation-create.component';

@Component({
    selector: 'app-chat-list-inbox',
    templateUrl: './chat-list-inbox.component.html',
    styleUrls: ['./chat-list-inbox.component.scss'],
})
export class ChatListInboxComponent {
    constructor(private bsModalService: BsModalService) {
        // this.openCreateChatConversationModal();
    }

    openCreateChatConversationModal() {
        this.bsModalService.show(ChatConversationCreateComponent);
    }
}
