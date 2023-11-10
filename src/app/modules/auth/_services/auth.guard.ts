import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, public router: Router, private cookie: CookieService) {}

    canActivate() {
        const currentUser = this.authService.currentUserValue;
        if (currentUser) {
            return true;
        }
        this.authService.logout();
        return false;
    }
}
