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
        this.auth.getUserByToken().subscribe((res) => {
            if (res) {
                if (this.router.url.includes('auth/login') || this.router.url.includes('auth/register')) {
                    this.router.navigate(['chat']);
                }
            } else {
                this.router.navigate(['/']);
            }
        });
    }
}
