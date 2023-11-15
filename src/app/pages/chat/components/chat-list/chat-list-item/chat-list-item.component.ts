import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConversationModel } from '../../../_models/chat.model';
import { transformDateToText } from 'src/app/modules/partials/_models/partial.model';
import { AuthService } from 'src/app/modules/auth';

@Component({
    selector: 'app-chat-list-item',
    templateUrl: './chat-list-item.component.html',
    styleUrls: ['./chat-list-item.component.scss'],
})
export class ChatListItemComponent implements OnChanges {
    @Input() ownerId: number;
    @Input() conversation: ConversationModel;
    id: number;
    routerLink: string;
    timeTransform = transformDateToText;

    constructor(private router: Router, private auth: AuthService) {}

    navigateToMessageBox() {
        // this.router.navigate(['chat/'], { queryParams: { id: this.id } }).then();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (this.conversation) {
            if (this.conversation.type === 'single') {
                const user = this.conversation.members.find((u) => u.user.id !== this.auth.currentUserValue.id);
                this.id = user.user.id;
                this.routerLink = '/chat/messages/single/' + this.id;
            } else {
                this.id = this.conversation.id;
                this.routerLink = '/chat/messages/' + this.id;
            }
            console.log(this.id);
        }
    }
}
