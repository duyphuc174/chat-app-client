import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent {
  @Input() isLoading$: Observable<boolean>;
  @Input() size: string = 'sm';
  @Input() fontSize: string = 'fs-4';
  @Input() text: string = '';
  @Input() weight: string = 'fw-bold';
}
