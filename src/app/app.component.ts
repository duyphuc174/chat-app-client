import { Component, OnInit } from '@angular/core';
import { AuthService } from './modules/auth';
import { Router } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    title = 'chat-app-client';

    constructor(private auth: AuthService, private router: Router) {}

    ngOnInit(): void {
        const res = this.auth.getAuthFromLocalStorage();
        if (res) {
            this.router.navigate(['chat']).then();
        } else {
            this.router.navigate(['auth/login']);
        }
    }
}
