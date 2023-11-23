import { Component, Input } from '@angular/core';
import { ConversationModel } from '../../../_models/chat.model';
import { Observable } from 'rxjs';
import { ChatService } from '../../../_services/chat.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/modules/auth';
import { UserModel } from 'src/app/modules/auth/_model/auth.model';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ChatConversationCreateComponent } from '../../chat-conversation-create/chat-conversation-create.component';

@Component({
    selector: 'app-chat-box-menu',
    templateUrl: './chat-box-menu.component.html',
    styleUrls: ['./chat-box-menu.component.scss'],
})
export class ChatBoxMenuComponent {
    @Input() conversation: ConversationModel;
    @Input() isLoading$: Observable<boolean>;
    isShowMemberList: boolean = false;
    isShowFileStorage: boolean = false;
    isShowCustomization: boolean = false;
    isShowPrivacy: boolean = false;
    userLogged: UserModel;

    constructor(
        private chatService: ChatService,
        private router: Router,
        private auth: AuthService,
        private bsModalService: BsModalService,
    ) {
        this.userLogged = auth.currentUserValue;
    }

    showMemberList() {
        this.isShowMemberList = !this.isShowMemberList;
    }

    showFileStorage() {
        this.isShowFileStorage = !this.isShowFileStorage;
    }

    showCustomization() {
        this.isShowCustomization = !this.isShowCustomization;
    }

    showPrivacy() {
        this.isShowPrivacy = !this.isShowPrivacy;
    }

    leave() {
        this.chatService.leaveGroup(this.conversation.id).subscribe((res) => {
            window.location.href = '/chat';
        });
    }

    addMember() {
        const initialState = {
            conversation: this.conversation,
        };
        this.bsModalService.show(ChatConversationCreateComponent, { initialState });
    }
}
