import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/modules/auth/_model/auth.model';

@Component({
    selector: 'app-chat-box',
    templateUrl: './chat-box.component.html',
    styleUrls: ['./chat-box.component.scss'],
})
export class ChatBoxComponent implements OnInit {
    user1: UserModel;
    user2: UserModel;
    data = [];
    messages = [
        {
            isOwner: false,
            messages: ['Xin chào', 'abbsbs?', 'hhhđ hshsh fyys gsdk hhss?'],
        },
        {
            isOwner: true,
            messages: [
                'isuuus hd hhhshs ggdgd',
                'jsy hsh gdbb jsycy',
                'isuuuo jjjshd tycys bsvgx',
                'Hudhh gsgst gcnsd gdhsjsf sjd',
            ],
        },
        {
            isOwner: false,
            messages: ['jdjjdjd ajjsh dhhsd?', 'Njdjd...', 'Njud i  dfdf fdf dsfg'],
        },
    ];

    isShowMenu: boolean = true;

    constructor(private router: Router) {}
    ngOnInit(): void {
        this.messages.reverse();

        this.user1 = new UserModel();
        this.user1.setData({
            id: 1,
            fullName: 'Nguyễn Duy Phúc',
            avatar: '../../../../../../assets/media/avatars/avt.jpg',
        });

        this.user2 = new UserModel();
        this.user2.setData({
            id: 2,
            fullName: 'Một ai đó ?',
            avatar: '../../../../../../assets/media/avatars/girl.jpg',
        });

        this.data = [
            {
                user: this.user1,
                messages: [
                    {
                        id: 1,
                        content: 'abcb',
                    },
                    {
                        id: 1,
                        content: 'abcb hhsj kks hdhg ôdid',
                    },
                    {
                        id: 1,
                        content: 'abcb hsh hjjs',
                    },
                ],
            },
            {
                user: this.user2,
                messages: [
                    {
                        id: 1,
                        content: 'ab đcdb  fff',
                    },
                    {
                        id: 1,
                        content: 'abc b',
                    },
                    {
                        id: 1,
                        content: 'abcb con sks fhh súii',
                    },
                ],
            },
            {
                user: this.user1,
                messages: [
                    {
                        id: 1,
                        content: 'abcb',
                    },
                    {
                        id: 1,
                        content: 'abcb',
                    },
                ],
            },
        ];
    }

    showMenu() {
        this.isShowMenu = !this.isShowMenu;
    }
}
