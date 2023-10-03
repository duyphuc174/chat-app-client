import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat-list-item',
  templateUrl: './chat-list-item.component.html',
  styleUrls: ['./chat-list-item.component.scss']
})
export class ChatListItemComponent {
  @Input() id!: number;

  constructor(private router: Router) {
    
  }

  navigateToMessageBox() {
    this.router.navigate(['chat/'], {queryParams: {id: this.id}}).then();
  }
}