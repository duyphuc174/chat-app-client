import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './components/login/login.component';
import { AuthRoutingModule } from './auth-routing.module';
import { RegisterComponent } from './components/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PartialModule } from '../partials/partial.module';
import { HttpClientModule } from '@angular/common/http';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    declarations: [AuthComponent, LoginComponent, RegisterComponent],
    imports: [CommonModule, PartialModule, AuthRoutingModule, ReactiveFormsModule, HttpClientModule, NgbDatepickerModule],
})
export class AuthModule {}
