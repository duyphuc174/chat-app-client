import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserAvatarComponent } from './user-avatar/user-avatar.component';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { SearchInputComponent } from './search-input/search-input.component';



@NgModule({
  declarations: [
    UserAvatarComponent,
    SearchInputComponent
  ],
  imports: [
    CommonModule,
    NgbTooltipModule,
    NgSelectModule
  ],
  exports: [
    UserAvatarComponent,
    SearchInputComponent
  ]
})
export class PartialModule { }
