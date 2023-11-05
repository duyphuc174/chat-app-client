import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserAvatarComponent } from './user-avatar/user-avatar.component';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { SearchInputComponent } from './search-input/search-input.component';
import { ReactionComponent } from './reaction/reaction.component';
import { ErrorMessageFormComponent } from './error-message-form/error-message-form.component';
import { ModalHeaderComponent } from './modal-header/modal-header.component';
import { ModalFooterComponent } from './modal-footer/modal-footer.component';
import { FriendListComponent } from './friend-list/friend-list.component';

@NgModule({
    declarations: [
        UserAvatarComponent,
        SearchInputComponent,
        ReactionComponent,
        ErrorMessageFormComponent,
        ModalHeaderComponent,
        ModalFooterComponent,
        FriendListComponent,
    ],
    imports: [CommonModule, NgbTooltipModule, NgSelectModule],
    exports: [
        UserAvatarComponent,
        SearchInputComponent,
        ReactionComponent,
        ErrorMessageFormComponent,
        ModalHeaderComponent,
        ModalFooterComponent,
        FriendListComponent
    ],
})
export class PartialModule {}
