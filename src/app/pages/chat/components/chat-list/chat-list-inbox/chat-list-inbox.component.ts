import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ChatConversationCreateComponent } from '../../chat-conversation-create/chat-conversation-create.component';
import { BehaviorSubject, Observable } from 'rxjs';
import { ConversationModel } from '../../../_models/chat.model';
import { ChatService } from '../../../_services/chat.service';
import { AuthService } from 'src/app/modules/auth';
import { PusherService } from 'src/app/modules/partials/_services/pusher.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-chat-list-inbox',
    templateUrl: './chat-list-inbox.component.html',
    styleUrls: ['./chat-list-inbox.component.scss'],
})
export class ChatListInboxComponent implements OnInit {
    conversationsSubject: BehaviorSubject<ConversationModel[]> = new BehaviorSubject<ConversationModel[]>([]);
    conversation$: Observable<ConversationModel[]> = this.conversationsSubject.asObservable();

    isLoadSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    isLoading$: Observable<boolean> = this.isLoadSubject.asObservable();
    ownerId: number;

    pusherChannelName: string = 'conversations';
    pusherChannelEvents: string = '';

    constructor(
        private bsModalService: BsModalService,
        private chatService: ChatService,
        private auth: AuthService,
        private pusherService: PusherService,
        private router: Router,
    ) {
        // this.openCreateChatConversationModal();
        this.ownerId = this.auth.currentUserValue.id;
        this.loadPusher();
    }

    ngOnInit(): void {
        this.loadData();
    }

    loadData() {
        this.isLoadSubject.next(true);
        this.chatService.getConversations().subscribe((res) => {
            if (res) {
                this.conversationsSubject.next(res);
                this.router.navigate([`chat/messages/${res[0].id}`]);
            }
            this.isLoadSubject.next(false);
        });
    }

    openCreateChatConversationModal() {
        this.bsModalService.show(ChatConversationCreateComponent);
    }

    loadPusher() {
        this.pusherService.setChannel(this.pusherChannelName);
        this.pusherChannelEvents = `new-conversation-${this.ownerId}`;
        this.pusherService.bind(this.pusherChannelEvents, (res) => {
            let conversations = this.conversationsSubject.value;
            const conver = new ConversationModel();
            conver.setData(res.data);
            const converFind = conversations.find((conv) => conv.id === conver.id);
            conversations = conversations.filter((item) => item.id !== converFind.id);
            conversations.unshift(conver);
            this.conversationsSubject.next(conversations);
        });
    }
}
