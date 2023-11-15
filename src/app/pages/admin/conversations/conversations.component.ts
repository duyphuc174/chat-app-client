import { Component, OnInit } from '@angular/core';
import { ConversationModel } from '../../chat/_models/chat.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
    selector: 'app-conversations',
    templateUrl: './conversations.component.html',
    styleUrls: ['./conversations.component.scss'],
})
export class ConversationsComponent implements OnInit {
    usersSubject: BehaviorSubject<ConversationModel[]> = new BehaviorSubject<ConversationModel[]>([]);
    users$: Observable<ConversationModel[]> = this.usersSubject.asObservable();

    constructor() {}

    ngOnInit(): void {
        this.loadData();
    }

    loadData() {}
}
