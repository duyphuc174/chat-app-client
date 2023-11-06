import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AuthService } from './modules/auth';

function appInitializer(authService: AuthService) {
    return () => {
        return new Promise((resolve) => {
            const user = authService.getAuthFromLocalStorage();
            console.log(user);
            console.log(authService.currentUserValue);

            //@ts-ignore
        });
    };
}

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, BrowserAnimationsModule, AppRoutingModule, HttpClientModule, ModalModule.forRoot()],
    providers: [
        // {
        //     provide: APP_INITIALIZER,
        //     useFactory: appInitializer,
        //     multi: true,
        //     deps: [AuthService],
        // },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
