import { Component, Input } from '@angular/core';

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
}
