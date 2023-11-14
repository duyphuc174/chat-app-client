import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ConversationModel } from '../../../_models/chat.model';
import { transformDateToText } from 'src/app/modules/partials/_models/partial.model';

@Component({
    selector: 'app-chat-list-item',
    templateUrl: './chat-list-item.component.html',
    styleUrls: ['./chat-list-item.component.scss'],
})
export class ChatListItemComponent {
    @Input() ownerId: number;
    @Input() conversation: ConversationModel;
    timeTransform = transformDateToText;

    constructor(private router: Router) {}

    navigateToMessageBox() {
        // this.router.navigate(['chat/'], { queryParams: { id: this.id } }).then();
    }
}
