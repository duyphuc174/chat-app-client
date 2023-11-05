import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatRoutingModule } from './chat-routing.module';
import { ChatComponent } from './chat.component';
import { ChatListComponent } from './components/chat-list/chat-list.component';
import { ChatListInboxComponent } from './components/chat-list/chat-list-inbox/chat-list-inbox.component';
import { ChatListRequestComponent } from './components/chat-list/chat-list-request/chat-list-request.component';
import { ChatBoxComponent } from './components/chat-box/chat-box.component';
import { PartialModule } from 'src/app/modules/partials/partial.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { ChatListItemComponent } from './components/chat-list/chat-list-item/chat-list-item.component';
import { RouterModule } from '@angular/router';
import { ChatBoxMessageComponent } from './components/chat-box/chat-box-message/chat-box-message.component';
import { ChatBoxMenuComponent } from './components/chat-box/chat-box-menu/chat-box-menu.component';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { ChatConversationCreateComponent } from './components/chat-conversation-create/chat-conversation-create.component';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
    declarations: [
        ChatComponent,
        ChatListComponent,
        ChatListInboxComponent,
        ChatListRequestComponent,
        ChatBoxComponent,
        ChatListItemComponent,
        ChatBoxMessageComponent,
        ChatBoxMenuComponent,
        ChatConversationCreateComponent,
    ],
    imports: [
        CommonModule,
        ChatRoutingModule,
        PartialModule,
        NgSelectModule,
        RouterModule,
        NgbTooltipModule,
        ModalModule,
    ],
})
export class ChatModule {}
