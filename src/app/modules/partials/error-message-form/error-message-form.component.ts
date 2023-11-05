import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
    selector: 'app-error-message-form',
    templateUrl: './error-message-form.component.html',
    styleUrls: ['./error-message-form.component.scss'],
})
export class ErrorMessageFormComponent {
    @Input() control!: AbstractControl;
    @Input() message!: string;
}
