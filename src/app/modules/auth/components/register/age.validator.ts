import { AbstractControl } from '@angular/forms';

export function eightYearsOldValidator(control: AbstractControl): { [key: string]: boolean } | null {
    if (control.value) {
        const birthday = new Date(control.value);
        const today = new Date();
        const minDate = new Date(today.getFullYear() - 8, today.getMonth(), today.getDate()); // Tính ngày 8 tuổi trước ngày hiện tại

        if (birthday > minDate) {
            return { notOldEnough: true };
        }
    }
    return null;
}
