import { Component } from '@angular/core';

@Component({
    selector: 'app-aside',
    templateUrl: './aside.component.html',
    styleUrls: ['./aside.component.scss'],
})
export class AsideComponent {
    mode: string = localStorage.getItem('app-mode') || 'light';
    changeMode() {
        if (this.mode === 'light') {
            this.mode = 'dark';
            localStorage.setItem('app-mode', this.mode);
        } else if (this.mode === 'dark') {
            this.mode = 'light';
            localStorage.setItem('app-mode', this.mode);
        }
        document.documentElement.setAttribute('data-bs-theme', this.mode);
    }
}
