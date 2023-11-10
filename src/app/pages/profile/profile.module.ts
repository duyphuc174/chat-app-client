import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileCardComponent } from './profile-card/profile-card.component';
import { PartialModule } from 'src/app/modules/partials/partial.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { ProfileUpdateModalComponent } from './profile-update-modal/profile-update-modal.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [ProfileComponent, ProfileCardComponent, ProfileUpdateModalComponent],
    imports: [
        CommonModule,
        ProfileRoutingModule,
        PartialModule,
        HttpClientModule,
        NgbTooltipModule,
        BsDatepickerModule,
        ReactiveFormsModule,
    ],
})
export class ProfileModule {}
