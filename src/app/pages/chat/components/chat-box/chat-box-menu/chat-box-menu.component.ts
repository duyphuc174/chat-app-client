import { Component } from '@angular/core';

@Component({
  selector: 'app-chat-box-menu',
  templateUrl: './chat-box-menu.component.html',
  styleUrls: ['./chat-box-menu.component.scss']
})
export class ChatBoxMenuComponent {
  isShowMemberList: boolean = false;
  isShowFileStorage: boolean = false;
  isShowCustomization: boolean = false;
  isShowPrivacy: boolean = false;


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
}
