import { Component } from '@angular/core';

@Component({
    selector: 'app-aside',
    templateUrl: './aside.component.html',
    styleUrls: ['./aside.component.scss'],
})
export class AsideComponent {
    changeMode() {
        document.documentElement.setAttribute('data-bs-theme', 'dark');
    }
}
