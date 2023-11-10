import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/modules/auth';

@Component({
    selector: 'app-friends',
    templateUrl: './friends.component.html',
    styleUrls: ['./friends.component.scss'],
})
export class FriendsComponent implements OnInit {
    constructor(private auth: AuthService) {}

    ngOnInit(): void {}

    click() {
        this.auth.getUserByToken();
    }
}
