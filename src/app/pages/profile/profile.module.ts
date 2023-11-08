import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileCardComponent } from './profile-card/profile-card.component';
import { PartialModule } from 'src/app/modules/partials/partial.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@NgModule({
    declarations: [ProfileComponent, ProfileCardComponent],
    imports: [CommonModule, ProfileRoutingModule, PartialModule, HttpClientModule],
})
export class ProfileModule {}
