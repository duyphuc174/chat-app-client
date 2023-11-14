import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-chat-image',
    templateUrl: './chat-image.component.html',
    styleUrls: ['./chat-image.component.scss'],
})
export class ChatImageComponent implements OnInit {
    @Input() image: string;
    @Input() size: number = 50;

    ngOnInit(): void {
        this.image = this.image ? this.image : './assets/media/avatars/group-avatar.jpg';
    }
}
