import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserAvatarComponent } from './user-avatar/user-avatar.component';
import { NgbDropdownModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { SearchInputComponent } from './search-input/search-input.component';
import { ReactionComponent } from './reaction/reaction.component';
import { ErrorMessageFormComponent } from './error-message-form/error-message-form.component';
import { ModalHeaderComponent } from './modal-header/modal-header.component';
import { ModalFooterComponent } from './modal-footer/modal-footer.component';
import { FriendListComponent } from './friend-list/friend-list.component';
import { ChangeModeModalComponent } from './change-mode-modal/change-mode-modal.component';
import { LoadingComponent } from './loading/loading.component';
import { NotificationComponent } from './notification/notification.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [
        UserAvatarComponent,
        SearchInputComponent,
        ReactionComponent,
        ErrorMessageFormComponent,
        ModalHeaderComponent,
        ModalFooterComponent,
        FriendListComponent,
        ChangeModeModalComponent,
        LoadingComponent,
        NotificationComponent,
    ],
    imports: [CommonModule, NgbTooltipModule, NgSelectModule, NgbDropdownModule, HttpClientModule, RouterModule],
    exports: [
        UserAvatarComponent,
        SearchInputComponent,
        ReactionComponent,
        ErrorMessageFormComponent,
        ModalHeaderComponent,
        ModalFooterComponent,
        FriendListComponent,
        LoadingComponent,
        NotificationComponent,
    ],
})
export class PartialModule {}
