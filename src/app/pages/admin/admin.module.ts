import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { PartialModule } from 'src/app/modules/partials/partial.module';
import { UsersComponent } from './users/users.component';
import { ConversationsComponent } from './conversations/conversations.component';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [AdminComponent, UsersComponent, ConversationsComponent],
    imports: [CommonModule, AdminRoutingModule, PartialModule, RouterModule],
})
export class AdminModule {}
