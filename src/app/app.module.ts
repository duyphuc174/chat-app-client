import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AuthService } from './modules/auth';
import { HttpInterceptorInterceptor } from './http-interceptor.interceptor';

function appInitializer(authService: AuthService) {
    return () => {
        return new Promise((resolve) => {
            //@ts-ignore
            authService.getUserByToken().subscribe().add(resolve);
        });
    };
}

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, BrowserAnimationsModule, AppRoutingModule, HttpClientModule, ModalModule.forRoot()],
    providers: [
        {
            provide: APP_INITIALIZER,
            useFactory: appInitializer,
            multi: true,
            deps: [AuthService],
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpInterceptorInterceptor,
            multi: true,
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
