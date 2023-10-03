import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.scss']
})
export class ChatBoxComponent implements OnInit{
  messages = [
    {
      isOwner: false,
      messages:[
        'Xin chào',
        'Cậu đang làm gì đấy?',
        'Nói chuyện một chút được không?'
      ]
    },
    {
      isOwner: true,
      messages: [
        'Tất nhiên rồi',
        'Tôi đang rất rảnh',
        'Bạn có điều gì muốn nói',
        'Hãy nói đi'
      ]
    },
    {
      isOwner: false,
      messages: [
        'Cậu ăn cơm chưa?',
        'Nếu chưa thì...',
        'Nhà tôi bán cơm ship toàn Hà Nội'
      ]
    }
  ]

  isShowMenu: boolean = true;
  ngOnInit(): void {
    this.messages.reverse();
  }

  showMenu() {
    this.isShowMenu = !this.isShowMenu;
  }
}
