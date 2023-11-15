import { Component, EventEmitter, Input, Output } from '@angular/core';
import { listReactions } from 'src/app/pages/chat/_models/chat.model';

@Component({
    selector: 'app-reaction',
    templateUrl: './reaction.component.html',
    styleUrls: ['./reaction.component.scss'],
})
export class ReactionComponent {
    @Output() sendReaction: EventEmitter<any> = new EventEmitter<any>();
    @Input() color: string = 'primary';
    reactions = listReactions;

    send(e) {
        this.sendReaction.emit(e);
    }
}
